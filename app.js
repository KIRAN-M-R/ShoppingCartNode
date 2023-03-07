const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session)

const errorController = require("./controllers/error");

const User = require("./models/user");

const app = express();
dotenv.config();
const store = new MongoDbStore({
  uri: process.env.CONNECTION_URL,
  collection: 'sessions'
})
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

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
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(process.env.CONNECTION_URL)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Max",
          email: "Max@max.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(3000);
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
