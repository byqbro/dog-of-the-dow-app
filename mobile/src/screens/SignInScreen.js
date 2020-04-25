import React, { Component } from 'react';
import { signInSubmit } from '../store/actions/AuthActions';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { Input, Button } from 'react-native-elements';
import Card from '../components/Card';
import cusColors from '../constants/Colors';
import AsyncStorage from '@react-native-community/async-storage';


class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }
    
    this.onSignInPress = this.onSignInPress.bind(this);
    this.passwordInputStyle = this.passwordInputStyle.bind(this);
  }

  static navigationOptions = {
    title: 'Sign In',
  };

  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    const jwt = await AsyncStorage.getItem('jwt');
    if (userId != null && jwt != null) {
      this.props.navigation.replace('Account');
    }
  }

  onSignInPress() {
    let email = this.state.email;
    let password = this.state.password;
    this.props.signInSubmit({ email, password }, this.goToAccount);
  }

  goToAccount = () => {
    this.props.navigation.replace('Account');
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

  renderError() {
    if (this.props.error) {
      return (
        <View>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      )
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Card style={styles.cardView}>
            <View style={styles.signInView}>
              <Input
                leftIcon={
                  <Icon
                    name='email'
                    size={20}
                    color={cusColors.iconColor}
                  />
                }
                containerStyle={styles.signinInputContainer}
                inputContainerStyle={this.passwordInputStyle('rgba(0,0,0,0)')}
                label={<Text style={styles.signInLabelInput}>Email</Text>}
                inputStyle={styles.signinText}
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
                    size={20}
                    color={cusColors.iconColor}
                  />
                }
                containerStyle={styles.signinInputContainer}
                inputContainerStyle={this.passwordInputStyle('rgba(0,0,0,0  )')}
                label={<Text style={styles.signInLabelInput}>Password</Text>}
                errorStyle={null}
                errorMessage={null}
                inputStyle={styles.signinText}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
                value={this.state.password}
              />
              <Text>
              </Text>
              <Text>
              </Text>
              <View>
                {this.renderError()}
              </View>
              <View>
                <Button buttonStyle={styles.button} title="Sign In" onPress={() => this.onSignInPress()} />
              </View>
              <Text>
              </Text>
              <View>
                <Button buttonStyle={styles.button} title="Sign up" onPress={() => this.props.navigation.navigate('SignUp')} />
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
    maxWidth: 500,
    height: 450,
    padding: 20
  },
  signInView: {
    marginTop: 26,
    marginLeft: 3,
  },
  signinInputContainer: {
    marginTop: 15,
    height: 80,
    width: 336,
  },
  signInLabelInput: {
    marginLeft: 0,
    height: 16,
    width: 161.1,
    color: 'white',
    fontWeight: 'bold',
  },
  signinText: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    marginLeft: 15,
    color: 'white',
    fontSize: 16,
    height: 19,
    width: 120,
    lineHeight: 19,
  },
  errorTextStyle: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 20,
    padding: 12,
  },
  button: {
    backgroundColor: cusColors.buttonColor,
    width: 100,
    marginHorizontal: '35%',
  },
});

const mapStateToProps = ({ auth }) => {
  return {
    userSignInSuccess: auth.userSignInSuccess,
    error: auth.error
  }
};

export default connect(mapStateToProps, { signInSubmit })(SignInScreen);
