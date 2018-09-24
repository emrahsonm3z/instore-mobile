import BrandLogo from "../../assets/img/brandLogo.png";
import GoogleIcon from "../../assets/img/googleIcon.png";
import ShoppingCart from "../../assets/img/shoppingCart.png";

import HomeIconActive from "../../assets/img/HomeIconActive.png";
import ListIconActive from "../../assets/img/ListIconActive.png";
import StoresIconActive from "../../assets/img/StoresIconActive.png";
import OrderIconActive from "../../assets/img/OrderIconActive.png";

import HomeIconInactive from "../../assets/img/HomeIconInactive.png";
import ListIconInactive from "../../assets/img/ListIconInactive.png";
import StoresIconInactive from "../../assets/img/StoresIconInactive.png";
import OrderIconInactive from "../../assets/img/OrderIconInactive.png";

import Apple from "../../assets/img/products/apple.png";

export const images = {
  logo: BrandLogo,
  googleColorIcon: GoogleIcon,
  shoppingCart: ShoppingCart
};

export const tabBarIcons = {
  active: {
    Home: HomeIconActive,
    List: ListIconActive,
    Stores: StoresIconActive,
    Order: OrderIconActive
  },
  inactive: {
    Home: HomeIconInactive,
    List: ListIconInactive,
    Stores: StoresIconInactive,
    Order: OrderIconInactive
  }
};

export const productImgs = {
  apple: Apple
};
