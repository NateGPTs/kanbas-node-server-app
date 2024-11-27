import * as dao from "./dao.js";
import * as courseDao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
export default function CourseRoutes(app) {

  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });

  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });



  const deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      await courseDao.deleteCourse(courseId);
      res.json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(500).json({ message: "Error deleting course" });
    }
  };
  
  app.delete("/api/courses/:courseId", deleteCourse);
  
  const updateCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      await courseDao.updateCourse(courseId, req.body);
      res.json({ message: "Course updated successfully" });
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(500).json({ message: "Error updating course" });
    }
  };


  app.put("/api/courses/:courseId", updateCourse);
  

  


}
