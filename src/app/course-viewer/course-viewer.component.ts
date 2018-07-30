import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { User } from '../models/user.model.client';
import { CourseServiceClient } from '../services/course.service.client';
import { Course } from '../models/course.model.client';
import { UserServiceClient } from '../services/user.service.client';
import { Route, Router } from '@angular/router';
import { SectionServiceClient } from '../services/section.service.client';

@Component({
  selector: 'app-course-viewer',
  templateUrl: './course-viewer.component.html',
  styleUrls: ['./course-viewer.component.css']
})
export class CourseViewerComponent implements OnInit {
  // ActivatedRoute is a listener to the url. if url changes we will get notified.
  constructor(private service: CourseServiceClient,
              private userService: UserServiceClient,
              private sectionService: SectionServiceClient,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.params.subscribe(params => this.loadCourse(params.courseId)); // if any change, we will get notified.
  }

  user: User = new User();
  enrollments = [];
  isEnrolled = 0;
  // load course for courseId
  course: Course = new Course();

  loadUser(courseId){
    return this.userService
      .profile()
      .then(res => {
        if(res.status === 403){
          // not logged in
          console.log("not logged in");
          // return new Promise((resolve, reject) => resolve(true));
        } else {
          // logged in
          return res.json()
            .then(user => {
              this.user = user;
              if(this.user.username === 'admin'){
                this.isEnrolled = 1;
                // return new Promise((resolve, reject) => resolve(true));
              } else {
                return this.sectionService
                  .findSectionsForStudent()
                  .then(sections => {
                    this.enrollments = sections;
                    this.enrollments.forEach(entry => {
                      if(entry.section.courseId == courseId){
                        this.isEnrolled = 1;
                      }
                    });
                    // return new Promise((resolve, reject) => resolve(true));
                  });
              }
            }
          );
        }
      });
  }


  loadCourse(courseId){
    if(courseId !== undefined){
      this.loadUser(courseId)
        .then(() => {
        this.service.findCourseByIdWithPermission(courseId, {id: this.isEnrolled})
          .then(course => {
            this.course = course;
            if(course.id === 0 && course.title === null){
              alert('This is a private course. Please enroll to view course content.');
              return this.router.navigate(['home']);
            };
          });
      });
    }
  }

  ngOnInit() {
  }

}
