import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {

  // beforeAll(() => {
  //   execSync('npm run setup-db');
  // });
  

  afterAll(async () => {
    return client.end();
  });

  describe('/api/books', () => {

    beforeAll(() => {
      execSync('npm run recreate-tables');
    });

    let book1 = {
      id: expect.any(Number),
      title: 'The Beginning of Infinity',
      author: 'David Deutsch',
      genre: 'Science/Nonfiction',
      image_url: 'assets/BoI.jpg',
      pub_year: 2011
    };

    let book2 = {
      id: expect.any(Number),
      title: 'The Fabric of Reality',
      author: 'David Deutsch',
      genre: 'Science/Nonfiction',
      image_url: 'assets/FoR.jpg',
      pub_year: 1998
    };
    let book3 = {
      id: expect.any(Number),
      title: 'Conjectures & Refutations',
      author: 'Karl Popper',
      genre: 'Philosophy',
      image_url: 'assets/CaR.jpg',
      pub_year: 1963
    };

    it('POST book1 to /api/books', async () => {
      const response = await request
        .post('/api/books')
        .send(book1);
      //console.log(response.text);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(book1);

      // update book1 object
      book1 = response.body;

      
    });

    it('PUT updated book1 to /api/books/:id', async () => {
      book1.pub_year = 1886;
      book1.title = 'Mr. Potato Head for Dummies';

      const response = await request
        .put(`/api/books/${book1.id}`)
        .send(book1);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(book1);
    });

  });

  //   describe.skip('seed data tests', () => {

  //   });

  const expectedBooks = [
    {
      title: 'The Beginning of Infinity',
      author: 'David Deutsch',
      genre: 'Science/Nonfiction',
      image_url: 'assets/BoI.jpg',
      pub_year: 2011
    },
    {
      title: 'The Fabric of Reality',
      author: 'David Deutsch',
      genre: 'Science/Nonfiction',
      image_url: 'assets/FoR.jpg',
      pub_year: 1998
    },
    {
      title: 'Conjectures & Refutations',
      author: 'Karl Popper',
      genre: 'Philosophy',
      image_url: 'assets/CaR.jpg',
      pub_year: 1963
    },
    {
      title: 'I Am A Strange Loop',
      author: 'Douglas Hofstadter',
      genre: 'Philosophy',
      image_url: 'assets/IAASL.jpg',
      pub_year: 2007
    },
    {
      title: 'The Ascent of Man',
      author: 'Jacob Bronowski',
      genre: 'Science/Nonfiction',
      image_url: 'assets/AoM.jpg',
      pub_year: 1973
    },
    {
      title: 'Enlightenment Now',
      author: 'Steven Pinker',
      genre: 'Social Science/Nonficiton',
      image_url: 'assets/EN.webp',
      pub_year: 2018
    },
    {
      title: 'The Selfish Gene',
      author: 'Richard Dawkins',
      genre: 'Science/Nonfiction',
      image_url: 'assets/TSG.jpg',
      pub_year: 1976
    },
    {
      title: 'The Blind Watchmaker',
      author: 'Richard Dawkins',
      genre: 'Science/Nonfiction',
      image_url: 'assets/TBW.jpg',
      pub_year: 1986
    },
    {
      title: 'The Science of Can and Can\'t',
      author: 'Chiarla Marletto',
      genre: 'Science/Nonfiction',
      image_url: 'assets/SoCaC.jpg',
      pub_year: 2021
    },
    {
      title: 'Scale',
      author: 'Geoffrey West',
      genre: 'Science/Nonfiction',
      image_url: 'assets/scale.jpg',
      pub_year: 2017
    },
    {
      title: 'Homo Deus',
      author: 'Yuval Noah Harrari',
      genre: 'Social Science',
      image_url: 'assets/HD.jpg',
      pub_year: 2015
    }
  ];

  //   // If a GET request is made to /api/cats, does:
  //   // 1) the server respond with status of 200
  //   // 2) the body match the expected API data?
  //   it.skip('GET /api/books', async () => {
  //     // act - make the request
  //     const response = await request.get('/api/books');

  //     // was response OK (200)?
  //     expect(response.status).toBe(200);

  //     // did it return the data we expected?
  //     expect(response.body).toEqual(expectedBooks);

  //   });

//   // If a GET request is made to /api/cats/:id, does:
//   // 1) the server respond with status of 200
//   // 2) the body match the expected API data for the cat with that id?
//   test('GET /api/books/:id', async () => {
//     const response = await request.get('/api/books/2');
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(expectedBooks[1]);
//   });
});