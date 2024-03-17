const express = require("express");
const engine = require("express-handlebars")
const app = express();
const port = 3000;

// app.engine("handlebars", engine());
// app.set("view engine", "handlebars");
// app.set("views", "./views");
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/restaurants")
})

app.get("/restaurants", (req, res) => {
  res.send("restaurants_list")
})

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id
  res.send(`read restaurants id is ${id}`)
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})