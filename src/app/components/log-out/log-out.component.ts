import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  userId: string='';
  email: string='';

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.userId=sessionStorage.getItem('userId') as string;
    this.email=sessionStorage.getItem('email') as string;
    console.log(this.userId);
    console.log(this.email);
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
