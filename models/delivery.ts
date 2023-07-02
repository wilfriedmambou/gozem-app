const mongoose = require('mongoose');
const Joi = require('joi');
const {} =require ('./package')
import { Schema, model, connect } from 'mongoose';

interface DeliveryInterface {
  delivery_id:string,
  package_id:string,
  pickup_time:string,
  start_time:string,
  end_time:string,
  location:object,
  status: {
    required:true,
    type: String,
    enum : ['open','picked-up','in-transit','delivered','failed'],
    default: 'open'
},
}
const DeliverySchema = model <DeliveryInterface> ('Delivery', new  Schema <DeliveryInterface>({
  delivery_id: { type: String },
  package_id: { type: String, required: true },
  pickup_time: { type: String, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  location: { 
    lat :{type: Number, required: true },
    lng :{type: Number, required: true },
    
  },
  status: {
    type: String,
    enum : ['open','picked-up','in-transit','delivered','failed'],
    default: 'open'
},


  
}));


function ValidateDelivery(delivery:any) {
  const schema = {
    delivery_id:Joi.string(),
    package_id:Joi.string().required(),
    pickup_time:Joi.string().required(),
    start_time:Joi.string().required(),
    end_time:Joi.string().required(),
    location:Joi.object().keys({ 
    lat:Joi.string().required(),
    lng:Joi.string().required(),
      }),
    status:Joi.string().valid('open','picked-up','in-transit','delivered','failed')
 
};
return Joi.validate(delivery, schema);
}


exports.Delivery = DeliverySchema;
exports.Validate = ValidateDelivery;

