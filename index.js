const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const errorHandler = require("./medalwear");
const core=require('core-js');
const multer = require("multer");

const firebase = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const firebaseconfig = {
  apiKey: "AIzaSyDWSREByLYJ1l43Sn5jbOj8DNtb-nuYVgA",
  authDomain: "imgapi-c13f7.firebaseapp.com",
  projectId: "imgapi-c13f7",
  storageBucket: "imgapi-c13f7.appspot.com",
  messagingSenderId: "836387093867",
  appId: "1:836387093867:web:fd341dc0c0b94217a8a02e",
  measurementId: "G-14WGG50KWH",
};
// Initialize Firebase
firebase.initializeApp(firebaseconfig);
const storage = getStorage();

const upload = multer({
  storage: multer.memoryStorage(),
});

const connectDB = async () => {
  await mongoose
    .connect("mongodb+srv://App_user:DLFypDJWTx8fEI6F@cluster0.c7mtudb.mongodb.net/?retryWrites=true&w=majority")}
    // , {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   serverSelectionTimeoutMS: 5000,
    //   autoIndex: false, // Don't build indexes
    //   maxPoolSize: 10, // Maintain up to 10 socket connections
    //   serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    //   family: 4, // Use IPv4, skip trying IPv6
    


const startserver = () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  
  // app.use((req, res, next) => {
  //   res.header("access-control-allow-origin", "*");
  //   res.header(
  //     "access-control-allow-headers",
  //     "Origin,X-Requested-With,Content-Type,Accept"
  //   );
  //   next();
  // });
  app.use(express.json());
  app.use(errorHandler);
  

  const rtaschema = new mongoose.Schema({
    title: { type: String },

    desc: { type: String },
    news: { type: Boolean, default: false },
    vid: { type: String },
  });
  const imgapi = mongoose.model("imgapi", rtaschema, "imgapi");

  ///

  app.post("/", upload.single("imgfile"), async (req, res) => {
    try {
      if (req.file) {
        const storageref = ref(storage, req.file.originalname);
        uploadBytes(storageref, req.file.buffer).then((snapshot) => {
          getDownloadURL(storageref).then(async (url) => {
            const newuser = await imgapi.create({
              title:req.body.title,
              desc:req.body.desc,
              vid: url,
              news: false,
            });
            if (newuser) {
              res.status(200).json(newuser);
            }
          });
        });
      } else {
        const { title, desc } = req.body;
        const newuser = await imgapi.create({ 
          title:req.body.title,
              desc:req.body.desc, 
          news: true });
        if (newuser) {
          res.status(200).json(newuser);
        }
      }
    } catch (err) {
      console.log(err);

      // res.send(err).status(500);
    }
  });

  app.get("/", async (req, res) => {

    let users = await imgapi.find({});
    // res.render('user',{users:users,title:"همه کاربران"});
    res.status(200).json({ data: users });
  });

  app.get("/:id", async (req, res) => {
    let user = await imgapi.findById(req.params.id);
    res.json({ data: user });  });

  //
  //UPDATE USER
  app.put("/:id", async (req, res) => {
    try {
      const fuser = await imgapi.findById(req.params.id);
      if (!fuser) {
        //  throw new Error('user not found');
        res.json({ msg: "user not found" }).status(404);
        throw new Error("user not found");
      } else {
        const updeteduser = await imgapi.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        res.json(updeteduser).status(200);
      }
    } catch (er) {}
  });

  //for uploading image

  // DELETE USER
  app.delete("/:id", async (req, res) => {
    await User.deleteOne({ _id: req.params.id });
    //        return res.redirect('/api/users');
    res.json({ msg: "The user is deleted" }).status(200);
  });

  app.listen(port, () => {
    console.log("sever is running ");
  });
};

try {
  connectDB().then(() => {
  
    startserver();
  });
} catch (er) {
  console.log(er);
}
