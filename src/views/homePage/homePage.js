const socket = io("http://localhost:5000");

async function sendMessage(groupId, groupName) {
    try {
        const token = localStorage.getItem('token')
        const message = document.getElementById('message');
        const messageInput = message.value;
        const fileI = document.getElementById('fileInput');
        const fileInput = fileI.files[0];;
        const formData = new FormData();
        formData.append('message', messageInput);
        formData.append('fileInput', fileInput);
        formData.append('groupId', groupId)
        await axios.post('http://localhost:4000/group/chats', formData, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data', }
        });
        message.value = "";
        fileI.value = "";
        showChats(groupId, groupName);
    } catch (error) {
        if (error.response && error.response.status === 403) {
            window.location.href = '../loginRegister/loginRegister.html';
        } else {
            console.log(error);
        }
    }
}

// async function saveChat(groupId, groupName) {
//     try {
//         var nextData = 0;
//         const token = localStorage.getItem('token')
//         const localStorageChats = JSON.parse(localStorage.getItem("chats"));
//         let chatsWithMatchingGroupId;
//         if(localStorageChats!==null){
//            chatsWithMatchingGroupId = await localStorageChats.filter((chat) => chat.groupId == groupId);
//         }
//         if (chatsWithMatchingGroupId && chatsWithMatchingGroupId.length > 0) {
//             let length = chatsWithMatchingGroupId.length;
//             nextData = chatsWithMatchingGroupId[length - 1].id;
//         }
//         const res = await axios.get('http://localhost:4000/group/chats', {
//             params: { id: nextData, groupId },
//             headers: { Authorization: `Bearer ${token}` }
//         });
//         const chats = JSON.parse(localStorage.getItem("chats"));
//         if (!chats) {
//             localStorage.setItem("chats", JSON.stringify(res.data));
//         } else {
//             res.data.forEach((message) => {
//                 chats.push(message);
//                 localStorage.setItem("chats", JSON.stringify(chats));
//             });
//         }
//         showChats(groupId, groupName);
//     } catch (error) {
//         console.log(error)
//     }
// }

async function showChats(groupId, groupName) {
    try {
        const token = localStorage.getItem('token');
        //shows user //
        const user = await axios.get('http://localhost:4000/group/showUserInGroup', {
            params: { groupId },
            headers: { Authorization: `Bearer ${token}` }
        });
        let users = document.getElementById('users');
        users.innerHTML = "";
        let conte = ""
        for (let i = 0; i < user.data.length; i++) {
            conte += ` <li class="list-group-item">${user.data[i].name}</li>`
        }
        users.innerHTML = conte;
        //shows user end //    

        const msg = document.getElementById('msg');
        msg.innerHTML = `
            <h2 id="gpName">${groupName}</h2>
            <div class="message-container">
            <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); ">
            <button class="btn btn-primary" type="button" onclick="archivedChatButton(${groupId})">Archived Chat</button>
            </div> <br> <br> <br> <br>
            <div id="messageDiv" class="list-group">
            <!-- <div style="text-align: right;"> <p><strong>You : </strong> message </p> </div> -->
            <!-- <div style="text-align: left;"> <p><strong>user1 : </strong> message</p> </div> -->
            </div>
            </div>
            <div class="input-group mt-4">
            <input type="file" id="fileInput" class="form-control">
            <input type="text" class="form-control" placeholder="Type your message..." id="message">
            <div class="input-group-append">
            <button class="btn btn-primary" type="button" id="sendMessage" onclick="sendMessage('${groupId}', '${groupName}')">Send</button>
            </div>
            </div>`
        const messageDiv = document.getElementById('messageDiv');
        messageDiv.innerHTML = "";
        const decodedToken = decodeToken(token);
        const userId = decodedToken.user.userId;
        // const chats = JSON.parse(localStorage.getItem('chats'));
        // let data;
        // if(chats!==null){
        //     data = await chats.filter((chat) => chat.groupId == groupId);
        // }
        socket.emit("getMessages", groupId);
        socket.on("messages", (data) => {
            let content = "";
            if (data && data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].userId == userId) {
                        if (data[i].message) { content += `<div style="text-align: right;"> <p><strong>You : </strong> ${data[i].message}</p> </div>`; }
                        if (data[i].fileUrl) { content += `<div style="text-align: right;"><img src="../public/images/${data[i].fileUrl}" style="max-width: 300px;" /></div>`; }
                    } else {
                        if (data[i].fileUrl) { content += `<div style="text-align: left;"><img src="../public/images/${data[i].fileUrl}" style="max-width: 300px;" /></div>`; }
                        if (data[i].message) { content += `<div style="text-align: left;"> <p><strong>${data[i].name} : </strong> ${data[i].message}</p> </div>`; }
                    }
                }
                messageDiv.innerHTML = content;
            }
        });

    } catch (error) {
        if (error.response && error.response.status === 403) {
            window.location.href = '../loginRegister/loginRegister.html';
        } else {
            console.log(error);
        }
    }

}
async function archivedChatButton(groupId) {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4000/group/archivedChat', {
            params:  {groupId} ,
            headers: { Authorization: `Bearer ${token}` }
        });
        const data=res.data;
        let content = "";
        const messageDiv = document.getElementById('messageDiv');
        messageDiv.innerHTML = "";
        if (data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].userId == userId) {
                    if (data[i].message) { content += `<div style="text-align: right;"> <p><strong>You : </strong> ${data[i].message}</p> </div>`; }
                    if (data[i].fileUrl) { content += `<div style="text-align: right;"><img src="../public/images/${data[i].fileUrl}" style="max-width: 300px;" /></div>`; }
                } else {
                    if (data[i].fileUrl) { content += `<div style="text-align: left;"><img src="../public/images/${data[i].fileUrl}" style="max-width: 300px;" /></div>`; }
                    if (data[i].message) { content += `<div style="text-align: left;"> <p><strong>${data[i].name} : </strong> ${data[i].message}</p> </div>`; }
                }
            }
            messageDiv.innerHTML = content;
        }
    } catch (error) {
        console.log(error)
    }
}


// setInterval(() => {
//     saveChat();
// }, 3000);

function decodeToken(token) {
    try {
        const base64Payload = token.split('.')[1];
        const payload = JSON.parse(atob(base64Payload));
        return payload;
    } catch (error) {
        console.error('Error decoding token:', error.message);
        return null;
    }
}








const createGroupBtn = document.getElementById('createGroupBtn');

createGroupBtn.addEventListener("click", async (e) => {
    try {
        const token = localStorage.getItem('token');
        var groupName = prompt("Please enter your name of the Group:");
        const res = await axios.post('http://localhost:4000/group/createGroup', { groupName }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert('Group Created');
        showGroup();
    } catch (error) {
        if (error.response && error.response.status === 403) {
            window.location.href = '../loginRegister/loginRegister.html';
        } else {
            console.log(error);
        }
    }

})

async function showGroup() {
    try {
        const token = localStorage.getItem('token');

        const res = await axios.get('http://localhost:4000/group/showGroup', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const groups = document.getElementById('groups');
        groups.innerHTML = "";
        const data = res.data;
        let content = "";
        for (let i = 0; i < data.length; i++) {
            content += `<li class="list-group-item">
            <button style="background:red" onclick="showChats('${data[i].groupId}', '${data[i].groupName}')">${data[i].groupName}</button>

           <button onclick="deleteGroup(${data[i].groupId})">Delete</button>

           <button onclick="makeAdmin(${data[i].groupId})">Make Admin</button> 
           
           <button onclick="deleteMember(${data[i].groupId})">Delete Member</button>

           <button onclick="addMember(${data[i].groupId})">Add Member</button></li>`
        }
        groups.innerHTML = content;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            window.location.href = '../loginRegister/loginRegister.html';
        } else {
            console.log(error);
        }
    }
}

async function deleteGroup(id) {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4000/group/deleteGroup', {
            params: { id },
            headers: { Authorization: `Bearer ${token}` }
        });
        alert(res.data.message);
        showGroup();
    } catch (error) {
        if (error.response && error.response.status === 403) {
            window.location.href = '../loginRegister/loginRegister.html';
        } else {
            console.log(error);
        }
    }
}

async function addMember(id) {
    try {
        const token = localStorage.getItem('token');
        const email = prompt("Enter the correct email to add user");
        const res = await axios.post('http://localhost:4000/group/addMember', { id, email }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert(res.data.message);
        showGroup();
    } catch (error) {
        if (error.response && error.response.status === 403) {
            window.location.href = '../loginRegister/loginRegister.html';
        } else {
            console.log(error);
        }
    }
}

async function deleteMember(id) {
    try {
        const token = localStorage.getItem('token');
        const email = prompt("Enter the correct email to remove the Member from this group");
        const res = await axios.post('http://localhost:4000/group/deleteMember', { id, email }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert(res.data.message);
        showGroup();
    } catch (error) {
        if (error.response && error.response.status === 403) {
            window.location.href = '../loginRegister/loginRegister.html';
        } else {
            console.log(error);
        }
    }
}

async function makeAdmin(id) {
    try {
        const token = localStorage.getItem('token');
        const email = prompt("Enter the correct email to make group admin");
        const res = await axios.post('http://localhost:4000/group/makeAdmin', { id, email }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert(res.data.message);
        showGroup();
    } catch (error) {
        if (error.response && error.response.status === 403) {
            window.location.href = '../loginRegister/loginRegister.html';
        } else {
            console.log(error);
        }
    }
}

showGroup();






//-----------------------logout--------------------//
const logoutButton = document.getElementById("logoutBtn");
logoutButton.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = '../loginRegister/loginRegister.html';
    window.location.reload();
});
//-----------------------logout--------------------//