<template>
    <div class="container mt-5">

        <!-- <div class="mt-5">

            <ul class="table-list">
                <router-link to="/salesmanagement" class="router-link ms-3" active-class="active-link">
                    Sales Management
                </router-link>

                <router-link to="/orderinfo" class="router-link" active-class="active-link" >
                    Order Information
                </router-link>
            </ul>

        </div> -->

        <div class="d-flex align-items-center justify-content-between mt-5">

            <div>
                <h4>Dashboard</h4>
                <h6>List of sales made on the platform</h6>
            </div>

            <!-- <div>
                <span><img src="/PointOfSales.svg" alt="" data-bs-toggle="modal" data-bs-target="#posModal" style="cursor: pointer;"></span>
                <span class="ms-3"><img src="/SaleReport.svg" alt="" style="cursor: pointer;"  data-bs-toggle="modal" data-bs-target="#salesreportModal"></span>
            </div> -->

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
                    <td>{{ sale.amount }}</td>
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
    <div class="modal fade" id="viewSaleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog viewSaleModalDailog">
        

            <div class="modal-content viewslemodal-content container text-light">

                <div class="d-flex justify-content-between align-items-start mt-4">
                    <div class="d-flex">
                        <img src="/tabler_playlist-add.svg" alt="" class="me-3" style="height: 40px;">
                        <div class="text-dark">
                            <h5 class="mb-2">POS</h5>
                            <p class="mb-0" style="width: 80%;">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus repellendus est alias iure perspiciatis pariatur rerum nesciunt quibusdam at fuga modi.
                            </p>
                        </div>
                    </div>
                    <img src="/cancel.svg" alt="Cancel" style="height: 30px; cursor: pointer;">
                </div>


                <div class="mainrapperx container mb-5 mt-4" style="height: 85vh; border-radius: 20px; background-color: #F7FBFC;">
                    <div class="mainwrapper mainviewwrapper container text-light p-4 rounded container mt-5"  style="height: 58vh; border-radius: 20px;"> 
                        
                        <div class="text-dark d-flex justify-content-between" >
                            <div>
                                <span>List of items</span>
                            </div>

                            <div>
                                <img src="/cleall.svg" alt="">
                            </div>
                        </div>
                        <div class="wrapper viewsalewrapper text-dark p-4 rounded" style="height: 38vh; border-radius: 20px;"> <!-- Level 3: Inner Wrapper -->
                            <!-- Modal Header -->
                        
                            <form @submit.prevent="saveProductSales">

                                <!-- Input Section -->
                                <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap">
                                    
                                    <span>
                                        <h6>Item</h6>
                                        <input type="text" class="form-control" v-model="selectedSale.item" style="width: 200px;" required>
                                    </span>
                                    <span>
                                        <h6>Unit Price</h6>
                                        <input type="text" class="form-control" v-model="selectedSale.unit_price" style="width: 200px;" required>
                                    </span>
                                    <span>
                                        <h6>Quantity</h6>
                                        <input type="text" class="form-control" v-model="selectedSale.quantity" style="width: 200px;" required>
                                    </span>
                                    <span>
                                        <h6>Amount</h6>
                                        <input type="text" class="form-control" v-model="selectedSale.amount" style="width: 200px;" readonly>
                                    </span>

                                   
                                
                                    <!-- <img src="/deleteicon.svg" alt="Delete" style="height: 30px; cursor: pointer;"> -->
                                </div>

                                <!-- Footer Section -->
        
                                
                                <div class="text-dark" style="margin-left: 80%; margin-top: 8%;">
                                    <div>Total: {{ selectedSale.amount }}</div>
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
                            <p class="mb-0" style="width: 80%;">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus repellendus est alias iure perspiciatis pariatur rerum nesciunt quibusdam at fuga modi.
                            </p>
                        </div>
                    </div>
                    <img src="/cancel.svg" alt="Cancel" style="height: 30px; cursor: pointer;">
                </div>




                <div class="mainrapperx container mb-5 mt-4" style="height: 85vh; border-radius: 20px; background-color: #F7FBFC;">
                    <div class="mainwrapper mainviewwrapper container text-light p-4 rounded container mt-5"  style="height: 58vh; border-radius: 20px;"> 
                        
                        <div class="text-dark d-flex justify-content-between" >
                            <div>
                                <span>List of items</span>
                            </div>

                            <div>
                                <img src="/cleall.svg" alt="">
                            </div>
                        </div>
                        <div class="wrapper viewsalewrapper text-dark p-4 rounded" style="height: 38vh; border-radius: 20px;"> <!-- Level 3: Inner Wrapper -->
                            <!-- Modal Header -->
                        
                            <form @submit.prevent="saveProductSales">

                                <!-- Input Section -->
                                <div class="d-flex align-items-center justify-content-between mb-4 flex-wrap">
                                    
                                    <span>
                                        <h6>Item</h6>
                                        <input type="text" class="form-control" v-model="item" style="width: 200px;" required>
                                    </span>
                                    <span>
                                        <h6>Unit Price</h6>
                                        <input type="text" class="form-control" v-model="unit_price" style="width: 200px;" required>
                                    </span>
                                    <span>
                                        <h6>Quantity</h6>
                                        <input type="text" class="form-control" v-model="quantity" style="width: 200px;" required>
                                    </span>
                                    <span>
                                        <h6>Amount</h6>
                                        <input type="text" class="form-control" v-model="amount" style="width: 200px;" readonly>
                                    </span>

                                </div>

                                <!-- Footer Section -->
        
                                
                                <div class="text-dark" style="margin-left: 80%; margin-top: 8%;">
                                    <div>Total: {{ amount }}</div>
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
                <p>Parchment be turns stand veela fawkes mistletoe snare drops.</p>
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
      pageSize: 2,
      selectedSale: {},
      searchTransactionNumber: "",
    };
  },

  setup() {
    const bestSellingProduct = ref(null);
    const leastSellingProduct = ref(null);
    const revenue = ref(null);
    const hasData = ref(false);
    const salesData = ref([]);


    

    
    const fetchData = async () => {
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

    const initializeCharts = () => {
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
    let userLogin = localStorage.getItem('name');
        if (!userLogin) {
            this.$router.push({ name: 'login' });
        } 
  },

  watch: {
    unit_price: 'calculateAmount',
    quantity: 'calculateAmount'
  },

  computed: {
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
    calculateAmount() {
      this.amount = this.unit_price * this.quantity;
    },

    async saveProductSales(status) {
      const referenceNumber = `FB${Math.floor(100000000 + Math.random() * 900000000)}`;
      const transactionNumber = `#${Math.floor(100000000 + Math.random() * 900000000)}`;

      try {
        const db = await openSalesDB();
        const newSale = {
          item: this.item,
          unit_price: this.unit_price,
          quantity: this.quantity,
          amount: this.amount,
          reference: referenceNumber,
          transactionNumber: transactionNumber,
          status: status,
          created_at: new Date().toLocaleString(),
        };
        await addSale(db, newSale);
        alert('Sale added successfully');
        window.location.reload();
      } catch (error) {
        console.error('Error adding sale:', error);
        alert('Failed to add sale');
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
        const db = await openSalesDB();
        const updatedSale = {
          ...this.selectedSale,
          status: status
        };
        await updateSale(db, updatedSale);
        alert(`Sale status updated to ${status}`);
        this.loadSales();
        window.location.reload();
      } catch (error) {
        console.error('Error updating sale status:', error);
        alert('Failed to update sale status');
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

    downloadReceipt(sale) {
      const doc = new jsPDF();
      doc.text(`Receipt for Transaction: ${sale.transactionNumber}`, 10, 10);
      doc.text(`Item: ${sale.item}`, 10, 20);
      doc.text(`Unit Price: ${sale.unit_price }`, 10, 30);
      doc.text(`Quantity: ${sale.quantity}`, 10, 40);
      doc.text(`Total Amount: ${sale.amount}`, 10, 50);
      doc.text(`Status: ${sale.status}`, 10, 60);
      doc.text(`Transaction Date: ${sale.created_at}`, 10, 70);
      doc.save(`${sale.transactionNumber}_Receipt.pdf`);
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

    /* .viewslemodal-content {
        background-color: #1dc1ea;
    } */

    /* .viewsalewrapper {
        background-color: #006d88;
        height:30vh;
        margin-top: 1%;
    } */


</style>