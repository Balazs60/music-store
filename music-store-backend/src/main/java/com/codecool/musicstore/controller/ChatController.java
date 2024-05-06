package com.codecool.musicstore.controller;

import com.codecool.musicstore.dto.MessageDto;
import com.codecool.musicstore.service.ChatBotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {


    private final ChatBotService chatBotService;

    @Autowired
    public ChatController(ChatBotService chatBotService) {
        this.chatBotService = chatBotService;
    }

    @PostMapping("/send-message")
    public String sendMessage(@RequestBody MessageDto messageDto) {
        System.out.println("user message " + messageDto.getMessage());
        try {
            return chatBotService.detectIntent(messageDto.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred: " + e.getMessage();
        }
    }
}
