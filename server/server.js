const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
/// get driver connection

app.listen(port, () => {
    // //perform a adatabase connection when sewrver starts

    console.log(`server is running on port: ${port}`)
    
});