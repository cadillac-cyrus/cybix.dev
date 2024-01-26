import { useState } from "react";

const SYSTEM_MESSAGE =
  "You are Cybix, a helpful and versatile AI created by Coxwell using state of the art machine learning models and API's";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  // const [botMessage, setBotMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: SYSTEM_MESSAGE,
    },
  ]);
  const [userMessage, setUserMessage] = useState("");

  const API_URL = "https://open-ai21.p.rapidapi.com/conversationgpt35";

  async function sendRequest() {
    // update the message history
    const newMessage = { role: "user", content: userMessage };
    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setUserMessage("");

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + apiKey,
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
      },
      body: JSON.stringify({
        messages: newMessages,
      }),
    });

    // const responseJson = await response.json();

    // const newBotMessage = responseJson.content;

    // const newMessages2 = [...newMessages, newBotMessage];

    // setMessages(newMessages2);

    // setBotMessage(responseJson.result);

    // console.log("botMessage", botMessage);
    const responseJson = await response.json();
    const newBotMessage = { role: "Cybix", content: responseJson.result };

    const newMessagesWithBot = [...newMessages, newBotMessage];
    setMessages(newMessagesWithBot);

    console.log("responseJson", responseJson);
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="shadow px-4 py-2 flex flex-row justify-between items-center">
        <div className="text-xl font-bold">cybix</div>
        <div>
          <input
            type="password"
            className="border p-1 rounded"
            onChange={(e) => setApiKey(e.target.value)}
            value={apiKey}
            placeholder="Paste Api Key Here"
          ></input>
        </div>
      </nav>

      {/* Message History */}
      <div className="flex-1">
        <div className="w-full max-w-screen-md mx-auto px-4">
          {messages
            .filter((message) => message && message.role !== "system") // Add a check for undefined
            .map((message, idx) => (
              <div key={idx} className="mt-3">
                <div className="font-bold">{message.role === "user" ? "You" : "Cybix"}</div>
                <div className="text-lg">{message.content}</div>
              </div>
            ))}
        </div>
      </div>

      {/* Message Input Box */}
      <div>
        <div className="w-full max-w-screen-md mx-auto flex px-4 pb-4">
          <textarea
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="border text-lg rounded-md p-1 flex-1 "
            rows={1}
          />
          <button
            onClick={sendRequest}
            className="border rounded-md bg-blue-500 hover:bg-blue-600 text-white px-4 ml-2"
          >
            Send
          </button>
        </div>
      </div>

      {/* Test Button
      <div className="p-4">
        <button
          onClick={sendRequest}
          className="w-40 bordered rounded bg-blue-500 hover:bg-blue-600 text-white p-2"
        >
          Send Request
        </button>
        <div className="mt-4 text-lg">{botMessage}</div>
      </div> */}
    </div>
  );
}
