import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model.client';
import { UserServiceClient } from '../services/user.service.client';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 // use user profile service
  constructor(private service: UserServiceClient) { }

  user: User = new User();
  update(user: User){
    console.log(user);
  }
  ngOnInit() {
    this.service
      .findUserById('5b58f023ec45fe3654f13355')
      .then(user => this.user = user); // assign user from server to local
  }

}
