import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "./chatbot.css";

const systemMessage = {
  role: "system",
  content: "Explain things like you're talking to a professional Doctor with 2 years of experience.",
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm GlycoBot! 🩺 Ask me anything!",
      sentTime: "just now",
      sender: "GlycoBot",
      direction: "incoming",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToDeepSeek(newMessages);
  };

  async function processMessageToDeepSeek(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
        let role = messageObject.sender === "GlycoBot" ? "assistant" : "user";
        return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
        model: "deepseek-r1:1.5b",
        messages: [systemMessage, ...apiMessages],
        stream: true,  // Streaming enabled
    };

    try {
        const response = await fetch("http://127.0.0.1:11434/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(apiRequestBody),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let messageContent = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            let chunk = decoder.decode(value, { stream: true });
            console.log(chunk);
            try {
                // DeepSeek streams JSON lines, so we process them separately
                const jsonChunks = chunk.trim().split("\n"); // Each line should be a JSON object

                jsonChunks.forEach((jsonString) => {
                    try {
                        const parsedChunk = JSON.parse(jsonString);
                        if (parsedChunk.message) {
                            messageContent += parsedChunk.message.content;
                        }
                    } catch (parseError) {
                        console.error("Error parsing JSON chunk:", jsonString);
                    }
                });

            } catch (error) {
                console.error("Error processing response chunk:", error);
            }
        }

        if (messageContent) {
            setMessages((prev) => [
                ...prev,
                {
                    message: messageContent,
                    sender: "GlycoBot",
                    direction: "incoming",
                },
            ]);
        } else {
            throw new Error("Empty response received");
        }

    } catch (error) {
        console.error("Error communicating with GlycoBot:", error.message);
        setMessages((prev) => [
            ...prev,
            {
                message: "Sorry, there was an error processing the response.",
                sender: "GlycoBot",
                direction: "incoming",
            },
        ]);
    } finally {
        setIsTyping(false);
    }
}


  return (
    <div className="chatBotMainContainer">
      <div>
        <MainContainer style={{ height: "86vh",padding:"10px",borderRadius:"10px"}}>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="GlycoBot is typing" />
                ) : null
              }
            >
              {messages.map((message, i) => {
                console.log(message);
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default Chatbot;