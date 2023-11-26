const mongoose= require('mongoose');
const { blob } = require('stream/consumers');
const { boolean } = require('webidl-conversions');
mongoose.connect('mongodb://localhost:27017/mongoproject',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
    
})
.then(()=>console.log('connected to mongodb'))
.catch((err)=>console.log('could not connect to mongo db',err))

const userschema =new mongoose.Schema({

First_name:String,
Last_name: {type:String ,requierd:true},
Faverat:[String],
Date:{type:Date,default:Date.now},
sstate :{type:Boolean ,default:false}


});
const User= mongoose.model('user',userschema);
 //createuser 
async function creatuser(name ,lastname ,status ,[]){
const ur=new User({

    First_name:name,
    Last_name:lastname,
    Faverat:[],
    sstate:status

});

try {
const result= await ur.save();
console.log(result);
}
catch (ex ){
console.log(ex);

}

}

//update user
async function updateuser(id){

    const user =await User.findById(id);
//const  user=await User.findOne(id);
  //  const user=await User.find({_id:id});
  if(!user) return;
  user.set({
    First_name:'updated',
    sstate: true
  });
await user.save();

}


//get user
async function getUser(){

    const pagenumeber=1;
    const pagesize=8;



const user=await User.find().select({First_name:1,Last_name:1}).sort({Last_name:1}).limit(20);

console.log(user);


}
// Delete user
async function removeuser(id){

//const result=    await User.deleteOne({_id:id})
const deltetmany =await User.deleteMany({admin:true});
console.log(result);


}

//update user
async  function updateusermethod2(id){
const result= await User.findByIdAndUpdate({_id:id},{$set:{
    First_name:'update 2'
    ,Last_name:'update2'
}});

console.log(result);

}
//updateusermethod2("6509617c329e079b45636cb8");

//getUser();

//updateuser('650961880a853d2dd13ef413');

//creatuser('ali','pamirbsa','true',['sport ','footbal']);


 
//removeuser("650961880a853d2dd13ef413");

