#coding: utf-8    
  
import smtplib    
import csv
from email.mime.multipart import MIMEMultipart    
from email.mime.text import MIMEText    
from email.mime.image import MIMEImage 
from email.header import Header   
    
#setsmtplib parameter
send_imformation=csv.reader(open('E:/github/CEN3031_Team_Azul/ExampleDB/UF MOON PROJECT - DATABASE.xlsx','r'))
smtpserver = 'smtp.163.com'
username = 'song_li1124@163.com'
password='Gnosil12'
sender='song.li1124@163.com'
#receiver='XXX@126.com'
#收件人为多个收件人
receiver=[]

subject = 'Python email test'

#subject=Header(subject, 'utf-8').encode()
    

msg = MIMEMultipart('mixed') 
msg['Subject'] = subject
msg['From'] = 'XXX@163.com <XXX@163.com>'
#msg['To'] = 'XXX@126.com'

msg['To'] = ";".join(receiver) 
#msg['Date']='2012-3-16'

#text 
text = "Hi!\nHow are you?\nHere is the link you wanted:\nhttp://www.baidu.com"    
text_plain = MIMEText(text,'plain', 'utf-8')    
msg.attach(text_plain)    

#picture link
sendimagefile=open(r'D:\pythontest\testimage.png','rb').read()
image = MIMEImage(sendimagefile)
image.add_header('Content-ID','<image1>')
image["Content-Disposition"] = 'attachment; filename="testimage.png"'
msg.attach(image)

#构造html
#发送正文中的图片:由于包含未被许可的信息，网易邮箱定义为垃圾邮件，报554 DT:SPM ：<p><img src="cid:image1"></p>
html = """
<html>  
  <head></head>  
  <body>  
    <p>Hi!<br>  
       How are you?<br>  
       Here is the <a href="http://www.baidu.com">link</a> you wanted.<br> 
    </p> 
  </body>  
</html>  
"""    
text_html = MIMEText(html,'html', 'utf-8')
text_html["Content-Disposition"] = 'attachment; filename="texthtml.html"'   
msg.attach(text_html)    


#构造附件
sendfile=open(r'D:\pythontest\1111.txt','rb').read()
text_att = MIMEText(sendfile, 'base64', 'utf-8') 
text_att["Content-Type"] = 'application/octet-stream'  
#以下附件可以重命名成aaa.txt  
#text_att["Content-Disposition"] = 'attachment; filename="aaa.txt"'
#另一种实现方式
text_att.add_header('Content-Disposition', 'attachment', filename='aaa.txt')
#以下中文测试不ok
#text_att["Content-Disposition"] = u'attachment; filename="中文附件.txt"'.decode('utf-8')
msg.attach(text_att)    
       
#发送邮件
smtp = smtplib.SMTP()    
smtp.connect('smtp.163.com')
#我们用set_debuglevel(1)就可以打印出和SMTP服务器交互的所有信息。
#smtp.set_debuglevel(1)  
smtp.login(username, password)    
smtp.sendmail(sender, receiver, msg.as_string())    
smtp.quit()