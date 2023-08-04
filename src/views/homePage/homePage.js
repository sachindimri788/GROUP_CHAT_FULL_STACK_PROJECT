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

async function showChats() {
    try {
        const messageDiv = document.getElementById('messageDiv');
        messageDiv.innerHTML = "";

        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:4000/user/chats', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = res.data;
        console.log(data)
        data.forEach(element => {
            const paragraphElement = document.createElement('p');
            const strongElement = document.createElement('strong');
            const textNodeUser = document.createTextNode(`${element.name}`);
            const textNodeMessage = document.createTextNode(`${element.message}`);

            strongElement.appendChild(textNodeUser);
            paragraphElement.appendChild(strongElement);
            paragraphElement.appendChild(textNodeMessage);

            messageDiv.appendChild(paragraphElement);
        });
    } catch (error) {
        if (error.response && error.response.status === 403) {
            window.location.href = '../loginRegister/loginRegister.html';
        } else {
            console.log(error);
        }
    }
}

showChats();