const express=require('express');
const Routes=require('./Routes/authRoutes');
const fileUpload=require('express-fileupload');
const cors = require("cors");
const { dbconnect } = require('./Config/databases');
require('dotenv').config();

const app=express();
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.get('/',(req,res)=>{
    res.send("hello from sever")
})

app.use("/api/v1/auth",Routes);

const PORT=process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log("Server is running at PORT ",PORT)
})

dbconnect();