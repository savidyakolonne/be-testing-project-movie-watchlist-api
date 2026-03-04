// const express = require('express');
import express from "express";
import { config } from "dotenv" ; 
import { connectDB, disconnectDB } from "./config/db.js";

//import routes
import movieRoutes from "./routes/movieRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import watchlistRoutes from "./routes/watchlistRoutes.js";

config() ;
connectDB() ; 

const app = express();

// Body parsing middlewears
app.use(express.json());
app.use(express.urlencoded({ extended: true})); // not fully required


//API routes
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes) ; 
app.use("/watchlist", watchlistRoutes) ; 

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

//handle unhanled promise rejections (eg: database connection error)
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async () => {
        await disconnectDB() ;
        process.exit() ;
    });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    server.close(async () => {
        await disconnectDB() ;
        process.exit() ;
    });
});

// Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM recevied. shutting down gracufully");
    server.close(async () => {
        await disconnectDB() ;
        process.exit(1);
    });
})
