import React, { Component } from "react";
import { Box } from "react-native-design-utility";
import { ScrollView } from "react-native";
import { inject } from "mobx-react/native";

import ProductCard from "../components/ProductCard";

@inject("productsStore")
class CategoryScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("name", "InStore")
  });

  state = {};

  // getInitialState() {
  //   console.log("GET INITIAL STATE ÇALIŞTI!");
  //   return { ad: "ARİF" };
  // }

  // componentWillMount() {
  //   console.log("COMPONENT WILL MOUNT ÇALIŞTI!");
  // }

  // componentDidMount() {
  //   console.log("COMPONENT DID MOUNT! ÇALIŞTI");
  // }

  // componentWillReceiveProps(newProps) {
  //   console.log(newProps.myNumber);
  //   console.log("COMPONENT WILL RECIEVE PROPS!");
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("COMPONENT DID UPDATE ÇALIŞTI!");
  // }

  // componentWillUnmount() {
  //   console.log("COMPONENT WILL UNMOUNT ÇALIŞTI!");
  // }

  render() {
    return (
      <Box>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {this.props.productsStore.data.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ScrollView>
      </Box>
    );
  }
}

export default CategoryScreen;
