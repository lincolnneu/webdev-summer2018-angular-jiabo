import * as constants from '../constants';

export class CourseServiceClient{
  // COURSE_URL = 'http://localhost:8080/api/course';
  COURSE_URL = constants.HOST + '/api/course';
  findAllCourses(){
    return fetch(this.COURSE_URL)
      .then(response => response.json());
  }

  findCourseByIdWithPermission(courseId, isEnrolled){
    return fetch(this.COURSE_URL + '/' + courseId,{
      body: JSON.stringify(isEnrolled),
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json());
  }

  findCourseById(courseId){
    return fetch(this.COURSE_URL + '/' + courseId)
      .then(response => response.json());
  }
}
