// const mongoose = require('mongoose');
import { Schema, model, connect } from 'mongoose';
const Joi = require('joi');
interface PackageInterface {
  active_delivery_id:string,
  description:string,
  weight:number,
  height:number,
  depth:number,
  from_name:string,
  from_address:"string",
  from_location:{ lat:number, lng:number },
  to_name:"string",
  to_address:"string",
  to_location:{ lat:number, lng:number }
}


const PackageSchema = model  <PackageInterface>('PackageModel', new  Schema <PackageInterface>({
  description: { type: String, required: true },
  active_delivery_id:{ type: String, required: false},
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  depth: { type: Number, required: true },
  from_name: { type: String, required: true },
  from_address: { type: String, required: true },
  from_location: { type: Object, required: true },
  to_name: { type: String, required: true },
  to_address: { type: String, required: true },
  to_location: { type: Object, required: true },
 
  
}));

function ValidatePackage(packageS:any) {
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
return Joi.validate(packageS, schema);
}

exports.Package = PackageSchema;
exports.Validate = ValidatePackage;




