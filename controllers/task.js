const taskList=[
        {id:'10',taskName:'שגיאת מלאי',taskTypeId:'1',taskDescripiton:'ניתן להזמין מוצר שלא קיים במלאי',rapist:'יעקב כהן'},
        {id:'11',taskName:'שגיאת יתרה',taskTypeId:'2',taskDescripiton:'יש צורך למחוק יתרה זו',rapist:'אייל טבק'}
]


exports.addTask=(res,req)=>{
taskList.push(req.body);
res.send(taskList);
}

exports.showAllTasks=(res,req)=>{
    res.send(taskList);
}

exports.removeTaskById=(req,res)=>{
    const id=req.params.idconst 
    const index=taskList.findIndex(x=>x.id==id)
    taskList.splite(index,1);
    res.send();
}
exports.upDateTaskById=(req,res)=>{
    const id=req.params.id
    const index=taskList.findIndex(x=>x.id==id)
    taskList[index].rapist=req.params.rapits;
    res.send()
}