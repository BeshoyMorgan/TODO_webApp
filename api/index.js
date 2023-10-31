
const express = require("express"); 
const app = express();
var cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const usersRoutes = require("./routes/user");


const mongoURL=  "mongodb+srv://beshoymorgan4:dayra@cluster0.udszcr7.mongodb.net/";


const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURL);
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.log(error);
  }
};
connectToMongo();
app.use(express.json());

app.use(cors({}));

app.use("/users", usersRoutes);

//not found middleware
app.use("*", (req, res, next) => {
  res.status(404).json({ message: "not found path" });
});

//error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: "server error" });
});

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
