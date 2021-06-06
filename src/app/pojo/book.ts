import { Category } from "./category";

export class Book {

    bookId: number=0;
    title: string='';
    author: string='';
    description: string='';
    isbn: string='';
    price: number=0;
    publishDate!: Date;
    lastUpdatedOn!: Date;
    category!: Category;
	
}
