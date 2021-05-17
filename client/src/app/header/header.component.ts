import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: any;

  constructor( public route: Router) { }
  logout() {
    localStorage.removeItem("user");
    setTimeout(() => {
      if(!localStorage.getItem('user'))
      this.route.navigateByUrl('/login')
    }, 10);
  }
  ngOnInit(): void {
    this.role = JSON.parse(localStorage.getItem('user'));
  }

}
