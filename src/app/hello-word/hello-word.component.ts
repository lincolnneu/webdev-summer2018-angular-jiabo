import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello-word',
  templateUrl: './hello-word.component.html',
  styleUrls: ['./hello-word.component.css']
})
export class HelloWordComponent implements OnInit {

  message = 'Hello from Hello World Component!';

  courses=[
    {title: 'CS5200', id:123},
    {title: 'CS5610', id:234},
    {title: 'CS3200', id:345},
    {title: 'CS4550', id:456},
  ];

  deleteCourse(courseId){
    alert(courseId);
    this.courses = this.courses.filter(course=>
      course.id !== courseId
    );
  }

  constructor() { }

  ngOnInit() {
  }

}
