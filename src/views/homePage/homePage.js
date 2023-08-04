sendMessage = document.getElementById('sendMessage');

sendMessage.addEventListener("click", async (event) => {
    try {
        event.preventDefault();
        const token = localStorage.getItem('token')
        const message = document.getElementById('message');
        const messageInput = message.value;
        console.log(messageInput)
        const res = await axios.post('http://localhost:4000/user/chats', { message: messageInput }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        message.value = "";
        showChats();
    } catch (error) {
        if (error.response && error.response.status === 403) {
            window.location.href = '../loginRegister/loginRegister.html';
        } else {
            console.log(error);
        }
    }
})

async function saveChat() {
    try {
        var nextData = 0;
        const token = localStorage.getItem('token')
        const localStorageChats = JSON.parse(localStorage.getItem("chats"));
        if (localStorageChats && localStorageChats.length > 0) {
            let array = JSON.parse(localStorage.getItem("chats"));
            let length = JSON.parse(localStorage.getItem("chats")).length;
            nextData = array[length - 1].id;
        }
        const res = await axios.get('http://localhost:4000/user/chats', {
            params: { id: nextData },
            headers: { Authorization: `Bearer ${token}` }
        });
        const chats = JSON.parse(localStorage.getItem("chats"));

        if (!chats) {
            localStorage.setItem("chats", JSON.stringify(res.data));
        } else {
            res.data.forEach((message) => {
                chats.push(message);
                localStorage.setItem("chats", JSON.stringify(chats));
            });
        }
    } catch (error) {
        console.log(error)
    }
}

async function showChats() {
    try {
        const messageDivOther = document.getElementById('messageDivOther');
        const messageDivMe = document.getElementById('messageDivMe');
        messageDivOther.innerHTML="";
        messageDivMe.innerHTML = "";
        const token = localStorage.getItem('token');
        const decodedToken = decodeToken(token);
        const userId = decodedToken.user.userId;
        const chats = localStorage.getItem('chats');
        if (chats) {
            const data = JSON.parse(chats);
            for (let i = 0; i < data.length; i++) {
                const paragraphElement = document.createElement('p');
                const strongElement = document.createElement('strong');
                const textNodeUser = document.createTextNode(`${data[i].name} : `);
                const textNodeMessage = document.createTextNode(`${data[i].message}`);

                strongElement.appendChild(textNodeUser);
                paragraphElement.appendChild(strongElement);
                paragraphElement.appendChild(textNodeMessage);
                if(data[i].userId===userId){
                    messageDivMe.appendChild(paragraphElement);
                }
                else{
                    messageDivOther.appendChild(paragraphElement);
                }
                
            }
        }
    } catch (error) {
        if (error.response && error.response.status === 403) {
            window.location.href = '../loginRegister/loginRegister.html';
        } else {
            console.log(error);
        }
    }
}
setInterval(() => {
    saveChat();
    showChats();
}, 1000);

function decodeToken(token) {
    try {
      const base64Payload = token.split('.')[1];
      const payload = JSON.parse(atob(base64Payload));
      return payload;
    } catch (error) {
      console.error('Error decoding token:', error.message);
      return null; // Return null or handle the error in your application.
    }
  }