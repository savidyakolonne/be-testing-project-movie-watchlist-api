import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) =>{

    // const { movieId , status, rating, notes, userId } =  req.body ; 
    const { movieId , status, rating, notes } =  req.body ; 

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
        // where: { id: movieId},
        where: {
            userId_movieId : {
                // userId: userId , 
                userId: req.user.id ,
                movieId: movieId ,
            }
        }
    }) ; 

    if(existingWatchlist){
        return res.status(400).json({ error: "Movie already in the watch list"})
    }

    const watchListItem = await prisma.watchListItem.create({
        data: {
            userId: req.user.id , 
            movieId ,
            status : status || "PLANNED" ,
            rating, 
            notes ,
        }, 

    }) ;

    res.status(201).json({
        status: "Success" , 
        data: {
            watchListItem ,
        } ,
    });
};

export { addToWatchlist} ;