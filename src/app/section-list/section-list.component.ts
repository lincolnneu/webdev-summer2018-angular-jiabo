import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model.client';
import { SectionServiceClient } from '../services/section.service.client';
import { Router } from '@angular/router';
import { UserServiceClient } from '../services/user.service.client';
import { CourseServiceClient } from '../services/course.service.client';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private userService: UserServiceClient,
              private service: SectionServiceClient,
              private courseService: CourseServiceClient,
              private router: Router) {
    this.route.params.subscribe(params => this.loadSections(params['courseId'])); // self contained section
  }

  user: User = new User();
  editing = false;
  sectionName = '';
  maxSeats = '';
  courseId = '';
  course;
  editingSection;
  sections = [];
  loadSections(courseId){
    this.courseId = courseId;
    // use our service to find a particular course
    this.service.findSectionsForCourse(courseId).then(sections => { if (sections != null) {this.sections = sections; } });
  }

  createSection(sectionName, maxSeats) {
    this.service.createSection(this.courseId, sectionName, maxSeats, maxSeats)
      .then(() => {
        this.loadSections(this.courseId); // immediately update section list after adding one more section.
      });
  }

  findCourseById(courseId){
    return this.courseService.findCourseById(courseId);
  }

  enroll(section) {
    // alert(section._id);
    // delegate data communication to service;
    this.userService
      .profile()
      .then(res => {
        if(res.status === 403){
          return this.router.navigate(['login']);
        }
        else {
          if(section.seats <= 0){
            alert('No seat available for this section.');
          } else{
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
      });
  }

  remove(section){
    let enrollments = [];
    this.service.findStudentsForSection(section._id)
      .then(res => {
        enrollments = res;
        Promise.all(enrollments.map(enrollment => {
          this.service.unenrollTheStudentInSection(enrollment.student, enrollment.section);
        }))
          .then(() => {
            this.service.removeSection(section._id)
              .then(() => {location.reload()});
          });
      });
  }

  edit(section){
    this.editing = true;
    this.editingSection = section;
    this.sectionName = section.name;
    this.maxSeats = section.maxSeats;
  }

  editDone(section, sectionName, maxSeats){
    this.service.updateSection(section._id, sectionName, maxSeats)
      .then(() => {
        this.loadSections(this.courseId); // immediately update section list after adding one more section.
        this.editing = false;
        this.editingSection = null;
        this.sectionName = this.course.title + ' Section ' + (this.sections.length + 1);
        this.maxSeats = '';
      });
  }

  ngOnInit() {
    this.userService
      .profile()
      .then(res => {
        if (res.status === 403) {
          return this.router.navigate(['login']);
        } else {
          res.json().then(user => this.user = user);
          this.findCourseById(this.courseId)
            .then(
              course => {
                this.course = course;
                this.sectionName = course.title + ' Section ' + (this.sections.length + 1);
              }
            );
        }
      });

  }

}
