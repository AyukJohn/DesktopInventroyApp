<template>
  <div class="container">
    <nav class="navbar navbar-expand-sm navbar-light">
      <a class="navbar-brand" href="#">
        <img src="/logo.svg" alt="" />
      </a>
      <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav mt-2 mt-lg-0">
          <router-link to="/" class="nav-link ms-3">
            <span><img src="/tabler_smart-home.svg" alt="" /></span>
            <span class="pt-1 ps-2">Home</span>
          </router-link>

          <router-link to="/inventory" class="nav-link ms-2">
            <span><img src="/tabler_layout-dashboard.svg" alt="" /></span>
            <span class="pt-1 ps-2">Inventory</span>
          </router-link>

          <router-link to="/salesmanagement" class="nav-link ms-2">
            <span><img src="/sale-tag-01.svg" alt="" /></span>
            <span class="pt-1 ps-2">Sales and Orders</span>
          </router-link>

          <router-link to="/analytics" class="nav-link ms-2">
            <span><img src="/chart-bar-line.svg" alt="" /></span>
            <span class="pt-1 ps-2">Analytics</span>
          </router-link>

          <div class="input-container ms-5">
            <img src="/tabler_search.svg" alt="" />
            <input type="text" placeholder="Quick action..." class="input1" />
          </div>

          <span class="ms-3">
            <img src="/notify.svg" alt="" />
          </span>
          

          <!-- Dropdown button for name and logout -->
          <div class="dropdown ms-3">
            <button class="btn1" @click="toggleDropdown">
              <span>{{ name }}</span>
              <span><img src="/tabler_user-filled.svg" alt="" /></span>
            </button>
            <div v-if="isDropdownVisible" class="dropdown-menu">
              <p>{{ name }}</p>
              <button @click="logout" class="logout-btn">Logout</button>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  </div>
</template>






<script>
export default {
  data() {
    return {
      name: null,  // Store name
      isDropdownVisible: false,
      notificationMessage: "", 
    };
  },
  mounted() {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      this.name = storedName;
    }

    const storedNotification = localStorage.getItem("notificationMessage");
    if (storedNotification) {
      this.notificationMessage = storedNotification;
      console.log("Notification message:", this.notificationMessage);
      
    }

    console.log('hi');
    
  },

  
  methods: {
    // Toggle dropdown visibility
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    // Logout function
    logout() {
      localStorage.removeItem("name");  // Remove name from localStorage
      this.name = null;  // Clear the name in component's data
      this.$router.push("/login");
    },
  },
};
</script>







<style scoped>
.navbar {
  border-bottom: 2px solid #bfbfbf7b; /* Customize the color and thickness */
}

.input-container {
  position: relative;
  display: inline-block;
}

.input-container input {
  width: 250px;
  height: 35px; /* Adjust as needed */
  padding: 10px 10px 10px 45px;
  font-size: 16px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 0.1px solid #c8c8c86f;
  outline: none;
  box-shadow: 0 4px 8px rgba(146, 146, 146, 0.1), 0 6px 20px rgba(150, 149, 149, 0.1);
}

.input-container img {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 20px; /* Adjust as needed */
  height: 20px; /* Adjust as needed */
  pointer-events: none; /* Prevent interaction with the image */
}

.btn1 {
  width: 150px;
  height: 35px;
  border-radius: 10px;
  border: 0.1px solid #c8c8c86f;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-menu {
  display: block;
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  top: 50px;
}

.dropdown-menu p {
  margin: 0;
}

.logout-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
}

.logout-btn:hover {
  background-color: darkred;
}
</style>

