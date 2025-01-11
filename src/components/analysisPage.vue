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
              <p class="percentage">{{ leastSellingProduct.percentage }} %</p>
            </div>
          </div>

          <div>
            <h6 class="ps-4">Least Selling Product</h6>
            <div class="card ms-4 mt-4" v-if="leastSellingProduct" style="min-width: 200px;">
              <p class="nametext">{{ leastSellingProduct.name }}</p>
              <p class="percentage">{{ bestSellingProduct.percentage }}%</p>
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

        if (sales.length > 0) {
          hasData.value = true;
          salesData.value = sales;

          const productSales = sales.reduce((acc, sale) => {
            acc[sale.item] = (acc[sale.item] || 0) + sale.amount;
            return acc;
          }, {});

          const sortedProducts = Object.entries(productSales).sort((a, b) => b[1] - a[1]);
          bestSellingProduct.value = {
            name: sortedProducts[sortedProducts.length - 1][0],
            percentage: ((sortedProducts[sortedProducts.length - 1][1] / sales.reduce((acc, sale) => acc + sale.amount, 0)) * 100).toFixed(2)
          };
          leastSellingProduct.value = {
            name: sortedProducts[0][0],
            percentage: ((sortedProducts[0][1] / sales.reduce((acc, sale) => acc + sale.amount, 0)) * 100).toFixed(2)
          };
          revenue.value = sales.reduce((acc, sale) => acc + sale.amount, 0).toFixed(2);
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
    const initSalesChart = () => {
      nextTick(() => {
        const months = moment.months();
        const salesByMonth = months.reduce((acc, month) => {
          acc[month] = 0;
          return acc;
        }, {});

        salesData.value.forEach(sale => {
          const month = moment(sale.created_at, 'YYYY-MM-DD HH:mm:ss').format('MMMM');
          salesByMonth[month] += sale.amount;
        });

        const salesAmounts = months.map(month => salesByMonth[month]);

        const ctxSalesChart = document.getElementById('salesChart').getContext('2d');
        new Chart(ctxSalesChart, {
          type: 'bar',
          data: {
            labels: months,
            datasets: [{
              data: salesAmounts,
              backgroundColor: 'rgba(68, 155, 82, 1)',
              borderWidth: 1,
              borderRadius: 15,
              barThickness: 13
            }]
          },
          options: {
            scales: {
              x: {
                grid: {
                  display: false
                }
              },
              y: {
                grid: {
                  display: false
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