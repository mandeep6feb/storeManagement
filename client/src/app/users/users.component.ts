import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any;
  role: any;
  constructor(public api: ApiServiceService, public router: Router, public route: ActivatedRoute) {
   }
  get() {
      this.api.getdata('register').subscribe( ( res: any) => {
        this.users = res;
      }, error => {
        console.log(error)
      });
  }
   del(id){
    window.alert('Are you sure ?')
    this.api.deletedata('register', id).subscribe( res=> {
      this.get();
      
      window.location.reload()
    })
  }
ngOnInit(): void {
  this.role = JSON.parse(localStorage.getItem('user'));
  console.log(this.role)
  this.get();
}
}