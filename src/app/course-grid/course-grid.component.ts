import { Component, OnInit } from '@angular/core';
import { CourseServiceClient } from '../services/course.service.client';
import { Course } from '../models/course.model.client';
@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css']
})
export class CourseGridComponent implements OnInit {

  constructor(private service: CourseServiceClient) { }

  courses: Course[] = [];
  // strongly type of data type. Cannot assign wrong type of data.
  // Attempt to add a different field that is not the original data type will fail.
  // Catch this error early before sent to server.

  ngOnInit() {
    this.service.findAllCourses()
      .then(courses => this.courses = courses);
  }

}
