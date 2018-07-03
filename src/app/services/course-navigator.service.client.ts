export class CourseNavigatorServiceClient{
  findAllCourses(){
    return fetch('http://localhost:8080/api/course')
      .then(response => response.json());
  }
}
