import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../pojo/book';
import { Customer } from '../pojo/customer';
import { Review } from '../pojo/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = 'http://localhost:8080/api/v1/review';

  constructor(private http: HttpClient) { }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/listAllReviews`);
  }

  removeReviewById(reviewId: number): Observable<Review[]>{
    return this.http.delete<Review[]>(`${this.baseUrl}/removeReviewById/${reviewId}`);
  }

  addReview(review: Review): Observable<Review>{
    return this.http.post<Review>(`${this.baseUrl}/addReview`, review);
  }

  updateReview(review: Review): Observable<Review>{
    return this.http.put<Review>(`${this.baseUrl}/updateReview`, review);
  }

  listAllReviewsByBook(book: Book): Observable<Review[]> {
    return this.http.put<Review[]>(`${this.baseUrl}/listAllReviewsByBook`, book);
  }

  listAllReviewsByCustomer(customer: Customer): Observable<Review[]> {
    return this.http.put<Review[]>(`${this.baseUrl}/listAllReviewsByCustomer`, customer);
  }

}
