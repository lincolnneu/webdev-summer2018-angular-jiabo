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
    this.route.params.subscribe(params => this.setParams(params));
  }

  moduleId;
  courseId;
  lessonId;
  lessons = [];

  setParams(params){
    this.courseId = params['courseId'];
    this.moduleId = params['moduleId'];
    this.lessonId = params['lessonId'];
    if(this.moduleId !== undefined){
      this.loadLessons(this.courseId, this.moduleId);
    }
  }


  loadLessons(courseId, moduleId) {
    this.service.findLessonsForModule(courseId, moduleId)
      .then( lessons => this.lessons = lessons);
  }

  ngOnInit() {
  }

}
