import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { LessonServiceClient } from '../services/lesson.service.client';

@Component({
  selector: 'app-lesson-tabs',
  templateUrl: './lesson-tabs.component.html',
  styleUrls: ['./lesson-tabs.component.css']
})
export class LessonTabsComponent implements OnInit {
// listen for the changes in url by listening the same service we've been using so far
// inject the service
  constructor(private service: LessonServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadLessons(params['courseId'], params['moduleId']));
  }

  moduleId;
  courseId;
  lessons = [];
  loadLessons(courseId, moduleId) {
    console.log(moduleId);
    this.moduleId = moduleId;
    this.courseId = courseId;
    this.service.findLessonsForModule(courseId, moduleId)
      .then( lessons => this.lessons = lessons);
  }

  ngOnInit() {
  }

}
