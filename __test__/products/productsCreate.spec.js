const request = require('supertest');
const fetch = require('node-fetch');
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
    if (bearer) agent.set('Authorization', `Bearer ${bearer}`);

    return await agent.send({
      categoryId: 1,
      productName: `producttest-${1}`,
      price: 1234,
      desc: `test`,
      isActive: true
    });
  };

  const createCategoryAndProduct = async (bearer) => {
    let agent = request(app).post('/api/v1/products/all');
    if (bearer) agent.set('Authorization', `Bearer ${bearer}`);

    return agent.send({
      category: { categoryName: 'Tes Cat 5' },
      product: {
        productName: `producttest-${1}`,
        price: 1234,
        desc: `test`,
        isActive: true
      }
    });
  };

  it('returns 401 unauthorized when request without bearer token', async () => {
    const res = await fetch('http://localhost:5000/api/v1/products', {
      method: 'POST',
      body: JSON.stringify({
        categoryId: 1,
        productName: `producttest-${1}`,
        price: 1234,
        desc: `test`,
        isActive: true
      })
    });

    expect(res.status).toBe(401);
  });

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

  it('returns 200 OK when post category & product request is success', async () => {
    const token = await auth();

    const response = await createCategoryAndProduct(token); // .expect(200, done);

    expect(response.status).toBe(200);
  });

  it('returns 401 unauthorized when request without bearer token', async () => {
    const res = await fetch('http://localhost:5000/api/v1/products/all', {
      method: 'POST',
      body: JSON.stringify({
        category: { categoryName: 'Tes Cat 5' },
        product: {
          productName: `producttest-${1}`,
          price: 1234,
          desc: `test`,
          isActive: true
        }
      })
    });

    expect(res.status).toBe(401);
  });

  it('saves new category & product', async () => {
    const token = await auth();
    await createCategoryAndProduct(token);

    const categories = await Category.findAll({});
    const products = await Product.findAll({});

    expect(products.length).toEqual(1);
    expect(categories.length).toEqual(2);
  });
});
