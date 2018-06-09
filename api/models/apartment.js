const mongoose=require('mongoose');

const apartmentSchema=mongoose.Schema({
     
       email:{
            type:String,
            required: true
        },
        price:{
            type:Number,
           
            required: true
        },
        type:{
            type:String,
            required: true
        },
        bed:{
            type:String,
            required: true
        },

        bath:{
            type:String,

            required: false
        },

        apartmentNumber:{
            type:String,
            required: true
        },
        Street:{
            type:String,
            required: true
        },
        address:{

            type:String,
            required:false
        },
        zip:{
            type:String,
            required:false
        },
        sqfeet:{
            type:String,
            required:false
        },

        imgsrc1:{
            type:String,
            required: true
        },
        imgsrc2:{
            type:String,
            required: true
        },
        imgsrc3:{
            type:String,
            required: true
        },
        imgsrc4:{
            type:String,
            required: true
        },

        city:{
            type:String,
            required: true
        },
        state:{
            type:String,
            required: true
        },

        zip:{
            type:String,
            required: true
        },
        category:{
            type:String,
            required: true
        },
        uploadDate:{
            type: Date, 
            default: Date.now
        }
});

const Apartment= module.exports=mongoose.model('Apartment',apartmentSchema);


// writing query to fetch apartments by username

module.exports.getApartmentByUserName=function(email,callback){
    console.log('database  ' +email);
    const query={email:email};
    Apartment.find(query,callback);
}

//writing query to sort by upload date
module.exports.getApartmentsByUploadDate=function(uploadDate,callback){
//const query={uploadDate:uploadDate};
Apartment.find().sort({uploadDate:1},callback);
}
