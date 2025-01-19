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


        <div class="col-md-6">
          <div class="mt-4">
            <h6 class="ps-4">Revenue</h6>
            <div class="card ms-4 mt-4" v-if="totalRevenue" style="min-width: 200px;">
              <p class="percentage">{{ totalRevenue }}</p>
            </div>
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
                   
                      <img v-if="product.image" :src="product.image" alt="Sample Image" class="product_image">
                   
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
import { openSalesDB, getAllSales } from '../utils/salesDB';
import { openDB, getAllProducts } from '../utils/indexDB';
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
    const bestSellingProduct = ref(null);
    const leastSellingProduct = ref(null);
    const hasData = ref(false);
    const selectedCategory = ref('all');
    const selectedSubCategory = ref('');
    const products = ref([]);
    const salesData = ref([]);
    const revenue = ref(null);
    const totalRevenue = ref('0.00');




    // Fetch all products from IndexedDB
    const fetchProducts = async () => {
      try {
        const db = await openDB(); // Open IndexedDB connection
        products.value = await getAllProducts(db); // Fetch all products
        console.log('Fetched Products:', products.value);  // Log to check if products are fetched correctly
        hasData.value = products.value.length > 0; // Check if data exists
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Fetch all sales data from IndexedDB
    const fetchSalesData = async () => {
  try {
    const db = await openSalesDB();
    const sales = await getAllSales(db);

    console.log(sales);
    
    
    if (sales && sales.length > 0) {
      hasData.value = true;
      salesData.value = sales;

      // Process grouped sales data
      const productSales = {};
      let totalSales = 0;


      totalRevenue.value = sales.reduce((total, sale) => {
            return total + parseFloat(sale.totalAmount || 0);
          }, 0).toFixed(2);
          

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
      initSalesChart(sales);
    } else {
      hasData.value = false;
    }
  } catch (error) {
    console.error('Error fetching sales data:', error);
  }
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




    // Initialize sales chart
    const initSalesChart = (sales) => {
  nextTick(() => {
    const MONTHLY_TARGET = 100; // Target threshold
    const months = moment.months();
    const salesByMonth = months.reduce((acc, month) => {
      acc[month] = 0;
      return acc;
    }, {});

    // Calculate monthly quantities
    sales.forEach(sale => {
      if (sale.status === 'Completed' && sale.items) {
        const month = moment(sale.created_at, 'DD/MM/YYYY, HH:mm:ss').format('MMMM');
        const monthlyQuantity = sale.items.reduce((sum, item) => 
          sum + parseInt(item.quantity || 0), 0
        );
        salesByMonth[month] += monthlyQuantity;
      }
    });

    // Calculate percentages against 100 product threshold
    const percentagesByMonth = months.map(month => 
      ((salesByMonth[month] / MONTHLY_TARGET) * 100).toFixed(1)
    );

    const ctx = document.getElementById('salesChart');
new Chart(ctx, {
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