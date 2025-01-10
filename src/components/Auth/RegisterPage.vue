<template>
    <div class="auth-container">
      <div class="form-wrapper">
        <h2 class="title">{{ userId ? "Update Account" : "Create an Account" }}</h2>
  
        <!-- Registration form -->
        <form v-if="!userId" @submit.prevent="register" class="form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input v-model="name" type="text" id="name" placeholder="Enter your full name" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" id="password" placeholder="Enter your password" required />
          </div>
          <div class="form-group">
            <label for="role">Role</label>
            <select v-model="role" id="role" required>
              <option value="admin">Admin</option>
              <option value="receptionist">Receptionist</option>
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
import { openDB, addUser, getAllUsers } from "../../utils/userDB";  // Import getAllUsers for checking name
import CryptoJS from "crypto-js"; // Importing crypto-js for hashing

export default {
  data() {
    return {
      name: "",
      password: "",
      role: "", // Default role
      userId: null, // Set to null by default for registration
      errorMessage: "",
    };
  },
  created() {
    // If userId is passed in route params, fetch the user to update
    if (this.$route.params.userId) {
      this.userId = this.$route.params.userId;
      this.fetchUser();
    }
  },
  methods: {
    async register() {
      try {
        // Open the database
        const db = await openDB();

        // Check if the name already exists
        const users = await getAllUsers(db);
        const userExists = users.some(user => user.name === this.name);  // Check if name is taken

        if (userExists) {
          this.errorMessage = "Name is already taken. Please choose another.";
          return;  // Exit the registration if the name is not unique
        }

        // Hash the password before storing it
        const hashedPassword = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Base64);

        // Create a user object with hashed password
        const user = {
          name: this.name,
          password: hashedPassword, // Store the hashed password
          role: this.role,
        };

        console.log(user);
        

        // Add user to the database
        await addUser(db, user);

        // Redirect to login page after successful registration
        this.$router.push("/login");
      } catch (error) {
        this.errorMessage = "Error accessing database: " + error;
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
  