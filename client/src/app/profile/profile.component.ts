import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  role: any;
  user: any;
  constructor(public api: ApiServiceService,) {
     this.role = JSON.parse(localStorage.getItem('user'));
   }
    get() {
      this.api.getDataByID('register', this.role.id).subscribe( ( res: any) => {
        this.user = res;
      }, error => {
        console.log(error)
      });
  }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.get()
    }, 0);
  }

}
