import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';


class AccountScreen extends Component {
  constructor(props) {
      super(props);
  }

  static navigationOptions = {
    title: 'Account',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> AccountScreen</Text>
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

export default AccountScreen;
