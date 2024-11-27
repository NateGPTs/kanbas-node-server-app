import * as modulesDao from "./dao.js";
export default function ModuleRoutes(app) {

  app.put("/api/modules/:moduleId", async (req, res) => {
        const { moduleId } = req.params;
        const moduleUpdates = req.body;
        const status = await modulesDao.updateModule(moduleId, moduleUpdates);
        res.send(status);
    });
 app.delete("/api/modules/:moduleId", async (req, res) => {
   const { moduleId } = req.params;
   const status = await modulesDao.deleteModule(moduleId);
   res.send(status);
 });

 app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
        const { courseId } = req.params;
        console.log("Backend: Fetching modules for course:", courseId);
        
        const modules = await modulesDao.findModulesForCourse(courseId);
        console.log("Backend: Found modules:", modules);
        
        res.json(modules);
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ error: error.message });
    }
});



}
