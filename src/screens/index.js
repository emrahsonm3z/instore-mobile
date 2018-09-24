import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import React, { Component } from "react";

import { NavigationService } from "../api/NavigationService";
import { theme } from "../constants/theme";
import TabBar from "../components/TabBar";

import LoginScreen from "./LoginScreen";
import SplashScreen from "./SplashScreen";
import HomeScreen from "./HomeScreen";
import ListScreen from "./ListScreen";
import OrderScreen from "./OrderScreen";
import StoresScreen from "./StoresScreen";
import CategoryScreen from "./CategoryScreen";
import ShoppingCartScreen from "./ShoppingCartScreen";
import ShoppingCartIcon from "../components/ShoppingCartIcon";
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";
import AddressesScreen from "./AddressesScreen";
import AddressFormScreen from "./AddressFormScreen";
import AutocompleteAddressScreen from "./AutocompleteAddressScreen";

const primaryHeader = {
  headerStyle: {
    backgroundColor: theme.color.green
  },
  headerTintColor: theme.color.white,
  headerTitleStyle: {
    textAlign: "center",
    flex: 1,
    fontWeight: "400"
  }
};

const AuthNavigator = createStackNavigator(
  {
    Login: {
      getScreen: () => LoginScreen
    }
  },
  {
    navigationOptions: {
      header: null
    }
  }
);
const ShoppingCartNavigator = createStackNavigator({
  ShoppingCart: {
    getScreen: () => ShoppingCartScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: theme.color.white
      }
    }
  }
});

const modalHeader = {
  headerBackTitle: null,
  headerTintColor: theme.color.green,
  headerStyle: {
    backgroundColor: theme.color.white
  },
  headerTitleStyle: {
    color: theme.color.black
  }
};

const ProfileStack = createStackNavigator(
  {
    Profile: {
      getScreen: () => ProfileScreen
    },
    Settings: {
      getScreen: () => SettingsScreen
    },
    Addresses: {
      getScreen: () => AddressesScreen
    }
  },
  {
    navigationOptions: {
      ...modalHeader
    }
  }
);

const AddressFormStack = createStackNavigator(
  {
    AddressForm: {
      getScreen: () => AddressFormScreen
    },
    AutocompleteAddress: {
      getScreen: () => AutocompleteAddressScreen
    }
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: theme.color.green,
      headerStyle: {
        backgroundColor: theme.color.white
      },
      headerTitleStyle: {
        color: theme.color.black
      }
    }
  }
);

const HomeStack = createStackNavigator(
  {
    Home: {
      getScreen: () => HomeScreen
    },
    Category: {
      getScreen: () => CategoryScreen
    },
    ShoppingCart: {
      screen: ShoppingCartNavigator,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    navigationOptions: { ...primaryHeader, headerRight: <ShoppingCartIcon /> }
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  if (
    NavigationService.getCurrentRouteName(navigation.state) === "ShoppingCart"
  ) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    List: {
      getScreen: () => ListScreen
    },
    Stores: {
      getScreen: () => StoresScreen
    },
    Order: {
      getScreen: () => OrderScreen
    }
  },
  {
    tabBarComponent: props => <TabBar {...props} />
  }
);

const MainNavigator = createStackNavigator(
  {
    Tab: TabNavigator,
    Profile: ProfileStack,
    AddressForm: AddressFormStack
  },
  {
    mode: "modal",
    navigationOptions: {
      header: null
    }
  }
);

const AppNavigator = createSwitchNavigator(
  {
    Splash: {
      getScreen: () => SplashScreen
    },
    Auth: AuthNavigator,
    Main: MainNavigator
  },
  {
    initialRouteName: "Splash"
  }
);

class Navigation extends Component {
  render() {
    return (
      <AppNavigator ref={r => NavigationService.setTopLevelNavigator(r)} />
    );
  }
}

export default Navigation;
