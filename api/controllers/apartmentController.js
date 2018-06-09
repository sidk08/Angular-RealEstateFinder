const mongoose = require('mongoose');


var Apartment = require('../models/apartment');

module.exports={



    getSingleApartment: (req, res) => {
        Apartment.findOne({ _id: req.params.id })
        .populate('user_name', 'user_name')
        .exec((err, result) => {
            if (err)
                res.status(400).send(err);
            else
                res.status(200).json(result);
        });
    },

    filterProperties: (req, res) => {
        // console.log('propertyFor ', req.query.propertyFor, typeof req.query.propertyFor);
        //console.log(req.query.user_name);        
        var query = {};
        // query['isActive'] = true;
      //  query1 =  {$lt : req.query.price_max};
        
       
      //  userquery={$sw:req.query.user_name};
       // if (req.query.user_name)
         //   query['user_name'] =  req.query.user_name 
        //   query['user_name'] = userquery
        if (req.query.type)
            query['type'] =  req.query.type 
        if (req.query.bed)
            query['bed'] =  req.query.bed
        if (req.query.bath)
            query['bath'] = req.query.bath
        if (req.query.price)
            {
                var min =req.query.price.split(',');
                query['price']={$lt : min[0],$gt:min[1]};
                console.log(min);
          //  query['price'] =  query1
            }
           // if (req.query.sqfeet)
            //{
                //var sq =req.query.sqfeet.split(',');
                //query['sqfeet']= req.query.sqfeet;//{$lt : sq[0],$gt:sq[1]};
               // console.log(sq);
          //  query['price'] =  query1
          //  }
       /* if(req.query.address){

            query['address']={$regex :req.query.address};
            //"$or": [ { "status": "A" } ,{ "age": 50 } ]
           // query['q']={$or: [{ "address": req.query.address } ,{ "zip": req.query.address } ]};

        }*/
        if(req.query.address){

            //  query['address']={$regex :req.query.address};
              //"$or": [ { "status": "A" } ,{ "age": 50 } ]
             // query['q']={$or: [{ "address": req.query.address } ,{ "zip": req.query.address } ]};
  
             query['$or'] =  [{ "address": {$regex :req.query.address}} ,{ "zip": req.query.address } ]; //{$regex :req.query.address}
  
          }
        //query="{ $or: [ { 'address': 'boston' } ,{'zip': '124' } ] }";
           
            console.log(query);  
            Apartment.find(query)
         .exec((err, result) => {
            if (err)
                res.status(400).json(err);
            else
                res.status(200).json(result);
        });
    }
}
