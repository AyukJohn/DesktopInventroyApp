<template>
  <div class="auth-container">
    <div class="form-wrapper">
      <h2 class="title">Login</h2>

      <form @submit.prevent="login" class="form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          class="btn primary-btn"
          :disabled="isLoading"
        >
          Login
        </button>
      </form>

      <!-- Loading animation -->
      <div v-if="isLoading" class="loading-spinner">
        <div class="spinner"></div>
        <p>Connecting...</p>
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      isLoading: false, // State to track loading
    };
  },
  methods: {
    async login() {
      this.isLoading = true; // Start loading animation
      this.errorMessage = ""; // Clear previous errors

      try {
        const response = await axios.post(
          "http://inventbackend.primoenergyoilandgas.com/api/v1/users/login",
          {
            email: this.email,
            password: this.password,
          }
        );

        if (response.data.access_token) {
          
          const name = response.data.user.name;
          localStorage.setItem("authToken", response.data.access_token);
          localStorage.setItem("name", name);

          window.location.replace("/");
        } else {
          this.errorMessage =
            response.data.message || "Login failed. Please try again.";
        }
      } catch (error) {
        console.error("Error during login:", error);
        if (error.response && error.response.data) {
          this.errorMessage =
            error.response.data.message || "Invalid email or password.";
        } else {
          this.errorMessage = "An unknown error occurred. Please try again.";
        }
      } finally {
        this.isLoading = false; // Stop loading animation
      }
    },
  },
};
</script>

<style scoped>
/* Loading spinner container */
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.spinner {
  border: 4px solid #f3f3f3; /* Light gray */
  border-top: 4px solid #31890e; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-spinner p {
  margin-top: 10px;
  color: #0066cc;
  font-size: 14px;
}

.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f7fc;
}

.form-wrapper {
  background-color: white;
  border-radius: 15px;
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

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-size: 14px;
  color: #555;
}

.form-group input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #0066cc;
}

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
  background-color: #329141;
  border-radius: 12px;
  color: white;
  border: none;
}

.primary-btn:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.primary-btn:hover:enabled {
  background-color: #388032;
}

.error {
  color: #e74c3c;
  font-size: 14px;
  text-align: center;
}
</style>
