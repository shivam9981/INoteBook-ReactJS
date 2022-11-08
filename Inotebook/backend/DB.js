const mongoose = require('mongoose');

const mongo = 'mongodb+srv://inotebook:shivam@cluster0.4pmrn.mongodb.net/?retryWrites=true&w=majority';

const connectTomongodb = ()=>{
    try{
        console.log("done")
        mongoose.connect(mongo,{
            useNewUrlparser: true,
            useUnifiedTopology: true,
            
        }),
            console.log("connect To database")
    }
    catch(err){
        console.log("error occure")
        console.log(error);
    }
}

module.exports =  connectTomongodb;