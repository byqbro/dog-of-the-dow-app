import React, { Component } from 'react';
import { profileFetch, profileUpdate } from '../store/actions/AuthActions';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import IconA from 'react-native-vector-icons/AntDesign';
import cusColors from '../constants/Colors';


class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      firstName: "",
      lastName: ""
    }
  }
  static navigationOptions = {
    title: 'Profile',
  };

  async componentDidMount() {
    await this.props.profileFetch();
    this.setState({
      username: this.props.username,
      email: this.props.email,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
    });
  }

  onUpdatePress() {
    const username = this.state.username;
    const email = this.state.email;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    this.props.profileUpdate({ username, email, firstName, lastName });
    this.props.navigation.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <IconA name="solution1" color="white" size={60} />
        <View style={styles.inputContainer}>
          <Input
            label={<Text style={styles.labelInput}>Username</Text>}
            inputStyle={styles.inputText}
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              this.props.changeUsername();
              this.setState({ username: text });
            }}
            value={this.state.username}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            label={<Text style={styles.labelInput}>Email</Text>}
            inputStyle={styles.inputText}
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              this.setState({ email: text });
            }}
            value={this.state.email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            label={<Text style={styles.labelInput}>first Name</Text>}
            inputStyle={styles.inputText}
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              this.setState({ firstName: text });
            }}
            value={this.state.firstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            label={<Text style={styles.labelInput}>Last Name</Text>}
            inputStyle={styles.inputText}
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              this.setState({ lastName: text });
            }}
            value={this.state.lastName}
          />
        </View>
        <Button buttonStyle={styles.button} title="Save" onPress={() => this.onUpdatePress()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: cusColors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 15,
    height: 80,
    width: 336,
  },
  labelInput: {
    marginLeft: 0,
    height: 16,
    width: 161.1,
    color: 'white',
    fontWeight: 'bold',
  },
  inputText: {
    marginLeft: 15,
    color: 'white',
    fontSize: 16,
    height: 19,
    width: 120,
    lineHeight: 19,
  },
  button: {
    backgroundColor: cusColors.buttonColor,
    width: 100,
    marginHorizontal: '35%',
  },
});

const mapStateToProps = ({ auth }) => {
  return {
    username: auth.username,
    email: auth.email,
    firstName: auth.firstName,
    lastName: auth.lastName
  }
};

export default connect(mapStateToProps, { profileFetch, profileUpdate })(ProfileScreen);
