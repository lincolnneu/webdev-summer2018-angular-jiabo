import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { TopicServiceClient } from '../services/topic.service.client';


@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  constructor(private service: TopicServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.setParams(params));
 }


  moduleId;
  courseId;
  lessonId;
  topicId;
  topics = [];

  setParams(params){
    this.courseId = params['courseId'];
    this.moduleId = params['moduleId'];
    this.lessonId = params['lessonId'];
    this.topicId = params['topicId'];
    if(this.courseId !== undefined && this.moduleId !== undefined && this.lessonId !== undefined){
      this.loadTopics(this.courseId, this.moduleId, this.lessonId);
    }
  }

  loadTopics(courseId, moduleId, lessonId) {
    this.service.findTopicsForLesson(courseId, moduleId, lessonId)
      .then( topics => this.topics = topics);
  }

  ngOnInit() {
  }

}
