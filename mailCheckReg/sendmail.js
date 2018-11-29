/*
封装一个发送邮件的模块
调用通过传递参数的方式 来到达到简化调用

*/
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'qq', // 运营商  qq邮箱 网易//
    port: 465,
    secure: true,
    auth: {
        user:'1009131664@qq.com', //发送方的邮箱
        pass: 'djtpfleipilcbbia' // pop3 授权码
    }
});

let mail={
    transporter:transporter,
    send(mail,content){
        let mailOptions = {
            from: '"Fred Foo 👻" <1009131664@qq.com>', // sender address
            to: mail, // list of receivers
            subject: '欢迎注册 ✔', // Subject line
            text: content, // plain text body
            html: content // html body
        };

        //发送
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    }
}
module.exports=mail