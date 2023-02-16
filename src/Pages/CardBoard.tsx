import Chat, { Bubble, useMessages } from "@chatui/core";
import { useState } from "react";
import Conversation from "../Components/Conversation";
import defaultSettings from "../Components/Characters";
import { Configuration, OpenAIApi } from "openai";
import "../App.css";

const ChatBoard = () => {
  const storedApiKey = "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";
  const { messages, appendMsg, setTyping } = useMessages([]);
  const [openai, setOpenai] = useState(
    new OpenAIApi(new Configuration({ apiKey: storedApiKey }))
  );

  const [conversation, setConversation] = useState(
    new Conversation(defaultSettings)
  );

  function handleSend(type: any, val: string) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });

      setTyping(true);
      let correction = new Promise<string>((resolve) => resolve(val));

      correction.then((correction) => {
        if (correction.trim() !== val.trim()) {
          appendMsg({
            type: "text",
            content: { text: "*" + correction },
            position: "right",
          });
        }

        const prompt = conversation.get_prompt(correction).trim();

        openai
          .createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            stop: defaultSettings["USER_PREFIX"].trim(),
            max_tokens: defaultSettings["MAX_TOKENS"],
            frequency_penalty: defaultSettings["FREQUENCY_PENALTY"],
            presence_penalty: defaultSettings["PRESENCE_PENALTY"],
          })
          .then((completion: any) => {
            const responseText = completion.data.choices![0].text!;
            conversation.set_completion(responseText);
            appendMsg({
              type: "text",
              content: { text: responseText.trim() },
            });
          });
      });
    }
  }

  function renderMessageContent(msg: any) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <Chat
      navbar={{ title: "Chatbot" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
      locale="en"
      placeholder="Type a message"
    />
  );
};

export default ChatBoard;
