<template>
  <div class="container mt-5">

      <div class="mt-5">

          <ul class="table-list">
              <router-link to="/salesmanagement" class="router-link ms-3" active-class="active-link">
                  Sales Management
              </router-link>

              <router-link to="/orderinfo" class="router-link" active-class="active-link" >
                  Order Information
              </router-link>
          </ul>

      </div>

      <div class="d-flex align-items-center justify-content-between mt-5">

          <div>
              <h4>Order Information</h4>
          </div>

          <div>
              <!-- <span><img src="/PointOfSales.svg" alt="" data-bs-toggle="modal" data-bs-target="#posModal" style="cursor: pointer;"></span> -->
              <span class="ms-3"><img src="/managereturns.svg" alt="" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#exampleModal"></span>
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

                  <td>{{ sale.transactionNumber }}</td>
                  <td class="ms-5 pt-4">
                      <span><img src="/viewicon.svg" alt="View" @click="viewSale(sale)" data-bs-toggle="modal" data-bs-target="#viewSaleModal" style="cursor: pointer;"></span>
                      <span><img src="/downloadicon.svg" alt="" class="ps-3"  @click="downloadReceipt(sale)"  style="cursor: pointer;"></span>
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
                      <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
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
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog viewSaleModalDailog">
      

          <div class="modal-content viewslemodal-content container text-light">

              <div class="d-flex justify-content-between align-items-start mt-4">
                  <div class="d-flex">
                      <img src="/tabler_playlist-add.svg" alt="" class="me-3" style="height: 40px;">
                      <div class="text-dark">
                          <h5 class="mb-2">Manage Returns</h5>
                          <!-- <p class="mb-0" style="width: 80%;">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus repellendus est alias iure perspiciatis pariatur rerum nesciunt quibusdam at fuga modi.
                          </p> -->
                      </div>
                  </div>
                  <img src="/cancel.svg" alt="Cancel" style="height: 30px; cursor: pointer;"  data-bs-dismiss="modal" aria-label="Close">
              </div>


              <div class="mainrapperx container mb-5 mt-4" style="height: 85vh; border-radius: 20px; background-color: #F7FBFC;">
                  <div class="mainwrapper mainviewwrapper container text-light p-4 rounded container mt-5"  style="height: 58vh;  overflow-y: auto; border-radius: 20px;" > 
                      
                      <div class="text-dark d-flex justify-content-between" >
                          <div>
                              <img src="/filereturn.svg" alt="" data-bs-toggle="modal" data-bs-target="#addreturnModal" style="cursor: pointer;">
                          </div>

                          <!-- <div>
                              <span>List of items</span>
                          </div> -->


                      </div>
                      <div class="wrapper viewsalewrapper text-dark p-4 rounded" style="min-height: 38vh; border-radius: 20px;  overflow-y: auto;"> <!-- Level 3: Inner Wrapper -->
                          <!-- Modal Header -->
                      

                          <div>
                            <table class="table">
                              <thead>
                                <tr>
                                  <th>Product</th>
                                  <th>Transaction Number</th>
                                  <th>Date Returned</th>
                                  <th>Unit Price</th>
                                  <th>Reason</th>
                                  <th> Status</th>
                                  <th>Image</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr  v-for="item in returns" :key="item.id" >
                                  <td>{{ item.productName }}</td>
                                  <td>{{ item.transactionNumber }}</td>
                                  <td>{{ new Date(item.date).toLocaleDateString() }}</td>
                                  <td>{{ item.unitprice }}</td>
                                  <td>{{ item.reason }}</td>
                                  <td> <img src="/returninit.svg" alt="" data-bs-toggle="modal" data-bs-target="#addreturnModal" style="cursor: pointer;"></td>
                                  <td><img v-if="item.imageData" :src="item.imageData" class="thumbnail"/></td>
  
                                </tr>
                              </tbody>
                            </table>


                          </div>


                        


                      </div>
                      <!-- <img src="/cancelTransaction.svg" alt=""> -->
                      
                  </div>

                 
              </div>


          </div>


      </div>
  </div>








    <!-- Button trigger modal -->
    <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addreturnModal">
      Launch demo modal
    </button> -->

    <!-- Modal -->
    <div class="modal fade" id="addreturnModal" tabindex="-1" aria-labelledby="addreturnModalLabel" aria-hidden="true">
      <div class="modal-dialog"  style="max-width: 50vw;">
        <div class="modal-content">
          <!-- <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div> -->
          


          <div class="form-container">
            <div class="form-header">
              
              <h2 class="text-center">File a return</h2>
              <button class="close-btn" data-bs-dismiss="modal" aria-label="Close">&times;</button>
            </div>
            <form @submit.prevent="submitReturn" class="return-form">
              <div class="form-group">
                <label for="transaction-number">Transaction Number</label>
                <input type="text" id="transaction-number" v-model="transactionNumber" />
              </div>

              <div class="form-group">
                <label for="product-name">Product Name</label>
                <input type="text" id="product-name" v-model="productName" />
              </div>

              <div class="form-group">
                <label for="product-name">Unit Price</label>
                <input type="text" id="unitprice" v-model="unitprice" />
              </div>


              <div class="form-group">
                <label for="product-name">Date</label>
                <input type="date" id="date" v-model="date" />
              </div>

              <div class="form-group">
                <label for="reason">Reason for Return</label>
                <select id="reason" v-model="reason">
                  <option value="Damaged Product">Damaged Product</option>
                  <option value="Wrong Item">Wrong Item</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="form-group file-upload">
                <label>Upload Image Reference</label>
                <div class="upload-box">
                  <p v-if="uploadedFile">Selected File: {{ uploadedFile.name }}</p>

                  <div v-else>
                    <p>Select a file to upload the required document</p>
                    <p>JPG, PNG or PDF, file size no more than 10MB</p>
                  </div>


                  <button type="button" @click="triggerFileInput">Select File</button>
                </div>
                <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
              </div>
              <button type="submit" class="submit-btn">Submit Return</button>
            </form>
          </div>





         
        </div>
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

                          <div>
                              <img src="/cleall.svg" alt="">
                          </div>
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
                                <input type="text" class="form-control" v-model="selectedSale.item" style="width: 200px;" readonly>
                              </span>
                              <span>
                                <h6>Unit Price</h6>
                                <input type="text" class="form-control" v-model="selectedSale.unit_price" style="width: 200px;" readonly>
                              </span>
                              <span>
                                <h6>Quantity</h6>
                                <input type="text" class="form-control" v-model="selectedSale.quantity" style="width: 200px;" readonly>
                              </span>
                              <span>
                                <h6>Amount</h6>
                                <input type="text" class="form-control" v-model="selectedSale.amount" style="width: 200px;" readonly>
                              </span>
                            </div>

                            <!-- Multiple Items Display -->
                            <div v-else>
                              <div v-for="(item, index) in selectedSale.items" :key="index" 
                                  class="d-flex align-items-center justify-content-between mb-4 flex-wrap">
                                <span>
                                  <h6>Item {{ index + 1 }}</h6>
                                  <input type="text" class="form-control" v-model="item.item" style="width: 200px;" readonly>
                                </span>
                                <span>
                                  <h6>Unit Price</h6>
                                  <input type="text" class="form-control" v-model="item.unit_price" style="width: 200px;" readonly>
                                </span>
                                <span>
                                  <h6>Quantity</h6>
                                  <input type="text" class="form-control" v-model="item.quantity" style="width: 200px;" readonly>
                                </span>
                                <span>
                                  <h6>Amount</h6>
                                  <input type="text" class="form-control" v-model="item.amount" style="width: 200px;" readonly>
                                </span>
                              </div>
                            </div>

                            <!-- Total Amount -->
                            <div class="text-dark text-end mt-4">
                              <h5>Total Amount: {{ selectedSale.totalAmount || selectedSale.amount }}</h5>
                            </div>
                          </form>

                      </div>
                      <!-- <img src="/cancelTransaction.svg" alt=""> -->
                      
                  </div>

                  <div class="d-flex justify-content-between" style="height: 100px;">

                      <div class="d-flex justify-content-between">
                          <img src="/saveTransaction.svg" alt="Add Item" class="img-fluid"  @click="updateStatus('Pending')">
                          <img src="/cancelTransaction.svg" alt="Cancel" class="img-fluid ms-3" @click="updateStatus('Cancelled')">
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
                      
                      <div class="text-dark d-flex justify-content-between" >
                          <div>
                              <span>List of items</span>
                          </div>

                          <div>
                              <img src="/cleall.svg" alt="">
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
                          <img src="/saveTransaction.svg" alt="Add Item" class="img-fluid"  @click="saveProductSales('Pending')">
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

import { defineComponent, onMounted, ref, watch, nextTick } from 'vue';
import { openSalesDB, getAllSales, addSale, updateSale } from '../utils/salesDB';
import { openDB, getAllProducts, updateProduct } from '../utils/indexDB';
import { ReturnDbService } from '../utils/managereturnsDB';

import Chart from 'chart.js/auto';
import moment from 'moment';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

export default defineComponent({
data() {
  return {
    item: "",
    unit_price: "",
    quantity: "",
    amount: "",
    status: "",
    sales: [],
    filteredSales: [],
    currentPage: 1,
    pageSize: 4,
    selectedSale: {},
    searchTransactionNumber: "",
    isAdmin: false,

    items: [{
      name: '',
      unitPrice: '',
      quantity: '',
      amount: ''
    }],

    
    returns: [],
    transactionNumber: '',
    productName: '',
    reason: '',
    date: '',
    uploadedFile: null,
    imagePreview: null,
    unitprice: '',
    fileError: null,
    loading: false,
    error: null,
    maxFileSize: 10 * 1024 * 1024,
    acceptedFileTypes: ['image/jpeg', 'image/png', 'image/jpg']

  };
},

setup() {
  const bestSellingProduct = ref(null);
  const leastSellingProduct = ref(null);
  const revenue = ref(null);
  const hasData = ref(false);


  
  const fetchData = async () => {
try {
  const db = await openSalesDB();
  const sales = await getAllSales(db);
  
  // Initialize default values
  hasData.value = false;
  const salesData = ref([]);
  const bestSellingProduct = ref(null);
  const leastSellingProduct = ref(null);
  leastSellingProduct.value = null;
  revenue.value = '0.00';

  // Validate sales data
  if (Array.isArray(sales) && sales.length > 0) {
    hasData.value = true;
    salesData.value = sales;

    const productSales = {};
    let totalSales = 0;

    // Safe iteration over sales
    sales.forEach(sale => {
      // Verify sale has items array
      if (sale?.status === 'Completed' && Array.isArray(sale?.items)) {
        sale.items.forEach(item => {
          if (item?.item) { // Verify item exists and has name
            const itemName = item.item;
            const itemAmount = parseFloat(item.amount) || 0;
            const itemQuantity = parseInt(item.quantity) || 0;

            productSales[itemName] = productSales[itemName] || {
              amount: 0,
              quantity: 0
            };

            productSales[itemName].amount += itemAmount;
            productSales[itemName].quantity += itemQuantity;
            totalSales += itemAmount;
          }
        });
      }
    });

    const sortedProducts = Object.entries(productSales);
    if (sortedProducts.length > 0) {
      sortedProducts.sort((a, b) => b[1].quantity - a[1].quantity);
      
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
  }
} catch (error) {
  console.error('Error fetching sales data:', error);
}
};
  

  const initializeCharts = (sales) => {

nextTick(() => {
  const months = moment.months();
  const salesByMonth = months.reduce((acc, month) => {
    acc[month] = 0;
    return acc;
  }, {});

  // Process grouped sales data for chart
  sales.forEach(sale => {
    if (sale.status === 'Completed' && sale.items) {
      const month = moment(sale.created_at, 'DD/MM/YYYY, HH:mm:ss').format('MMMM');
      const totalAmount = sale.items.reduce((sum, item) => 
        sum + parseFloat(item.amount || 0), 0
      );
      salesByMonth[month] += totalAmount;
    }
  });

  const ctx = document.getElementById('salesChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [{
        label: 'Monthly Sales',
        data: months.map(month => salesByMonth[month]),
        backgroundColor: 'rgba(68, 155, 82, 1)',
        borderWidth: 1,
        borderRadius: 15,
        barThickness: 13
      }]
    },
    options: {
      scales: {
        x: { grid: { display: false } },
        y: { grid: { display: false } }
      }
    }
  });
});


  };
  

  onMounted(() => {
    fetchData();
  });

  watch([bestSellingProduct, leastSellingProduct], () => {
    if (bestSellingProduct.value && leastSellingProduct.value) {
      initializeCharts();
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

  this.loadReturns();


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
  }
},

methods: {


    async submitReturn() {
      try {
        this.loading = true
        const returnData = {
          transactionNumber: this.transactionNumber,
          productName: this.productName,
          reason: this.reason,
          date: this.date,
          unitprice: this.unitprice,
          imageData: this.imagePreview
        }

        
        await ReturnDbService.addReturn(returnData)

        alert('Return submitted successfully')

        await this.loadReturns()
        this.resetForm()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async loadReturns() {
      try {
        this.returns = await ReturnDbService.getAllReturns()
      } catch (err) {
        this.error = err.message
      }
    },

    triggerFileInput() {
      this.$refs.fileInput.click()
    },


    async handleFileUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      if (!this.acceptedFileTypes.includes(file.type)) {
        this.fileError = 'Please select JPG or PNG only'
        return
      }

      if (file.size > this.maxFileSize) {
        this.fileError = 'File must be under 10MB'
        return
      }

      this.uploadedFile = file
      this.fileError = null
      this.imagePreview = await this.createPreview(file)
    },


    createPreview(file) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target.result)
        reader.readAsDataURL(file)
      })
    },

    resetForm() {
      this.transactionNumber = ''
      this.productName = ''
      this.reason = ''
      this.date = ''
      this.unitprice = ''
      this.uploadedFile = null
      this.imagePreview = null
      this.fileError = null
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    },













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


  async fetchUnitPrice(index) {
    try {
      const db = await openDB()
      const products = await getAllProducts(db)

      const product = products.find(p => p.brandName === this.items[index].item)

      
      if (product) {
        this.items[index].unit_price = product.sellingPrice
        this.calculateAmount(index)
      }
    } catch (error) {
      console.error('Error fetching unit price:', error)
    }
  },



  async saveProductSales(status){

try {
  const referenceNumber = `FB${Math.floor(100000 + Math.random() * 900000)}`;
  const transactionNumber = `#${Math.floor(100000 + Math.random() * 900000)}`;
  const salesDB = await openSalesDB();
  const productDB = await openDB();

  // Calculate total amount for all items
  const totalAmount = this.items.reduce((sum, item) => 
    sum + parseFloat(item.amount || 0), 0
  ).toFixed(2);

  // Create grouped sale record
  const groupedSale = {
    reference: referenceNumber,
    transactionNumber: transactionNumber,
    status: status,
    created_at: new Date().toLocaleString(),
    totalAmount: totalAmount,
    items: this.items.map(item => ({
      item: item.item,
      unit_price: item.unit_price,
      quantity: item.quantity,
      amount: item.amount
    }))
  };

  console.log(groupedSale);
  

  // Update inventory for all items if status is Completed
  if (status === 'Completed') {
    const products = await getAllProducts(productDB);
    
    for (const item of this.items) {
      const product = products.find(p => p.brandName === item.item);
      if (product) {
        const newQuantity = product.productInventory - parseInt(item.quantity);
        if (newQuantity < 0) {
          throw new Error(`Insufficient inventory for ${item.item}`);
        }
        product.productInventory = newQuantity;
        await updateProduct(productDB, product);
      }
    }
  }

  // // Save grouped sale record
  await addSale(salesDB, groupedSale);

  // Reset form
  this.items = [{
    item: '',
    unit_price: '',
    quantity: '',
    amount: ''
  }];

  alert('Sales transaction completed successfully');
  window.location.reload();

} catch (error) {
  console.error('Error saving sales:', error);
  alert(`Failed to save sales: ${error.message}`);
}
},




  async loadSales() {
    try {
      const db = await openSalesDB();
      const sales = await getAllSales(db);
      this.sales = sales;
      this.filteredSales = this.sales;
    } catch (error) {
      console.error('Error loading sales:', error);
    }
  },

  searchSalesProduct() {
    const query = this.searchTransactionNumber.trim().toLowerCase();

    if (query === "") {
      this.filteredSales = this.sales;
    } else {
      this.filteredSales = this.sales.filter((sale) => {
        return sale.transactionNumber && sale.transactionNumber.toLowerCase().includes(query);
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
    this.selectedSale = sale;
  },




  async updateStatus(status) {
try {
  const salesDB = await openSalesDB();
  const productDB = await openDB();
  const products = await getAllProducts(productDB);

  // Handle both single and grouped sales
  if (this.selectedSale.items) {
    // Grouped sales case
    const updatedSale = {
      ...this.selectedSale,
      status: status,
      items: this.selectedSale.items.map(item => ({
        ...item,
        status: status
      }))
    };

    if (status === 'Completed') {
      // Validate and update inventory for all items
      for (const item of updatedSale.items) {
        const product = products.find(p => p.brandName === item.item);
        if (!product) {
          throw new Error(`Product not found: ${item.item}`);
        }

        const newInventory = product.productInventory - item.quantity;
        if (newInventory < 0) {
          throw new Error(`Insufficient inventory for ${item.item}`);
        }

        product.productInventory = newInventory;
        await updateProduct(productDB, product);
      }
    }

    await updateSale(salesDB, updatedSale);

  } else {
    // Single sale case
    const updatedSale = {
      ...this.selectedSale,
      status: status
    };

    if (status === 'Completed') {
      const product = products.find(p => p.brandName === this.selectedSale.item);
      if (!product) {
        throw new Error(`Product not found: ${this.selectedSale.item}`);
      }

      const newInventory = product.productInventory - this.selectedSale.quantity;
      if (newInventory < 0) {
        throw new Error(`Insufficient inventory for ${this.selectedSale.item}`);
      }

      product.productInventory = newInventory;
      await updateProduct(productDB, product);
    }

    await updateSale(salesDB, updatedSale);
  }

  await this.loadSales();
  alert(`Sale status updated to ${status}`);

} catch (error) {
  console.error('Error updating sale status:', error);
  alert(error.message || 'Failed to update sale status');
}
},




downloadExcel() {
    const worksheetData = this.sales.map((sale) => ({
      Item: sale.item,
      SKU: sale.reference,
      Status: sale.status,
      Date: sale.created_at,
      Amount: sale.amount,
      Unit_Price: sale.unit_price,
      Quantity: sale.quantity,
      TransactionID: sale.transactionNumber,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "SalesData.xlsx");
  },


    printReceipt(sale) {
      try {
        // Create iframe
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        // Generate receipt content
        const content = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Print Receipt</title>
              <style>
                body { 
                  font-family: Arial; 
                  padding: 20px;
                  max-width: 400px;
                  margin: auto;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                th, td {
                  padding: 8px;
                  text-align: left;
                }
                @media print {
                  body { margin: 0; }
                  @page { margin: 1cm; }
                }
              </style>
            </head>
            <body>
              <div id="receipt">
                <h2 style="text-align: center;">STORE RECEIPT</h2>
                <p>Transaction ID: ${sale.transactionNumber}</p>
                <p>Date: ${sale.created_at}</p>
                <p>Status: ${sale.status}</p>
                <hr>
                <table>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th style="text-align: right;">Amount</th>
                  </tr>
                  ${sale.items ? 
                    sale.items.map(item => `
                      <tr>
                        <td>${item.item}</td>
                        <td>${item.unit_price}</td>
                        <td>${item.quantity}</td>
                        <td style="text-align: right;">${item.amount}</td>
                      </tr>
                    `).join('') :
                    `<tr>
                      <td>${sale.item}</td>
                      <td>${sale.unit_price}</td>
                      <td>${sale.quantity}</td>
                      <td style="text-align: right;">${sale.amount}</td>
                    </tr>`
                  }
                </table>
                <hr>
                <p style="text-align: right;">
                  <strong>Total: ${sale.totalAmount || sale.amount}</strong>
                </p>
                <p style="text-align: center; margin-top: 30px;">
                  Thank you for your business!
                </p>
              </div>
            </body>
          </html>
        `;

        // Write content to iframe and print
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
        alert('Failed to print receipt. Please try again.');
      }
    },


    downloadReceipt(sale) {
      try {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        
        // Header
        doc.setFontSize(20);
        doc.text("STORE RECEIPT", pageWidth/2, 20, { align: "center" });
        
        // Receipt info
        doc.setFontSize(12);
        doc.text(`Transaction ID: ${sale.transactionNumber}`, 20, 40);
        doc.text(`Date: ${sale.created_at}`, 20, 50);
        doc.text(`Status: ${sale.status}`, 20, 60);
        
        // Items table header
        doc.setLineWidth(0.5);
        doc.line(20, 70, pageWidth-20, 70);
        doc.text("Item", 20, 80);
        doc.text("Unit Price", 80, 80);
        doc.text("Qty", 130, 80);
        doc.text("Amount", 170, 80);
        doc.line(20, 85, pageWidth-20, 85);

        let yPos = 95;

        // Handle multiple items
        if (sale.items && Array.isArray(sale.items)) {
          sale.items.forEach(item => {
            doc.text(item.item?.toString() || '', 20, yPos);
            doc.text(item.unit_price?.toString() || '', 80, yPos);
            doc.text(item.quantity?.toString() || '', 130, yPos);
            doc.text(item.amount?.toString() || '', 170, yPos);
            yPos += 10;
          });
        } 
        // Handle single item
        else {
          doc.text(sale.item?.toString() || '', 20, yPos);
          doc.text(sale.unit_price?.toString() || '', 80, yPos);
          doc.text(sale.quantity?.toString() || '', 130, yPos);
          doc.text(sale.amount?.toString() || '', 170, yPos);
        }

        // Total
        doc.line(20, yPos+5, pageWidth-20, yPos+5);
        doc.setFont(undefined, 'bold');
        doc.text("Total Amount:", 130, yPos+15);
        doc.text(sale.totalAmount || sale.amount || '0.00', 170, yPos+15);
        
        // Footer
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        doc.text("Thank you for your business!", pageWidth/2, yPos+35, { align: "center" });

        doc.save(`${sale.transactionNumber}_Receipt.pdf`);
      } catch (error) {
        console.error('Error generating receipt:', error);
        alert('Failed to generate receipt');
      }
    },


}
});


</script>







<style scoped>


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








/* manage returns*/


.form-container {
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.icon img {
  width: 32px;
  height: 32px;
  margin-right: 1rem;
}

.form-header h2 {
  margin: 0;
  flex-grow: 1;
  color: #333333;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
}

.return-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #444;
  font-size: 0.9rem;
}

.form-group input,
.form-group select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #4a90e2;
}

.file-upload .upload-box {
  border: 2px dashed #ddd;
  padding: 2rem;
  text-align: center;
  border-radius: 4px;
  background: #f8f9fa;
}

.file-upload p {
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.file-upload button {
  color: #329141;
  padding: 0.75rem 1.5rem;
  border: 2px solid #329141;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.file-upload button:hover,
.submit-btn:hover {
  background: #357abd;
}

.submit-btn {
  width: 20%;
  height: 20%;
  margin-top: 1rem;
  font-size: 1rem;
  align-self: center;
  background-color: #329141;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

/* Read-only input styles */
input[readonly] {
  background-color: #f5f5f5;
  cursor: not-allowed;
}


</style>