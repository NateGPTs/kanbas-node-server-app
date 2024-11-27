import Database from "../database.js";

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}

export function getNonEnrolledCourses(userId) {
  const { courses, enrollments } = Database;
  
  // Filter courses to find ones where user is NOT enrolled
  const nonEnrolledCourses = courses.filter((course) =>
    // Return true if user has NO enrollment for this course
    !enrollments.some((enrollment) => 
      enrollment.user === userId && 
      enrollment.course === course._id
    )
  );
  
  return nonEnrolledCourses;
}

