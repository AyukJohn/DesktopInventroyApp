<template>
  <div class="dashboard container mt-5">
    <div class="title">
      <h2>Analytics</h2>
    </div>

    <div class="row">
      <div class="col-md-6">
        <h5>Sales Performance</h5>
        <div class="card chart-card mt-4" style="min-width: 400px;">
          <h6>Activity</h6>
          <canvas id="salesChart"></canvas>
        </div>
      </div>

      <div class="col-md-6">
        <div v-if="!hasData" class="no-data">
          <p>No Data Available</p>
        </div>

        <div class="d-flex">
          <div>
            <h6>Best Selling Product</h6>
            <div class="card mt-4" v-if="bestSellingProduct" style="min-width: 200px;">
              <p class="nametext">{{ bestSellingProduct.name }}</p>
              <p class="percentage">{{ bestSellingProduct.percentage }}%</p>

             

            </div>
          </div>

          <div>
            <h6 class="ps-4">Least Selling Product</h6>
            <div class="card ms-4 mt-4" v-if="leastSellingProduct" style="min-width: 200px;">
              <p class="nametext">{{ leastSellingProduct.name }}</p>
              <p class="percentage">{{ leastSellingProduct.percentage }} %</p>
            </div>
          </div>

        </div>


        <!-- <div class="col-md-6">
          <div class="mt-4">
            <h6 class="ps-4">Revenue</h6>
            <div class="card ms-4 mt-4" v-if="totalRevenue" style="min-width: 200px;">
              <p class="percentage">{{ new Intl.NumberFormat('en-US').format(totalRevenue) }}</p>
            </div>
          </div>
        </div> -->


        <div class="col-md-6">
  <div class="mt-4">
    <h6 class="ps-4">Revenue</h6>
    <div class="card ms-4 mt-4" v-if="totalRevenue" style="min-width: 200px;">
      <p class="percentage">{{ new Intl.NumberFormat('en-US').format(totalRevenue) }}</p>
    </div>
  </div>
</div>

<!-- Add month selection using <select> -->
<div class="col-md-6">
  <div class="mt-4">
    <h6 class="ps-4">Select Month</h6>
    <select v-model="selectedMonth" @change="selectMonth" class="form-select">
      <option v-for="(month, index) in months" :key="index" :value="month">
        {{ month }}
      </option>
    </select>
  </div>
</div>




  
      </div>
    </div>

  


        <div class="mt-5">
          <h5>Profit margins</h5>
        </div>

        <div class="mt-5">
          <!-- Category Filter -->
          <ul class="table-list">
            <li class="ms-3 cursor-pointer" @click="filterCategory('all')">
              <span>All</span>
            </li>
            <li class="cursor-pointer" @click="filterCategory('category')">
              <span>Category</span>
            </li>
            <li class="cursor-pointer" @click="filterCategory('type')">
              <span>Type</span>
            </li>
          </ul>

          <hr>

          <!-- Subcategory Filter for Fragrance -->
          <div class="mt-4" v-if="selectedCategory === 'category'">
            <ul class="table-list2">
                
                <li class="ms-4" @click="filterSubCategory('rollon')"><span>Rollon</span></li>
                <li class="ms-3" @click="filterSubCategory('airfreshness')"><span>Airfreshness</span></li>
                <li class="ms-3" @click="filterSubCategory('bodysplash')"><span>Bodysplash</span></li>
                <li class="ms-3" @click="filterSubCategory('deodorantspray')"><span>deodorantspray</span></li>
                <li class="ms-3" @click="filterSubCategory('bodymist')"><span>Bodymist</span></li>
                <li class="ms-3" @click="filterSubCategory('roomdiffusers')"><span>Roomdiffusers</span></li>
                <li class="ms-3" @click="filterSubCategory('perfume')"><span>Perfume</span></li>


            </ul>

          </div>

          <!-- Subcategory Filter for Gender -->
          <div class="mt-4" v-if="selectedCategory === 'type'">
            <ul class="table-list2">
                <li class="ms-4" @click="filterSubCategory('regular')"><span>Regular</span></li>
                <li class="ms-3" @click="filterSubCategory('designers')"><span>Designers</span></li>
            </ul>
          </div>

          <!-- Product Cards -->
          <div class="row row-cols-1 row-cols-md-4 g-4 mt-5">
              <div v-if="filteredProductList.length === 0" class="col-12 text-center no-products">
                <p>No products found.</p>
              </div>

            <div v-for="product in filteredProductList" :key="product.i" class="col">
              <div class="card h-100">
                <div class="card-body">
                  <div class="header-row d-flex justify-content-between">
                   
                      <!-- <img v-if="product.image" :src="product.image" alt="Sample Image" class="product_image"> -->
                   
                      <p class="mb-0 ps-4 pt-2" style="font-size: 11px;">{{ product.brandName }}</p>
                 
                  </div>





                  <div>

                    <div class="stockHolder d-flex justify-content-between">
  
                    
                      <div class="stockHolder1">
                        <h6 class="picetag">Cost Price</h6>
                        <p class="priceholder" style="font-size: 15px;">
                          {{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(product.costPrice || 0) }}
                        </p>
                      </div>
  
                      <div class="stockHolder2">
                        <h6 class="picetag">Selling Price</h6>
                        <p  class="priceholder" style="font-size: 15px;">
                          {{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(product.sellingPrice || 0) }}
                        </p>
                      </div>


                    </div>

 
                      <div class="stockHolderDifference d-flex justify-content-around">
                        <h6 class="picetagdif">Margin</h6>
                         <p class="totalHolder">{{ new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(product.sellingPrice - product.costPrice || 0) }}</p>
                      </div>

                  </div>



                </div>
              </div>
            </div>
          </div>
        </div>


  </div>
</template>








<script>
import { defineComponent, ref, computed, onMounted, nextTick } from 'vue';
// import { openSalesDB, getAllSales } from '../utils/salesDB';
// import { openDB, getAllProducts } from '../utils/indexDB';
// import axios from 'axios';
import Chart from 'chart.js/auto';
import moment from 'moment';


export default defineComponent({


  mounted() {
  let userLogin = localStorage.getItem('name');
  if (userLogin !== 'Admin') { // Use strict inequality
    this.$router.push({ name: 'login' }); // Redirect to login if not Admin
  }
},


  setup() {
    // Reactive references
    const months = ref([
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]);


    const bestSellingProduct = ref(null);
    const leastSellingProduct = ref(null);
    const hasData = ref(false);
    const selectedCategory = ref('all');
    const selectedSubCategory = ref('');
    const products = ref([]);
    const salesData = ref([]);
    const revenue = ref(null);
    const totalRevenue = ref('0.00');
    const selectedMonth = ref(months.value[new Date().getMonth()]); 




    // Fetch all products from IndexedDB
    // const fetchProducts = async () => {
    //   try {
    //     const db = await openDB(); // Open IndexedDB connection
    //     products.value = await getAllProducts(db); // Fetch all products
    //     console.log('Fetched Products:', products.value);  // Log to check if products are fetched correctly
    //     hasData.value = products.value.length > 0; // Check if data exists
    //   } catch (error) {
    //     console.error('Error fetching products:', error);
    //   }
    // };




    const fetchProducts = async () => {
      try {
        const response = await fetch('https://tutotrial.primoenergyoilandgas.com/api/v1/properties/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        products.value = data.data;

        // console.log('Fetched Products:', products.value);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };




    // Fetch all sales data from IndexedDB
    const fetchSalesData = async () => {
      try {


        const response = await fetch('https://tutotrial.primoenergyoilandgas.com/api/v1/properties/sales');
        const sale_data = await response.json();
        const sales = sale_data.data;
        const completedSales = sales.filter(sale => sale.status === 'Completed');
        // console.log(completedSales);

        // const db = await openSalesDB();
        // const sales = await getAllSales(db);
        // const completedSales = sales.filter(sale => sale.status === 'Completed');

        
        
        if (sales && sales.length > 0) {
          hasData.value = true;
          salesData.value = completedSales;

          // Process grouped sales data
          const productSales = {};
          let totalSales = 0;


          // totalRevenue.value = completedSales.reduce((total, sale) => {
          //       return total + parseFloat(sale.total_amount || 0);
          //     }, 0).toFixed(2);


          selectMonth(); 
              

          sales.forEach(sale => {
            if (sale.status === 'Completed' && sale.items) {
              sale.items.forEach(item => {
                const itemName = item.item;
                const itemAmount = parseFloat(item.amount) || 0;
                const itemQuantity = parseInt(item.quantity) || 0;

                if (!productSales[itemName]) {
                  productSales[itemName] = {
                    amount: 0,
                    quantity: 0
                  };
                }

                productSales[itemName].amount += itemAmount;
                productSales[itemName].quantity += itemQuantity;
                totalSales += itemAmount;
              });
            }
          });

          // Calculate best and least selling products
          const sortedProducts = Object.entries(productSales)
            .sort((a, b) => b[1].quantity - a[1].quantity);

          if (sortedProducts.length > 0) {
            bestSellingProduct.value = {
              name: sortedProducts[0][0],
              quantity: sortedProducts[0][1].quantity,
              percentage: ((sortedProducts[0][1].amount / totalSales) * 100).toFixed(2)
            };

            leastSellingProduct.value = {
              name: sortedProducts[sortedProducts.length - 1][0],
              quantity: sortedProducts[sortedProducts.length - 1][1].quantity,
              percentage: ((sortedProducts[sortedProducts.length - 1][1].amount / totalSales) * 100).toFixed(2)
            };

            revenue.value = totalSales.toFixed(2);
          }

          // Initialize chart with processed data
          // console.log('Sales Data:', completedSales);
          initSalesChart(completedSales);
        } else {
          hasData.value = false;
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };


    // Function to select month and filter revenue
    const selectMonth = () => {
      const selectedMonthIndex = months.value.indexOf(selectedMonth.value); // Get the numeric month (0-11)

      // Filter sales data based on the selected month
      const filteredSales = salesData.value.filter(sale => {
        const saleDate = new Date(sale.created_at);  // Parse the created_at date string into a Date object
        return saleDate.getMonth() === selectedMonthIndex;  // Compare if the sale occurred in the selected month
      });

      // Calculate total revenue for the selected month
      totalRevenue.value = filteredSales.reduce((total, sale) => {
        return total + parseFloat(sale.total_amount || 0);  // Sum up the total amount
      }, 0).toFixed(2);  // Format the revenue to 2 decimal places
    };





    // Filtered products list based on selected category and subcategory
    const filteredProductList = computed(() => {
      if (selectedCategory.value === 'all') return products.value;

      return products.value.filter((product) => {
        if (selectedCategory.value === 'type' && selectedSubCategory.value) {
          return product.type === selectedSubCategory.value;
        }

        if (selectedCategory.value === 'category' && selectedSubCategory.value) {
          return product.category === selectedSubCategory.value;
        }

        return true;
      });
    });

    // Filter products by category
    const filterCategory = (category) => {
      selectedCategory.value = category;
      selectedSubCategory.value = '';
    };

    // Filter products by subcategory
    const filterSubCategory = (subCategory) => {
      selectedSubCategory.value = subCategory;
    };




    let salesChart; // Declare globally to manage chart instance

const initSalesChart = async () => {
  nextTick(async () => {
    const MONTHLY_TARGET = 100; // Target threshold
    const months = moment.months(); // Array of month names
    const salesByMonth = months.reduce((acc, month) => {
      acc[month] = 0;
      return acc;
    }, {});

    try {
      // Fetch sales data from the API
      const response = await fetch('https://tutotrial.primoenergyoilandgas.com/api/v1/properties/sales');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const apiResponse = await response.json();
      const sales = apiResponse.data; // Adjusted for data.data

      // Debugging: Log fetched sales data
      // console.log("Fetched Sales Data:", sales);

      // Calculate monthly quantities
      sales.forEach(sale => {
        if (sale.status === 'Completed' && sale.items) {
          // Debugging: Log created_at value
          // console.log("Sale Created At:", sale.created_at);

          // Parse the date; adjust format if necessary
          const month = moment(sale.created_at, 'YYYY-MM-DDTHH:mm:ssZ').format('MMMM'); // ISO 8601 example
          const monthlyQuantity = sale.items.reduce((sum, item) => 
            sum + parseInt(item.quantity || 0), 0
          );
          salesByMonth[month] += monthlyQuantity;
        }
      });

      // Debugging: Log calculated sales by month
      // console.log("Sales by Month:", salesByMonth);

      // Calculate percentages against the monthly target
      const percentagesByMonth = months.map(month => 
        ((salesByMonth[month] / MONTHLY_TARGET) * 100).toFixed(1)
      );

      // Debugging: Log calculated percentages
      // console.log("Percentages by Month:", percentagesByMonth);

      // Ensure the canvas exists
      const ctx = document.getElementById('salesChart');
      if (!ctx) {
        console.error('Canvas element not found');
        return;
      }

      // Destroy the previous chart instance if it exists
      if (salesChart) {
        salesChart.destroy();
      }

      // Create the new chart
      salesChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [{
            label: 'Monthly Target Achievement (%)',
            data: percentagesByMonth,
            backgroundColor: 'rgba(40, 167, 69, 0.7)', // Bolder green
            borderColor: 'rgb(25, 135, 84)',           // Darker green border
            borderWidth: 2,
            borderRadius: 8,                           // Rounded corners
            barThickness: 25                          // Thicker bars
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 10,                         // Steps of 10
                font: {
                  weight: 'bold'                      // Bold numbers
                },
                callback: value => `${value}%`
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'          // Lighter grid lines
              }
            },
            x: {
              grid: {
                display: false                        // Remove x-axis grid
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw;
                  const actualSales = salesByMonth[context.label];
                  return `${value}% (${actualSales}/100 products)`;
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Failed to fetch sales data:', error);
    }
  });
};






    onMounted(() => {
      nextTick(async () => {
        await fetchProducts();
        await fetchSalesData();
        initSalesChart(); // Initialize chart after data is fetched
      });
    });



    
    
    
    return {
      bestSellingProduct,
      leastSellingProduct,
      hasData,
      filteredProductList,
      selectedCategory,
      selectedSubCategory,
      filterCategory,
      filterSubCategory,
      totalRevenue,

      months,  // Make sure months is returned
      selectedMonth, // Make sure totalRevenue is returned
      selectMonth,
    };
    
  },
 

});
</script>




















<style scoped>



.table-list,
.table-list2 {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
}

.table-list li,
.table-list2 li {
  /* padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9; */
  transition: background-color 0.3s ease;
}

.table-list li:hover,
.table-list2 li:hover {
  /* background-color: #e0e0e0; */
  cursor: pointer;
}

.no-products p {
  font-size: 1.2rem;
  color: #888;
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.header-row {
  /* border-bottom: 1px solid #eee; */
  padding-bottom: 0.5rem;
}

.header-row img {
  width: 20px;
  height: 20px;
}

.stockHolder {
  margin-top: 1rem;
}

.stockHolder h6 {
  margin: 0;
}

.sub {
  font-size: 0.85rem;
}






.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1;
  padding: 20px;
  border: none;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.chart-card {
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.card h2 {
  margin-bottom: 10px;
}

.card p {
  margin-bottom: 10px;
}

.no-data {
  text-align: center;
  font-size: 18px;
  color: #888;
}

.revenucard {
  max-width: 200px;
}

.nametext {
  font-weight: 100;
  font-size: small;
}

.product_image{
  width: 70px !important;
  height: 70px !important;
  border-radius: 50%;
}


.stockHolder {
  display: flex;
  gap: 10px;

}

.stockHolder1, .stockHolder2 {
  width: 200px;
  height: 80px; 
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  border: 1px solid #ccc; 
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
  background-color: #f9f9f9;
}



.sub {
  font-size: small;
}

.picetag{
  font-size: x-small;
  font-weight: lighter;
}


.info{
  margin-bottom: 4%;
}

.stockHolderDifference {
  margin-top: 8%;
  width: 120px; 
  height: 30px; 
  background-color: #40894B1A; 
  border-radius: 8px;
}

.picetagdif{
  font-size: x-small;
  padding-top: 7%;
}

.totalHolder{
  font-size: small;
  color: #329141;
  padding-top: 4%;
}
</style>