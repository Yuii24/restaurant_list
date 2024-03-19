const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const restaurants = require("./public/json/restaurant.json").results;

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
  const keyword = req.query.keyword?.trim();
  console.log("keyword", keyword);
  const matchRest = keyword ? restaurants.filter((mv) =>
    Object.values(mv).some((property) => {
      if (typeof property === "string") {
        return property.toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
  ) : restaurants
  res.render("index", { restaurants: matchRest, keyword })
})

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((mv) => mv.id.toString() === id)
  res.render("show", { restaurant })
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})