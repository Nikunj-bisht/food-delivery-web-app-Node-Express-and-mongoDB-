const nodemailer=require('nodemailer');
const pug=require('pug');
//new Email(user,url).sendWelcome();
const htmltotext=require('html-to-text')
module.exports=class Email{

  constructor(user,url){
this.to=user.email;
this.firstname=user.name.split(' ')[0];
this.url=url;
this.from=`Licius ${process.env.Email_username}`;
  }
  newTransport(){
   return nodemailer.createTransport({
      service:'Gmail',
      auth:{
        user:process.env.Email_username,
        pass:process.env.Email_password
      }
      });
  }

 async send(template,subject){
    const html=pug.renderFile(`${__dirname}/../views/welcome.pug`,{
      firstname:this.firstname,
      url:this.url,
      subject
    });

    var mailOptions = {
      from:this.from,
      to: this.to,
      subject,
      html,
      text: htmltotext.fromString(html)
    };
    
  await this.newTransport().sendMail(mailOptions);
  }
   async sendWelcome(){
 await this.send("Welcome","Weolcoe to licious");
  }
}


