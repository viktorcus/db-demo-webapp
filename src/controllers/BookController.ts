import { Request, Response } from 'express';
import { getBookById, getAllBooks } from '../models/BookModel';
import { parseDatabaseError } from '../utils/db-utils';

type NewBookRequest = {
  title: string;
  publicationYear: number;
};

async function addNewBook(req: Request, res: Response): Promise<void> {
  const { title, publicationYear } = req.body as NewBookRequest;

  try {
    const newBook = await addBook(title, publicationYear);
    console.log(newBook);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}
