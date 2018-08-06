import * as constants from '../constants';

export class SectionServiceClient {
  SECTION_URL = constants.STUDENT_HOST + '/api/course/COURSEID/section';
  SECTION_URL_SHORT = constants.STUDENT_HOST + '/api/section/';
  STUDENT_SECTION_URL = constants.STUDENT_HOST + '/api/student/section/';
  findSectionsForStudent() {
    return fetch(this.STUDENT_SECTION_URL, {
      credentials: 'include' // pass in the credentials
    })
      .then(response => response.json());

  }

  findStudentsForSection(sectionId) {
    const url = this.SECTION_URL_SHORT + sectionId + '/student';
    return fetch(url, {
      method: 'get',
      credentials: 'include'
    }).then(response => response.json());
  }

  enrollStudentInSection(sectionId) {
    const url = this.SECTION_URL_SHORT + sectionId + '/enrollment';
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }

  unenrollStudentInSection(sectionId) {
    const url = this.STUDENT_SECTION_URL + sectionId + '/enrollment';
    return fetch(url, {
      method: 'delete',
      credentials: 'include'
    });
  }

  unenrollTheStudentInSection(studentId, sectionId) {
    const url = this.STUDENT_SECTION_URL + studentId + '/section/' + sectionId;
    console.log(url);
    return fetch(url, {
      method: 'delete',
      credentials: 'include'
    });
  }

  findSectionsForCourse(courseId) {
    return fetch(this.SECTION_URL.replace('COURSEID', courseId))
      .then(response => response.json());
  }


  // has all crud operation from client
  createSection(courseId, name, maxSeats, seats){
    // console.log(courseId + ' ' + name + ' ' + seats);
    // const section = {
    //   name: name,
    //   seats: seats
    // }
    const section = {courseId, name, maxSeats, seats};
    // post this section
    return fetch(this.SECTION_URL.replace('COURSEID', courseId),{
      method: 'post',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  updateSection(_id, name, maxSeats){
    const section = {_id, name, maxSeats};
    return fetch(this.SECTION_URL_SHORT + _id, {
      method: 'put',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  removeSection(sectionId){
    return fetch(this.SECTION_URL_SHORT + sectionId,{
      method: 'delete',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

}
