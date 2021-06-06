import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactUsService } from 'src/app/services/contact-us.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private contactUsService: ContactUsService) { }

  ngOnInit(): void {
  }


  onSubmit(f: NgForm) {
    console.log(f.value);
    this.contactUsService.addContactUs(f.value).subscribe(
      (result) => {
        this.ngOnInit();
      }
    );
  }

}
