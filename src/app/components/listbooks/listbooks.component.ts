


import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/pojo/classes/bookSahithi';
import { Cart } from 'src/app/pojo/classes/cartSahithi';
import { BookSahithiService } from 'src/app/services/bookSahithi.service';

@Component({
  selector: 'app-listbooks',
  templateUrl: './listbooks.component.html',
  styleUrls: ['./listbooks.component.css']
})
export class ListbooksComponent implements OnInit {
 
  constructor(private bookService:BookSahithiService) { }

  books: Book[] | undefined;
  // cart:Cart=new Cart(1,"",2,1);
  message:any;
  bookId:any;
  title="";
  author='';
  
  ngOnInit(): void {
    var val = Math.floor(1000 + Math.random() * 9000);
    console.log(val);
    // this.getBooks();
    
  }
  // public addToCart(data: Book){
  //   this.bookService.addToCart(data).subscribe(()=>{this.message="Item added";});
  //   alert(data.title+" added to cart");
  //  }

  // public getBooks() {
  //   this.bookService.getBookList().subscribe(data=>{
      
  //       this.books=data;
  //       this.books.forEach(val=>{
  //         console.log(val);
  //       })
      
  //   });
  // }
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
  
}
