import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BookDto } from '../common/bookDto';
import { db } from '../main';

@Injectable()
export class BooksService {
  async getAllBooks() {
    try {
      const books = await db.ref('books').get();
      return books.val();
    } catch (e) {
      console.log('DB Error - cant get all books');
      console.log(e.message);
      throw new InternalServerErrorException();
    }
  }

  async addNewBook(data: BookDto) {
    try {
      const newBook = await db.ref('books').push({
        title: data.title,
        authors: data.authors,
        description: data.description,
      });
      return newBook.key;
    } catch (e) {
      console.log('DB Error - cant add new book');
      console.log(e.message);
      throw new InternalServerErrorException();
    }
  }

  async getBookById(id: string) {
    try {
      const book = await db.ref('books').child(id).get();
      if (!book.val()) {
        return `No book with ID: ${id}`;
      }
      return book.val();
    } catch (e) {
      console.log('DB Error - cant get a book');
      console.log(e.message);
      throw new InternalServerErrorException();
    }
  }

  async updateBookById(data: BookDto, id: string) {
    try {
      const upd = await db.ref('books').child(id).update(data);
      return this.getBookById(id);
    } catch (e) {
      console.log('DB Error - cant update book');
      console.log(e.message);
      throw new InternalServerErrorException();
    }
  }

  async deleteBook(id) {
    try {
      const rmw = await db.ref('books').child(id).set(null);
    } catch (e) {
      console.log('DB Error - cant delete book');
      console.log(e.message);
      throw new InternalServerErrorException();
    }
  }
}
