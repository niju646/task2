import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from './routes/productRoutes.js'


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/products',productRoutes);



const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})