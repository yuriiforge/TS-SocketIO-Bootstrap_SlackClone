const buildMessageHtml = (messageObj) => {
  return `
          <li>
              <div class="user-image">
                  <img src="https://avatar.iran.liara.run/public" />
                      </div>
                      <div class="user-message">
                          <div class="user-name-time">${
                            messageObj.username
                          } <span>${new Date(
    messageObj.date
  ).toLocaleString()}</span></div>
                          <div class="message-text">${
                            messageObj.newMessage
                          }</div>
                      </div>
                  </li>
  `;
};
