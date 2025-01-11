<template>
    <div class="container mt-5">


        <div class="d-flex align-items-center justify-content-between">

            <div>
                <h2>Inventory</h2>
                <h6>List of all SKUs in the system</h6>
            </div>
    
            <div>
                    <span data-bs-toggle="modal" data-bs-target="#addProductModal" style="cursor: pointer;"><img src="/addproduct.svg" alt=""></span>
                    <span class="ms-3" data-bs-toggle="modal"  data-bs-target="#suppliersInfoModal" style="cursor: pointer;" ><img src="/suplierInfo.svg" alt=""></span>
            </div>

        </div>
       



        <div class="d-flex mt-4">
            <div class="input-container">
                <img src="/tabler_search.svg" alt="">
                <input type="text" v-model="searchReference" @input="searchProduct"  placeholder="Search SKU" class="input1">
            </div>

            <button class="ms-3 btn1" @click="exportToExcel">
                <span><img src="/vscode-icons_file-type-excel.svg" alt=""></span>
                <span class="ps-3">Download Excel</span>
                    
            </button>
        </div>



        <div class="mt-5">
            <ul class="table-list">
                <li class="ms-3 cursor-pointer" @click="filterCategory('all')"><span>All</span></li>
                <li @click="filterCategory('fragrance')" class="cursor-pointer"><span>Fragrance Family</span></li>
                <li @click="filterCategory('gender')" class="cursor-pointer"><span>Gender</span></li>
            </ul>
        </div>

        <div class="mt-4" v-if="selectedCategory === 'fragrance'">
            <ul class="table-list2">
                <li class="ms-4" @click="filterSubCategory('woody')"><span>woody</span></li>
                <li class="ms-3" @click="filterSubCategory('floral')"><span>floral</span></li>
                <li class="ms-3" @click="filterSubCategory('seduction')"><span>seduction</span></li>
            </ul>
        </div>

        <div class="mt-4" v-if="selectedCategory === 'gender'">
            <ul class="table-list2">
                <li class="ms-4" @click="filterSubCategory('male')"><span>male</span></li>
                <li class="ms-3" @click="filterSubCategory('female')"><span>female</span></li>
            </ul>
        </div>


          <!-- Product List -->
            <div class="row row-cols-1 row-cols-md-4 g-4 mt-5">

                
                <div v-for="product in paginatedProducts" :key="product.id">
                    <div class="col">
                        <div class="card h-100">
                            <div class="card-body">
                                <div class="header-row d-flex align-items-center justify-content-between">
                                    <span class="info" @click="openUpdateModal(product)" data-bs-toggle="modal" data-bs-target="#productInfoModal">
                                        <img src="/info.svg" alt="Info Icon" class="img-fluid" />
                                    </span>
                                    <span class="productName">
                                        <p class="mb-0">{{ product.brandName }}</p>
                                    </span>
                                    <span class="cancel" @click="deleteProductInfo(selectedProduct.id)">
                                        <img src="/cancel.svg" alt="Cancel Icon" class="img-fluid" />
                                    </span>
                                </div>
                                    <p class="card-text mt-3">{{ product.description }}</p>
                                <div class="stockHolder d-flex align-items-center justify-content-between">
                                    <div class="stockHolder1">
                                        <h6>SKU:</h6>
                                        <h6 class="sub text-muted">{{ product.reference }}</h6>
                                    </div>
                                    <div class="stockHolder2">
                                        <h6>STOCK UNIT:</h6>
                                        <h6 class="sub text-muted">{{ product.productInventory }}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>



            
            <!-- No Products Found Message -->
            <div v-if="filteredProducts.length === 0" class="mt-3">
                <p class="text-muted">No product found with the provided SKU.</p>
            </div>


            <!-- Pagination -->
            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-between">
                    <li class="page-item disabled">
                    <span class="page-link">Page {{ productCurrentPage }} | {{ productCurrentPage }} of {{ productTotalPages }}</span>
                    </li>
                    <div class="d-flex">
                    <li class="page-item" :class="{ disabled: productCurrentPage === 1 }">
                        <button class="page-link" @click="prevProductPage" :disabled="productCurrentPage === 1">&lt;</button>
                    </li>
                    <li v-for="page in productTotalPages" :key="page" class="page-item" :class="{ active: productCurrentPage === page }">
                        <button class="page-link" @click="goToProductPage(page)">{{ page }}</button>
                    </li>
                    <li class="page-item" :class="{ disabled: productCurrentPage === productTotalPages }">
                        <button class="page-link" @click="nextProductPage" :disabled="productCurrentPage === productTotalPages">&gt;</button>
                    </li>
                    </div>
                </ul>
            </nav>

    </div>




        <!-- Modal -->
        <div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content container" style="height: 95vh; overflow-y: auto;">
                    <div class="container mt-5">

                        <div class="d-flex align-items-center justify-content-between">

                            <span class="d-flex">
                                <img src="/distribution.svg" alt="">
                                <h5>Add New Product</h5>
                            </span>

                            <img src="/cancel.svg" class="mb-4" data-bs-dismiss="modal" alt="" style="width: 5%; cursor: pointer;">

                        </div>

                        <!-- <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe explicabo consectetur doloremque omnis.</p> -->


                    <form @submit.prevent="saveProductInfo">

                        <div class="d-flex align-items-center justify-content-between ms-0 mr-5" style="gap: 16px; margin-top: 10%;">

                            <div class="select-container">
                                <div class="select-box">
                                    <label for="fragrance" class="select-label">Brand Name</label>
                                <input type="text form-control"   v-model="brandName" class="mt-2" placeholder="BrandName(size)" style="outline:none; border: none; width: 150px; height: 30px;" required>
                                </div>
                            </div>

                            <div class="select-container">
                                <div class="select-box">
                                    <label for="fragrance" class="select-label">Fragrance Family</label>
                                    <select v-model="fragranceFamily" class="mt-2 select-custom" required>
                                        <option value="" disabled>Select Fragrance Family</option>
                                        <!-- <option value="floral">Floral</option> -->
                                        <option value="woody">woody</option>
                                        <option value="fresh">floral</option>
                                        <option value="oriental">seduction</option>
                                    </select>
                                <!-- <input type="text form-control"   v-model="fragranceFamily" class="mt-2" placeholder="Fragrance Family" style="outline:none; border: none; width: 150px; height: 30px;" required> -->
                                </div>
                            </div>


                            <div class="select-container">
                                <div class="select-box">
                                    <label for="fragrance" class="select-label">Gender</label>
                                    <select v-model="gender" class="mt-2 select-custom" required>
                                        <option value="" disabled>Select Gender</option>
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                        <option value="unisex">unisex</option>
                                    </select>
                                <!-- <input type="text form-control"   v-model="gender" class="mt-2" placeholder="Gender" style="outline:none; border: none; width: 150px; height: 30px;"  required> -->
                                </div>
                            </div>

                        </div>




                        <div class="d-flex mt-3 align-items-center justify-content-between" style="gap: 16px;">


                            <div class="select-container">
                                <div class="select-box">
                                    <label for="fragrance" class="select-label">Size</label>
                                <input type="text form-control"   v-model="size" class="mt-2" placeholder="Size" style="outline:none; border: none; width: 150px; height: 30px;" required>
                                </div>
                            </div>
                            

                        <!-- </div>


                        <div class="d-flex mt-3 align-items-center justify-content-around" style="gap: 16px;"> -->

                            <div class="select-container">
                                <div class="select-box">
                                    <label for="fragrance" class="select-label">Selling Price</label>
                                <input type="text form-control"   v-model="sellingPrice" class="mt-2" placeholder="Selling Price" style="outline:none; border: none; width: 150px; height: 30px;" required>
                                </div>
                            </div>

                            <div class="select-container">
                                <div class="select-box">
                                    <label for="fragrance" class="select-label">Cost Price</label>
                                <input type="text form-control"   v-model="costPrice" class="mt-2" placeholder="CostPrice" style="outline:none; border: none; width: 150px; height: 30px;" required>
                                </div>
                            </div>

                        </div>



                        <div class="form-floating mt-3">
                            <textarea class="form-control" v-model="description" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                            <label for="floatingTextarea2">Product Description</label>
                        </div>




                        <div class="d-flex gap-4">
                        
                            <div class="upload-box mt-3">
                                <label for="file-upload" class="upload-label">
                                    <img src="/upload-square-02.svg" alt="" class="upload-icon">
                                    <input type="file" @change="handleImageUpload" id="file-upload" class="upload-input">
                                    <span>Upload product image</span>
                                </label>
                            </div>


                            <div class="select-container mt-3">
                                <div class="select-box">
                                    <label for="fragrance" class="select-label">Product Inventory</label>
                                <input type="text form-control" v-model="productInventory" class="mt-2" placeholder="Prodct Inventory" style="outline:none; border: none; width: 150px; height: 30px;">
                                </div>
                            </div>

                        </div>



                        <div class="d-flex justify-content-center align-items-center" style="margin-top: 10%;">
                            <button class="btn  col-6 btn-lg text-light" style="background-color: #329141;">Add Product</button>
                        </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>




        



        <!-- Modal -->
<!-- Modal -->
<div class="modal fade" id="productInfoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content container" style="height: 95vh; overflow-y: auto;">
            <div class="container mt-3">

                <div class="d-flex align-items-center justify-content-between">
                    <span class="d-flex">
                        <img src="/distribution.svg" alt="">
                        <h5>Product Info</h5>
                    </span>
                    <img src="/cancel.svg" class="mb-1" data-bs-dismiss="modal" alt="" style="width: 5%; cursor: pointer;">
                </div>
                <h3>{{ selectedProduct?.id }}</h3>

                <p>Every Brand has its quality</p>

                <!-- Product Info Form -->
                <form @submit.prevent="updateProductInfo(selectedProduct)">
                    <div class="d-flex justify-content-between">
                        <div>
                            <div class="d-flex justify-content-between">
                                <div class="">
                                    <div class="select-container2">
                                        <div class="select-box2">
                                            <input type="number" v-model="selectedProduct.productInventory" class="mt-2 ps-3" placeholder="15" style="outline:none; border: none; width: 150px; height: 30px;" required>
                                        </div>
                                    </div>

                                    <button type="submit" class="btn mt-3 text-light" style="background-color: #329141;">
                                        <span><img src="/tabler_refresh.svg" alt=""></span>
                                        Update Inventory
                                    </button>
                                </div>


                                

                                <div class="d-flex ms-5" style="margin-top: 15%;">
                                    <div class="select-container3">
                                        <h6 class="notification-title">Inventory Threshold <br> Notification</h6>
                                        <p class="select-box3 me-3">
                                            5
                                        </p>
                                    </div>
                                    <div>
                                        <img src="/updatethrahold.svg" alt="">
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div>
                            <img v-if="selectedProduct.image" :src="selectedProduct.image" alt="Sample Image" width="150" height="120">
                        </div>
                    </div>

                    <div class="d-flex align-items-center justify-content-between ms-0 mr-5" style="gap: 16px; margin-top: 5%;">
                        <div class="select-container">
                            <div class="select-box">
                                <label for="brandName" class="select-label">Brand Name</label>
                                <input type="text" class="mt-2" v-model="selectedProduct.brandName" placeholder="Brand Name" style="outline:none; border: none; width: 150px; height: 30px;" required>
                            </div>
                        </div>

                        <div class="select-container">
                            <div class="select-box">
                                <label for="fragranceFamily" class="select-label">Fragrance Family</label>
                                <input type="text" class="mt-2" v-model="selectedProduct.fragranceFamily" placeholder="Fragrance Family" style="outline:none; border: none; width: 150px; height: 30px;" required>
                            </div>
                        </div>

                        <div class="select-container">
                            <div class="select-box">
                                <label for="gender" class="select-label">Gender</label>
                                <input type="text" v-model="selectedProduct.gender" class="mt-2" placeholder="Gender" style="outline:none; border: none; width: 150px; height: 30px;" required>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex mt-3 align-items-center justify-content-between" style="gap: 16px;">

                        <div class="select-container">
                            <div class="select-box">
                                <label for="sizeType_1" class="select-label">Size</label>
                                <input type="text" class="mt-2" v-model="selectedProduct.size" placeholder="Size" style="outline:none; border: none; width: 150px; height: 30px;" required>
                            </div>
                        </div>

                    <!-- </div>

                    
                    
                    <div class="d-flex align-items-center ms-0 mr-5" style="gap: 16px; margin-top: 1%;"> -->

                     <div class="select-container">
                            <div class="select-box">
                                <label for="sizeType_3" class="select-label">Selling Price</label>
                                <input type="text" class="mt-2" v-model="selectedProduct.sellingPrice" placeholder="Size" style="outline:none; border: none; width: 150px; height: 30px;" required>
                            </div>
                        </div>


                        <div class="select-container">
                            <div class="select-box">
                                <label for="sizeType_3" class="select-label">Cost Price</label>
                                <input type="text" class="mt-2" v-model="selectedProduct.costPrice" placeholder="Size" style="outline:none; border: none; width: 150px; height: 30px;" required>
                            </div>
                        </div>

                    
                    </div>


                    <div class="form-floating mt-3">
                        <textarea class="form-control" placeholder="Leave a comment here" v-model="selectedProduct.description" id="floatingTextarea2" style="height: 100px" required></textarea>
                        <label for="floatingTextarea2">Product Description</label>
                    </div>
                </form>

            </div>
        </div>
    </div>
</div>












<!-- Modal -->
<div class="modal fade" id="suppliersInfoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog suplierInfo">
    <div class="modal-content">
      <!-- <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Suppliers Info</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div> -->
        <div class="modal-body">

            <div>

                <div class="d-flex align-items-center justify-content-between"  style="margin: 0 20px;">
                    <span class="mt-2 d-flex">
                        <span><img src="distribution.svg" alt=""></span>
                        <span class="ps-2">
                            <h4>Suppliers Info</h4>
                            <p style="padding-right: 40%;">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium distinctio corporis totam qui esse tenetur nulla</p>
                        </span>
                    </span>
    
                    <span class="" style="cursor: pointer;" data-bs-dismiss="modal">
                        <img src="cancel.svg" alt="" style="width: 25px;">
                    </span>
    
                </div>

            </div>


            <div class="supplierWrapper mt-5"   style="margin: 0 20px;">

                <div class="d-flex align-items-center justify-content-between"  style="margin: 0 50px;">
                    <span class="mt-5">
                        <div class="supplierSearch">
                            <img src="search_visual.svg" alt="">
                            <input type="text" v-model="searchName" @input="searchSupplier"  placeholder="Search Supplier Name" class="input1">
                        </div>
                    </span>
    
                    <span  class="mt-5" style="cursor: pointer;"  data-bs-toggle="modal" data-bs-target="#addSupplierModal">
                        <img src="addsupplier.svg" alt=""  >
                    </span>
    
                </div>


                <div class="mt-5" style="margin: 0 50px;">
                    <table class="table" style="padding-top: 40%">
                        <thead>
                            
                            <th scope="col" style="border: none !important;">
                                Name
                            </th>
    
                            <th scope="col" style="border: none !important;">
                                Phone Number
                            </th>
    
                            <th scope="col" style="border: none !important;">
                                Supplier
                            </th>
    
    
                            <th scope="col" style="border: none !important;">
                                Location
                            </th>
    
                            <th scope="col" style="border: none !important;">
                                Supply Count
                            </th>
                            
                        </thead>
                        <tbody>
                            <tr class=""  v-for="(supplier, i) in  paginatedSuppliers" :key="i">
                            <td scope="row"  style="padding-top: 4% !important; ">{{ supplier.name }}</td>
                            <td style="padding-top: 4% !important; padding-bottom: 4%;">{{ supplier.phoneNumber }}</td>
                            <td  style="padding-top: 4% !important; ">{{ supplier.supplier }}</td>
                            <td style="padding-top: 4% !important; ">{{ supplier.location }}</td>
                            <td style="padding-top: 4% !important; ">{{ supplier.supplyCount }}</td>
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

        </div>
        
      <!-- <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div> -->

    </div>
  </div>
</div>






<!-- Button trigger modal -->
<!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addSupplierModal">
  Launch demo modal
</button> -->

<!-- Modal -->
<div class="modal fade" id="addSupplierModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add Supplier</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <form @submit.prevent="addSupplier">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" v-model="name" ref="nameInput" required>
            </div>
            <div class="mb-3">
              <label for="phoneNumber" class="form-label">Phone Number</label>
              <input type="tel" class="form-control" id="phoneNumber" v-model="phoneNumber" ref="phoneNumberInput" required>
            </div>
            <div class="mb-3">
              <label for="supplier" class="form-label">Supplier</label>
              <input type="text" class="form-control" id="supplier" v-model="supplier" ref="supplierInput" required>
            </div>
            <div class="mb-3">
              <label for="location" class="form-label">Location</label>
              <input type="text" class="form-control" id="location" v-model="location" ref="locationInput" required>
            </div>
            <div class="mb-3">
              <label for="supplyCount" class="form-label">Supply Count</label>
              <input type="number" class="form-control" id="supplyCount" v-model="supplyCount" ref="supplyCountInput" required>
            </div>
                <button type="submit" class="btn col-5 mx-auto d-block" style="border-radius: 10px; background-color: rgb(50, 145, 65); color: #fff;">Submit</button>
          </form>
      </div>
      <!-- <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div> -->
    </div>
  </div>
</div>





</template>



<script>
import * as XLSX from "xlsx";
import { openDB, addProduct, getAllProducts, updateProduct, deleteProduct } from '../utils/indexDB';
import { openSupplierDB, addSupplier, getAllSuppliers } from '../utils/supplierDB';

export default {
  data() {
    return {
      brandName: "",
      fragranceFamily: "",
      gender: "",
      size: "",
      sellingPrice: "",
      costPrice: "",
      description: "",
      productInventory: "",
      image: null,

      products: [],
      filteredProducts: [],
      productCurrentPage: 1,
      productItemsPerPage: 8,
      searchReference: "",
      searchName: "",

      selectedProduct: {
        id: '',
        brandName: '',
        description: '',
        reference: '',
        productInventory: '',
        fragranceFamily: "",
        gender: "",
        size: "",
        // other fields
      },

      suppliers: [],
      filteredSuppliers: [],
      currentPage: 1,
      itemsPerPage: 2,

      name: '',
      phoneNumber: '',
      supplier: '',
      location: '',
      supplyCount: '',

      selectedCategory: 'all',
      selectedSubCategory: '',
    };
  },

  mounted(){

    this.loadProducts().then(() => {
        this.checkLowInventory();
    });

    this.loadSuppliers();

    let userLogin = localStorage.getItem('name');
        if (!userLogin) {
            this.$router.push({ name: 'login' });
        } 
  },

    computed: {
        filteredProductList() {
            let filtered = this.products;

            if (this.selectedCategory === 'gender' && this.selectedSubCategory) {
                filtered = filtered.filter(product => product.gender === this.selectedSubCategory);
            } else if (this.selectedCategory === 'fragrance' && this.selectedSubCategory) {
                filtered = filtered.filter(product => product.fragranceFamily === this.selectedSubCategory);
            }

            if (this.searchReference) {
                filtered = filtered.filter(product => product.reference.toLowerCase().includes(this.searchReference.toLowerCase()));
            }

            return filtered;
        },

        safeProductInventory() {
        return this.selectedProduct?.productInventory || '';  // Default value if undefined
        },

        paginatedSuppliers() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredSuppliers.slice(start, end);
        },
        totalPages() {
        return Math.ceil(this.filteredSuppliers.length / this.itemsPerPage);
        },

        paginatedProducts() {
        const start = (this.productCurrentPage - 1) * this.productItemsPerPage;
        const end = start + this.productItemsPerPage;
        return this.filteredProductList.slice(start, end);
        },
        productTotalPages() {
        return Math.ceil(this.filteredProductList.length / this.productItemsPerPage);
        },
    },


    methods: {
        filterCategory(category) {
            this.selectedCategory = category;
            this.selectedSubCategory = '';
        },

        filterSubCategory(subCategory) {
            this.selectedSubCategory = subCategory;
        },

        openUpdateModal(product) {
            // Safely assign product to selectedProduct
            this.selectedProduct = { ...product };
        },

        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                this.image = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },

        async saveProductInfo() {
            const referenceNumber = `FB${Math.floor(100000000 + Math.random() * 900000000)}`;
            try {
                const db = await openDB();
                const newProduct = {
                brandName: this.brandName,
                fragranceFamily: this.fragranceFamily,
                gender: this.gender,
                size: this.size,
                sellingPrice: this.sellingPrice,
                costPrice: this.costPrice,
                description: this.description,
                productInventory: this.productInventory,
                image: this.image,
                reference: referenceNumber // Assuming SKU is passed in
                };

                console.log(newProduct);

                await addProduct(db, newProduct);
                alert('Product added successfully!');
                console.log(newProduct);

                this.loadProducts();
                this.resetForm();
                
            } catch (error) {
                console.error("Error saving product:", error);
            }
        },


        async loadProducts() {
            try {
                const db = await openDB();
                const products = await getAllProducts(db);
                console.log(products);

                this.products = products;
                this.filteredProducts = this.products;
            } catch (error) {
                console.error("Error loading products:", error);
            }

        },

        searchProduct() {
            const query = this.searchReference.trim().toLowerCase();

            if (query === "") {
                this.filteredProducts = this.products;
            } else {
                this.filteredProducts = this.products.filter((product) => {
                return product.reference && product.reference.toLowerCase().includes(query);
                });
            }
        },

        async updateProductInfo(product) {
            try {
                // Exclude the 'image' field from the product object
                const sanitizedProduct = { ...product };
                delete sanitizedProduct.image;

                // Assuming openDB and updateProduct are functions that handle your database operations
                const db = await openDB();

                console.log(sanitizedProduct);  // This will log the product without the image field

                await updateProduct(db, sanitizedProduct); // Update the product in the database
                alert('Product updated successfully!');
                this.loadProducts(); // Reload the product list
            } catch (error) {
                console.error("Error updating product:", error);
            }
        },

        async deleteProductInfo(productId) {
        try {
            console.log("Deleting product with ID:", productId); // Log the ID being passed
            const db = await openDB();
            await deleteProduct(db, productId); // Attempt to delete the product by ID
            alert('Product deleted successfully!');
            this.loadProducts(); // Reload the product list after deletion
        } catch (error) {
            console.error("Error deleting product:", error);
        }
        },

        exportToExcel() {
        // Prepare data for Excel
        const worksheetData = this.products.map((product) => ({
            BrandName: product.brandName,
            FragranceFamily: product.fragranceFamily,
            Gender: product.gender,
            Size: product.size,
            Selling_Price: product.sellingPrice,
            Cost_Price: product.costPrice,
            Description: product.description,
            ProductInventory: product.productInventory,
            Reference: product.reference,
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

        XLSX.writeFile(workbook, "Products.xlsx");
        },

        resetForm() {
            this.brandName = "";
            this.fragranceFamily = "";
            this.gender = "";
            this.size = "";
            this.sellingPrice = "";
            this.costPrice = "";
            this.description = "";
            this.productInventory = "";
            this.image = null;
        },

        nextProductPage() {
            if (this.productCurrentPage < this.productTotalPages) {
                this.productCurrentPage++;
            }
        },
        prevProductPage() {
            if (this.productCurrentPage > 1) {
                this.productCurrentPage--;
            }
        },
        goToProductPage(page) {
            this.productCurrentPage = page;
        },

        async addSupplier() {
            try {
                const db = await openSupplierDB();
                const newSupplier = {
                name: this.name,
                phoneNumber: this.phoneNumber,
                supplier: this.supplier,
                location: this.location,
                supplyCount: this.supplyCount
                };

                console.log(newSupplier);

                await addSupplier(db, newSupplier);
                alert('Supplier added successfully!');
                console.log(newSupplier);

                // this.clearForm();
                this.loadSuppliers();
                window.location.reload();
            } catch (error) {
                console.error("Error saving supplier:", error);
            }
        },

        async loadSuppliers() {
            try {
                const db = await openSupplierDB();
                const suppliers = await getAllSuppliers(db);
                console.log(suppliers);

                this.suppliers = suppliers;
                this.filteredSuppliers = this.suppliers;
            } catch (error) {
                console.error("Error loading suppliers:", error);
            }
        },

        searchSupplier() {
            const query = this.searchName.trim().toLowerCase();

            if (query === "") {
                this.filteredSuppliers = this.suppliers;
            } else {
                this.filteredSuppliers = this.suppliers.filter((supplier) => {
                return supplier.name && supplier.name.toLowerCase().includes(query);
                });
            }
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


        checkLowInventory() {
            const lowInventoryProducts = this.products.filter(product => product.productInventory < 1);

            if (lowInventoryProducts.length > 0) {
                const productNames = lowInventoryProducts.map(product => product.brandName).join(', ');
                alert(`Warning: The following products have low inventory: ${productNames}`);
                
                // Store low inventory products in localStorage
                localStorage.setItem("lowInventory", JSON.stringify(lowInventoryProducts));
            }
        }


    },


};
</script>








<style scoped>

.select-custom, .input-custom {
  outline: none;
  border: none;
  border-radius: 8px;
  width: 150px;
  height: 30px;
  font-size: 14px;
  padding: 5px;
  background-color: #fff;
  transition: border-color 0.3s;
}


    .notification-title {
        font-size: small;
        font-weight: bold; /* Optional: makes it bold */
        line-height: 1.4;  /* Optional: adjust space between lines */
    }

    .select-container3 {
        display: flex;
        flex-direction: column; /* Ensures text is displayed vertically */
    }




    .select-container3 {
        width: 100px;
        display: flex;
        flex-direction: column;

    }

    .select-box3 {
        position: relative;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #fff;
        padding: 12px;
        padding-bottom: 5%;
        height: 40px; /* Set a fixed height for the container */
    }



    .select-container2 {
        width: 160px;
        display: flex;
        flex-direction: column;
    }

    .select-box2 {
        position: relative;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #fff;
        /* padding: 12px; */
        height: 50px; /* Set a fixed height for the container */
    }


    select{
        font-weight: bolder;
    }

    input{
        font-weight: bolder;
    }

    textarea label{
        font-weight: 300;
    }

    .upload-box {
        display: inline-block;
        padding: 10px;
        border: 2px double #ccc;
        border-radius: 10px;
        text-align: center;
        width: 200px;
        cursor: pointer;
        transition: border-color 0.3s ease;
    }

    .upload-box:hover {
        border-color: #007bff;
    }

    .upload-label {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        cursor: pointer;
        color: #555;
        font-size: 14px;
    }

    .upload-icon {
        width: 24px;
        height: 24px;
        color: #007bff;
    }

    .upload-input {
        display: none;
    }


    .modal-dialog {
        max-width: 650px;
        border-radius: 100px !important;
        /* height: 1000px; */

    }

    .modal-content {
        border-radius: 30px !important;
    }


    .select-container {
        width: 200px;
        display: flex;
        flex-direction: column;
    }

    .select-box {
        position: relative;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #fff;
        padding: 12px;
        height: 55px; /* Set a fixed height for the container */
    }

    .select-label {
        position: absolute;
        top: 15%;
        left: 12px;
        transform: translateY(-50%);
        font-size: 14px;
        color: #999;
        pointer-events: none; /* Ensure the label doesn't block the dropdown */
        transition: 0.2s ease;
    }

    .select-dropdown {
        width: 100%;
        border: none;
        background: none;
        outline: none;
        font-size: 14px;
        padding: 8px 0;
        appearance: none; /* Remove browser-specific dropdown styles */
        color: #333;
    }

    .select-dropdown:focus + .select-label,
    .select-dropdown:not(:placeholder-shown) + .select-label {
        top: 5px;
        font-size: 10px;
        color: #666;
    }




    .sub{
        font-weight:lighter;
        color: #000;
    }

    .info{
        cursor: pointer;
    }

    .cancel{
        padding-left: 30%;
        cursor: pointer;
    }

    .productName{
        /* padding-left: 5%; */
        font-weight: bolder;
        color: #329141;
        font-size: medium !important;
    }


    .table-list {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 3rem;
        border-bottom: 1px solid #ddd;
    }

    .table-list li {
        font-weight: bold;
        color: #848484;
    }


    .table-list2 {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 3rem;
    }


    .table-list2 li {
        font-weight: bold;
        color: #848484;
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
        width: 25px; /* Adjust as needed */
        height: 25px; /* Adjust as needed */
        pointer-events: none; /* Prevent interaction with the image */
    }


    .btn1{
        width: 200px;
        border-radius: 10px;
        border: 0.1px solid #c8c8c86f;
        background-color: #fff;
    }



    .suplierInfo{
        max-width: 1080px !important;
        max-height: 1050px;
        border-radius: 100px !important;
    }

    .supplierSearch{
        position: relative;
        display: inline-block;
    }


    .supplierSearch input {
        width: 250px;
        height: 55px;
        padding: 10px 10px 10px 45px;
        font-size: 16px;
        background-color: #ffffff;
        border-radius: 10px;
        border: 1px solid #dcdcdc;
        outline: none;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .supplierSearch img {
        position: absolute;
        top: 55%;
        left: 10px;
        transform: translateY(-50%);
        width: 25px; /* Adjust as needed */
        height: 25px; /* Adjust as needed */
        pointer-events: none; /* Prevent interaction with the image */
    }

    .supplierWrapper{
        height: 30rem;
        background-color: #f7fbfc;
        border-radius: 10px;
    }

  
    .sparkline {
        width: 100%;
        height: 100%;
    }

</style>