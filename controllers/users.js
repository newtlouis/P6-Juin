const User = require ('../models/User.js');


exports.signup = (req,res,next) => {
    bcrypt.hash(req.body.password,10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                paswword: hash
            });
            user.save()
                .then(()=> res.status(201).json({message:'Bienvenue, votre compte à bien été crée.'}))
                .catch(err => res.status(400).json({err}))
        })
        .catch(err => res.status(500).json({err}));
};

exports.login = (req,res,next) => {
    User.findOne({email : req.body.email})
        .then( user => {
            if (!user) {return res.status(401).json({message:'Utilisateur non trouvé'})}
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {return res.status(401).json({message:'mot de passe incorrect'})}
                        else {res.status(200).json({
                            userId: user._id,
                            token: 'TOKEN'
                        })}
                    })
                    .catch(err => res.status(500).json({err}))
             }
        }

        )
        .catch(err => res.status(500).json({err}))
};