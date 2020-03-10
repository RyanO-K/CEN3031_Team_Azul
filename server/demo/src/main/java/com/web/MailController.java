package com.web;

import com.Vo.MailVo;
import com.example.demo.SpringBootSendMailApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

@RestController

public class MailController {

    @Autowired

    private SpringBootSendMailApplication mailService;



    /**

     * 发送邮件的主界面

     */

    @GetMapping("/")

    public ModelAndView index() {

        ModelAndView mv = new ModelAndView("mail/sendMail");//打开发送邮件的页面

        mv.addObject("from", mailService.getMailSendFrom());//邮件发信人

        return mv;

    }

    /**

     * 发送邮件

     */

    @PostMapping("/mail/send")

    public MailVo sendMail(MailVo mailVo, MultipartFile[] files) {

        mailVo.setMultipartFiles(files);

        return mailService.sendMail(mailVo);//发送邮件和附件

    }

}
