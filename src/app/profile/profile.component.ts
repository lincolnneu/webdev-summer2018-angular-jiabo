import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model.client';
import { UserServiceClient } from '../services/user.service.client';
import { Route, Router } from '@angular/router';
import { SectionServiceClient } from '../services/section.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 // use user profile service
  constructor(private service: UserServiceClient, private sectionService: SectionServiceClient, private router: Router) { }

  user: User = new User();

  enrollments = [];
  update(user) {
    this.service.updateUser(this.user);
    console.log(user);
  }

  // event handler for log out
  logout() { // hey server, destroy my session
    this.service
      .lougout()
      .then(() => this.router.navigate(['login']));

  }


  ngOnInit() {
    this.service
      .profile()
      .then(res => {
          if (res.status === 403) {
            return this.router.navigate(['login']);
          } else {
            res.json().then(user => this.user = user);
            this.sectionService
              .findSectionsForStudent()
              .then(sections => this.enrollments = sections);
          }
        });

    // this.service
    //   .findUserById('5b58f023ec45fe3654f13355')
    //   .then(user => this.user = user); // assign user from server to local
  }

}
