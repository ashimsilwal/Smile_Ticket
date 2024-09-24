const {Router}=require('express')
const router=Router();
const authcontroller=require("../../controller/customer/authcontroller");
// router.post('/api/auth/token',authcontroller.register)
router.post('/api/v1/userregister',authcontroller.register)
router.post('/api/v1/userlogin',authcontroller.login)

router.get('/api/v1/users',authcontroller.getusers)
router.get('/api/v1/getCount',authcontroller.getCount)
router.get('/api/v1/getCountById/:id',authcontroller.getCountById)

module.exports=router;