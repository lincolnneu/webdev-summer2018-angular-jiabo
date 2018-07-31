import * as constants from '../constants';
const LESSON_API = constants.HOST + '/course/';
export class LessonServiceClient {
  findLessonsForModule(courseId, moduleId) {
    return fetch( LESSON_API + courseId + '/module/' + moduleId + '/lesson')
      .then(response => response.json()); // return as json body.
  }

}
