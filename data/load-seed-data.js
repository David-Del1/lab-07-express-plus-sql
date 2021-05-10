/* eslint-disable no-console */
import client from '../lib/client.js';
// import our seed data:
import books from './books.js';
import users from './users.js';

run();

async function run() {

  try {

    const data = await Promise.all(
      users.map(user => {
        return client.query(`
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
        [user.name, user.email, user.password]);
      })
    );

    const user = data[0].rows[0];

    await Promise.all(
      books.map(book => {
        return client.query(`
          INSERT INTO books (title, author, genre, image_url, pub_year, user_id)
          VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [book.title, book.author, book.genre, book.image_url, book.pub_year, user.id]);
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