package com.codecool.musicstore.service;


import com.google.cloud.dialogflow.cx.v3beta1.*;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;

import com.google.api.gax.rpc.ApiException;
import com.google.common.collect.Maps;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class ChatBotService {
    private String projectId = "musicstorebot";
    private String locationId = "global";
    private String agentId = "5fb20a94-a223-488e-91d4-23bd9aa364d3";
    private String sessionId = "test-session-123";
    private String languageCode = "en";

    // DialogFlow API Detect Intent sample with text inputs.
    public String detectIntent(
            String text
    )
            throws IOException, ApiException {
        SessionsSettings.Builder sessionsSettingsBuilder = SessionsSettings.newBuilder();
        if (locationId.equals("global")) {
            sessionsSettingsBuilder.setEndpoint("dialogflow.googleapis.com:443");
        } else {
            sessionsSettingsBuilder.setEndpoint(locationId + "-dialogflow.googleapis.com:443");
        }
        SessionsSettings sessionsSettings = sessionsSettingsBuilder.build();


        // Instantiates a client.

        // Note: close() needs to be called on the SessionsClient object to clean up resources
        // such as threads. In the example below, try-with-resources is used,
        // which automatically calls close().
        try (SessionsClient sessionsClient = SessionsClient.create(sessionsSettings)) {
            // Set the session name using the projectID (my-project-id), locationID (global), agentID
            // (UUID), and sessionId (UUID).
            SessionName session =
                    SessionName.ofProjectLocationAgentSessionName(projectId, locationId, agentId, sessionId);

            // TODO : Uncomment if you want to print session path
            // System.out.println("Session Path: " + session.toString());

            // Detect intents for each text input.
            // Set the text (hello) for the query.
            TextInput.Builder textInput = TextInput.newBuilder().setText(text);

            // Build the query with the TextInput and language code (en-US).
            QueryInput queryInput =
                    QueryInput.newBuilder().setText(textInput).setLanguageCode(languageCode).build();

            // Build the DetectIntentRequest with the SessionName and QueryInput.
            DetectIntentRequest request =
                    DetectIntentRequest.newBuilder()
                            .setSession(session.toString())
                            .setQueryInput(queryInput)
                            .build();

            // Performs the detect intent request.
            DetectIntentResponse response = sessionsClient.detectIntent(request);

            // Display the query result.
            QueryResult queryResult = response.getQueryResult();
            System.out.println("query result " + queryResult);

            // TODO : Uncomment if you want to print queryResult
            // System.out.println("====================");
            // System.out.format("Query Text: '%s'\n", queryResult.getText());
            // System.out.format(
            //     "Detected Intent: %s (confidence: %f)\n",
            //     queryResult.getIntent().getDisplayName(),
            //         queryResult.getIntentDetectionConfidence());


            return String.valueOf(queryResult.getResponseMessages(0).getText());
        }
    }
}
