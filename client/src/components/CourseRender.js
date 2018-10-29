import React, { Component } from 'react'
import SemesterResult from './semester/SemesterResult';

class CourseRender extends Component {

  
  render() {

    const {courses,onDelete,flag} = this.props;

    

    let content;

    let firstSemester = courses.filter(
        course => course.semester === "First"
      );
      let secondSemester = courses.filter(
        course => course.semester === "Second"
      );
      let thirdSemester = courses.filter(
        course => course.semester === "Third"
      );
      let fourthSemester = courses.filter(
        course => course.semester === "Fourth"
      );
      let fivethSemester = courses.filter(
        course => course.semester === "Fivth"
      );
      let sixthSemester = courses.filter(
        course => course.semester === "Sixth"
      );
      let seventhSemester = courses.filter(
        course => course.semester === "Seventh"
      );
      let finalSemester = courses.filter(
        course => course.semester === "Final"
      );

      content = (
          <div>
              {firstSemester.length !== 0 ? (
                <SemesterResult
                  semesterName="First"
                  course={firstSemester}
                  flag={flag}
                  courseDisplay={true}
                  onDelete={onDelete}
                />
              ) : (
                ""
              )}
              {secondSemester.length !== 0 ? (
                <SemesterResult
                  semesterName="Second"
                  course={secondSemester}
                  flag={flag}
                  courseDisplay={true}
                  onDelete={onDelete}
                />
              ) : (
                ""
              )}
              {thirdSemester.length !== 0 ? (
                <SemesterResult
                  semesterName="Third"
                  course={thirdSemester}
                  flag={flag}
                  courseDisplay={true}
                  onDelete={onDelete}
                />
              ) : (
                ""
              )}
              {fourthSemester.length !== 0 ? (
                <SemesterResult
                  semesterName="Fourth"
                  course={fourthSemester}
                  flag={flag}
                  courseDisplay={true}
                  onDelete={onDelete}
                />
              ) : (
                ""
              )}
              {fivethSemester.length !== 0 ? (
                <SemesterResult
                  semesterName="Fivth"
                  course={fivethSemester}
                  flag={flag}
                  courseDisplay={true}
                  onDelete={onDelete}
                />
              ) : (
                ""
              )}
              {sixthSemester.length !== 0 ? (
                <SemesterResult
                  semesterName="Sixth"
                  course={sixthSemester}
                  flag={flag}
                  courseDisplay={true}
                  onDelete={onDelete}
                />
              ) : (
                ""
              )}
              {seventhSemester.length !== 0 ? (
                <SemesterResult
                  semesterName="Seventh"
                  course={seventhSemester}
                  flag={flag}
                  courseDisplay={true}
                  onDelete={onDelete}
                />
              ) : (
                ""
              )}
              {finalSemester.length !== 0 ? (
                <SemesterResult
                  semesterName="Final"
                  course={finalSemester}
                  flag={flag}
                  courseDisplay={true}
                  onDelete={onDelete}
                />
              ) : (
                ""
              )}
          </div>
      )

    return (
      <div>
        {content}
      </div>
    )
  }
}


export default CourseRender;