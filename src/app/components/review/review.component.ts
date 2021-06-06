import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/pojo/book';
import { Customer } from 'src/app/pojo/customer';
import { Review } from 'src/app/pojo/review';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  displayedColumns: string[] = ['bookId', 'categoryName', 'comment', 'reviewOn', 'rating', 'actions'];
  dataSource!: MatTableDataSource<Review>;
  searchKey: string='';
  closeResult: string = '';

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  public reviews!: Review[];

  review: Review = new Review();

  constructor(
    private reviewService: ReviewService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllReviews();
  }


  onSearchClear() {
    this.searchKey='';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  openDetails(targetModal: any, review: Review) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'md'
    });
    document.getElementById('bookId')?.setAttribute('value', review.book.bookId+"");
    document.getElementById('title')?.setAttribute('value', review.book.title);
    document.getElementById('author')?.setAttribute('value', review.book.author);
    document.getElementById('categoryName')?.setAttribute('value', review.book.category.categoryName+"");
    document.getElementById('comment')?.setAttribute('value', review.comment);
    document.getElementById('email')?.setAttribute('value', review.customerSecond.email);
    document.getElementById('rating')?.setAttribute('value', review.rating+"");
    document.getElementById('reviewOn')?.setAttribute('value', review.reviewOn+"");

  }


  public getAllReviews(): void {
    this.reviewService.getAllReviews().subscribe(
      response => {
        this.reviews = response;
        this.dataSource = new MatTableDataSource(this.reviews);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public removeReviewById(reviewId: number): void {
    this.reviewService.removeReviewById(reviewId).subscribe(
      response => {
        this.reviews = response;
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public addReview(review: Review): void {
    this.reviewService.addReview(review).subscribe(
      (response: Review) => {
        this.review = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public updateReview(review: Review): void {
    this.reviewService.updateReview(review).subscribe(
      (response: Review) => {
        this.review = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public listAllReviewsByBook(book: Book): void {
    this.reviewService.listAllReviewsByBook(book).subscribe(
      (response: Review[]) => {
        this.reviews = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public listAllReviewsByCustomer(customer: Customer): void {
    this.reviewService.listAllReviewsByCustomer(customer).subscribe(
      (response: Review[]) => {
        this.reviews = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
