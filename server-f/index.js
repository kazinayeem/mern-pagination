const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const TodoSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  data: {
    default: new Date(),
    type: String,
  },
});

const TodoModel = mongoose.model("todo", TodoSchema);

app.get("/", async (req, res) => { 
  const pageNumber = parseInt(req.query.pageNumber) ||0;
  const limit = parseInt(req.query.limit);
  try {
    const total = await TodoModel.countDocuments();
    const data = await TodoModel.find({})
      .limit(limit)
      .skip(pageNumber * limit - pageNumber);

    res.send({
      data,
      total,
    });
  } catch (error) {
    res.send(error);
  }
});

app.post("/", async (req, res) => {
  const { title, description } = req.body;
  try {
    const newtodo = new TodoModel({
      title: title,
      description: description,
    });

    await newtodo.save();
    res.status(200).send("data insert successfull");
  } catch (error) {
    res.send(error);
  }
});

app.listen(3030, () => {
  console.log("server is running");
  mongoose
    .connect("mongodb://127.0.0.1:27017/todo")
    .then(() => {
      console.log("database is connected");
    })
    .catch((e) => {
      console.log(e);
    });
});
