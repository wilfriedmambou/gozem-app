const express = require('express');
const router = express.Router();
const {Package} = require("../models/package")


module.exports=function(io:any){

router.get("/",(req:any,res:any)=>{
  Package.find()
  .then((delivery:any)  => res.status(200).json(delivery))
  .catch((error:any) => res.status(400).json({ error }));
})



router.get('/:id',(req:any,res:any)=>{

  console.log("get")
  Package.findById({_id:req.params.id})
  .then((delivery:any) => res.status(200).json(delivery))
  .catch((error:any) => res.status(404).json({ error }));
})
router.post('/:id',(req:any,res:any)=>{

})

router.put('/:id',(req:any,res:any)=>{
  Package.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch((error:any) => res.status(400).json({ error }));
})

router.delete('/:id',(req:any,res:any)=>{
  Package.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
  .catch((error:any) => res.status(400).json({ error }));
})



router.post('/',(req:any,res:any)=>{
// const {delivery_id} = req.body 

console.log(req.body,"body")
  // delete req.body._id;
  const delivery = new Package({...req.body}
  );
  delivery.save()
    .then((delivery:any) => res.status(201).json(delivery))
    .catch((error:any) => res.status(400).json({ error }));


})
return router
 }

