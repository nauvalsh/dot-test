const request = require('supertest');
const app = require('../../main');
const { sequelize, Product, Category } = require('../../models/index');
const redis = require('../../redis');

afterAll(() => redis.closeInstance());

// sebelum semua test
beforeAll(async () => {
  await sequelize.sync();
  return true;
});

// sebelum tiap2 test / isolasi tes
beforeEach(async () => {
  await redis.redisFlushAsync();
  await Category.destroy({ truncate: true, cascade: true });
  await Product.destroy({ truncate: true, cascade: true });
});

describe('List Products', () => {
  const createProduct = async (rows) => {
    let category = await Category.create({
      categoryName: 'test category'
    });
    for (let i = 0; i < rows; i++) {
      await Product.create({
        categoryId: category.id,
        productName: `producttest-${1}`,
        price: 1234,
        desc: `test`,
        isActive: true
      });
    }
  };

  const getProducts = () => {
    return request(app).get('/api/v1/products').send();
  };

  it('returns 200 OK when get products request is success', async () => {
    const response = await getProducts(); // .expect(200, done);

    expect(response.status).toBe(200);
  });

  it('returns status & data object as response body', async () => {
    const response = await getProducts();
    expect(response.body).toEqual({
      status: 'success',
      data: {
        products: []
      }
    });
  });

  it('returns 5 products', async () => {
    await createProduct(5);
    const response = await getProducts();

    expect(response.body.data.products.length).toBe(5);
  });
});
