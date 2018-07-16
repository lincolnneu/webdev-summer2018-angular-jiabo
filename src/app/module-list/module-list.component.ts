import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ModuleServiceClient } from '../services/module.service.client';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {

  // inject the service
  constructor(private service: ModuleServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.setParams(params));
   } // component is aware of changes in the URL and it takes action about it.
   // we load modules for that particular course

   courseId; // as part of property
   moduleId;
   modules = [];

   setParams(params){
    this.courseId = params['courseId'];
    this.moduleId = params['moduleId'];
    this.loadModules(this.courseId);
   }

   loadModules(courseId) {
      this.courseId = courseId;
      this.service.findModulesForCourse(courseId)
        .then(modules => this.modules = modules); // feed local modules array
   }

  ngOnInit() {
  }

}
