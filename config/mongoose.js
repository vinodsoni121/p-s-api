const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/polling-system-api');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error connecting'));

//cheack succesfull running
db.once('open',function(){
    console.log("successfully running");
})

module.exports=db;

