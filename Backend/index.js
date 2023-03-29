const express = require("express");
const { connection } = require("./config/db");
require("dotenv").config()
const cors = require("cors")
const app = express();
const {userRouter} = require("./routes/user.route");
const { productRouter } = require("./routes/product.route");

app.use(express.json());
app.use(cors());


app.use("/users",userRouter)
app.use("/products",productRouter)





app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("Connection established with DB")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`Server is running on port ${process.env.port}`)
})