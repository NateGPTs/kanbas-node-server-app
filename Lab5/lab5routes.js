
let todos = [
    { id: 1, title: "Task 1", completed: false, description: "Description 1" },
    { id: 2, title: "Task 2", completed: true, description: "Description 2" },
    { id: 3, title: "Task 3", completed: false, description: "Description 3" },
    { id: 4, title: "Task 4", completed: true, description: "Description 4" }
];

export default function lab5routes(app) {
let module = {
    id: "123",
    name: "Web Development",
    description: "Full Stack Development",
    course: "CS5610"
};

app.get("/lab5/module", (req, res) => {
    res.json(module);
});

app.get("/lab5/module/name", (req, res) => {
    res.json(module.name);
});

app.get("/lab5/module/description/:description", (req, res) => {
    module.description = req.params.description;
    res.json(module);
});

app.get("/lab5/module/name/:name", (req, res) => {
    module.name = req.params.name;
    res.json(module);
});

app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
        todo.completed = completed === "true";
        res.json(todos);
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
});

// Update todo description
app.get("/lab5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
        todo.description = description;
        res.json(todos);
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
});


}