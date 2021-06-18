const request = require('supertest');
const app = require('../../main');
const { sequelize, Product, Category, User } = require('../../models/index');

// sebelum semua test
beforeAll(async () => {
  await sequelize.sync();
  const [user, created] = await User.findOrCreate({
    where: { email: 'nauvalsh@gmail.com' },
    defaults: {
      name: 'Nauval',
      email: 'nauvalsh@gmail.com',
      phoneNumber: '081231231234',
      password: 'test123',
      role: 'admin'
    }
  });
  return true;
});

// sebelum tiap2 test / isolasi tes
beforeEach(async () => {
  await Category.destroy({ truncate: true, cascade: true });
  await Product.destroy({ truncate: true, cascade: true });
  await Category.create({
    categoryName: 'test category'
  });
});

describe('Create Products', () => {
  const auth = async (
    options = { auth: { email: 'nauvalsh@gmail.com', password: 'test123' } }
  ) => {
    let token;
    if (options.auth) {
      const response = await request(app).post('/api/v1/auth/login').send(options.auth);

      token = response.body.data.token.accessToken;
    }

    return token;
  };

  const createProduct = async (bearer) => {
    let agent = request(app).post('/api/v1/products');
    agent.set('Authorization', `Bearer ${bearer}`);

    return agent.send({
      categoryId: 1,
      productName: `producttest-${1}`,
      price: 1234,
      desc: `test`,
      isActive: true
    });
  };

  it('returns 200 OK when post product request is success', async () => {
    const token = await auth();

    const response = await createProduct(token); // .expect(200, done);

    expect(response.status).toBe(200);
  });

  it('saves new product', async () => {
    const token = await auth();
    await createProduct(token);

    const products = await Product.findAll({});

    expect(products.length).toEqual(1);
  });
});
