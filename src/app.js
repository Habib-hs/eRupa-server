const express = require("express");
const app = express();

//routes
const userRouter = require("./routes/userRouter.js");

//middlewares
app.use(express.json()); 

//for home route
app.get("/", (req, res) => {
    res.json({ msg: "Welcome to my Dream Site" });
  });

//for all other routes
app.use("/api/v1/", userRouter);

 // common Error Middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

module.exports = app;