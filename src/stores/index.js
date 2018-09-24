import { AuthStore } from "./Auth";
import { ProductsStore } from "./Products";
import { ShoppingCartStore } from "./ShoppingCart";
import { ProductModel } from "../models/Product";

import Apple from "../../assets/img/products/apple.png";
import Tomato from "../../assets/img/products/tomato.png";

const authStore = AuthStore.create();

const shoppingCartStore = ShoppingCartStore.create({ products: [] });

const productsStore = ProductsStore.create({
  data: [
    ProductModel.create({
      id: "1",
      name: "Red Apple",
      imageUrl: Apple,
      kgPrice: 10.12,
      unityPrice: 1.9
    }),
    ProductModel.create({
      id: "2",
      name: "Tomato",
      imageUrl: Tomato,
      kgPrice: 9.51,
      unityPrice: 1.25
    })
  ]
});

export const store = {
  authStore,
  shoppingCartStore,
  productsStore
};

window.MobxStore = store;
