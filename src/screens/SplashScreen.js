import React, { Component } from "react";
import { Box } from "react-native-design-utility";
import { inject } from "mobx-react/native";

import OnboardingLogo from "../commons/OnboardingLogo";

@inject("authStore")
class SplashScreen extends Component {
  state = {};

  componentDidMount() {
    this.checkAuth();
  }

  checkAuth = async () => {
    await this.props.authStore.setupAuth();
  };

  render() {
    return (
      <Box f={1} center>
        <OnboardingLogo />
      </Box>
    );
  }
}

export default SplashScreen;
