const express = require("express");
const students = require("./students");

const app = express();
app.use(express.json()); // parse req  of content type application/json.
app.use(express.urlencoded({extended : true})) // parse req  of content type application/urlencoded.

app.listen(3000, () => {
  console.log("listening on port 3000");
});

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.post('/students', (req, res) => {
    // console.log(req.body);
  if (!req.body.email) {
    return res.status(400).json({ error: "email is required..." })
  }
  const user = {
    id: students.length + 1,
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email
  }

  students.push(user);
   return res.status(201).json({ success: true, data: user });
  //   res.send("students post request is working");
});

app.put("/students", (req, res) => {
  let id = req.body.id;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;

  const index = students.findIndex((student) => {
    return student.id == Number.parseInt(id);
  });
  if (index > 0) {
    const std = students[index];
    std.last_name = last_name;
    std.first_name = first_name;
    std.email = email;
    res.json(std);
  } else {
    res.status(404);
  }

  //   console.log(id);
  //   res.json(id);
});

app.delete("/students", (req, res) => {
  let id = req.body.id;
  let index = students.findIndex((student) => {
    return student.id == Number.parseInt(id);
  });

  if (index >= 0) {
    let std = students[index];
    students.splice(index, 1);
    res.json(std);
  } else {
    res.status(404);
    res.end();
  }
});

app.options("/students", (req, res) => {
  res.setHeader("Allow", "GET, POST, PUT, DELETE, OPTIONS");
  res.status(200).end();
});
