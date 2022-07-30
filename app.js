const express = require("express");
const app = express();
const morgan = require("morgan");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const notesRoutes = require("./api/routes/notes");
const categoriesRoutes = require("./api/routes/categories");

//use bodyParser() to let us get the data from a POST

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/10xt", { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect("mongodb://localhost/notes", { useUnifiedTopology: true, useNewUrlParser: true });
//mongoose.connect("mongodb://"+process.env.MONGO_USERNAME+":"+process.env.MONGO_PASSWORD+"@premiership-shard-00-00-6o4uj.mongodb.net:27017,premiership-shard-00-01-6o4uj.mongodb.net:27017,premiership-shard-00-02-6o4uj.mongodb.net:27017/test?ssl=true&replicaSet=premiership-shard-0&authSource=admin&retryWrites=true&w=majority").catch((error) => console.log(JSON.stringify(error)));
// mongoose.connect("mongodb+srv://Nige:anRpxGW8f3C").catch((error) => console.log(JSON.stringify(error)));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use("/notes", notesRoutes);
app.use("/categories", categoriesRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
