import { 
    Entity, PrimaryGeneratedColumn, Column, 
    OneToMany, Relation, ManyToMany, JoinTable } from 'typeorm';
import { Review } from './Review';
import { Author } from './Author';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  bookId: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  publicationYear: number;

  @Column({ default: false })
  publicDomain: boolean;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Relation<Review>[]; 

  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable()
  authors: Relation<Author>[];
}