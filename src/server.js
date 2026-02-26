// const express = require('express');
import express from "express";
import { config } from "dotenv" ; 

//import routes
import movieRoutes from "./routes/movieRoutes.js"

config() ;

const app = express();

//API routes
app.use("/movies", movieRoutes);

// app.get("/hello", (req, res) => {
//     res.json({message: "Hello World"})
// });

const PORT = 5001 ;
// const server = app.listen(PORT, () => {
//     console.log(`Server running on PORT ${PORT}`);
// }) 
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})


// GET, POST, PUT, DELETE
// http://localhost:5001/hello



