import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../api.service';
export class Register {
    f_name: any;
    l_name: any;
    contact_number: any;
    password: any;
    username: any;
    email: any;
    city: any;
    country: any;
    address: any;
    role_id: any;
    constructor() {}
  }
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  confirmPassword: any;
  userInfo: any;
  update = false;
  userID: any;
  constructor(public api: ApiServiceService , public router: Router ,private route: ActivatedRoute) {
    this.userInfo = new Register();
    this.route.params.subscribe(param => {
      if (param.id) {
        this.getByid(param.id);
        this.userID = param.id
      }
    });
  }
  getByid(id) {
      this.api.getDataByID('register', id).subscribe( ( res: any) => {
        this.userInfo = res;
        this.update = true;
      }, error => {
        console.log(error)
      });
  }
  postRegister() {
      this.api.postdata('register', this.userInfo).subscribe( ( res: any) => {
        this.userInfo = new Register();
        console.log(res)
      }, error => {
        console.log(error)
      });
  }
  updateUser() {
      this.api.patchdata('register/'+ this.userID, this.userInfo).subscribe( ( res: any) => {
        this.userInfo = new Register();
        this.router.navigateByUrl('/home')
        console.log(res)
      }, error => {
        console.log(error)
      });
  }
  ngOnInit(): void {
  }
}
