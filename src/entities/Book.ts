import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from 'typeorm';
import { Review } from './Review';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  bookId: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  publicationYear: number;

  @Column({ default: false })
  inPublicDomain: boolean;

  @OneToMany(() => Review, (review) => review.book, { cascade: ['insert', 'update'] })
  reviews: Relation<Review>[];
}
