import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
} from 'react-native';
import IconA from 'react-native-vector-icons/AntDesign';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import cusColors from '../constants/Colors';


class AccountScreen extends Component {
  static navigationOptions = {
    title: 'My Account',
  };

  onSignOutPress = () => {
    AsyncStorage.removeItem('userId');
    AsyncStorage.removeItem('jwt');
    this.props.navigation.replace('SignIn');
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{marginTop: '5%'}}>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Profile')} underlayColor='white'>
            <View style={styles.touchableSection}>
              <IconA color={cusColors.iconColor} name="profile" size={40} />
              <View style={styles.textView}>
                <Text style={styles.sectionText}>View and edit profile</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Portfolio')} underlayColor='white'>
            <View style={styles.touchableSection}>
              <IconM color={cusColors.iconColor} name="ballot-outline" size={40} />
              <View style={styles.textView}>
                <Text style={styles.sectionText}>Portfolio</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Transactions')} underlayColor='white'>
            <View style={styles.touchableSection}>
              <IconM color={cusColors.iconColor} name="alpha-t-box-outline" size={40} />
              <View style={styles.textView}>
                <Text style={styles.sectionText}>Transactions</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('UpdatePassword')} underlayColor='white'>
            <View style={styles.touchableSection}>
              <IconM color={cusColors.iconColor} name="shield-key-outline" size={40} /> 
              <View style={styles.textView}>
                <Text style={styles.sectionText}>Update Password</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='white'>
            <View style={styles.touchableSection}>
              <IconM color={cusColors.iconColor} name="help-circle-outline" size={40} />
              <View style={styles.textView}>
                <Text style={styles.sectionText}>Help</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.onSignOutPress()} underlayColor='white'>
            <View style={styles.touchableSection}>
              <IconM color={cusColors.iconColor} name="logout" size={40} />
              <View style={styles.textView}>
                <Text style={styles.sectionText}>Sign Out</Text>
              </View>
            </View>
          </TouchableHighlight>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: cusColors.background,
    flex: 1,
  },
  touchableSection: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 26,
  },
  textView: {
    flex: 1,
    marginLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  sectionText: {
    fontSize: 18,
    paddingTop: 5,
    color: 'white',
  },
});

export default AccountScreen;
