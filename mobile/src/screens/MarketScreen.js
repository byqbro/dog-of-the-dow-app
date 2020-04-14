import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class MarketScreen extends Component {
  constructor(props) {
      super(props);
  }

  static navigationOptions = {
    title: 'Market',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> MarketScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MarketScreen;
