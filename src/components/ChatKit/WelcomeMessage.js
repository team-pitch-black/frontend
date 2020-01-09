import React from 'react';
import {
    withChatkit
} from "@pusher/chatkit-client-react"

const WelcomeMessage = withChatkit((props) => {
    return (
      <div>
        {props.chatkit.isLoading
          ? 'Connecting to Chatkit...'
          : `Hello ${props.chatkit.currentUser.name}!`}
      </div>
    );
  });

export default WelcomeMessage;