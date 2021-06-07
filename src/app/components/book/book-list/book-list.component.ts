import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/pojo/book';
import { Category } from 'src/app/pojo/category';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor(
    public bookService: BookService,
    private modalService: NgbModal,
    public categoryService: CategoryService,
    private fb: FormBuilder) { }

  books!: Book[];
  deleteId: number=0;
  public categories!: Category[];
  category!: Category;
  book: Book = new Book();
  closeResult: string = '';
  editForm!: FormGroup;
  model!: NgbDateStruct;
  model1!: NgbDateStruct;

  ngOnInit(): void {
    this.reloadData();
    this.getAllCategories();
    this.editForm = this.fb.group({
      bookId: [0],
      title: [''],
      author: [''],
      description: [''],
      price: [0],
      isbn: [''],
      publishDate: [''],
      lastUpdatedOn: [''],
      category: ['']
    });
  }

  reloadData() {
    this.bookService.getBookList()
      .subscribe(
        data => {
          console.log(data);
          this.books = data;
          console.log(this.books);
        },
        error => { console.log(error); alert(error); }
      );
  }

  remove(bookId: number): void {
    this.bookService.removeBook(bookId)
      .subscribe(
        data => {
          console.log(data);
          this.books = data;
          console.log(this.books);
        },
        error => { console.log(error); alert(error); }
      );

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

  onSubmit(f: NgForm) {
    console.log(f.value);
    this.bookService.addBook(f.value).subscribe(
      (result) => {
        this.ngOnInit();
      }
    );
    this.modalService.dismissAll(); //dismiss the modal
  }


  openDetails(targetModal: any, book: Book) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'md'
    });
    document.getElementById('title1')?.setAttribute('value', book.title);
    document.getElementById('author1')?.setAttribute('value', book.author);
    document.getElementById('description1')?.setAttribute('value', book.description);
    document.getElementById('price1')?.setAttribute('value', book.price + "");
    document.getElementById('isbn1')?.setAttribute('value', book.isbn);
    document.getElementById('publishDate1')?.setAttribute('value', book.publishDate + "");
    document.getElementById('lastUpdatedOn1')?.setAttribute('value', book.lastUpdatedOn + "");
    document.getElementById('category1')?.setAttribute('value', book.category.categoryName);

  }


  openEdit(targetModal: any, book: Book) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    console.log(book.bookId);
    console.log(book.author);
    console.log(book.title);
    console.log(book.category);
    console.log(book.category.categoryName);
    this.editForm.patchValue({
      bookId: book.bookId,
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      isbn: book.isbn,
      publishDate: book.publishDate,
      lastUpdatedOn: book.lastUpdatedOn,
      category: book.category.categoryName
    });

  }



  openDelete(targetModal: any, book: Book) {
    this.deleteId = book.bookId
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'md'
    });
  }


  onDelete() {
    // const deleteURL = 'http://localhost:8888/friends/' + this.deleteID + '/delete';
    this.bookService.removeBook(this.deleteId)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }


  onSave() {
    console.log(this.editForm.value);
    this.bookService.editBook(this.editForm.value)
      .subscribe((result) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
    // this.httpClient.put(editURL, this.editForm.value)
    //   .subscribe((results) => {
    //     this.ngOnInit();
    //     this.modalService.dismissAll();
    //   });
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

}
