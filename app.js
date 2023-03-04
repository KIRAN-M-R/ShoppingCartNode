const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");

const User = require("./models/user");

const app = express();
dotenv.config();
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("64037260661294670e02b962")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.CONNECTION_URL).then((result)=>{
  User.findOne().then(user => {
    if(!user){
      const user = new User({
    name: 'Max',
    email: 'Max@max.com',
    cart: {
      items: []
    }
    
  })
  user.save()
    }
  })
  
  app.listen(3000);
  console.log('connected');
}).catch(err =>{
  console.log(err);
})
