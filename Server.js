

const express =require('express');
const app=express();
const helmaet=require('helmet');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmaet());



  Const  VALIDATION_ERROR= 400;
  const  UNAUTORIZED= 401;
  const   FORBIDDEN= 403;
    const  NOT_FOUND =404;
   const SERVER_ERROR 500;




//express

//Db connection

mongoose.connect("mongodb://localhost:27017/projectone", {

useNewUrlParser: true,
useUnifiedTopology: true,
serverSelectionTimeoutMS: 5000,
autoIndex: false, // Don't build indexes
maxPoolSize: 10, // Maintain up to 10 socket connections
serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
family: 4 // Use IPv4, skip trying IPv6

}
)
.then(() => console.log("connected"))
.catch(() => console.log("could not connect to mongodb"))


//user schema


const userschema  =mongoose.Schema({
    first_name:{type:String ,required :true ,lawercase :true }
    ,last_name:{type:String ,required :true ,lawercase :true }
    ,email:{type:String ,required :true  }
    
    });
    
// Error handler Function  
const errorhandler = (err, req, res, next) => {

    const StatusCode = req.StatusCode ? res.StatusCode : 500;
    switch (StatusCode) {

        case constants.VALIDATION_ERROR:{
            res.json({ title: 'validation failed', message: err.message, stackTrace: err.stack });
            break;}
        case constants.UNAUTORIZED:{
            res.json({ title: 'autorize failed', message: err.message, stackTrace: err.stack });
            break;}
        case constants.FORBIDDEN:{
            res.json({ title: 'forbidden failed', message: err.message, stackTrace: err.stack });
            break;}
        case constants.NOT_FOUND:{
            res.json({ title: 'not found failed', message: err.message, stackTrace: err.stack });
            break;}
        case constants.SERVER_ERROR:{
            res.json({ title: 'server err failed', message: err.message, stackTrace: err.stack });
            break;}
        default:
            console.log('no err');


    }

}


// Erorr hndler midlwear 
app.use(errorhandler);
    



//validation
const { body, validationResult } = require("express-validator");


//Get All Data
app.get("/", async (req, res) => {
  const users = await this.User.find();
  res.json({
    data: users,
    massege: "ok",
  });
});

//Get one Data
app.get("/:id", async (req, res) => {
  const name = await this.User.findById(req.params.id);
  //const name = users.find((u)=> u.id==req.params.id);
  if (!name) return res.json({ data: null, massege: "undifaine user name " });
  res.json({
    Data: name,
    massege: "ok",
  });
});


//Create Data
app.post(
  "/",
  [body("email", "email must be valid").isEmail()],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        data: null,
        error: error.array(),
        message: "validation error ",
      });
    }
    let newUser = new this.User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    });

    newUser = await newUser.save();
    res.json({
      data: newUser,
      massege: "Add new user",
    });
  }
);


//Update Data
app.put(
  "/:id",
  [body("email", "email must be valied ").isEmail()],

  async (req, res) => {
    //const user=users.find((u)=>u.id==req.params.id);
    const user = await this.User.findByIdAndUpdate(
      req.params.id,
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
      },
      { new: true }
    );
    if (!user)
      return res
        .status(400)
        .json({ data: null, massege: "this  user  is not exist " });
    const er = validationResult(req);
    if (!er.isEmpty()) {
      return res
        .status(400)
        .json({ data: null, error: er.array(), massege: "validation error " });
    }
    res.json({ data: req.body, massege: "ok" });
  }
);


//Delete data

app.delete("/:id", async (req, res) => {
  //const user =users.find((u)=> u.id == req.params.id);
  const user = await this.User.findOneAndDelete(req.params.id);
  if (!user) {
    return res.status(400).json({ data: null, masseges: "not found" });
  }
  //const index=users.indexOf(user);
  // users.splice(index,1);
  res.json({ data: user, massege: "the user is  deleted by admin" });
});









app.listen(3000,()=>console.log('listaning '));
