import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserServiceClient } from '../services/user.service.client';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private service: UserServiceClient) { }

  loggedIn = false;
  user;
  ngOnInit() {
    this.service
      .profile()
      .then(res => {
        if (res.status !== 403) {
          res.json().then(user => {
              this.user = user;
              if(user.username !== 'admin'){
                return this.router.navigate(['home']);
              }
            });
          this.loggedIn = true;
        } else {
          return this.router.navigate(['home']);
        }
        });

  }

}
