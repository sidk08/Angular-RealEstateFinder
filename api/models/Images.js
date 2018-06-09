const mongoose=require('mongoose');

const imageSchema=mongoose.Schema({


    parentImage :{
        type: String,
        required :true
    },

    img1: { 
        data: Buffer, 
        contentType: String 
    }


    
})

const Image= module.exports=mongoose.model('Images',imageSchema);
