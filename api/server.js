const express = require("express");
const app = express();
const db = require("./config/db");
const routes = require("./routes");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.use((req, res) => {
  res.sendFile(__dirname + "/build/index.html");
}); */

app.use(cookieParser()); // popula req.cookies
app.use(session({ secret: "bootcamp" })); // popula req.session
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

app.use("/api", (req, res) => {
  res.sendStatus(404);
});

// error middleware -> https://expressjs.com/es/guide/error-handling.html
app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);
});

db.sync({ force: false })
  .then(function () {
    // Recién ahora estamos seguros que la conexión fue exitosa
    app.listen(3001, () =>
      console.log("Servidor escuchando en el puerto 3001")
    );
  })
  .catch((error) => console.log("ERR", error));
