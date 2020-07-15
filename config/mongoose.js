const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/login-boilerplate',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log('connected to mongodb')
}).catch((e)=>{
    console.log(e)
})