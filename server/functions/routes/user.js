const router = require('express').Router();
const admin = require("firebase-admin")
let data = []

router.get('/',(req,res)=>{
    res.send("inside the user router")
})

router.get('/jwtVerificaation',async(req,res)=>{
    if(!req.headers.authorization){
        return res.status(500).send({msg : "Token not found"})
    }
    const token = req.headers.authorization.split(" ")[1]
    try{
        const decodedValue = await admin.auth().verifyIdToken(token);
        if(!decodedValue){
           res.status(500).json({success:false,msg:`Unauthorized access`})
        }
        res.status(200).json({success:true,data : decodedValue})
    }
    catch(err){
        return res.send({success:false,msg:`Error in extrancting token: ${err}`})
    }
})


const listAllUsers = async (nextpageToken)=>{
    admin
        .auth()
        .listUsers(1000,nextpageToken)
        // .then((listuserresult)=>{
        //     listuserresult.users.forEach((rec)=>{
        //         data.push(res.toJSON());
        //     });
        //     if(listuserresult.pageToken){
        //         listAllUsers(listuserresult.pageToken)
        //     }
        // })
        // .catch((er)=>console.log(er))
}
listAllUsers()

router.get("/all",async (req,res)=>{
    listAllUsers()
    try {
        return res.status(200).send({success:true,data:data})
    } catch (error) {
        return res.status(400).send({success:false,msg:`${error}`})
    }
})
module.exports = router;
