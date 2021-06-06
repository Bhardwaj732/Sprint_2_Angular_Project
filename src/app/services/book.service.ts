import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Book } from '../pojo/book';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8080/api/v1/book';

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({

      bookId: new FormControl(null),
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      isbn: new FormControl('', [Validators.required, Validators.minLength(6)]),
      lastUpdatedOn: new FormControl(''),
      price: new FormControl('', Validators.required),
      publishDate: new FormControl(''),
      category: new FormControl(0, Validators.required),


  });


  initializeFormGroup() {
    this.form.setValue({
      bookId: null,
      title: '',
      author: '',
      description: '',
      isbn: '',
      lastUpdatedOn: '',
      price: 0,
      publishDate: '',
      category: 0
    })
  }


















  getBookList(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/getAllBooks`);
  }

  getBooksById(bookId: number): Observable<Book>{
    return this.http.get<Book>(`${this.baseUrl}/getBooksById/${bookId}`);
  }
  getBooksByCategoryId(categoryId: number): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}/getBooksByCategoryId/${categoryId}`);
  }

  getBooksByTitle(title: string): Observable<Book>{
    return this.http.get<Book>(`${this.baseUrl}/getBooksByTitle/${title}`);
  }

  getRecentlyAddedBooks(): Observable<Book>{
    return this.http.get<Book>(`${this.baseUrl}/getRecentlyAddedBooks`);
  }

  removeBook(bookId: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/deleteBookById/` + bookId);
  }

  addBook(book: Book): Observable<any>{
    console.log(book.title);
    console.log(book.author);
    console.log(book.description);
    console.log(book.isbn);
    console.log(book.price);
    console.log(book.publishDate);   
    console.log(book.lastUpdatedOn);
    console.log(book.category.categoryId);
    console.log(book.category.categoryName);
    return this.http.post(`${this.baseUrl}/addBook`, book);
  }

  editBook(book: Book): Observable<any>{
    console.log(book);
    return this.http.put<any>(`${this.baseUrl}/editBookDetails`, book);
  }
}
