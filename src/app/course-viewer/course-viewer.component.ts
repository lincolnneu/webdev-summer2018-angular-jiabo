import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CourseServiceClient } from '../services/course.service.client';
import { Course } from '../models/course.model.client';
@Component({
  selector: 'app-course-viewer',
  templateUrl: './course-viewer.component.html',
  styleUrls: ['./course-viewer.component.css']
})
export class CourseViewerComponent implements OnInit {
  // ActivatedRoute is a listner to the url. if url changes we will get notified.
  constructor(private service: CourseServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadCourse(params.courseId)); // if any change, we will get notified.
  }

  // load course for courseId
  course: Course = new Course();
  loadCourse(courseId){
    this.service.findCourseById(courseId)
      .then(course => this.course = course);
  }
  ngOnInit() {
  }

}
