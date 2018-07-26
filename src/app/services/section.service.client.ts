export class SectionServiceClient{
  SECTION_URL = 'http://localhost:4000/api/course/COURSEID/section';

  // has all crud operation from client
  createSection(courseId, name, seats){
    console.log(courseId + ' ' + name + ' ' + seats);
    // const section = {
    //   name: name,
    //   seats: seats
    // }
    const section = {name, seats};
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
