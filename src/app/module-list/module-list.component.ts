import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadModules(params['courseId']));
   } // component is aware of changes in the URL and it takes action about it.
   // we load modules for that particular course

   courseId;
   loadModules(courseId) {
      this.courseId = courseId;
   }

  ngOnInit() {
  }

}
