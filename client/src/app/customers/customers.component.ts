import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  users: any;
  role: any;
  constructor(public api: ApiServiceService) {
   }
   
  get() {
      this.api.getdata('register').subscribe( ( res: any) => {
        this.users = res;
      }, error => {
        console.log(error)
      });
  }
ngOnInit(): void {
  this.role = JSON.parse(localStorage.getItem('user'));
  this.get();
}
}