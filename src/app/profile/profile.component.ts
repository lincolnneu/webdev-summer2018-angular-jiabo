import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model.client';
import { UserServiceClient } from '../services/user.service.client';
import { Route, Router } from '@angular/router';
import { SectionServiceClient } from '../services/section.service.client';
import { CourseServiceClient } from '../services/course.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 // use user profile service
  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private courseService: CourseServiceClient,
              private router: Router) { }

  user: User = new User();

  loggedIn = false;
  enrollments = [];
  update() {
    this.service.updateUser(this.user)
      .then(() => {
        location.reload();
      });
  }

  deleteProfile(){
    // unenroll all enrollments related to this student
    Promise.all(this.enrollments.map(enrollment => {
      this.sectionService.unenrollStudentInSection(enrollment.section._id);
    }))
    .then(() =>{
      this.service.deleteProfile(this.user)
        .then(() => {location.reload()});
    }); // delete profile
  }

  // event handler for log out
  logout() { // hey server, destroy my session
    this.service
      .logout()
      .then(() => this.router.navigate(['login']));

  }

  unenroll(enrollment) {
    this.sectionService.unenrollStudentInSection(enrollment.section._id)
      .then(() => {
        location.reload();
      }); // navigate to the profile
  }

  findCourseById(courseId){
    return this.courseService.findCourseById(courseId);
  }


  ngOnInit() {
    this.service
      .profile()
      .then(res => {
          if (res.status === 403) {
            return this.router.navigate(['login']);
          } else {
            res.json().then(user => this.user = user);
            this.loggedIn = true;
            this.sectionService
              .findSectionsForStudent()
              .then(sections => {
                this.enrollments = sections;
                this.enrollments.forEach(entry => {
                  this.findCourseById(entry.section.courseId)
                    .then(
                      course => {
                        entry.course = course;
                        entry.courseRoute = '/course/' + entry.section.courseId;
                      }
                    );
                });
              });
          }
        });

    // this.service
    //   .findUserById('5b58f023ec45fe3654f13355')
    //   .then(user => this.user = user); // assign user from server to local
  }

}
