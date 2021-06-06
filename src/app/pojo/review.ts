import { Book } from "./book";
import { Customer } from "./customer";

export class Review {

    reviewId: number=0;
    headLine: string='';
    comment: string='';
    rating: number=0;
    reviewOn!: Date;
    book: Book = new Book();
    customerSecond: Customer = new Customer();
}
