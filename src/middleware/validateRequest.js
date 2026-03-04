// export const validateRequest = (schema) => {
//     return (req, res, next) => {
//         const result = schema.safeParse(req.body) ;

//         if(!result.success){
//             const errorMessages = result.erros.errors.map((err) => err.message)
//             const error = errorMessages.join(", ") ;
//             return res.status(400).json({
//                 message: error
//             });
//         }

//         next() ;
//     }; 
// };

//new latest one with the zod documentation

export const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body) ;

        if(!result.success){

            const formatted = Object.values(formatted)
                .flat()
                .filter(Boolean)
                .map((err) => err._errors )
                .flat() ;

            console.log(flatErrors) ;

            return res.status(400).json({
                message: flatErrors.join(", ")
            });
        }

        next() ;
    }; 
};