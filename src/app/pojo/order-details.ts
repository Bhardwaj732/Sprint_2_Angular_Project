import { Book } from "./book";
import { BookOrder } from "./book-order";

export class OrderDetails {

    oorderDetailsId: number=0;
    bookOrder!: BookOrder;
    book!: Book
    quantity: number=0;
    subtotal: number=0;
}
