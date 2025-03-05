<template>
    <div>
      <h3 class="pt-5" style="margin-left: 10%;">Users</h3>
      <div class="container mt-5">
        <ul class="d-flex justify-content-between pt-3 mb-4">
          <li>User</li>
          <li>User Level</li>
          <li>Action</li>
        </ul>
  
        <ul v-for="user in users" :key="user.id" class="d-flex justify-content-between">
          <li>{{ user.user_name }}</li>
          <li>{{ user.name }}</li>
          <li>
            <button 
              class="btn btn-sm col-12 btn-danger" 
              @click="deleteUser(user.id)"
            >
              Remove User
            </button>
          </li>
        </ul>
      </div>
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
    </div>
  </template>
  




<script>
export default {
  data() {
    return {
      users: [], // Array to store fetched users
      errorMessage: "", // Error message for display
    };
  },
  async created() {
    try {
      // Fetch users from the API
      const response = await fetch("https://tutotrial.primoenergyoilandgas.com/api/v1/users/users");
      if (response.ok) {
        this.users = await response.json(); // Assign the fetched users to the data property
      } else {
        const errorData = await response.json();
        this.errorMessage = errorData.message || "Failed to fetch users.";
      }
    } catch (error) {
      this.errorMessage = "An error occurred: " + error.message;
    }
  },
  methods: {
    async deleteUser(userId) {
      if (confirm("Are you sure you want to remove this user?")) {
        try {
          // Send DELETE request to the API
          const response = await fetch(`https://tutotrial.primoenergyoilandgas.com/api/v1/users/deleteUser/${userId}`, {
            method: "DELETE",
          });

          if (response.ok) {
            // Remove the deleted user from the local `users` array
            this.users = this.users.filter(user => user.id !== userId);
          } else {
            const errorData = await response.json();
            this.errorMessage = errorData.message || "Failed to delete user.";
          }
        } catch (error) {
          this.errorMessage = "An error occurred while deleting the user: " + error.message;
        }
      }
    },
  },
};
</script>


<style scoped>

    ul{
        list-style: none;
    }

    .container{
        background-color: #f5f5f5;
    }
</style>
