import { createRouter,createWebHashHistory} from "vue-router";
import MainPage from "../components/MainPage.vue";
import InventoryPage from "@/components/InventoryPage.vue";
import SalesManagentPage from "@/components/SalesManagentPage.vue";
import OrderInformation from "@/components/OrderInformation.vue";
import CustomerPage from "@/components/WholeandRetailPage.vue";
import AnalysisPage from "@/components/analysisPage.vue";
import LoginPage from "@/components/Auth/LoginPage.vue";
import RegisterPage from "@/components/Auth/RegisterPage.vue";
import WholeandRetailPage from "@/components/WholeandRetailPage.vue";
import UsersPage from "@/components/usersPage.vue";
import ChangePassword from "@/components/Auth/ChangePassword.vue";




const routes = [

  {
    path: "/",
    name: 'main',
    component: MainPage,

  },

  {
    path: "/inventory",
    name: 'inventory',
    component: InventoryPage,

  },

  {
    path: "/salesmanagement",
    name: 'salesmanagement',
    component: SalesManagentPage,

  },

  {
    path: "/orderinfo",
    name: 'orderinfo',
    component: OrderInformation,

  },

  {
    path: "/customers",
    name: 'customers',
    component: CustomerPage,

  },

  {
    path: "/analytics",
    name: 'analytics',
    component: AnalysisPage,

  },

  {
    path: "/wholeandretail",
    name: 'wholeandretail',
    component: WholeandRetailPage,

  },

  {
    path: "/login",
    name: 'login',
    component: LoginPage,
  },

  {
    path: "/register",
    name: 'register',
    component: RegisterPage,
  },

  {
    path: "/users",
    name: 'users',
    component: UsersPage,
  },

  {
    path: "/changepassword",
    name: 'changepassword',
    component: ChangePassword,
  },
  
];


const router = createRouter({

    history: createWebHashHistory(),
    routes,

})



export default router;