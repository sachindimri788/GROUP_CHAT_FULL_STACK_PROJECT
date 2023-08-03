sendMessage = document.getElementById('sendMessage');

sendMessage.addEventListener("click", async (event) => {
    try {
        event.preventDefault();
        const token = localStorage.getItem('token')
        const message = document.getElementById('message').value;

        const res = await axios.post('http://localhost:4000/user/chats', { message }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        form.reset();

    } catch (error) {
        if (error.response && error.response.status === 403) {
            window.location.href = '../loginRegister/loginRegister.html';
        } else {
            console.log(error);
        }
    }
})