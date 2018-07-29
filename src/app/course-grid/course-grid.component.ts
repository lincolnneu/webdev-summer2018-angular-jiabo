import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model.client';
import { CourseServiceClient } from '../services/course.service.client';
import { UserServiceClient } from '../services/user.service.client';
import { Course } from '../models/course.model.client';
@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css']
})
export class CourseGridComponent implements OnInit {

  constructor(private service: CourseServiceClient,
              private userService: UserServiceClient
  ) { }

  user: User = new User();

  courses: Course[] = [];
  // strongly type of data type. Cannot assign wrong type of data.
  // Attempt to add a different field that is not the original data type will fail.
  // Catch this error early before sent to server.

  ngOnInit() {
    this.userService
      .profile()
      .then(res => {
        if (res.status === 403) {
        // do nothing
        } else {
          res.json().then(user => this.user = user);
        }
        this.service.findAllCourses()
          .then(courses => this.courses = courses);
        });
  }

}
