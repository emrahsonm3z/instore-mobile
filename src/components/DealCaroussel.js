import React, { PureComponent } from "react";
import { Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Box } from "react-native-design-utility";

import food1 from "../../assets/img/food1.png";
import food2 from "../../assets/img/food2.png";
import food3 from "../../assets/img/food3.png";

const { width: WIDTH } = Dimensions.get("window");

const images = [food1, food2, food3];

const DOT_SIZE = 8;
const TIME = 3000;

class DealCaroussel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0
    };

    this.scrollView = React.createRef();
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.handleScroll();
    }, TIME);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleScroll = () => {
    const newIndex = this.state.currentIndex + 1;

    if (newIndex < images.length) {
      this.scrollView.current.scrollTo({
        x: newIndex * WIDTH,
        animated: true
      });

      this.setState({ currentIndex: newIndex });
    } else {
      this.scrollView.current.scrollTo({
        x: 0,
        animated: true
      });
      this.setState({ currentIndex: 0 });
    }
  };

  onScroll = event => {
    const { contentOffset } = event.nativeEvent;

    const currentIndex = Math.round(contentOffset.x / WIDTH);

    if (this.state.currentIndex !== currentIndex) {
      this.setState({ currentIndex });
    }
  };

  render() {
    return (
      <Box>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={this.scrollView}
          onScroll={this.onScroll}
        >
          {images.map((img, i) => (
            <Box
              key={i}
              position="relative"
              style={{ height: 130, width: WIDTH }}
            >
              <Image source={img} />
              <Box
                position="absolute"
                dir="row"
                style={{ height: 130, width: WIDTH }}
                align="end"
                justify="center"
                pb="xs"
              >
                {Array.from({ length: images.length }).map((_, index) => (
                  <Box
                    key={index}
                    bg="white"
                    circle={
                      this.state.currentIndex === index
                        ? DOT_SIZE
                        : (DOT_SIZE / 3) * 2
                    }
                    mx={DOT_SIZE / 2}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </ScrollView>
      </Box>
    );
  }
}

export default DealCaroussel;
