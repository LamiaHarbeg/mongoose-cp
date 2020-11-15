const express = require("express");
const app = express();
const router = require("./routes/person");
const connectDB = require("./config/connectDB");

//parse data
app.use(express.json());

//routes
app.use("/persons", router);

//connect database
connectDB();

//run server
const port = process.env.PORT || 8000;
app.listen(port, (err) => {
    err
        ? console.log(err)
        : console.log(`Server is running on port ${port}`);
});
