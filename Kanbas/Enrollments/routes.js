

export default function enrollments(app) {
app.get("/api/enrollments/:userId", async (req, res) => {
    try {

        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ 
                message: "UserId is required" 
            });
        }
        const nonEnrolledCourses = getNonEnrolledCourses(userId);
        res.json(nonEnrolledCourses);

    } catch (error) {
        // Handle any errors
        console.error("Error getting non-enrolled courses:", error);
        res.status(500).json({ 
            message: "Error getting non-enrolled courses",
            error: error.message 
        });
    }
});
}