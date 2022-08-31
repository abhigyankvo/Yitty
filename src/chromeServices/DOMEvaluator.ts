// import { DOMMessage, DOMMessageResponse } from "../types";

// Function called when a new message is received
const messagesFromReactAppListener = (
  msg: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void
) => {
  console.log("[content.js]. Message received");
  const response: any = {
    val: "Hello World",
  };

  sendResponse(response);
};

chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
export {};
