import React, { Component } from 'react';
import { signUpSubmit } from '../store/actions/SignUpActions';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Fontisto';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Card from '../components/Card';
import cusColors from '../constants/Colors';


class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    }
    this.onSignUpPress = this.onSignUpPress.bind(this);
    this.passwordInputStyle = this.passwordInputStyle.bind(this);
  }
  static navigationOptions = {
    title: 'Sign Up',
  };

  onSignUpPress() {
    let username = this.state.username;
    let email = this.state.email;
    let password = this.state.password;
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    this.props.signUpSubmit({ username, email, password, firstName, lastName }, this.goBackToSignIn);
  }

  goBackToSignIn = () => {
    this.props.navigation.goBack()
  }

  passwordInputStyle(color) {
    return {
      marginTop: 10,
      height: 54,
      width: 285,
      marginLeft: -10,
      borderWidth: 1,
      borderColor: color,
      borderRadius: 12,
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Card style={styles.cardView}>
            <View style={styles.signUpView}>
            <Input
                leftIcon={
                  <Icon
                    name='slightly-smile'
                    size={18}
                    color={cusColors.iconColor}
                  />
                }
                containerStyle={styles.signUpInputContainer}
                inputContainerStyle={this.passwordInputStyle('rgba(0,0,0,0)')}
                label={<Text style={styles.signUpLabelInput}>Username</Text>}
                inputStyle={styles.signUpText}
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                autoCorrect={false}
                onChangeText={(text) => {
                  this.setState({ username: text });
                }}
                value={this.state.username}
              />

              <Input
                leftIcon={
                  <Icon
                    name='email'
                    size={18}
                    color={cusColors.iconColor}
                  />
                }
                containerStyle={styles.signUpInputContainer}
                inputContainerStyle={this.passwordInputStyle('rgba(0,0,0,0)')}
                label={<Text style={styles.signUpLabelInput}>Email</Text>}
                inputStyle={styles.signUpText}
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => {
                  this.setState({ email: text });
                }}
                value={this.state.email}
              />

              <Input
                leftIcon={
                  <Icon
                    name='key'
                    size={18}
                    color={cusColors.iconColor}
                  />
                }
                containerStyle={styles.signUpInputContainer}
                inputContainerStyle={this.passwordInputStyle('rgba(0,0,0,0)')}
                label={<Text style={styles.signUpLabelInput}>Password</Text>}
                errorStyle={null}
                errorMessage={null}
                inputStyle={styles.signUpText}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
                value={this.state.password}
              />

              <Input
                leftIcon={
                  <Icon
                    name='person'
                    size={18}
                    color={cusColors.iconColor}
                  />
                }
                containerStyle={styles.signUpInputContainer}
                inputContainerStyle={this.passwordInputStyle('rgba(0,0,0,0)')}
                label={<Text style={styles.signUpLabelInput}>First Name</Text>}
                inputStyle={styles.signUpText}
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                autoCorrect={false}
                onChangeText={(text) => {
                  this.setState({ firstName: text });
                }}
                value={this.state.firstName}
              />

              <Input
                leftIcon={
                  <Icon
                    name='person'
                    size={18}
                    color={cusColors.iconColor}
                  />
                }
                containerStyle={styles.signUpInputContainer}
                inputContainerStyle={this.passwordInputStyle('rgba(0,0,0,0)')}
                label={<Text style={styles.signUpLabelInput}>Last Name</Text>}
                inputStyle={styles.signUpText}
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                autoCorrect={false}
                onChangeText={(text) => {
                  this.setState({ lastName: text });
                }}
                value={this.state.lastName}
              />
              <View style={{ marginTop: 20 }}>
                <Button buttonStyle={styles.button} title="Submit" onPress={() => this.onSignUpPress()} />
              </View>
            </View>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: cusColors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    width: '80%',
    maxWidth: 600,
    height: 550,
    padding: 20
  },
  signUpView: {
    marginTop: 8,
    marginLeft: 3,
  },
  signUpInputContainer: {
    marginTop: 8,
    height: 80,
    width: 336,
  },
  signUpLabelInput: {
    marginLeft: 0,
    height: 16,
    width: 161.1,
    color: 'white',
    fontWeight: 'bold',
  },
  signUpText: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
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

const mapStateToProps = ({ signUp }) => {
  return {
    userSignUpSuccess: signUp.userSignUpSuccess,
    error: signUp.error
  };
};

export default connect(mapStateToProps, { signUpSubmit })(SignUpScreen);
