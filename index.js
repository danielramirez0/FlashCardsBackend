const connectDB = require("./startup/db");
const express = require("express");
const app = express();
const flashCards = require("./routes/flashCards");
// const users = require("./routes/users");

connectDB();

app.use(express.json());
app.use("/api/flashCards", flashCards);
// app.use("/api/users", users);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
