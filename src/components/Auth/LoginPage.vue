<template>
  <div class="auth-container">
    <div class="form-wrapper">
      <h2 class="title">Login to Your Account</h2>

      <form @submit.prevent="login" class="form">
        <div class="form-group">
          <label for="name">Username</label>
          <input v-model="name" type="text" id="name" placeholder="Enter your username" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password" placeholder="Enter your password" required />
        </div>

        <button type="submit" class="btn primary-btn">Login</button>
      </form>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <!-- <p class="redirect-text">
        Don't have an account? <router-link to="/register">Register</router-link>
      </p> -->

      <!-- <p class="forgot-password">
        <router-link to="/reset-password">Forgot password?</router-link>
      </p> -->
    </div>
  </div>
</template>

<script>
import { openDB, getAllUsers } from "../../utils/userDB";
import CryptoJS from "crypto-js";

export default {
  data() {
    return {
      name: "",  // Using 'name' as the field for the username
      password: "",
      errorMessage: "",
      rememberMe: false, // Remember Me checkbox
    };
  },
  methods: {

async login() {
  try {
    const db = await openDB();
    console.log("Database opened successfully");

    // Retrieve all users from the database
    const users = await getAllUsers(db);
    const user = users.find(user => user.name === this.name);  // Find user by name
    console.log("User retrieved:", user);

    // Check if user exists
    if (!user) {
      this.errorMessage = "User not found";
      return;
    }

    // Hash the entered password
    const hashedPassword = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Base64);

    // Validate password
    if (user.password === hashedPassword) {
      localStorage.setItem("loggedIn", "true");
  
        localStorage.setItem("name", this.name);
        const storedName = localStorage.getItem("name");
        console.log(storedName);
        
      // this.$router.push("/");
      window.location.replace('/'); 
    } else {
      this.errorMessage = "Invalid username or password";
    }
  } catch (error) {
    console.error("Error during login:", error);
    if (error.name === 'DatabaseError') {
      this.errorMessage = "Database error occurred";
    } else {
      this.errorMessage = "An unknown error occurred";
    }
  }
}



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

.remember-me {
  text-align: left;
}

.forgot-password {
  margin-top: 10px;
}

.forgot-password a {
  color: #0066cc;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

.error {
  color: #e74c3c;
  font-size: 14px;
  text-align: center;
}

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
