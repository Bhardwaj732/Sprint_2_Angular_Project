import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserClass } from 'src/app/pojo/user-class';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserClass = new UserClass();
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(
    private loginService: LoginService, 
    private router: Router, 
    config: NgbModalConfig, 
    private modalService: NgbModal) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  closeResult: string = '';

  // open(content: any) {
  //   this.modalService.open(content);
  // }

  ngOnInit(): void {
  }

  public customerLogin(): void {
    this.loginService.validateUser(this.user.email, this.user.password).subscribe(
      (response: UserClass) => {
        this.user = response;
        console.log(response); alert('user is logged');
        sessionStorage.setItem('email', this.user.email);
        sessionStorage.setItem('userId', this.user.userId +'');
        this.router.navigate([''])
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
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

}
