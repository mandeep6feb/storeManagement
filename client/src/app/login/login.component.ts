import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from './../api.service';
import { Component, OnInit } from '@angular/core';
declare const $: any;
export class Login {
  username: any;
  password: any;
  constructor() {}
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  register = false;
  login = true;
  loading = false;
  userInfo: any;
  loginUser: any;
  loginStatus =  false;
  errorStatus = false;
  myUserName: any;
  userInfoName: any;
  emailError = true;
  passError = true;
  networkError: any;
  userDetail: any;
  role: any;
  constructor(public api: ApiServiceService, public route: Router ,  private _activate: ActivatedRoute) {
    this.loginUser = new Login();
  }
  signin() {
    if (!this.loginUser.username) {
      this.networkError = 'Username is requird!'
     } else if (!this.loginUser.password) { this.networkError = 'password is requird!';setTimeout( () => {
      this.networkError = null
    },2000)
     } else {
        this.api.postdata('login', this.loginUser).subscribe( (res: any) => {
          console.log(res.doc);
            if(res.doc.username === this.loginUser.username && res.doc.password === this.loginUser.password) {
              localStorage.setItem('user', JSON.stringify({role_id: res.doc.role_id, id:res.doc._id,login: true}))
              this.route.navigateByUrl('/home')
            }
        }, err2 => {
          this.networkError = err2.error.message;
          setTimeout( () => {
            this.networkError = null
          },2000)
       });
  }
  }
  ngOnInit(): void {
    $(this).find('[autofocus]').focus();
    setTimeout(() => {
      if(localStorage.getItem('user')){
        this.role = JSON.parse(localStorage.getItem('user'));
        if(this.role.login === true){
          this.route.navigateByUrl('/home');
        } else {
          this.route.navigateByUrl('/login')
        }
      }
    }, 0);
  }

}
