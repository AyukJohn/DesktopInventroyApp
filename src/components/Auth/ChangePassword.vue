<template>
    <div class="auth-container">
        <div class="form-wrapper">
            <h2 class="title">{{ userId ? "Update Account" : "Change Password" }}</h2>
    
            <!-- Registration form -->
            <form v-if="!userId" @submit.prevent="changePassword" class="form">

                <div class="form-group">
                    <label for="password">Old Password</label>
                    <input v-model="old_password" type="password" id="password" placeholder="Enter your Old Password" required />
                </div>
                

                <div class="form-group">
                    <label for="password">New Password</label>
                    <input v-model="new_password" type="password" id="password" placeholder="Enter your New  Password" required />
                </div>

                <button type="submit" class="btn primary-btn">ChangePassword</button>
            </form>

            <div v-if="isLoading" class="loading-spinner">
                <div class="spinner"></div>
                <p>Connecting...</p>
            </div>
    
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    
        </div>
    </div>
  </template>


  
<script>

export default {
  data() {
    return {
      old_password: "",
      new_password: "",
      errorMessage: "",
      isAdmin: false,
      isLoading: false,
    };
  },


  mounted() {

    // const auth = localStorage.getItem("authToken");
    // console.log(auth)


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
    async changePassword() {
        this.isLoading = true; 


        try {
            // User input data
            const user = {
                current_password: this.old_password,
                new_password: this.new_password,
            };

            console.log("Sending password change request:", user);

            // Get the auth token from localStorage or Vuex (wherever you store it)
            const token = localStorage.getItem("authToken");

            // Send request to the correct API endpoint
            const response = await fetch("https://tutotrial.primoenergyoilandgas.com/api/v1/users/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}` // Attach the auth token
                },
                body: JSON.stringify(user),
            });

            // Parse the response
            const responseData = await response.json();

            // Handle successful response
          
            console.log("Password change successful:", responseData);
            alert("Password changed successfully!");
            localStorage.removeItem("name");
            this.$router.push("/login"); 
        

        }  catch (error) {
            console.error("Error during Change of password:", error);
            if (error.response && error.response.data) {
            this.errorMessage =
                error.response.data.message || "Invalid password.";
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
  