const express=require('express')
const router=express.Router

const {upDateTaskById,showAllTasks,removeTaskById,upDateTaskById}=require('../controllers/task')

router.post('/',addTask);
router.get('/',showAllTasks);
router.delete('/:id',removeTaskById);
router.put('/:id,rapit',upDateTaskById);

module.exports=router;

   