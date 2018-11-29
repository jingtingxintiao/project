const express=require('express');
const strs=require('querystring');
const  url=require('url');
const fs=require('fs');
const path=require('path');
var bodyParse=require('body-parser');
const cors=require('cors');
const app=express();
app.use(bodyParse.urlencoded({extend:false}))
app.use(bodyParse.json());
app.use(cors());
let userList=[];
let upList=[];
app.get('/home/reg',(req,res)=>{
    let search=url.parse(req.url).search;
    fs.appendFile(path.join(__dirname,'./use.txt'),search,(err)=>{
        if(err){
            return res.send('注册失败');
        }
        res.send('注册成功');
    })
});
app.get('/home/login',(req,res)=>{
    let query=url.parse(req.url).query;
    fs.readFile(path.join(__dirname,'./use.txt'),'utf8',(err,data)=>{
        if(err){
            return res.send({err:-1,msg:"登录失败"});
        }
        let array=data.split("?");
        if(array.indexOf(query)===-1){
            res.send({err:-2,msg:"用户名或密码错误"});
        }else{
            res.send({err:0,msg:"登录成功"});
        }
    })
})
app.post('/home/test',(req,res)=>{
    // console.log(req.body);
    res.send('ok');
})
app.post('/home/mail',(req,res)=>{
   // console.log(req.body);
    userList.push(req.body);
   // console.log(userList);
   // console.log(strs.stringify(userList));
    fs.appendFile(path.join(__dirname,'./mail.json'),"?"+strs.stringify(userList[0]),(err)=>{
        if(err){
          console.log(err)
        }
        res.send('验证码发送成功');
    })
    /*const mail=require('./sendmail.js');
    mail.send(req.body.mail,req.body.check);*/
})
app.post('/home/mailreg',(req,res)=>{
    let query=strs.stringify(req.body);
    // console.log(query);
    fs.readFile(path.join(__dirname,'./mail.json'),'utf8',(err,data)=>{
        if(err){
            return res.send({err:-1,msg:"注册失败"});
        }
        let array=data.split("?");
        // console.log(array);
        if(array.indexOf(query)===-1){
            res.send({err:-2,msg:"用户名或密码错误"});
        }else{
            res.send({err:0,msg:"注册成功"});
            let data={mail:req.body.mail,psd:req.body.mail};
            upList.push(data);
            fs.appendFile(path.join(__dirname,'./up.json'),"?"+strs.stringify(upList[0]),(err)=>{
                if(err){
                    console.log(err)
                }
            })
        }
    })
})
app.post('/home/maillogin',(req,res)=>{
    let query=strs.stringify(req.body);
    fs.readFile(path.join(__dirname,'./up.json'),'utf8',(err,data)=>{
        if(err){
           return res.send({err:-1,msg:"登录失败"});
        }
        let arrar=data.split("?");
        if(arrar.indexOf(query)===-1){
                res.send({err:-2,msg:"用户名或密码错误"});
        }else {
            res.send({err: 0, msg: "登录成功"})
        }
    })
})
app.listen(3000,()=>{
    console.log('server start in port'+3000);
})