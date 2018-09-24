import React, { Component } from "react";
import {
  StatusBar,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { Box, Text } from "react-native-design-utility";
import { observer, inject } from "mobx-react/native";
import { observable, action } from "mobx";

import CloseBtn from "../commons/CloseBtn";
import Input from "../commons/Input";
import Button from "../commons/Button";
import { theme } from "../constants/theme";
import { buildAddress } from "../utils/buildAddress";

const styles = StyleSheet.create({
  buttonDisabled: {
    backgroundColor: theme.color.greyLight,
    borderColor: theme.color.greyLight
  },
  button: {
    backgroundColor: theme.color.green
  }
});
@inject("authStore")
@observer
class AddressFormScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Address",
    headerLeft: (
      <CloseBtn left size={25} onPress={() => navigation.goBack(null)} />
    )
  });

  @observable
  streetName = "";

  @observable
  postalCode = "";

  @observable
  city = "";

  @observable
  district = "";

  @observable
  neighborhood = "";

  @observable
  address = null;

  @observable
  isSaving = false;

  goToSearch = () => {
    this.props.navigation.navigate("AutocompleteAddress", {
      searchAddress: this.searchAddress
    });
  };

  @action.bound
  async saveAddress() {
    this.isSaving = true;
    try {
      await this.props.authStore.info.createAddress(this.address);
      this.props.navigation.goBack(null);
    } catch (error) {
      console.log("error", error);
    }
  }

  @action.bound
  searchAddress(value) {
    this.props.navigation.goBack(null);

    const address = buildAddress(value);

    this.streetName = address.street;
    this.postalCode = address.postalCode;
    this.city = address.city;
    this.district = address.district;
    this.neighborhood = address.neighborhood;

    this.address = address;
  }

  render() {
    if (this.isSaving) {
      return (
        <Box f={1} bg="white" center>
          <ActivityIndicator color={theme.color.green} size="large" />
        </Box>
      );
    }
    return (
      <Box f={1} bg="white" p="sm">
        <StatusBar barStyle="dark-content" />
        <ScrollView>
          <Box mb="sm">
            <Input
              placeholder="Street Address"
              editable={false}
              onPress={this.goToSearch}
              value={this.streetName}
            />
            <Input
              placeholder="Apt # (optional)"
              value={
                this.neighborhood !== "" && this.district !== ""
                  ? `${this.neighborhood}, ${this.district}`
                  : `${this.neighborhood}${this.district}`
              }
            />

            <Box dir="row">
              <Box f={1}>
                <Input
                  placeholder="Postal Code"
                  editable={false}
                  value={this.postalCode}
                />
              </Box>
              <Box w={theme.space.xs} />
              <Box f={1}>
                <Input placeholder="City" editable={false} value={this.city} />
              </Box>
            </Box>
            <Input
              placeholder="Instructions for delivery (optional)"
              containerStyle={{ height: 100 }}
              multiline
              textAlignVertical="top"
            />
          </Box>

          <Button
            disabled={!this.address}
            disabledStyle={styles.buttonDisabled}
            style={styles.button}
            onPress={this.saveAddress}
          >
            <Text bold color="white">
              Save
            </Text>
          </Button>
        </ScrollView>
      </Box>
    );
  }
}

export default AddressFormScreen;
