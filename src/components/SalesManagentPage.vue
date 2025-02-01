<template>
    <div class="container mt-5">
      
        <div class="mt-5">

            <ul class="table-list">
                <router-link to="/salesmanagement" class="router-link ms-3" active-class="active-link">
                    Sales Management
                </router-link>

                <router-link to="/orderinfo" class="router-link" active-class="active-link" >
                  Manage Returns
                </router-link>
            </ul>

        </div>

        <div class="d-flex align-items-center justify-content-between mt-5">

            <div>
                <h4>Sales Management</h4>
                <h6>Total sales information</h6>
            </div>

            <div>
                <span><img src="/PointOfSales.svg" alt="" data-bs-toggle="modal" data-bs-target="#posModal" style="cursor: pointer;"></span>
                <!-- <span v-if="isAdmin"  class="ms-3"><img src="/SaleReport.svg" alt="" style="cursor: pointer;"  data-bs-toggle="modal" data-bs-target="#salesreportModal"></span> -->
            </div>

        </div>




        <div class="d-flex mt-4">
            <div class="input-container">
                <img src="/tabler_search.svg" alt="">
                <input type="text" placeholder="Search Transaction ID" class="input1"  v-model="searchTransactionNumber" @input="searchSalesProduct">
            </div>

            <button class="ms-3 btn1"  @click="downloadExcel">
                <span><img src="/vscode-icons_file-type-excel.svg" alt=""></span>
                <span class="ps-3">Download Excel</span>
            </button>

            <!-- <button class="ms-3 btn1" @click="exportToExcel">
                <span><img src="/vscode-icons_file-type-excel.svg" alt=""></span>
                <span class="ps-3">Download Excel</span>
                    
            </button> -->
        </div>



        <div class="mt-5">
            <table class="table ">
                <thead>
                    <tr>
                    <th scope="col">
                        <span>SKU</span>
                        <span class="ps-5"><img src="/tabler_arrows-up-down.svg" alt=""></span>
                    </th>

                    <th scope="col">
                        <span>Status</span>
                        <span class="ps-5"><img src="/tabler_arrows-up-down.svg" alt=""></span>
                    </th>

                    <th scope="col">
                        <span>Date</span>
                        <span class="ps-5"><img src="/tabler_arrows-up-down.svg" alt=""></span>
                    </th>

                    <!-- <th scope="col">
                        <span>Customer Phone no</span>
                        <span class="ps-5"><img src="/tabler_arrows-up-down.svg" alt=""></span>
                    </th> -->

                    <th scope="col">
                        <span>Amount</span>
                        <span class="ps-5"><img src="/tabler_arrows-up-down.svg" alt=""></span>
                    </th>

                    <th scope="col">
                        <span>Transaction ID</span>
                        <span class="ps-5"><img src="/tabler_arrows-up-down.svg" alt=""></span>
                    </th>

                    <th scope="col">
                       
                    </th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="sale in paginatedSales" :key="sale.transactionNumber">
                   <td scope="row">{{ sale.reference }}</td>
                    <td class="pt-4">
                        <span v-if="sale.status === 'Completed'"><img src="/paidicon.svg" alt="Completed"></span>
                        <span v-else-if="sale.status === 'Pending'"><img src="/pendingicon.svg" alt="Pending"></span>
                        <span v-else-if="sale.status === 'Cancelled'"><img src="/cancelledicon.svg" alt="Cancelled"></span>

                    </td>
                    <td>{{ sale.created_at }}</td>
                    <!-- <td></td> -->
                   <!-- Replace existing amount cell -->
                    <td>
                      {{ sale.totalAmount || sale.amount || 
                        (sale.items ? sale.items.reduce((sum, item) => sum + parseFloat(item.amount), 0).toFixed(2) : '0.00') }}
                    </td>

                    <td>{{ sale.transaction_number }}</td>
                    <td class="ms-5 pt-4">
                        <span><img src="/viewicon.svg" alt="View" @click="viewSale(sale)" data-bs-toggle="modal" data-bs-target="#viewSaleModal" style="cursor: pointer;"></span>
                        <!-- <span><img src="/downloadicon.svg" alt="" class="ps-3"  @click="downloadReceipt(sale)"  style="cursor: pointer;"></span> -->
                        <span><img src="/printicon.svg" alt="" class="ps-3"  @click="printReceipt(sale)"  style="cursor: pointer;"></span>
                    </td>
                    </tr>

                </tbody>
            </table>

            <nav aria-label="Page navigation">
              <ul class="pagination justify-content-between">
                <li class="page-item disabled">
                  <span class="page-link">Page {{ currentPage }} | {{ currentPage }} of {{ totalPages }}</span>
                </li>
                <div class="d-flex">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="prevPage" :disabled="currentPage === 1">&lt;</button>
                  </li>
                  
                  <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                    <button class="page-link" @click="goToPage(page)">{{ page }}</button>
                  </li>

                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">&gt;</button>
                  </li>
                </div>
              </ul>
            </nav>


        </div>

    </div>



 

    <!-- Modal -->
    <div class="modal fade" id="viewSaleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog viewSaleModalDailog">
        

            <div class="modal-content viewslemodal-content container text-light">

                <div class="d-flex justify-content-between align-items-start mt-4">
                    <div class="d-flex">
                        <img src="/tabler_playlist-add.svg" alt="" class="me-3" style="height: 40px;">
                        <div class="text-dark">
                            <h5 class="mb-2">POS</h5>
                            <!-- <p class="mb-0" style="width: 80%;">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus repellendus est alias iure perspiciatis pariatur rerum nesciunt quibusdam at fuga modi.
                            </p> -->
                        </div>
                    </div>
                    <img src="/cancel.svg" alt="Cancel" style="height: 30px; cursor: pointer;"  data-bs-dismiss="modal" aria-label="Close">
                </div>


                <div class="mainrapperx container mb-5 mt-4" style="height: 85vh; border-radius: 20px; background-color: #F7FBFC;">
                    <div class="mainwrapper mainviewwrapper container text-light p-4 rounded container mt-5"  style="height: 58vh; overflow-y: auto; border-radius: 20px;"> 
                        
                        <div class="text-dark d-flex justify-content-between" >
                            <div>
                                <span>List of items</span>
                            </div>

                            <!-- <div>
                                <img src="/cleall.svg" alt="">
                            </div> -->
                        </div>
                        <div class="wrapper viewsalewrapper text-dark p-4 rounded" style="min-height: 58vh; border-radius: 20px; display: flex; flex-direction: column;"><!-- Level 3: Inner Wrapper -->
                            <!-- Modal Header -->

                        
                            <form @submit.prevent="saveProductSales">
                              <!-- Transaction Info -->
                              <div class="row mb-3">
                                <div class="col-md-6">
                                  <p><strong>Reference:</strong> {{ selectedSale.reference }}</p>
                                  <p><strong>Transaction:</strong> {{ selectedSale.transactionNumber }}</p>
                                </div>
                                <div class="col-md-6 text-end">
                                  <p><strong>Date:</strong> {{ selectedSale.created_at }}</p>
                                  <p><strong>Status:</strong> {{ selectedSale.status }}</p>
                                </div>
                              </div>

                              <!-- Single Item Display -->
                              <div v-if="!selectedSale.items" class="d-flex align-items-center justify-content-between mb-4 flex-wrap">
                                <span>
                                  <h6>Item</h6>
                                  <input type="text" class="form-control" v-model="selectedSale.item" style="width: 200px;" readonly required>
                                </span>
                                <span>
                                  <h6>Unit Price</h6>
                                  <input type="text" class="form-control" v-model="selectedSale.unit_price" style="width: 200px;" readonly required>
                                </span>
                                <span>
                                  <h6>Quantity</h6>
                                  <input type="text" class="form-control" v-model="selectedSale.quantity" style="width: 200px;" readonly required>
                                </span>
                                <span>
                                  <h6>Amount</h6>
                                  <input type="text" class="form-control" v-model="selectedSale.amount" style="width: 200px;" readonly required>
                                </span>
                              </div>

                              <!-- Multiple Items Display -->
                              <div v-else>
                                <div v-for="(item, index) in selectedSale.items" :key="index" 
                                    class="d-flex align-items-center justify-content-between mb-4 flex-wrap">
                                  <span>
                                    <h6>Item {{ index + 1 }}</h6>
                                    <input type="text" class="form-control" v-model="item.item" style="width: 200px;" readonly required>
                                  </span>
                                  <span>
                                    <h6>Unit Price</h6>
                                    <input type="text" class="form-control" v-model="item.unit_price" style="width: 200px;" readonly required>
                                  </span>
                                  <span>
                                    <h6>Quantity</h6>
                                    <input type="text" class="form-control" v-model="item.quantity" style="width: 200px;" readonly required>
                                  </span>
                                  <span>
                                    <h6>Amount</h6>
                                    <input type="text" class="form-control" v-model="item.amount" style="width: 200px;" readonly required>
                                  </span>
                                </div>
                              </div>

                              <!-- Total Amount -->
                            <!-- filepath: /home/backend_dev/Javascript/invent/invent-frontend/src/components/SalesManagentPage.vue -->
                              <!-- Total Amount -->
                              <div class="text-dark text-end mt-4">
                                <h5>Total Amount: ₦{{ 
                                  selectedSale.items ? 
                                  selectedSale.items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0).toFixed(2) : 
                                  parseFloat(selectedSale.amount || 0).toFixed(2) 
                                }}</h5>
                              </div>
                            </form>

                        </div>
                        <!-- <img src="/cancelTransaction.svg" alt=""> -->
                        
                    </div>

                    <div v-if="selectedSale.status !== 'Completed' && selectedSale.status !== 'Cancelled'"  class="d-flex justify-content-between" style="height: 100px;">
                      <!-- <p class="text-danger"><strong>Status:</strong> {{ selectedSale.status }}</p> -->

                      <div class="d-flex justify-content-between">
                        <img  src="/pending.svg"  alt="Add Item"  class="img-fluid"  @click="updateStatus('Pending')">
                        <img  src="/cancelTransaction.svg" alt="Cancel" class="img-fluid ms-3" @click="updateStatus('Cancelled')"
                        >
                      </div>

                        <img src="/confirmTransaction.svg" alt="Confirm" class="img-fluid" style="height: 50px;" @click="updateStatus('Completed')">
                       
                    </div>
                    
                </div>


            </div>


        </div>
    </div>






    <!-- Modal -->
    <div class="modal fade" id="posModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content container text-light">

                <div class="d-flex justify-content-between align-items-start mt-5">
                    <div class="d-flex">
                        <img src="/tabler_playlist-add.svg" alt="" class="me-3" style="height: 40px;">
                        <div class="text-dark">
                            <h5 class="mb-2">create POS</h5>
                            <!-- <p class="mb-0" style="width: 80%;">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus repellendus est alias iure perspiciatis pariatur rerum nesciunt quibusdam at fuga modi.
                            </p> -->
                        </div>
                    </div>
                    <img src="/cancel.svg" alt="Cancel" style="height: 30px; cursor: pointer;"  data-bs-dismiss="modal" aria-label="Close">
                </div>




                <div class="mainrapperx container mb-5 mt-4" style="min-height: 85vh; border-radius: 20px; background-color: #F7FBFC;">
                    <div class="mainwrapper mainviewwrapper container text-light p-4 rounded container mt-5"  style="height: 58vh;  overflow-y: auto; border-radius: 20px;"> 
                        
                      <!-- <h3>HI</h3> -->
                      <h3 class="text-center text-danger" v-if="lowInventoryMessage">
                        {{ lowInventoryMessage }}
                      </h3>
                      <h3 class="text-center text-danger" v-else-if="updateStatusMessage">
                        {{ updateStatusMessage }}
                      </h3>

                        <div class="text-dark d-flex justify-content-between" >
                            <div>
                                <span>List of items</span>
                            </div>

                            <div>
                                <img src="/cleall.svg" alt="" @click="resetForm">
                            </div>
                        </div>
                        <div class="wrapper viewsalewrapper text-danger p-4 rounded"   style="max-height: 60vh;  border-radius: 20px;"> <!-- Level 3: Inner Wrapper -->
                            <!-- Modal Header -->
                        
                        
                            <form @submit.prevent="saveProductSales">
                              <!-- Iterate over items array -->
                              <div v-for="(item, index) in items" :key="index" class="item-group mb-4">
                                <div class="d-flex align-items-center justify-content-between flex-wrap">
                                  <span>
                                    <h6>Item</h6>
                                    <input type="text" class="form-control" @input="fetchUnitPrice(index)" 
                                          v-model="item.item" placeholder="ITEM(size)" style="width: 200px;" required>
                                  </span>
                                  <span>
                                    <h6>Unit Price</h6>
                                    <input type="text" class="form-control" v-model="item.unit_price" 
                                          style="width: 200px;" required readonly>
                                  </span>
                                  <span>
                                    <h6>Quantity</h6>
                                    <input type="text" class="form-control" v-model="item.quantity" 
                                          @input="calculateAmount(index)" style="width: 200px;" required>
                                  </span>
                                  <span>
                                    <h6>Amount</h6>
                                    <input type="text" class="form-control" v-model="item.amount" 
                                          style="width: 200px;" readonly>
                                  </span>
                                  <button type="button" class="btn btn-danger" @click="removeItem(index)" 
                                          v-if="items.length > 1">Remove</button>
                                </div>
                              </div>

                              <div class="d-flex gap-3 mt-3">
                                <button type="button" class="btn btn-secondary" @click="addNewItem">
                                  Add More Items
                                </button>
                              </div>

                              <div class="text-dark text-end mt-4">
                                <h5>Total Amount: {{ calculateTotal }}</h5>
                              </div>
                            </form>

                        </div>
                        <!-- <img src="/cancelTransaction.svg" alt=""> -->
                        
                    </div>

                    <div class="d-flex justify-content-between" style="height: 100px;">

                        <div class="d-flex justify-content-between">
                            <img src="/pending.svg" alt="Add Item" class="img-fluid"  @click="saveProductSales('Pending')">
                            <img src="/cancelTransaction.svg" alt="Cancel" class="img-fluid ms-3" @click="saveProductSales('Cancelled')">
                        </div>

                        <img src="/confirmTransaction.svg" alt="Confirm" class="img-fluid" style="height: 50px;" @click="saveProductSales('Completed')">
                       
                    </div>
                </div>
   
            </div>
        </div>
    </div>














    <!-- Modal -->
    <div class="modal fade" id="salesreportModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      
      <div class="modal-dialog" style="max-width: 90vw !important;">
        <div class="modal-content" style="height: 100vh !important;">

            <div class="modal-header">
              
              <div class="title">
                <h3>Sales Report</h3>
                <!-- <p>Parchment be turns stand veela fawkes mistletoe snare drops.</p> -->
              </div>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

            </div>



              <div class="mb-5 chartbordwrapper">

                <div class="dashboard mt-5" style="margin: 30px;">
            
  
                  <div class="row">
  
                    <div class="col-md-6">
  
                    
  
                        <div v-if="!hasData" class="no-data">
                          <p>No Data Available</p>
                        </div>
  
  
                          <div class="d-flex">
  
                            <div>
  
                                <h6>Best Selling Product</h6>
                                <div class="card mt-4" v-if="bestSellingProduct" style=" min-width: 200px; ">
                                  <p class="nametext" >{{ bestSellingProduct.name }}</p>
                                <p class="percentage" style="font-weight: bolder;">{{ leastSellingProduct.percentage }}%</p>
  
                                
                                </div>
  
                            </div>
  
  
  
                            <div>
  
                              <h6 class="ps-4">Least Selling Product</h6>
                              <div class="card ms-4 mt-4" v-if="leastSellingProduct" style=" min-width: 200px; ">
                                <p  class="nametext">{{ leastSellingProduct.name }}</p>
                                <p class="percentage" style="font-weight: bolder;">{{ bestSellingProduct.percentage }}%</p>
                              </div>
  
                            </div>
  
  
                          </div>
                        
                  
                        <div class="card revenucard mt-4" v-if="revenue"   style=" min-width: 150px;">
                          <h6 class="nametext">Revenue</h6>
                          
                          <p class="percentage" style="font-weight: bolder;"> {{ Number(revenue).toLocaleString() }}  </p>
                        </div>
                        
                    
  
                    </div>
  
                    <div class="col-md-6">
                      <div class="card chart-card" style=" min-width: 400px; border-radius: 20px;">
                        <h4 style="font-size: small; font-weight: lighter; color: #000;">Activity</h4>
                        <hr>
                        <canvas id="salesChart"></canvas>
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

import { defineComponent, onMounted, ref, watch} from 'vue';
// import { openDB, getAllProducts, updateProduct } from '../utils/indexDB';

// import Chart from 'chart.js/auto';
// import moment from 'moment';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

export default defineComponent({
  data() {
    return {
      lowInventoryMessage: "",
      updateStatusMessage:"",

      item: "",
      unit_price: "",
      quantity: "",
      amount: "",
      status: "",
      sales: [],
      filteredSales: [],
      currentPage: 1,
      pageSize: 4,
      // visiblePages: [],
      selectedSale: {},
      searchTransactionNumber: "",
      isAdmin: false,
      // product_id:"",

      items: [{
        name: '',
        unitPrice: '',
        quantity: '',
        amount: '',
        product_id: '',
        'transactionNumber': '',
      }],

      products: [],

    };
  },

  setup() {
    const bestSellingProduct = ref(null);
    const leastSellingProduct = ref(null);
    const revenue = ref(null);
    const hasData = ref(false);


  


    onMounted(() => {
      // fetchData();
    });

    watch([bestSellingProduct, leastSellingProduct], () => {
      if (bestSellingProduct.value && leastSellingProduct.value) {
        // initializeCharts();
      }

    });

    return {
      bestSellingProduct,
      leastSellingProduct,
      revenue,
      hasData,
    };
  },

  mounted() {
    this.loadSales();

    const userLogin = localStorage.getItem('name');
    if (!userLogin) {
      this.$router.push({ name: 'login' });
    } else {
      this.name = userLogin;
      // Check if the logged-in user is 'Admin'
      this.isAdmin = this.name === 'Admin';
    }

  },

  watch: {
    unit_price: 'calculateAmount',
    quantity: 'calculateAmount'
  },

  computed: {

    getSaleAmount(sale) {
    if (sale.totalAmount) return sale.totalAmount;
    if (sale.amount) return sale.amount;
    if (sale.items) {
      return sale.items.reduce((sum, item) => 
        sum + parseFloat(item.amount), 0
      ).toFixed(2);
    }
    return '0.00';
  },

    calculateTotal() {
      return this.items.reduce((total, item) => {
        return total + (parseFloat(item.amount) || 0)
      }, 0).toFixed(2)
    },

    sortedSales() {
      return this.filteredSales.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },

    paginatedSales() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.sortedSales.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredSales.length / this.pageSize);
    },

    visiblePages() {
      const start = Math.floor((this.currentPage - 1) / this.pageSize) * this.pageSize + 1;
      const end = Math.min(start + this.pageSize - 1, this.totalPages);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }


  },


    async created() {
      await this.fetchProducts(); // Load products when component mounts
    },

  methods: {

    addNewItem() {
      this.items.push({
        item: '',
        unit_price: '',
        quantity: '',
        amount: ''
      })
    },

    removeItem(index) {
      if (this.items.length > 1) {
        this.items.splice(index, 1)
      }
    },



    calculateAmount(index) {
        const item = this.items[index]
        item.amount = (parseFloat(item.unit_price) * parseFloat(item.quantity) || 0).toFixed(2)
      },

      fetchUnitPrice(index) {
        fetch('https://backendpro.elechiperfumery.com.ng/api/v1/properties/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch products');
          return response.json();
        })
        .then(products => {
          const product = products.data.find(p => p.brandName === this.items[index].item);
          if (product) {
            this.items[index].unit_price = product.sellingPrice;
            this.items[index].product_id = product.id; // Store ID per item
            this.calculateAmount(index);
          }
        })
        .catch(error => {
          console.error('Error fetching unit price:', error);
        });
    },



    async fetchProducts() {
      try {
        const response = await fetch('https://backendpro.elechiperfumery.com.ng/api/v1/properties/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const result = await response.json();
        this.products = result.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        // alert('Failed to load products. Please refresh the page.');
      }
    },



    checkInventoryLevels() {
        if (!this.products || !this.products.length) {
          // alert('Product data not loaded. Please refresh the page.');
          return false;
        }

        const lowInventoryItems = this.items.filter(item => {
          const product = this.products.find(p => p.brandName === item.item);
          
          // Debug logging
          console.log('Checking inventory for:', item.item);
          console.log('Product found:', product);
          console.log('Current inventory:', product?.productInventory); // Fix: changed from productInventroy
          console.log('Requested quantity:', item.quantity);
          
          if (!product) {
            console.error(`Product not found: ${item.item}`);
            return true;
          }

          // Parse inventory values, default to 0 if undefined
          const currentInventory = parseInt(product.productInventory) || 0;
          const requestedQuantity = parseInt(item.quantity) || 0;
          
          const hasLowInventory = currentInventory < requestedQuantity;
          
          console.log('Current inventory:', currentInventory);
          console.log('Requested quantity:', requestedQuantity);
          console.log('Has low inventory:', hasLowInventory);
          
          return hasLowInventory;
        });

        if (lowInventoryItems.length > 0) {
          const itemNames = lowInventoryItems.map(item => {
            const product = this.products.find(p => p.brandName === item.item);
            return `${item.item} (Available: ${product?.productInventory || 0}, Requested: ${item.quantity})`;
          }).join(', ');
          
          // alert(`Insufficient inventory for: ${itemNames}`);
          this.lowInventoryMessage = `Insufficient inventory for: ${itemNames}`;
          return false;
        }
        return true;
    },


    saveProductSales(status) {

      if (!this.checkInventoryLevels()){
        return;
      }

      const referenceNumber = `FB${Math.floor(100000 + Math.random() * 900000)}`;
      const transactionNumber = `#${Math.floor(100000 + Math.random() * 900000)}`;

      const totalAmount = this.items.reduce((sum, item) => 
        sum + parseFloat(item.amount || 0), 0
      ).toFixed(2);

      const groupedSale = {
        reference: referenceNumber,
        transactionNumber: transactionNumber,
        status: status,
        totalAmount: totalAmount,
        items: this.items.map(item => ({
          item: item.item,
          unit_price: item.unit_price,
          quantity: item.quantity,
          amount: item.amount
        }))
      };

      const hasEmptyFields = this.items.some(item => 
        !item.item || !item.unit_price || !item.quantity || !item.amount
      );

      if (hasEmptyFields) {
        alert("Please fill in all required fields");
        return;
      }

      console.log(groupedSale);
      
      // First save the sale
      fetch('https://backendpro.elechiperfumery.com.ng/api/v1/properties/createSale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify(groupedSale)
      })
      .then(response => {
        // console.log(response.status !== 201);
        
        if (response.status !== 201) throw new Error('Failed to save sale');
        
        // If status is Completed, update inventory
        if (status === 'Completed') {
          return Promise.all(this.items.map(item => 
          
          // First fetch current inventory
          fetch(`https://backendpro.elechiperfumery.com.ng/api/v1/properties/product/${item.product_id}`)
          .then(response => response.json())
          .then(product => {
            const productData = product.data;
            

            const remainingInventory = parseInt(productData.productInventory) - parseInt(item.quantity);
            

                if (remainingInventory < 0) {
                  throw new Error(`Insufficient inventory for ${item.item}`);
                }
                

                // Update with remaining inventory
                return fetch(`https://backendpro.elechiperfumery.com.ng/api/v1/properties/productInventory/${item.product_id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                  },
                  body: JSON.stringify({
                    productInventory: remainingInventory
                  })
                });
              })
          ));
        }

      })
      .then(() => {
        this.items = [{
          item: '',
          unit_price: '',
          quantity: '',
          amount: ''
        }];
        // alert('Sales transaction completed successfully');
        this.updateStatusMessage = 'Data Inputed Successfully';
        window.location.reload();
      })
      .catch(error => {
        console.error('Error saving sales:', error);
        // alert(`Failed to save sales: ${error.message}`);
      });
    },


    resetForm() {
      // Reset items array to its initial state
      this.items = [{
        item: '',
        unit_price: '',
        quantity: '',
        amount: ''
      }];
    },


    loadSales() {
      fetch('https://backendpro.elechiperfumery.com.ng/api/v1/properties/sales', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch sales');
        return response.json();
      })
      .then(data => {
        this.sales = data.data;
        this.filteredSales = this.sales;
        // console.log('Sales Data:', this.sales);
      })
      .catch(error => {
        console.error('Error loading sales:', error);
        // alert('Failed to load sales data');
      });
    },


    // async loadSales() {
    //   try {
    //     const db = await openSalesDB();
    //     const sales = await getAllSales(db);
    //     this.sales = sales;
    //     this.filteredSales = this.sales;
    //   } catch (error) {
    //     console.error('Error loading sales:', error);
    //   }
    // },

    searchSalesProduct() {
      const query = this.searchTransactionNumber.trim().toLowerCase();

      // const data = this.sales
      
      // console.log(data);
      

      if (query === "") {
        this.filteredSales = this.sales;
      } else {
        this.filteredSales = this.sales.filter((sale) => {
          return sale.transaction_number && sale.transaction_number.toLowerCase().includes(query);
        });
      }
      this.currentPage = 1;
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    goToPage(page) {
      this.currentPage = page;
    },

    viewSale(sale) {
  // Calculate total if it's a multi-item sale
  if (sale.items && Array.isArray(sale.items)) {
    sale.totalAmount = sale.items.reduce((sum, item) => 
      sum + parseFloat(item.amount || 0), 0
    ).toFixed(2);
  }
  this.selectedSale = sale;
},




    updateStatus(status) {
      // Validate required fields
      const hasEmptyFields = this.selectedSale.items.some(item => 
        !item.item || !item.quantity || !item.unit_price || !item.amount
      );

      if (hasEmptyFields) {
        alert("Invalid sale data: Missing required fields");
        return;
      }


      // const totalAmount = this.items.reduce((sum, item) => 
      //   sum + parseFloat(item.amount || 0), 0
      // ).toFixed(2);

    const updatedSale = {
    ...this.selectedSale,
    status: status,
    // totalAmount: totalAmount,
      items: this.selectedSale.items.map(item => ({
        item: item.item,
        unit_price: item.unit_price,
        quantity: item.quantity,
        amount: item.amount,
        status: status
      }))
    };

    console.log('Final Payload:', updatedSale);

      // First update sale status
      fetch(`https://backendpro.elechiperfumery.com.ng/api/v1/properties/sale/${this.selectedSale.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(updatedSale)
      })
      .then(response => {
        if (!response.ok) throw new Error('Failed to update sale');
        
        // If status is Completed, update inventory
        if (status === 'Completed') {
          return Promise.all(updatedSale.items.map(item => 
            // First fetch all products to get ID
            fetch('https://backendpro.elechiperfumery.com.ng/api/v1/properties/products')
              .then(response => response.json())
              .then(products => {
                console.log('All Products:', products.data);
                // Find product by name
                const product = products.data.find(p => p.brandName === item.item);
                
                if (!product) {
                  throw new Error(`Product not found: ${item.item}`);
                }
                
                console.log('Found Product:', product);
                
                // Calculate remaining inventory
                const remainingInventory = parseInt(product.productInventory) - parseInt(item.quantity);
                
                if (remainingInventory < 0) {
                  throw new Error(`Insufficient inventory for ${item.item}`);
                }

                // Update inventory using found product ID
                return fetch(`https://backendpro.elechiperfumery.com.ng/api/v1/properties/productInventory/${product.id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify({
                    productInventory: remainingInventory
                  })
                });
              })
          ));
        }
      })
      .then(() => {
        this.loadSales();
        // alert(`Sale status updated to ${status}`);
        this.updateStatusMessage = `Sale status updated to ${status}`;
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating sale status:', error);
        // alert(error.message || 'Failed to update sale status');
        this.updateStatusMessage = `Failed to update sale status: ${error.message}`;
      });
    },



    // downloadExcel() {
    //   const worksheetData = this.sales.map((sale) => ({
    //     Item: sale.item,
    //     SKU: sale.reference,
    //     Status: sale.status,
    //     Date: sale.created_at,
    //     Amount: sale.amount,
    //     Unit_Price: sale.unit_price,
    //     Quantity: sale.quantity,
    //     TransactionID: sale.transaction_number,
    //   }));

    //   const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    //   const workbook = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    //   XLSX.writeFile(workbook, "SalesData.xlsx");
    // },


    downloadExcel() {
      // Flatten the data to include item details
      const worksheetData = this.sales.flatMap((sale) => 
        sale.items.map((item) => ({
          Item: item.item,
          SKU: sale.reference,
          Status: sale.status,
          Date: sale.created_at,
          Amount: item.amount,
          Unit_Price: item.unit_price,
          Quantity: item.quantity,
          TransactionID: sale.transaction_number,
        }))
      );

      // Create a worksheet from the flattened data
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

      // Write the workbook to an Excel file
      XLSX.writeFile(workbook, "SalesData.xlsx");
    },






    printReceipt(sale) {
  try {
    console.log('Print Data:', sale);
    const calculatedTotal = sale.items
      ? sale.items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0).toFixed(2)
      : '0.00';

    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            @page { size: 80mm auto; margin: 0; }
            html, body {
              margin: 0;
              padding: 0;
              height: 100%;
              font-family: 'Courier New', monospace;
              font-size: 30px;
              box-sizing: border-box;
              font-weight:50px
            }
            .receipt {
              width: 80mm;
              margin: 0 auto; /* Center horizontally */
              padding: 5mm;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: flex-start; /* Align content to the top */
              align-items: center; /* Center content vertically in the receipt */
            }
            .header, .footer {
              margin-bottom: 10px;
            }
            .header {
              border-bottom: 1px dashed #000;
              padding-bottom: 5px;
            }
            .store-name {
              font-size: 16px;
              font-weight: bold;
            }
            .receipt-details {
              margin: 10px 0;
              border-bottom: 1px dashed #000;
              padding-bottom: 5px;
            }
            .items-table {
              width: 100%;
              margin: 10px 0;
              border-collapse: collapse;
            }
            .items-table th, .items-table td {
              text-align: center;
            }
            .items-table tr {
              border-bottom: 1px dashed #000;
            }
            .item-row td {
              padding: 5px 0;
            }
            .total {
              border-top: 1px dashed #000;
              padding-top: 10px;
              font-weight: bold;
              text-align: center;
            }
            .footer {
              border-top: 1px dashed #000;
              padding-top: 5px;
              font-size: 10px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <div class="store-name">ELECHI PERFUMERY</div>
              <div>Your Fragrance Destination</div>
              <div>Tel: +234 8163928936</div>
              <div>19 Umuahia Road, Ikot Ekpene</div>
            </div>

            <div class="receipt-details">
              <div>Transaction ID: ${sale.transaction_number || sale.transactionNumber || 'N/A'}</div>
              <div>Date: ${new Date(sale.created_at).toLocaleString()}</div>
              <div>Status: ${sale.status}</div>
            </div>

            <table class="items-table">
              <thead>
                <tr>
                  <th>ITEM</th>
                  <th>QTY</th>
                  <th>PRICE</th>
                  <th>AMT</th>
                </tr>
              </thead>
              <tbody>
                ${sale.items
                  ? sale.items.map(item => `
                    <tr class="item-row">
                      <td>${item.item}</td>
                      <td>${item.quantity}</td>
                      <td>₦${parseFloat(item.unit_price).toFixed(2)}</td>
                      <td>₦${parseFloat(item.amount).toFixed(2)}</td>
                    </tr>
                  `).join('')
                  : ''}
              </tbody>
            </table>

            <div class="total">
              <div>SUBTOTAL: ₦${calculatedTotal}</div>
              <div>TOTAL: ₦${calculatedTotal}</div>
            </div>

            <div class="footer">
              <p>Thank you for shopping with us!</p>
              <p>Please come again</p>
              <p>**** END OF RECEIPT ****</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(content);
    doc.close();

    iframe.onload = () => {
      setTimeout(() => {
        iframe.contentWindow.print();
        document.body.removeChild(iframe);
      }, 500);
    };
  } catch (error) {
    console.error('Error printing receipt:', error);
    console.error('Sale data:', sale);
    alert('Failed to print receipt');
  }
},






    downloadReceipt(sale) {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Log sale object to debug
    // console.log('Sale Data:', sale);
    
    // Header
    doc.setFontSize(20);
    doc.text("STORE RECEIPT", pageWidth/2, 20, { align: "center" });
    
    // Receipt info with total amount and transaction number
    doc.setFontSize(12);
    doc.text(`Transaction ID: ${sale.transactionNumber || 'N/A'}`, 20, 40);
    doc.text(`Date: ${sale.created_at}`, 20, 50);
    doc.text(`Status: ${sale.status}`, 20, 60);
    doc.text(`Total Amount: ₦${parseFloat(sale.totalAmount || 0).toFixed(2)}`, 20, 70);

    // Items table header
    doc.setLineWidth(0.5);
    doc.line(20, 80, pageWidth-20, 80);
    doc.text("Item", 20, 90);
    doc.text("Unit Price", 80, 90);
    doc.text("Qty", 130, 90);
    doc.text("Amount", 170, 90);
    doc.line(20, 95, pageWidth-20, 95);

    // ...existing code...
  } catch (error) {
    console.error('Error generating receipt:', error);
    alert('Failed to generate receipt');
  }
},

  }

});


</script>







<style scoped>


@media print {
  #app > *:not(#receipt) {
    display: none;
  }
  #receipt {
    display: block;
  }
}



    .active-link {
        border-bottom: 2px solid green;
        color: green !important;
    }

    .mainwrapper {
        background-color: #eff3f4;
        padding: 20px;
        margin-top: 3%;
        margin-bottom: 5%;
        margin-left: 0%;
        margin-right: 8%;
        border-radius: 15px;
    }


    .wrapper {
        background-color: #f7f7f7;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        margin-top: 3%;
        margin-left: 1%;
        margin-right: 1%;
        padding: 20px;
    }

    .modal-content h6 {
        font-weight: bold;
        margin-bottom: 10px;
    }

    .modal-content input {
        border-radius: 5px;
        border: 1px solid #ced4da;
    }

    .modal-content img {
        max-height: 50px;
        cursor: pointer;
    }

    .modal-header {
        margin-bottom: 20px;
    }

    .flex-wrap > span {
        margin-bottom: 15px; /* Adds spacing between inputs for responsiveness */
    }

    .modal-content {
        border-radius: 30px !important;
    }

    .modal-dialog {
        max-width: 150vw;
        border-radius: 100px !important;
    }

    .table-list {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 3rem;
        border-bottom: 1px solid #ddd;
    }

    .table-list .router-link {
        font-weight: bold;
        color: #646464;
        text-decoration: none;
    }


    .table-no-border th,
    .table-no-border td {
        border: none;
    }

    td {
        padding-top: 30px; /* Top padding */
        padding-bottom: 18px; /* Bottom padding  */
    }

    .input-container {
        position: relative;
        display: inline-block;
    }

    .input-container input {
        width: 250px;
        padding: 10px 10px 10px 45px;
        font-size: 16px;
        background-color: #bababa;
        border-radius: 10px;
        border: none;
        outline: none;
    }

    .input-container img {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        width: 25px;
        height: 25px;
        pointer-events: none;
    }


    .btn1{
        width: 200px;
        border-radius: 10px;
        border: 0.1px solid #c8c8c86f;
        background-color: #fff;
    }



.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1;
  /* min-width: 200px; */
  padding: 20px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.chart-card {
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px #d3c6c674;
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

.revenucard{
  max-width: 200px; 
  /* color: rgb(42, 161, 6); */
}

.nametext{
  font-weight: 100;
  font-size: small;
}

.chartbordwrapper{
  height: 79vh !important; 
  max-width: 98vw !important; 
  margin: 30px; 
  margin-top: 0px; 
  background-color: #F7FBFC; 
  border-radius: 20px;
}

    /* .viewslemodal-content {
        background-color: #1dc1ea;
    } */

    /* .viewsalewrapper {
        background-color: #006d88;
        height:30vh;
        margin-top: 1%;
    } */


</style>