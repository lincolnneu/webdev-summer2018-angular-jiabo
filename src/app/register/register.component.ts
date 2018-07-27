import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserServiceClient } from '../services/user.service.client';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router,
              private service: UserServiceClient) {// ask data provider


  }
  username;
  password;
  password2;
  register(username, password, password2){
    console.log([username, password, password2]);
    if(password === password2){
      this.service.createUser(username, password)
        .then((res) => {
          if(res != null){
            console.log('redirecting to profile');
            this.router.navigate(['profile']);
          } else{
            alert('The username is already taken, please try other username!');
          }

        });
    } else{
      alert('The password and verify password should be the same!');
    }
  }
  ngOnInit() {
  }

}
