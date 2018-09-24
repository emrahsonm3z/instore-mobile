import React, { PureComponent } from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { Box, Text } from "react-native-design-utility";

import { tabBarIcons } from "../constants/images";

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  stretch: {
    width: 20,
    height: 20
  }
});

class TabItem extends PureComponent {
  handlePress = () => {
    const { navigation, routeName } = this.props;
    navigation.navigate(routeName);
  };

  render() {
    const { routeName, isActive } = this.props;

    const icon = tabBarIcons[isActive ? "active" : "inactive"][routeName];
    return (
      <Box f={1} pt={10}>
        <TouchableOpacity onPress={this.handlePress} style={styles.button}>
          <Box mb={3}>
            <Image source={icon} style={styles.stretch} />
          </Box>
          <Box>
            <Text size="xs" ls={0.12} color="greyDark" lowercase>
              {routeName}
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    );
  }
}

export default TabItem;
