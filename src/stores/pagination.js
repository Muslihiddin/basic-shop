import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import dummyjsonAPI from "../services/dummyjsonAPI";

export const usePaginationStore = defineStore("pagination", () => {
  const products = reactive([]);
  const product = ref({});

  // getting all products
  const getProducts = async () => {
    try {
      products.splice(0);
      const response = await dummyjsonAPI.getAllProducts();
      response.data.products.map((x) => products.push(x));
    } catch (err) {
      console.log(err);
    }
  };

  // getting products by category
  const getCategoryProducts = async (category) => {
    try {
      products.splice(0);
      const response = await dummyjsonAPI.getProductsByCategory(category);
      response.data.products.map((x) => products.push(x));
    } catch (err) {
      console.log(err);
    }
  };

  // getting single product
  const getSingleProduct = async (productId) => {
    try {
      const response = await dummyjsonAPI.getProductById(productId);
      product.value = response.data;
    } catch (err) {
      console.log(err);
    }
  };

  // pagination logic
  let appliedFilter = ref([]);
  let pageNumber = ref(1);
  let filtered = reactive([]);

  const paginatedProducts = computed(() => {
    if (appliedFilter.value.length == 0) {
      return products.slice((pageNumber.value - 1) * 12, pageNumber.value * 12);
    } else if (appliedFilter.value.length > 0) {
      filtered.splice(0);
      for (let i = 0; i < appliedFilter.value.length; i++) {
        for (let j = 0; j < products.length; j++) {
          if (products[j].brand === appliedFilter.value[i]) {
            filtered.push(products[j]);
          }
        }
      }
      return filtered;
    }
  });

  const dropFilters = () => {
    appliedFilter.value.splice(0);
    filtered.splice(0);
  };

  const nextPage = () => {
    if (pageNumber.value >= Math.ceil(products.length / 12)) {
      return;
    } else {
      pageNumber.value++;
    }
  };

  const prevPage = () => {
    if (pageNumber.value == 1) {
      return;
    } else {
      pageNumber.value--;
    }
  };

  const toPage = (page) => {
    pageNumber.value = page;
  };

  return {
    product,
    products,
    paginatedProducts,
    pageNumber,
    appliedFilter,
    getProducts,
    getSingleProduct,
    nextPage,
    prevPage,
    toPage,
    getCategoryProducts,
    dropFilters,
  };
});
