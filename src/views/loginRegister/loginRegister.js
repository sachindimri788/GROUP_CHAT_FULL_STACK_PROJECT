const registrationForm = document.getElementById('registrationForm');

registrationForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('userEmail').value;
  const phone=document.getElementById('phone').value;
  const password = document.getElementById('userPassword').value;
  const data = { name, email, phone,password };

  try {
    const userInfo = await axios.post('http://localhost:4000/user/register', data);
    alert(userInfo.data.message)
    registrationForm.reset(); 
  } catch (error) {
    alert(error.response.data.message)
    registrationForm.reset(); 
    console.error(error);
  }
});


const loginForm=document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const data = { email, password };

  try {
    const userInfo = await axios.post('http://localhost:4000/user/login', data);
    localStorage.setItem('token', userInfo.data.token);
   // window.location.href = "../homePage/homePage.html";

    loginForm.reset(); 
  } catch (error) {
    alert(error.response.data.message)
    loginForm.reset(); 
    console.error(error);
  }
});