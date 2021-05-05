/* eslint-disable no-console */
import client from '../lib/client.js';
// import our seed data:
import books from './cats.js';

run();

async function run() {

  try {

    await Promise.all(
      books.map(book => {
        return client.query(`
          INSERT INTO books (title, author, genre, image_url, pub_year)
          VALUES ($1, $2, $3, $4, $5);
        `,
        [book.title, book.author, book.genre, book.image_url, book.pub_year]);
      })
    );
    

    console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}