const order = require("../modul/order_modul")


const pOrdee = async (req,res)=>{
    try{
    const pOrdee = await order.create(req.body)
    res.status(200).json(pOrdee);    
}catch(err){
    res.status(400).json({message:err.message})
    console.log(err.message)
}

}

const gtOrder=async(req,res)=>{
    try{
        const gtOrder=await order.find()
        res.status(200).json(gtOrder)
        
    }catch(err)
{
        res.status(400).json({message:err.message})
    console.log(err.message)

}
}


const dltOrder = async (req,res)=>{
try{
    const {id} =  req.params
    const dltOrder = await order.findByIdAndDelete(id)
    if (!dltOrder) {
      return res.status(404).json({ message: `Cannot find product with ID ${id}` })
    }
    res.status(200).json("Order Deleted succsufly")
}catch(err){
   res.status(400).json({message:err.message})
    console.log(err.message)

}

}
const Uporder = async (req, res) => {
  try {
    const { id } = req.params
    const Uporder = await order.findByIdAndUpdate(id, req.body, { new: true })

    if (!Uporder) {
      return res.status(404).json({ message: `Cannot find product with ID ${id}` })
    }
    res.status(200).json(updatedProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports={pOrdee,dltOrder,Uporder,gtOrder}