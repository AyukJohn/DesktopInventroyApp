<template>
  <div class="container">
    <nav class="navbar navbar-expand-sm navbar-light">
      <a class="navbar-brand" href="#">
        <img src="/logo.jpg" alt="" style="width: 50px; border-radius: 50px;"/>
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

          <router-link to="/wholeandretail" class="nav-link ms-2">
            <span><img src="/material-symbols_add-business-outline-rounded.svg" alt="" /></span>
            <span class="pt-1 ps-2">WholeSale</span>
          </router-link>

          <router-link to="/inventory" class="nav-link ms-2">
            <span><img src="/tabler_layout-dashboard.svg" alt="" /></span>
            <span class="pt-1 ps-2">Retail</span>
          </router-link>

          <router-link to="/salesmanagement" class="nav-link ms-2">
            <span><img src="/sale-tag-01.svg" alt="" /></span>
            <span class="pt-1 ps-2">Sales and Orders</span>
          </router-link>

          <router-link v-if="name === 'Admin'" to="/analytics" class="nav-link ms-2">

            <span><img src="/chart-bar-line.svg" alt="" /></span>
            <span class="pt-1 ps-2">Analytics</span>
          </router-link>

          <!-- <span class="ms-5">
            <img src="/notify.svg" alt="" />
          </span> -->

          <!-- Dropdown button for name and logout -->
          <div class="dropdown">
            <button class="btn1" @click="toggleDropdown">
              <span>{{ name }}</span>
              <span><img src="/tabler_user-filled.svg" alt="" /></span>
            </button>

            <div v-if="isDropdownVisible" class="dropdown-menu">
              <button @click="logout" class="btn btn-sm logout-btn me-5">Log out</button>
              <button id="uploadDataButton" class="btn btn-sm logout-btn me-5" @click="uploadDataToServer">Upload Data</button>
            </div>

          </div>
        </ul>
      </div>
    </nav>
    
    <!-- <div class="upload-container mt-4" v-if="name === 'Admin'">
      <button id="uploadDataButton" class="btn btn-primary" @click="uploadDataToServer">
        Upload Data
      </button>
    </div> -->
  </div>
</template>

<script>
import { openSalesDB, getAllSales } from '../../utils/salesDB';
import { openDB, getAllProducts } from '../../utils/indexDB';
import { openSupplierDB, getAllSuppliers } from '../../utils/supplierDB';


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
        // console.log("Notification message:", this.notificationMessage);
      }
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

      // Function to fetch data from IndexedDB
      async fetchDataFromIndexedDB() {
        try {

          const productsDB = await openDB();

          const allProducts = await getAllProducts(productsDB);

            if (!allProducts || allProducts.length === 0) {
                alert('No product data found');
                return;
            }

          const products = await getAllProducts(productsDB).then((data) =>
            data.map((product) => ({
              type: "product",
              brandName: product.brandName,
              category: product.category,
              costPrice: product.costPrice,
              sellingPrice: product.sellingPrice,
              description:  product.description,
              productInventory:  product.productInventory,
              reference:  product.reference,
              size:  product.size,
            }))
          );



          const salesDB = await openSalesDB();


          const allSales = await getAllSales(salesDB);
            if (!allSales || allSales.length === 0) {
              alert('No sales data found');
              return;
            }
          
          const sales = await getAllSales(salesDB).then((data) =>
            data.flatMap((transaction) => 
              transaction.items.map((saleItem) => ({
                type: "sale",
                item: saleItem.item,
                unit_price: saleItem.unit_price,
                quantity: saleItem.quantity,
                amount: saleItem.amount,
                transactionNumber: transaction.transactionNumber,
                status: transaction.status,
              }))
            )
          );

          const supplierDB = await openSupplierDB();

          const allSuppliers = await getAllSuppliers(supplierDB);
            if (!allSuppliers || allSuppliers.length === 0) {
              alert('No supplier data found');
              return;
            }


          const suppliers = await getAllSuppliers(supplierDB).then((data) =>
            data.map((supplier) => ({
              type: "supplier",
              supplierName: supplier.name,
              phoneNumber: supplier.phoneNumber,
              address: supplier.location,
              supplyCount: supplier.supplyCount,
            }))
          );

          // Combine all data
          return [...products, ...sales, ...suppliers];
        }catch (error) {
          console.error("Error fetching data from IndexedDB:", error);
          throw error;
        }
      },

      // Function to upload data to the server
      async uploadDataToServer() {
          try {
            const combinedData = await this.fetchDataFromIndexedDB();

            console.log(combinedData);
            

            // Send data to Laravel API

            const response = await fetch('https://backendpro.elechiperfumery.com.ng/api/v1/properties/store', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({ uploads: combinedData }),
            });

            if (response.ok) {
              const result = await response.json();
              console.log("Data uploaded successfully:", result);
              alert('Data uploaded successfully!')
            } else {
              console.error("Failed to upload data:", response.status, response.statusText);
            }
          } catch (error) {
            console.error("Error uploading data to server:", error);
          }
      },
    },
};
</script>

<style scoped>
/* Add your styles here */
</style>








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
  color: #000;
  border: 1px solid #67626266;
  /* padding: 5px; */
  cursor: pointer;
  margin-top: 10px;
  border-radius: 10px;
  width: 10vw;
}

/* .logout-btn:hover {
  background-color: darkred;
} */

/* span{
  font-size: x-small;
} */

</style>

