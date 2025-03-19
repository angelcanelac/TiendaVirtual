<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import type { Product, Category } from "@/types/Product";
import { AuthStore } from "@/stores/user";

import Shop from "@/api/Shop";
import Auth from "@/api/Auth";
//
interface Pagination {
  page: number;
  per_page: number;
  totalItems: number;
}
interface Headers {
  key: string;
  value?: string;
  align: "start" | "end" | "center";
  sortable: boolean;
  title: string;
}
//
const route = useRoute();
const router = useRouter();
const search = ref<string>("");
const products = ref<Product[]>([]);
const store = AuthStore();
const headers: Headers[] = [
  {
    align: "start",
    key: "id",
    sortable: false,
    title: "Id",
  },
  {
    align: "start",
    key: "name",
    sortable: false,
    title: "Nombre",
  },
  {
    align: "start",
    key: "description",
    sortable: false,
    title: "Descripción",
  },
  {
    align: "start",
    key: "price",
    sortable: false,
    title: "Precio",
  },
  {
    align: "start",
    key: "stock",
    sortable: false,
    title: "Disponibles",
  },
  {
    align: "start",
    key: "width",
    sortable: false,
    title: "Ancho",
  },
  {
    align: "start",
    key: "height",
    sortable: false,
    title: "Alto",
  },
  {
    align: "center",
    key: "actions",
    sortable: false,
    title: "Agregar Carrito",
  },
];

let loading = ref<boolean>(false);
let loadingCategory = ref<boolean>(false);
let snackbar = ref<boolean>(false);
let existProduct = ref<boolean>(false);
let categories = ref<Category[]>([]);
let selectedCategory = ref<string>("");
let pagination = ref<Pagination>({
  page: 1,
  per_page: 15,
  totalItems: 0,
});

// funciones
async function getData() {
  try {
    loading.value = true;
    const { data } = await Shop.getProducts(
      pagination.value.page,
      pagination.value.per_page,
      search.value
    );
    pagination.value.totalItems = data.meta.total;
    products.value = [...data.data];
  } catch (err: any) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}
async function getCategories() {
  try {
    loadingCategory.value = true;
    const { data } = await Shop.getCategories();
    categories.value = [...data.data];
  } catch (err: any) {
    console.error(err);
  } finally {
    loadingCategory.value = false;
  }
}

async function addToCart(product_id: number, stock: number) {
  try {
    await Shop.addProductToCart({ product_id, stock });
    getData();
    snackbar.value = true;
  } catch (err: any) {
    if (!err.response.data.success) {
      existProduct.value = true;
    }
  }
}

// mounted
onMounted(() => {
  if (route.query.page && route.query.per_page) {
    pagination.value.page = parseInt(route.query.page as string);
    pagination.value.per_page = parseInt(route.query.per_page as string);
  } else {
    router.replace({
      query: {
        page: pagination.value.page,
        per_page: pagination.value.per_page,
      },
    });
  }
  getCategories();
});

// watch
watch(
  () => [pagination.value.page, pagination.value.per_page],
  ([newPage, newPerPage]) => {
    router.replace({
      query: {
        ...route.query,
        page: newPage,
        per_page: newPerPage,
      },
    });
  }
);
watch(
  () => search.value,
  (newVal) => {
    if (newVal) {
      router.replace({
        query: {
          ...route.query,
          search: newVal,
        },
      });
    } else {
      router.replace({
        query: {
          page: route.query.page,
          per_page: route.query.per_page,
        },
      });
    }
  }
);
</script>

<template>
  <main>
    <v-toolbar dark prominent class="bg-indigo">
      <v-toolbar-title
        ><v-icon icon="md:shopping_cart" />Tienda en Línea</v-toolbar-title
      >

      <v-spacer />
      <v-btn
        icon
        @click="
          () => {
            Auth.signOut();
            store.clearUser();
          }
        "
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card flat title="Tienda">
      <template v-slot:text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="search"
              placeholder="Buscar..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              flat
              hide-details
            />
          </v-col>
        </v-row>
      </template>

      <v-data-table-server
        :items="products"
        v-model:search="search"
        v-model:page="pagination.page"
        v-model:items-per-page="pagination.per_page"
        :items-length="pagination.totalItems"
        :headers="headers"
        :loading="loading"
        item-value="id"
        @update:options="getData"
        prev-icon="md:arrow_back_ios"
        next-icon="md:arrow_forward_ios"
        loading-text="Cargando productos..."
        last-icon="md:last_page"
        first-icon="md:first_page"
        no-data-text="Producto no disponible"
      >
        <template v-slot:item.price="{ item }"> ${{ item.price }} </template>
        <template v-slot:item.actions="{ item }">
          <v-btn flat icon @click="addToCart(item.id, item.stock)">
            <v-icon class="v-icon--clickable" size="20" color="black">
              md:shopping_cart
            </v-icon>
          </v-btn>
        </template>
      </v-data-table-server>
    </v-card>
    <v-snackbar v-model="snackbar" color="blue-accent-4">
      El producto fue agregado al carrito
      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="
            () => {
              snackbar = false;
            }
          "
        >
          close
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar v-model="existProduct" color="red-accent-4">
      El producto ha sido comprado

      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="
            () => {
              existProduct = false;
            }
          "
        >
          close
        </v-btn>
      </template>
    </v-snackbar>
  </main>
</template>
