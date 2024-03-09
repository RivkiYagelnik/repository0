const express=require('express');

const taskRouters=require('./routers/task')
const app=express()
app.use(express.json())

const taskMiddleWare=(req,res,next)=>{
    console.log(` ${req.url} ${req.method}`)
    next()
}
app.use(taskMiddleWare);
app.use('/task',taskRouters);

app.listen(2000,()=>{
    console.log('listeninig to port 2000 in app');
})
