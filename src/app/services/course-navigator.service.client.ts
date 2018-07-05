const HOST = 'http://localhost:8080'

export class CourseNavigatorServiceClient{
  findAllCourses(){
    return fetch(HOST + '/api/course')
      .then(response => response.json());
  }

  findAllModulesForCourses(courseId){
    return fetch(HOST + '/api/course/' + courseId + '/module')
      .then(response => response.json());
  }

  findAllLessonsForModule(courseId, moduleId){
    return fetch(HOST + '/api/course/' + courseId + '/module/' + moduleId + '/lesson')
      .then(response => response.json());
  }

}
