import React, { PureComponent } from "react";
import { Box } from "react-native-design-utility";
import { TouchableOpacity } from "react-native";
import { theme } from "../constants/theme";
import { NavigationService } from "../api/NavigationService";

const Left = ({ children }) => (
  <Box f={1} align="start">
    {children}
  </Box>
);

const Right = ({ children }) => <Box align="end">{children}</Box>;

class ListColumn extends PureComponent {
  static Left = Left;

  static Right = Right;

  state = {};

  renderContent = () => (
    <Box
      dir="row"
      p="sm"
      align="center"
      justify="between"
      style={{
        borderBottomWidth: 0.8,
        borderBottomColor: theme.color.greyLight
      }}
    >
      {this.props.children}
    </Box>
  );

  handlePress = () => {
    NavigationService.navigate(this.props.link);
  };

  render() {
    if (this.props.link) {
      return (
        <TouchableOpacity onPress={this.handlePress}>
          {this.renderContent()}
        </TouchableOpacity>
      );
    }
    return this.renderContent();
  }
}

export default ListColumn;
