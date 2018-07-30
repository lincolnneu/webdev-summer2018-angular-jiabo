import { Component, OnInit } from '@angular/core';
import { UserServiceClient } from '../services/user.service.client';

@Component({
  selector: 'app-white-board',
  templateUrl: './white-board.component.html',
  styleUrls: ['./white-board.component.css']
})
export class WhiteBoardComponent implements OnInit {
  loggedIn = false;


  constructor(private service: UserServiceClient) { }

  logout() { // hey server, destroy my session
    this.service
      .logout()
      .then(() => location.reload());

  }

  ngOnInit() {
    this.service
      .profile()
      .then(res => {
        if (res.status !== 403) {
          this.loggedIn = true;
        }});
  }

}
