import { http } from "@/utilidades/http";
import type { AxiosResponse } from "axios";
import { AuthStore } from "@/stores/user";
class Shop {
  token: string;
  constructor(token: string) {
    this.token = token;
  }
  async getProducts(
    page: number,
    per_page: number,
    search?: string
  ): Promise<AxiosResponse> {
    return http
      .get(
        search
          ? `shop/?page=${page}&per_page=${per_page}&search_key=${search}`
          : `shop/?page=${page}&per_page=${per_page}`
      )
      .then((data) => data);
  }

  async getCategories(): Promise<AxiosResponse> {
    return http.get(`shop/categories`).then((data) => data);
  }
  async addProductToCart(data: {
    product_id: number;
    stock: number;
  }): Promise<AxiosResponse> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
    return http
      .post(`carts`, data, {
        headers,
      })
      .then((data) => data);
  }
}
const store = AuthStore();
const shop = new Shop(store.user.token);
export default shop;
