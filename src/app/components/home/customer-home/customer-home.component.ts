import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartQuantity } from 'src/app/pojo/cart-quantity';
import { Book } from 'src/app/pojo/classes/bookSahithi';
import { Cart } from 'src/app/pojo/classes/cartSahithi';
import { BookService } from 'src/app/services/book.service';
import { BookSahithiService } from 'src/app/services/bookSahithi.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {

  constructor(private bookService: BookService,
    private modalService: NgbModal,
    private service: BookSahithiService) { }
  
  customerFullName:  string ='';
  books!: Book[];
  // cart:Cart=new Cart(1,"",2,1,1);
  newCart: Cart = new Cart();
  cartQuantity: CartQuantity = new CartQuantity();
  cartQuantity2!: CartQuantity;
  temp!: CartQuantity;
  cartValue2: number=0;
  message:any;
  bookId:any;
  title="";
  author='';
  cartValue: number=0;
  customerId: string = sessionStorage.getItem('userId') as string;
  model!: NgbDateStruct;
  closeResult: string = '';


  ngOnInit(): void {
    console.log(this.customerId);
    this.service.getCartValue(this.customerId).subscribe(
      result => {
        this.cartValue=result.cartValue;
        console.log(result.cartValue);
      },
      error => {
        alert(error);
      }
    );
    this.getAllBooks();
  }


  public getAllBooks(): void {
    this.bookService.getBookList().subscribe(
      result => {
        this.books=result;
        this.customerFullName = sessionStorage.getItem('fullName') as string;
      },
      error => {
        alert(error);
      }
    );
  }


  public addToCart(data: Book){
    this.newCart.title = data.title;
    this.newCart.quantity = 1;
    this.newCart.price = data.price;
    this.newCart.customerId = sessionStorage.getItem('userId') as string;
    this.cartQuantity.customerId = sessionStorage.getItem('userId') as string;
    this.cartQuantity.cartValue = this.cartValue;
    this.service.addToCart(this.newCart).subscribe(
      ()=>{
        this.message="Item added";
        this.service.increaseCartValue(this.cartQuantity).subscribe(
          result => {
            this.cartQuantity2 = result;
            this.cartValue= this.cartQuantity2.cartValue;
            // this.ngOnInit();
          }
        )
      }
      );
        alert(data.title+" added to cart");
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

}
