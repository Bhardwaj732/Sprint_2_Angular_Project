
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

  // user: UserClass = new UserClass();
  // email = new FormControl('', [Validators.required, Validators.email]);
  // hide = true;
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  editForm!: FormGroup;
  
  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

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
