import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/pojo/book';
import { Category } from 'src/app/pojo/category';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  birthday: Date = new Date(1987, 6, 18);
  public books!: Book[];
  public categories!: Category[];

  book: Book = new Book();

  constructor(
    public bookService: BookService,
    public categoryService: CategoryService,
    public notificationService: NotificationService
    ) { }

    // public dialogRef: MatDialogRef<BookComponent>

  ngOnInit(): void {
    this.getAllBooks();
    this.getAllCategories();
  }


  onClear() {
    this.bookService.form.reset();
    this.bookService.initializeFormGroup();
  }


  onSubmit() {
    if (this.bookService.form.valid) {
      if(!this.bookService.form.get('bookId')?.value) {
        this.bookService.addBook(this.bookService.form.value);
      }
      else
        this.bookService.editBook(this.bookService.form.value);
      this.bookService.form.reset();
      this.bookService.initializeFormGroup();
      this.notificationService.success(': :  Submitted successfully');
      this.onClose();
    }
  }


  onClose() {
    this.bookService.form.reset();
    this.bookService.initializeFormGroup();
    // this.dialogRef.close();
  }





  public getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
        console.log(this.categories);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public getAllBooks(): void {
    this.bookService.getBookList().subscribe(
      (response: Book[]) => {
        this.books = response;
        console.log(this.books);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getBookById(bookId: number): void {
    this.bookService.getBooksById(bookId).subscribe(
      (response: Book) => {
        this.book = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getBooksByCategoryId(categoryId: number): void {
    this.bookService.getBooksByCategoryId(categoryId).subscribe(
      (response: Book[]) => {
        this.books = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getBooksByTitle(title: string): void {
    this.bookService.getBooksByTitle(title).subscribe(
      (response: Book) => {
        this.book = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getRecentlyAddedBooks(): void {
    this.bookService.getRecentlyAddedBooks().subscribe(
      (response: Book) => {
        this.book = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public removeBook(bookId: number): void {
    this.bookService.removeBook(bookId).subscribe(
      (response: any) => {
        this.books = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public addBook(book: Book): void {
    this.bookService.addBook(book).subscribe(
      (response: any) => {
        this.books = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public editBook(book: Book): void {
    this.bookService.editBook(book).subscribe(
      (response: any) => {
        this.books = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  // reloadData() {
  //   this.customerService.getCustomerList()
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.customers = data;
  //         console.log(this.customers);
  //       },
  //       error => { console.log(error); alert(error); }
  //     );
  // }

  // remove(customerId: number): void {
  //   this.customerService.deleteCustomer(customerId)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.customers = data;
  //         console.log(this.customers);
  //       },
  //       error => { console.log(error); alert(error); }
  //     );

  // }

  // detail(customerId: number): void {
  //   this.customerService.getCustomerById(customerId)
  //     .subscribe(
  //       data => { console.log(data); this.customer = data; },
  //       error => { console.log(error); alert(error); }
  //     );

  // }

  // editproduct(): void {
  //   this.customerService.updateCustomer(this.customer)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.customers = data;
  //         this.getCustomers();
  //       },
  //       error => { console.log(error); }
  //     );
  // }


  // saveproduct() {
  //   this.customerService.createCustomer(this.customer)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.customers = data;
  //         console.log(this.customers);
  //         alert('Product is added');
  //         // this.router.navigate(['view']);              // route of view component
  //       },
  //       error => { console.log(error); alert(error); }
  //     );

  // }

}
