import { AppDataSource } from '../dataSource';
import { Book } from '../entities/Book';

const bookRepository = AppDataSource.getRepository(Book);

async function getBookById(bookId: string): Promise<Book | null> {
  return await bookRepository.findOne({ where: { bookId } });
}

async function getAllBooks(): Promise<Book[]> {
  return await bookRepository.find();
}

export { getAllBooks, getBookById };
