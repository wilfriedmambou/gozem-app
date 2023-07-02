import { count } from "console";

const express = require('express');
const router = express.Router();
const {Delivery,Validate} = require("../models/delivery")

// interface CreateDelivery{
//   delivery_id:string,
//   package_id:string,

// }

module.exports=function(socketIO:any){
  // console.log(socketIO,"soc");
  
  socketIO.on('connection', (socket:any) => {
   
        console.log(`⚡: ${socket.id} user just connected!`);
        socket.on("delivery_update",(data:any)=>{
          socketIO.emit("delivery_update",data)
    console.log("delivery_update",data)
  })



 socket.on('status_changed',(data:any)=>{
    socketIO.emit("status_changed",data)
    console.log("status_changed",data)
  })

  socket.on('location_changed',(data:any)=>{
    socketIO.emit("location_changed",data)
    console.log("location_changed",data)
  })
});


router.get("/",(req:any,res:any)=>{

  
  Delivery.find()
  .then(function(delivery:any)  {
    socketIO.emit('showDelivery','Deliver:'+delivery )
    return res.status(200).json(delivery)
   
    
    })
  .catch((error:any) => res.status(400).json({ error }));
 
  })


router.get('/:id',(req:any,res:any)=>{



  Delivery.findById({_id:req.params.id})
  .then((delivery:any) => res.status(200).json(delivery))
  .catch((error:any) => res.status(404).json({ error }));
})
router.post('/:id',(req:any,res:any)=>{

})

router.put('/:id',async(req:any,res:any)=>{

  const { error } = Validate(req.body); 
  
  if (error) return res.status(400).send(error.details[0].message);

  try {
     
    let UpdateDelivery = await  Delivery.findOneAndUpdate({_id: req.params.id }, { ...req.body, _id: req.params.id },{new:true});
    res.json({UpdateDelivery})

    let delivery_emit =
    {
      event:"delivery_update",
      delivery_object:UpdateDelivery

    }

    socketIO.emit('delivery_update',delivery_emit)
    // console.log(socketIO,"IO")
  } catch (error) {
    console.log(error,"tests-error")
  }

})

router.delete('/:id',(req:any,res:any)=>{
  Delivery.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
  .catch((error:any) => res.status(400).json({ error }));
})





router.post('/',(req:any,res:any)=>{

  const { error } = Validate(req.body); 
  
  if (error) return res.status(400).send(error.details[0].message);
  // delete req.body._id;
  const delivery = new Delivery({
     ...req.body

  });
  delivery.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch((error:any) => res.status(400).json({ error }));


})


return router
};