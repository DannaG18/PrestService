import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import styles from '../../styles/LiveChat.module.css'

const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className={styles.liveChat}>
      {!isOpen && (
        <button className={styles.chatButton} onClick={toggleChat}>
          <MessageCircle />
          <span>Chat with us</span>
        </button>
      )}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>Live Chat</h3>
            <button onClick={toggleChat}><X /></button>
          </div>
          <div className={styles.chatBody}>
            {/* Chat messages would go here */}
          </div>
          <div className={styles.chatInput}>
            <input type="text" placeholder="Type your message..." />
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;