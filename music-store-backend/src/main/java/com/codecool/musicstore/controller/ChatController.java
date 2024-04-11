package com.codecool.musicstore.controller;

import com.codecool.musicstore.dto.MessageDto;
import com.codecool.musicstore.service.ChatBotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {


    private final ChatBotService chatBotService;
    private MessageDto messageDto;

    @Autowired
    public ChatController(ChatBotService chatBotService, MessageDto messageDto) {
        this.chatBotService = chatBotService;
        this.messageDto = messageDto;
    }

    @PostMapping("/send-message")
    public String sendMessage(@RequestBody MessageDto messageDto) {
        System.out.println("user message " + messageDto.getMessage());
        try {
            System.out.println("dialogflow answer " + chatBotService.detectIntent(messageDto.getMessage()));
            return chatBotService.detectIntent(messageDto.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred: " + e.getMessage();
        }
    }
}
