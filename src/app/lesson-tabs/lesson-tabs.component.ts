import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lesson-tabs',
  templateUrl: './lesson-tabs.component.html',
  styleUrls: ['./lesson-tabs.component.css']
})
export class LessonTabsComponent implements OnInit {
// listen for the changes in url by listening the same service we've been using so far
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadLessons(params['moduleId']));
  }

  moduleId;

  loadLessons(moduleId) {
    console.log(moduleId);
  }

  ngOnInit() {
  }

}
