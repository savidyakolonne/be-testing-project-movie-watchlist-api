import { prisma } from "../config/db";

const addToWatchlist = async (req, res) =>{

    const { movieId , status, rarting, notes } =  req.body ; 

    //verify movie exists
    const movie = await prisma.movie.findUnique({
        where: { id: movieId},
    });

    if (!movie) {
        return res.status(404).json({
            error: "Movie not found"
        }) ; 
    }

    //check if already added 
    const existingWatchlist = await prisma.watchListItem.findUnique({
        where: { id: movieId},
    }) ; 

};