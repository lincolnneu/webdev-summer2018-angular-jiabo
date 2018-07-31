import * as constants from '../constants';
const TOPIC_URL = constants.HOST + '/api/course/';

export class TopicServiceClient{
  findTopicsForLesson(courseId, moduleId, lessonId){
    return fetch( TOPIC_URL + courseId + '/module/' + moduleId + '/lesson/' + lessonId + '/topic')
      .then(response => response.json()); // return as json body.
  }

}
