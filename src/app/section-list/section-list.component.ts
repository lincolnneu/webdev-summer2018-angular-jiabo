import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionServiceClient } from '../services/section.service.client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: SectionServiceClient, private router: Router) {
    this.route.params.subscribe(params => this.loadSections(params['courseId'])); // self contained section
  }

  sectionName = '';
  seats = '';
  courseId = '';
  sections = [];
  loadSections(courseId){
    this.courseId = courseId;
    // use our service to find a particular course
    this.service.findSectionsForCourse(courseId).then(sections => { if (sections != null) {this.sections = sections; } });
  }

  createSection(sectionName, seats) {
    this.service.createSection(this.courseId, sectionName, seats)
      .then(() => {
        this.loadSections(this.courseId); // immediately update section list after adding one more section.
      });
  }

  enroll(section) {
    // alert(section._id);
    // delegate data communication to service;

    if(section.seats <= 0){
      alert('No seat available for this section.');
    }
    else{
      this.service.enrollStudentInSection(section._id)
        .then((res) => {
          if(res.status === 403){
            alert('You have already enrolled in this section!');
          }
          else {
            alert('Enrolled successfully! Navigating to profile');
            this.router.navigate(['profile']);
          }
        }); // navigate to the profile
    }
  }

  ngOnInit() {


  }

}
