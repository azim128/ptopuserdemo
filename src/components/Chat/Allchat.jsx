import React from "react";
import styles from "./chat.module.css";

const Allchat = ({ messages, user }) => {
  return (
    <>
      {Array.isArray(messages) && messages?.map((message) => (
        <React.Fragment key={crypto.randomUUID()}>
          {(message.image || message.message) && (
            <li
              className={`${styles.chatItem} ${
                message.user.name === user?.name ? styles.me : styles.you
              }`}
            >
              <div className={styles.entete}>
                <h2 className="mx-1">{message.time?.slice(0, 10)}</h2>
                <h3 className="mx-1">{message.time?.slice(11, 16)}</h3>
                <h2 className="mx-1">{message.user.name}</h2>
                <span
                  className={`${styles.status} ${
                    message.user.name === user?.name ? styles.blue : styles.green
                  }`}
                ></span>
              </div>

              <div className={styles.triangle}></div>

              <div className={styles.message}>
                {message.image && (
                  <img
                    src={message.image}
                    alt="Received Image"
                    className={styles.imagebox}
                  />
                )}
                {message.message && <p className="mb-0">{message.message}</p>}
              </div>
            </li>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default Allchat;
