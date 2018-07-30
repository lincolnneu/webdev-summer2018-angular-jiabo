import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model.client';
import { CourseServiceClient } from '../services/course.service.client';
import { UserServiceClient } from '../services/user.service.client';
import { Course } from '../models/course.model.client';
import { SectionServiceClient } from '../services/section.service.client';
@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css']
})
export class CourseGridComponent implements OnInit {

  constructor(private service: CourseServiceClient,
              private userService: UserServiceClient,
              private sectionService: SectionServiceClient) { }

  user: User = new User();
  enrolledCourses = [];
  enrolledCourseIds = [];
  courses: Course[] = [];

  coursesToDisplay = [];

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
          res.json()
            .then(user => {
              this.user = user;
              this.sectionService.findSectionsForStudent()
                .then(enrollments => {
                  enrollments.map(
                    enrollment => {
                      this.service.findCourseById(enrollment.section.courseId)
                        .then(result => {
                          const item = {title: result.title, id: result.id};
                          console.log(result.id);
                          if(this.enrolledCourseIds.indexOf(result.id) === -1){
                            this.enrolledCourseIds.push(result.id);
                            this.enrolledCourses.push(item);
                            if(result.private === true){
                              this.coursesToDisplay.push(result);
                            }
                          }
                        });
                    });
                });
            });
        }
        this.service.findAllCourses()
          .then(courses => {
            this.courses = courses;
            courses.forEach(c =>{
              if(c.private === true){
              }
              else{
                this.coursesToDisplay.push(c);
              }
            });

            if(this.user.username === 'admin'){
              this.coursesToDisplay = this.courses;
            }
          });
        });
  }

}
