import React from "react"
import "./App.css"
import {
  ChatkitProvider,
  TokenProvider,
  withChatkit,
} from "@pusher/chatkit-client-react"
 
const tokenProvider = new TokenProvider({
  url: process.env.TEST_TOKEN_PROVIDER,
});

// const ChatkitProvider = new ChatkitProvider({
//     instanceLocator: process.env.CHATKIT_INSTANCE,
//     tokenProvider: 
// })