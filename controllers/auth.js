const User = require('../models/user')

exports.getLogin = (req, res, next) => {
  //const isLoggedIn = req.get('Cookie').trim().split('=')[1] === 'true'
 console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });

};

exports.postLogin = (req, res, next) => {
  //res.setHeader("Set-Cookie", "loggedIn=true");
  
  
  User.findById("64037260661294670e02b962")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err)=>{ // usually req.session.save is not required but we use it here to make sure that redirection happens after the session is saved.
        console.log(err);
        res.redirect("/");
      })
      
    })
    .catch((err) => console.log(err));

  
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err)=>{
    console.log(err);
    res.redirect('/')
  })
};
