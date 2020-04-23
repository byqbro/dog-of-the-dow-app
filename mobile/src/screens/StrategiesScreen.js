import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class StrategiesScreen extends Component {
  constructor(props) {
      super(props);
  }

  static navigationOptions = {
    title: 'Strategies',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> StrategiesScreen</Text>
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

export default StrategiesScreen;