const jwt=require('jsonwebtoken')



const auth=async(req,res,next)=>{
   const token=req.headers.authorization
   try {
    if(token){
       const decoded=jwt.verify(token.split(" ")[1]||token,"superneutic")
       console.log(token)
       if(decoded){
        req.body.username=decoded.name
        req.body.myid=decoded.id
        next(); 
    } else {
        res.send({ msg: "Please Login first" });
    }
    }
   } catch (error) {
    res.status(400).send({msg:"Auth Middleware Error", error: error})
   }
}

module.exports = {
    auth,
  };