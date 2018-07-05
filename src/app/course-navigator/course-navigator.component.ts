import { Component, OnInit } from '@angular/core';
import { CourseNavigatorServiceClient } from '../services/course-navigator.service.client';

@Component({
  selector: 'app-course-navigator',
  templateUrl: './course-navigator.component.html',
  styleUrls: ['./course-navigator.component.css']
})
export class CourseNavigatorComponent implements OnInit {

  constructor(private service: CourseNavigatorServiceClient) { }

  courses = [];
  modules = [];
  lessons = [];
  selectedCourseId = null;

  selectCourse(courseId){
    alert(courseId);
    this.selectedCourseId = courseId;
    this.service.findAllModulesForCourses(courseId)
      .then(modules => (this.modules = modules));
  }

  selectModule(moduleId){
    this.service.findAllLessonsForModule(this.selectedCourseId, moduleId)
      .then(lessons => this.lessons = lessons);
  }

  ngOnInit() {
    // perfect place to look for stuff right when about to render.
    this.service.findAllCourses()
      .then(courses => this.courses = courses);
  }

}
