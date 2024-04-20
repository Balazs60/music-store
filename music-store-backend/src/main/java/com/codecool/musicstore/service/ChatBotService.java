package com.codecool.musicstore.service;

import com.google.cloud.dialogflow.cx.v3beta1.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import com.google.api.gax.rpc.ApiException;
import java.util.List;

@Service
public class ChatBotService {
    private String projectId = "musicstorebot";
    private String locationId = "global";
    private String agentId = "5fb20a94-a223-488e-91d4-23bd9aa364d3";
    private String sessionId = "test-session-123";
    private String languageCode = "en";

    public String detectIntent(String text) {
        try {
            SessionsSettings.Builder sessionsSettingsBuilder = SessionsSettings.newBuilder();
            if (locationId.equals("global")) {
                sessionsSettingsBuilder.setEndpoint("dialogflow.googleapis.com:443");
            } else {
                sessionsSettingsBuilder.setEndpoint(locationId + "-dialogflow.googleapis.com:443");
            }
            SessionsSettings sessionsSettings = sessionsSettingsBuilder.build();

            try (SessionsClient sessionsClient = SessionsClient.create(sessionsSettings)) {
                SessionName session = SessionName.ofProjectLocationAgentSessionName(projectId, locationId, agentId, sessionId);

                TextInput.Builder textInput = TextInput.newBuilder().setText(text);
                QueryInput queryInput = QueryInput.newBuilder().setText(textInput).setLanguageCode(languageCode).build();

                DetectIntentRequest request = DetectIntentRequest.newBuilder()
                        .setSession(session.toString())
                        .setQueryInput(queryInput)
                        .build();

                DetectIntentResponse response = sessionsClient.detectIntent(request);

                QueryResult queryResult = response.getQueryResult();
                System.out.println("query result " + queryResult);

                List<ResponseMessage> responseMessagesList = queryResult.getResponseMessagesList();
                if (!responseMessagesList.isEmpty()) {
                    return responseMessagesList.get(0).getText().getText(0);
                } else {
                    return "No response from Dialogflow";
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred: " + e.getMessage();
        }
    }
}
