const Thing = require("../models/Thing");

exports.like = (req,res,next) => {
    // Récuptération Id sauce
    idSauce = req.baseUrl.split("/")[3];
    // console.log(idSauce);

                        
            // Si c'est un like
            if (req.body.like == 1) {



                Thing.updateOne({_id : idSauce},
                    {
                        $push:{usersLiked: req.body.userId},
                        $inc : {likes : +1}
                    }
                  
                    )
                .then(() => res.status(200).json({message : 'sauce aimée'})                        )
                .catch(err => res.status(400).json({err}))

                
                }    

                
                
            // Si c'est un dislike
            if (req.body.like == -1) {
                Thing.updateOne({_id : idSauce},
                    {
                        $push:{usersDisliked: req.body.userId},
                        $inc : {dislikes : +1}
                    }
                    )
                .then(() => res.status(200).json({message : 'sauce pas aimée'}))
                .catch(err => res.status(400).json({err}))

              
                }
               

            // Si c'est une annulation
            if (req.body.like == 0) {


                Thing.findOne({_id : idSauce})                    
                .then(sauce => {

                    if (sauce.usersDisliked.includes(req.body.userId)) {
                    var liste = sauce.usersDisliked;
                    var newListe = liste.pop();
                    // console.log(newListe);

                    Thing.updateOne({_id : idSauce},
                        {
                            $set:{usersDisliked: newListe},
                            $inc : {dislikes : -1}
                        }
                        )
                    .then(() => res.status(200).json({message : 'sauce sans avis'}))
                    .catch(err => res.status(400).json({err}))
                    }
                    else {
                        var liste = sauce.usersLiked;
                        var newListe = liste.pop();
                        // console.log(newListe);

                         Thing.updateOne({_id : idSauce},
                        {
                            $set:{usersLiked: newListe},
                            $inc : {likes : -1}
                        }
                        )
                        .then(() => res.status(200).json({message : 'sauce sans avis'}))
                        .catch(err => res.status(400).json({err}))
                    }
                    }
                
                )                        
                .catch((err) => res.status(400).json({err}));

                

               
                }

      
        
       
        
    
}