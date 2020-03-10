package com.example.demo;

import com.Vo.MailVo;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Date;
import java.util.logging.Logger;

@SpringBootApplication
public class SpringBootSendMailApplication {
	private Logger logger = (Logger) LoggerFactory.getLogger(getClass());//提供日志类



	@Autowired

	private JavaMailSenderImpl mailSender;//注入邮件工具类





	/**

	 * 发送邮件

	 */

	public MailVo sendMail(MailVo mailVo) {

		try {

			checkMail(mailVo); //1.检测邮件

			sendMimeMail(mailVo); //2.发送邮件

			return saveMail(mailVo); //3.保存邮件

		} catch (Exception e) {

			//logger.error("Email Sending fail:", e);//打印错误信息

			mailVo.setStatus("fail");

			mailVo.setError(e.getMessage());

			return mailVo;

		}



	}



	//检测邮件信息类

	private void checkMail(MailVo mailVo) {

		if (StringUtils.isEmpty(mailVo.getTo())) {

			throw new RuntimeException("Reciever can not be empty");

		}

		if (StringUtils.isEmpty(mailVo.getSubject())) {

			throw new RuntimeException("Subject can not be empty");

		}

		if (StringUtils.isEmpty(mailVo.getText())) {

			throw new RuntimeException("text can not be empty");

		}

	}



	//构建复杂邮件信息类

	private void sendMimeMail(MailVo mailVo) {

		try {

			MimeMessageHelper messageHelper = new MimeMessageHelper(mailSender.createMimeMessage(), true);//true mean suppor complex type

			mailVo.setFrom(getMailSendFrom());//send will be read from setting

			messageHelper.setFrom(mailVo.getFrom());//sender

			messageHelper.setTo(mailVo.getTo().split(","));//reciever

			messageHelper.setSubject(mailVo.getSubject());//subject

			messageHelper.setText(mailVo.getText());//email text

			if (!StringUtils.isEmpty(mailVo.getCc())) {//CC

				messageHelper.setCc(mailVo.getCc().split(","));

			}

			if (!StringUtils.isEmpty(mailVo.getBcc())) {//bcc

				messageHelper.setCc(mailVo.getBcc().split(","));

			}

			if (mailVo.getMultipartFiles() != null) {//add attach files

				for (MultipartFile multipartFile : mailVo.getMultipartFiles()) {

					messageHelper.addAttachment(multipartFile.getOriginalFilename(), multipartFile);

				}

			}

			if (StringUtils.isEmpty(mailVo.getSentDate())) {//Send date

				mailVo.setSentDate(new Date());

				messageHelper.setSentDate(mailVo.getSentDate());

			}

			mailSender.send(messageHelper.getMimeMessage());//send the email

			mailVo.setStatus("ok");

			//logger.info("Email sending successfully：{}->{}",
			//		mailVo.getFrom(),
			//		mailVo.getTo());

		} catch (Exception e) {

			throw new RuntimeException(e);//sending fail

		}

	}



	//保存邮件

	private MailVo saveMail(MailVo mailVo) {

		//将邮件保存到数据库..

		return mailVo;

	}



	//获取邮件发信人

	public String getMailSendFrom() {

		return mailSender.getJavaMailProperties().getProperty("from");

	}




	public static void main(String[] args) {
		SpringApplication.run(SpringBootSendMailApplication.class, args);
	}

}
