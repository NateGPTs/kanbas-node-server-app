import db from "../database.js";

export function getAssignment(assignmentId) {
  const { assignments } = db;
  return assignments.find((assignment) => assignment._id === assignmentId);
}

export function getAssignmentsByCourse(courseId) {
    const { assignments } = db;
    return assignments.filter(assignment => assignment.course === courseId);
  }

export function deleteAssignment(assignmentId) {
  const { assignments } = db;
  db.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
  return { success: true };
}

export function updateAssignment(assignmentId, assignmentUpdate) {
    const { assignments } = db;
    const assignmentIndex = assignments.findIndex(
      (assignment) => assignment._id === assignmentId
    );
    
    if (assignmentIndex === -1) {
      return null;
    }
    
    // Create a new assignment object with updates
    db.assignments[assignmentIndex] = {
      ...db.assignments[assignmentIndex],
      ...assignmentUpdate
    };
    
    return db.assignments[assignmentIndex];
  }

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: Date.now().toString() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }