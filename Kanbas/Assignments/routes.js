import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {

    app.get("/api/assignments/course/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const assignments = await dao.getAssignmentsByCourse(courseId);
        res.json(assignments);
      });
      
      app.delete("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const status = await dao.deleteAssignment(assignmentId);
        res.json(status);
      });
      
      app.put("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdate = req.body;
        const status = await dao.updateAssignment(assignmentId, assignmentUpdate);
        res.json(status);
      });
      
      app.post("/api/assignments", async (req, res) => {
          const assignment = req.body;
          const status = await dao.createAssignment(assignment);
          res.json(status);
      });


}
