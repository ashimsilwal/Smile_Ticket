const {Router}=require('express')
const router=Router();
const ticketcontroller=require("../../controller/ticket/ticketcontroller");
const {upload}=require("../../helper/fileupload")


router.get('/api/v1/getAlltickets',ticketcontroller.getAlltickets)
router.post('/api/v1/changestatus/:id',ticketcontroller.changestatus)
router.get('/api/v1/tickets/:id',ticketcontroller.gettickets)
router.get('/api/v1/ticketbyid/:id',ticketcontroller.getticketById)
router.post('/api/v1/ticket',upload.single('image'),ticketcontroller.storeTicket)

module.exports=router;