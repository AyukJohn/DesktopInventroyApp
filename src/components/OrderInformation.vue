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
              <h4>Manage Returns</h4>
          </div>

      </div>




      <!-- <div class="d-flex mt-4">
          <div class="input-container">
              <img src="/tabler_search.svg" alt="">
              <input type="text" placeholder="Search Transaction ID" class="input1"  v-model="searchTransactionNumber" @input="searchSalesProduct">
          </div>

          <button class="ms-3 btn1"  @click="downloadExcel">
              <span><img src="/vscode-icons_file-type-excel.svg" alt=""></span>
              <span class="ps-3">Download Excel</span>
          </button>

  
      </div> -->



      <div class="mt-5">
          
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
                                </tr>
                              </thead>
                              <tbody>
                                <tr  v-for="item in returns" :key="item.id" >
                                  <td>{{ item.productName }}</td>
                                  <td>{{ item.transactionNumber }}</td>
                                  <td>{{ new Date(item.created_at).toLocaleDateString() }}</td>
                                  <td>{{ item.unitPrice }}</td>
                                  <td>{{ item.reason }}</td>
                                  <td> <img src="/returninit.svg" alt=""></td>
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
                                </tr>
                              </thead>
                              <tbody>
                                <tr  v-for="item in returns" :key="item.id" >
                                  <td>{{ item.productName }}</td>
                                  <td>{{ item.transactionNumber }}</td>
                                  <td>{{ new Date(item.created_at).toLocaleDateString() }}</td>
                                  <td>{{ item.unitPrice }}</td>
                                  <td>{{ item.reason }}</td>
                                  <td> <img src="/returninit.svg" alt=""></td>
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


              <!-- <div class="form-group">
                <label for="product-name">Date</label>
                <input type="date" id="date" v-model="date" />
              </div> -->

              <div class="form-group">
                <label for="reason">Reason for Return</label>
                <select id="reason" v-model="reason">
                  <option value="Damaged Product">Damaged Product</option>
                  <option value="Wrong Item">Wrong Item</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <!-- <div class="form-group file-upload">
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
              </div> -->
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

import { defineComponent, onMounted, ref} from 'vue';


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
      pageSize: 3,
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


    
    

    onMounted(() => {
 

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


        
        // async submitReturn() {
        //   try {
        //     this.loading = true
        //     const returnData = {
        //       transactionNumber: this.transactionNumber,
        //       productName: this.productName,
        //       reason: this.reason,
        //       date: this.date,
        //       unitprice: this.unitprice,
        //     }
    
            
        //     await ReturnDbService.addReturn(returnData)
    
        //     alert('Return submitted successfully')
    
        //     await this.loadReturns()
        //     this.resetForm()
        //   } catch (err) {
        //     this.error = err.message
        //   } finally {
        //     this.loading = false
        //   }
        // },


        async submitReturn() {
          try {

            const returnData = {
              transactionNumber: this.transactionNumber,
              productName: this.productName,
              reason: this.reason,
              unitprice: this.unitprice,
            };

            await fetch('http://inventbackend.primoenergyoilandgas.com/api/v1/properties/createManageReturns', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify(returnData),
            });

           

            alert('Return submitted successfully');
            await this.loadReturns()

          } catch (err) {
            console.error('Error submitting return:', err);
            this.error = err.message;
            // alert('An error occurred while submitting the return. Please try again.');
          } 
        },

    



        // async loadReturns() {
        //   try {
        //     this.returns = await ReturnDbService.getAllReturns()
        //   } catch (err) {
        //     this.error = err.message
        //   }
        // },

        async loadReturns() {
          try {
            const response = await fetch('http://inventbackend.primoenergyoilandgas.com/api/v1/properties/manageReturns');

            const data = await response.json();
            console.log(data.data);
            // Assuming the server returns an array of returns
            this.returns = data.data || [];
          } catch (err) {
            console.error('Error loading returns:', err);
            this.error = err.message;
            // alert('An error occurred while loading returns. Please try again.');
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

    fetchUnitPrice(index) {
      fetch('http://inventbackend.primoenergyoilandgas.com/api/v1/properties/products', {
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



    saveProductSales(status) {
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
  fetch('http://inventbackend.primoenergyoilandgas.com/api/v1/properties/createSale', {
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
      fetch(`http://inventbackend.primoenergyoilandgas.com/api/v1/properties/product/${item.product_id}`)
      .then(response => response.json())
      .then(product => {
        const productData = product.data;
        

        const remainingInventory = parseInt(productData.productInventory) - parseInt(item.quantity);
        

            if (remainingInventory < 0) {
              throw new Error(`Insufficient inventory for ${item.item}`);
            }
            

            // Update with remaining inventory
            return fetch(`http://inventbackend.primoenergyoilandgas.com/api/v1/properties/productInventory/${item.product_id}`, {
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
    window.location.reload();
  })
  .catch(error => {
    console.error('Error saving sales:', error);
    // alert(`Failed to save sales: ${error.message}`);
  });
},



  loadSales() {
    fetch('http://inventbackend.primoenergyoilandgas.com/api/v1/properties/sales', {
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
      fetch(`http://inventbackend.primoenergyoilandgas.com/api/v1/properties/sale/${this.selectedSale.id}`, {
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
            fetch('http://inventbackend.primoenergyoilandgas.com/api/v1/properties/products')
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
                return fetch(`http://inventbackend.primoenergyoilandgas.com/api/v1/properties/productInventory/${product.id}`, {
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
      })
      .catch(error => {
        console.error('Error updating sale status:', error);
        // alert(error.message || 'Failed to update sale status');
      });
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
    console.log('Print Data:', sale);
    const calculatedTotal = sale.items ? 
      sale.items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0).toFixed(2) : '0.00';

    
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            @page { size: 80mm auto; margin: 0; }
            body { 
              font-family: 'Courier New', monospace;
              width: 80mm;
              padding: 5mm;
              margin: 0;
              font-size: 12px;
            }
            .header {
              text-align: center;
              margin-bottom: 10px;
              border-bottom: 1px dashed #000;
              padding-bottom: 10px;
            }
            .store-name {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .receipt-details {
              text-align: left;
              margin: 10px 0;
              border-bottom: 1px dashed #000;
              padding-bottom: 10px;
            }
            .items-table {
              width: 100%;
              margin: 10px 0;
              font-size: 12px;
            }
            .item-row td {
              padding: 3px 0;
            }
            .amount {
              text-align: right;
            }
            .total {
              border-top: 1px dashed #000;
              margin-top: 10px;
              padding-top: 10px;
              text-align: right;
              font-weight: bold;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              font-size: 10px;
              border-top: 1px dashed #000;
              padding-top: 10px;
            }
          </style>
        </head>
        <body>
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
            <tr>
              <td><strong>ITEM</strong></td>
              <td><strong>QTY</strong></td>
              <td class="amount"><strong>PRICE</strong></td>
              <td class="amount"><strong>AMT</strong></td>
            </tr>
            ${sale.items ? sale.items.map(item => `
              <tr class="item-row">
                <td>${item.item}</td>
                <td>${item.quantity}</td>
                <td class="amount">₦${parseFloat(item.unit_price).toFixed(2)}</td>
                <td class="amount">₦${parseFloat(item.amount).toFixed(2)}</td>
              </tr>
            `).join('') : ''}
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
    console.log('Sale Data:', sale);
    
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