import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello-word',
  templateUrl: './hello-word.component.html',
  styleUrls: ['./hello-word.component.css']
})
export class HelloWordComponent implements OnInit {

  courseTitle;
  message = 'Hello from Hello World Component!';

  courses=[
    {title: 'CS5200', id: 123},
    {title: 'CS5610', id: 234},
    {title: 'CS3200', id: 345},
    {title: 'CS4550', id: 456},
  ];

  deleteCourse(courseId){
    alert(courseId);
    this.courses = this.courses.filter(course=>
      course.id !== courseId
    );
  }

  addCourse(title){
    this.courses.push({
      title : title,
      id : title
    });
    this.courseTitle = ''; // clear the course title input field after adding course.
  }

  constructor() { }

  ngOnInit() {
  }

}
