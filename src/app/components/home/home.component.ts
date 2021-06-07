
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/pojo/book';
import { BookService } from 'src/app/services/book.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private modalService: NgbModal,
    private loginService: LoginService, 
    private router: Router
    ) { }

  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  editForm!: FormGroup;
  title: string ='';

  books!: Book[];
  index =0;
  closeResult: string = '';

  ngOnInit(): void {
    this.getAllBooks();
  }


  public getAllBooks(): void {
    this.bookService.getBookList().subscribe(
      result => {
        this.books=result;
      },
      error => {
        alert(error);
      }
    );
  }


  public search(){
    if(this.title!="")
    {
    this.books=this.books?.filter(res=>{
      return res.title?.toLocaleLowerCase().match(this.title?.toLowerCase())
    })
    }else if(this.title==""){
      this.ngOnInit();
    }
  }



  // public customerLogin(): void {
  //   this.loginService.validateUser(this.user.email, this.user.password).subscribe(
  //     (response: UserClass) => {
  //       this.user = response;
  //       console.log(response); alert('user is logged');
  //       sessionStorage.setItem('email', this.user.email);
  //       sessionStorage.setItem('userId', this.user.userId +'');
  //       this.router.navigate(['/book'])
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }



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


  onSubmit(f: NgForm) {
    console.log(f.value);
    this.bookService.addBook(f.value).subscribe(
      (result) => {
        this.ngOnInit();
      }
    );
    this.modalService.dismissAll(); //dismiss the modal
  }



}
