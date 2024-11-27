import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";


export default function UserRoutes(app) {

const createCourse = (req, res) => {
      const { userId } = req.params;
        const newCourse = courseDao.createCourse(req.body);
        enrollmentsDao.enrollUserInCourse(userId, newCourse._id);
        res.json(newCourse);
};
app.post("/api/courses/:userId", createCourse);  

  const createUser = (req, res) => { 
  };

  const deleteUser = (req, res) => { };
  const findAllUsers = (req, res) => { };
  const findUserById = (req, res) => { };
  const updateUser = (req, res) => {
    try {
      const userId = req.params.userId;
      const userUpdates = req.body;
      
      console.log("Updating user:", userId);
      console.log("With updates:", userUpdates);
      
      // Update the user
      dao.updateUser(userId, userUpdates);
      
      // Get the updated user
      const updatedUser = dao.findUserById(userId);
      console.log("Updated user:", updatedUser);
      
      // Update the session
      req.session["currentUser"] = updatedUser;
      
      // Send response
      res.json(updatedUser);
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const signup = (req, res) => { 
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  
  const signin = (req, res) => {
    const { username, password } = req.body;
    console.log("Signin attempt:", { username, password });
   
    const currentUser = dao.findUserByCredentials(username, password);
    console.log("Found user:", currentUser);
   
    if (currentUser) {
        // Store user in session and force save
        req.session.currentUser = currentUser;
        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ message: "Session save failed" });
            }
            console.log("Session saved with ID:", req.sessionID);
            console.log("Final session state:", {
                id: req.sessionID,
                currentUser: req.session.currentUser,
                cookie: req.session.cookie
            });
            res.json(currentUser);
        });
    } else {
        res.status(401).json({ message: "Unable to login" });
    }
};


  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const findCoursesForEnrolledUser = (req, res) => {
    try {
        console.log("\n=== Course Fetch Request ===");
        console.log("1. Request received at:", new Date().toISOString());
        
        const { userId } = req.params;
        console.log("2. URL userId parameter:", userId);

        if (!userId) {
            console.log("3. No user ID provided");
            return res.status(400).json({ error: "User ID required" });
        }

        console.log("4. Finding courses for user:", userId);
        const courses = courseDao.findCoursesForEnrolledUser(userId);
        console.log("5. Found courses:", courses);
        
        res.json(courses);
        console.log("=== Request Complete ===\n");
    } catch(error) {
        console.error("Server error:", error);
        res.status(500).json({ error: error.message });
    }
};

  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
