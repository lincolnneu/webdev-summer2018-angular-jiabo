export class SectionServiceClient {
  SECTION_URL = 'http://localhost:4000/api/course/COURSEID/section';

  findSectionsForStudent(){
    const url = 'http://localhost:4000/api/student/section';
    return fetch(url,{
      credentials: 'include' // pass in the credentials
    })
      .then(response => response.json());

  }


  enrollStudentInSection(sectionId) {
    const url = 'http://localhost:4000/api/section/' + sectionId + '/enrollment';
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }

  unenrollStudentInSection(sectionId) {
    const url = 'http://localhost:4000/api/section/' + sectionId + '/unenrollment';
    return fetch(url, {
      method: 'post',
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

}
