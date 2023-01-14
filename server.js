const dotenv = require("dotenv");
dotenv.config();
const dbConnection = require("./dbConnect/config");
dbConnection();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const authRoute = require("./routes/auth");
const productRoute = require("./routes/products");
app.use("/auth", authRoute);
app.use("/", productRoute);
 

const port = process.env.PORT || 8000;
app.listen(port , (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`Server running at port ${port}`);
    }
});