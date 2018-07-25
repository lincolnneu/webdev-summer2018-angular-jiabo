import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model.client';
import { UserServiceClient } from '../services/user.service.client';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 // use user profile service
  constructor(private service: UserServiceClient, private router: Router) { }

  user: User = new User();
  update(user: User){
    console.log(user);
  }

  // event handler for log out
  logout(){ // hey server, destroy my session
    this.service
      .lougout()
      .then(() => this.router.navigate(['login']));

  }


  ngOnInit() {
    this.service
      .profile()
      .then(user => this.user = user);

    // this.service
    //   .findUserById('5b58f023ec45fe3654f13355')
    //   .then(user => this.user = user); // assign user from server to local
  }

}
