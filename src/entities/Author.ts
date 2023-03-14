import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation } from 'typeorm';
import { Book } from './Book';

@Entity()
export class Author {
    @PrimaryGeneratedColumn('uuid')
    authorId: string;

    @Column()
    name: string;

    @Column({ default: 'unknown' })
    country: string;

    @ManyToMany(() => Book, (book) => book.authors)
    books: Relation<Book>[];
}