import * as constants from '../constants';
const MODULE_URL = constants.HOST + '/api/course/COURSE_ID/module';

export class ModuleServiceClient {
  findModulesForCourse(courseId) {
    return fetch(MODULE_URL.replace('COURSE_ID', courseId))
      .then(response => response.json());
  }
}
