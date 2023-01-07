const env = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const app = require("./app");

// environment variable/constant
env.config({ path: "config.env" });
//mongodb conection
mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.zi5sgkl.mongodb.net/Amazona?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      //useCreateIndex: true
    }
  )
  .then((con) => {
    console.log("DB connection successful ");
  });

const PORT = process.env.PORT || 8000;

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
