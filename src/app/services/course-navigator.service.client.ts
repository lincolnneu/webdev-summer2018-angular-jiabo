import * as constants from '../constants';

const HOST = constants.HOST;

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

  findAllTopicsForLesson(courseId, moduleId, lessonId){
    return fetch(HOST + '/api/course/' + courseId + '/module/' + moduleId + '/lesson/' + lessonId + '/topic')
      .then(response => response.json());
  }

  findAllWidgetsForTopic(topicId){
    return fetch(HOST + '/api/topic/' + topicId + '/widget')
      .then(response => response.json());
  }

}
