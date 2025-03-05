<template>
    <div class="auth-container">
      <div class="form-wrapper">
        <h2 class="title">{{ userId ? "Update Account" : "Create an Account" }}</h2>
  
        <!-- Registration form -->
        <form v-if="!userId" @submit.prevent="register" class="form">

          <div class="form-group">
            <label for="user_name">UserName</label>
            <input v-model="user_name" type="text" id="name" placeholder="Enter your UserName" required />
          </div>

          <div class="form-group">
            <label for="user_name">Email</label>
            <input v-model="email" type="email" id="email" placeholder="Enter your Email" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" id="password" placeholder="Enter your Password" required />
          </div>

          <div class="form-group">
            <label for="role">Role</label>
            <select v-model="name" id="name" required>
              <option value="Admin">Admin</option>
              <option value="Receptionist">Receptionist</option>
            </select>
          </div>

          <button type="submit" class="btn primary-btn">Register</button>
        </form>
  
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  
        <p class="redirect-text">
          Already have an account? <router-link to="/login">Login</router-link>
        </p>
      </div>
    </div>
  </template>


  
<script>

export default {
  data() {
    return {
      name: "",
      user_name: "",
      password: "",
      email: "",
      errorMessage: "",
      isAdmin: false,
    };
  },


  mounted() {

  const userLogin = localStorage.getItem('name');
  if (!userLogin) {
    this.$router.push({ name: 'login' });
  } else {
    this.name = userLogin;
    // Check if the logged-in user is 'Admin'
    this.isAdmin = this.name === 'Admin';
  }

},

  methods: {
    async register() {
      try {


        // Create a user object with hashed password
        const user = {
          name: this.name,
          password: this.password, // Send the hashed password
          user_name: this.user_name,
          email: this.email,
        };

        console.log("Sending user data to server:", user);

        // Send the registration data to the server
        const response = await fetch("https://tutotrial.primoenergyoilandgas.com/api/v1/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(user),
        });

        this.$router.push("/users");
        const responseData = await response.json();
        console.log("Registration successful:", responseData);

      } catch (error) {
        this.errorMessage = "An error occurred during registration: " + error.message;
        console.error(error);
      }
    },

  },
};
</script>



  
  <style scoped>
  /* General container */
  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f7fc;
  }
  
  /* Form wrapper */
  .form-wrapper {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 30px;
    width: 100%;
    max-width: 450px;
  }
  
  .title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 600;
    color: #333;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  /* Form field */
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .form-group label {
    font-size: 14px;
    color: #555;
  }
  
  .form-group input,
  .form-group select {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;
  }
  
  .form-group input:focus,
  .form-group select:focus {
    border-color: #0066cc;
  }
  
  /* Buttons */
  .btn {
    padding: 12px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
  }
  
  .primary-btn {
    background-color: #0066cc;
    color: white;
    border: none;
  }
  
  .primary-btn:hover {
    background-color: #004a99;
  }
  
  .update-btn {
    background-color: #4caf50;
    color: white;
    border: none;
  }
  
  .update-btn:hover {
    background-color: #388e3c;
  }
  
  .delete-btn {
    background-color: #e74c3c;
    color: white;
    border: none;
  }
  
  .delete-btn:hover {
    background-color: #c0392b;
  }
  
  /* Error message */
  .error {
    color: #e74c3c;
    font-size: 14px;
    text-align: center;
  }
  
  /* Redirect to login */
  .redirect-text {
    text-align: center;
    font-size: 14px;
    color: #555;
  }
  
  .redirect-text a {
    color: #0066cc;
  }
  
  .redirect-text a:hover {
    text-decoration: underline;
  }
  
  /* Responsive design */
  @media (max-width: 600px) {
    .form-wrapper {
      width: 90%;
      padding: 20px;
    }
  
    .title {
      font-size: 20px;
    }
  }
  </style>
  