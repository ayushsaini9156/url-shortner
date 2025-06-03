import express from "express";

import dotenv from "dotenv";
import connectdb from "./src/config/monogo.config.js";
import { redirectFromShortUrl } from "./src/controllers/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import short_url from "./src/routes/short_url.route.js";
dotenv.config('./.env');
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/create',short_url)
app.get("/:id",redirectFromShortUrl)
app.use(errorHandler);

app.listen(3000,()=>{
    connectdb();
    console.log("Server is running on http://localhost:3000");
    
}) 
//GET - Redirection
//POST = Create short url