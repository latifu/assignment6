const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/authentication", {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.log("err message"));
