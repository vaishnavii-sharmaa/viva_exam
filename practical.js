const express = require("express");
const app = express();
app.use(express.json());

let students = [];
//post
app.post("/students", (req, res) => {
  const { id, name, marks } = req.body;

  if (!id || !name || marks === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const exists = students.find(s => s.id === id);
  if (exists) {
    return res.status(400).json({ message: "Student already exists" });
  }

  const newStudent = { id, name, marks };
  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});


// for get
app.get("/students", (req, res) => {
  res.json(students);
});


// for put
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, marks } = req.body;

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  if (name) student.name = name;
  if (marks !== undefined) student.marks = marks;

  res.json({
    message: "Student updated successfully",
    student
  });
});


// delete
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1);

  res.json({
    message: "Student deleted successfully",
    student: deletedStudent[0]
  });
});


//server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});