
const nodemailer = require('nodemailer');
var obj={
    sendMail:function (mail,con) {
        // 创建发送邮箱的对象
        let transporter = nodemailer.createTransport({
            service: 'qq', // 运营商  qq邮箱 网易//
            port: 465,
            secure: true,
            auth: {
                user:'1009131664@qq.com', //发送方的邮箱
                pass: 'djtpfleipilcbbia' // pop3 授权码
            }
        });
//发送的邮件内容
// setup email data with unicode symbols
        let mailOptions = {
            from: '"Fred Foo 👻" <1009131664@qq.com>', // sender address
            to: mail, // list of receivers
            subject: '欢迎注册 ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: con // html body
        };

// send mail with defined transport object
//发送邮件
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    }
}
module.exports=obj;
/*
// 创建发送邮箱的对象
let config={
    service: 'qq', // 运营商  qq邮箱 网易//
    port: 465,
    secure: true,
    auth: {
        user:'1009131664@qq.com', //发送方的邮箱
        pass: 'djtpfleipilcbbia' // pop3 授权码
    }
};
let transporter=nodemailer.createTransport(config);
module.exports=function (mail) {
    transporter.sendMail(mail,function (error,info) {
        if(error){
            return  console.log(error);
        }
        console.log('mail sent',info.response);
    });
}*/
