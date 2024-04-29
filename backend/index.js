import express from 'express'
import mongoose from 'mongoose'
import dotenv from  'dotenv'
dotenv.config()
const app = express() 
mongoose.connect(`mongodb://localhost:27017/MinT_IT_Solution`)
app.use(express.json())
.then(() => {
    console.log("DB Connected Successfully");
    app.listen(() => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err) => console.log(`Couldn't Connect to DB`, err));
