import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ApiServiceService } from './api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentRoute: any; userDetail: any;
  userName: any;
  constructor(public api: ApiServiceService, public router: Router, public route: ActivatedRoute) {
    this.router.events.subscribe(
      (event: any) => {
         if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
        }
      }
    );
}

includes(route) {
  if (this.currentRoute) {
    return this.currentRoute.toString().includes(route);
  }
  return false;
}

  ngOnInit(): void {
   
  }
}
 