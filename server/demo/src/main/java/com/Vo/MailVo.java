package com.Vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Date;

public class MailVo {

    private String id;//emailId

    private String from;//emailSender

    private String to;//email reciever（multiple email use "," ）

    private String subject;//email subject

    private String text;//email context

    private Date sentDate;//send time

    private String cc;//CC（multiple email use "," ）

    private String bcc;//private CC（multiple email use "," ）
    private String status;//status

    private String error;//error information

    @JsonIgnore

    private MultipartFile[] files;//attach files

    public String getTo() {
        return to;
    }

    public String getSubject() {
        return subject;
    }

    public String getText() {
        return text;
    }

    public void setFrom(String mailSendFrom) {
    }

    public String getFrom() {
        return from;
    }

    public String getCc() {
        return cc;
    }

    public String getBcc() {
        return bcc;

    }

    public MultipartFile[] getMultipartFiles() {
        return files;
    }

    public Date getSentDate() {
        return sentDate;
    }

    public void setSentDate(Date date) {
        sentDate=date;
    }

    public void setStatus(String ok) {
        status=ok;
    }

    public void setError(String message) {
        error=message;
    }

    public void setMultipartFiles(MultipartFile[] files) {
        this.files= files;
    }

    //get&set function may needed
}
