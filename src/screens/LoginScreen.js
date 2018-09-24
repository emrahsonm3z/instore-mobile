import React, { Component } from "react";
import { Box } from "react-native-design-utility";
import { Animated } from "react-native";
import { inject } from "mobx-react/native";

import OnboardingLogo from "../commons/OnboardingLogo";
import LoginButton from "../commons/LoginButton";
import { FacebookApi } from "../api/Facebook";
import { GoogleApi } from "../api/Google";

const BoxAnimated = Animated.createAnimatedComponent(Box);

@inject("authStore")
class LoginScreen extends Component {
  state = {
    opacity: new Animated.Value(0),
    position: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.parallel([this.opacityAnim(), this.positionAnim()]).start();
  }

  opacityAnim = () => {
    const { opacity } = this.state;

    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      delay: 100
    }).start();
  };

  positionAnim = () => {
    const { position } = this.state;

    Animated.timing(position, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  onGooglePress = async () => {
    try {
      const token = await GoogleApi.loginAsync();
      const { authStore } = this.props;

      await authStore.login(token, "GOOGLE");
    } catch (error) {
      console.log("error", error);
    }
  };

  onFacebookPress = async () => {
    try {
      const token = await FacebookApi.loginAsync();
      console.log("token", token);
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    const { opacity, position } = this.state;

    const logoTranslate = position.interpolate({
      inputRange: [0, 1],
      outputRange: [150, 0]
    });

    return (
      <Box f={1} center bg="white">
        <BoxAnimated
          f={1}
          style={{
            transform: [
              {
                translateY: logoTranslate
              }
            ]
          }}
        >
          <Box f={1} center>
            <OnboardingLogo />
          </Box>
        </BoxAnimated>

        <BoxAnimated f={0.9} w={1} style={{ opacity }}>
          <LoginButton onPress={this.onGooglePress} type="google">
            Continue With Google
          </LoginButton>
          <LoginButton onPress={this.onFacebookPress} type="facebook">
            Continue With Facebook
          </LoginButton>
        </BoxAnimated>
      </Box>
    );
  }
}

export default LoginScreen;
