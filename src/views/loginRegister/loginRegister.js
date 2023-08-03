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