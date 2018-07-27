export class SectionServiceClient {
  SECTION_URL = 'http://localhost:4000/api/course/COURSEID/section';

  enrollStudentInSection(sectionId) {
    const url = 'http://localhost:4000/api/section/' + sectionId + '/enrollment';
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
  createSection(courseId, name, seats){
    // console.log(courseId + ' ' + name + ' ' + seats);
    // const section = {
    //   name: name,
    //   seats: seats
    // }
    const section = {courseId, name, seats};
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
