import React, { Component } from 'react';
import { passwordUpdate } from '../store/actions/AuthActions';
import Icon from 'react-native-vector-icons/Fontisto';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Card from '../components/Card';
import cusColors from '../constants/Colors';


class UpdatePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
    }
  }
  static navigationOptions = {
    title: 'Update Password',
  };

  onUpdatePress() {
    let newPassword = this.state.newPassword;
    this.props.passwordUpdate({ newPassword });
    this.props.navigation.pop();
  }

  passwordInputStyle(color) {
    return {
      marginTop: 20,
      height: 54,
      width: 300,
      marginLeft: -10,
      borderWidth: 1,
      borderColor: color,
      borderRadius: 12,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Card style={styles.cardView}>
          <Input
            leftIcon={
              <Icon
                name='key'
                size={20}
                color='white'
              />
            }
            containerStyle={styles.inputContainer}
            inputContainerStyle={this.passwordInputStyle('rgba(0,0,0,0)')}
            label={<Text style={styles.labelInput}>New Password</Text>}
            inputStyle={styles.inputText}
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              this.setState({ newPassword: text });
            }}
            secureTextEntry={true}
            value={this.state.newPassword}
          />
          <View style={styles.saveBtn}>
            <Button buttonStyle={styles.button} title="Save and Update" onPress={() => this.onUpdatePress()} />
          </View>
        </Card>

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
  cardView: {
    width: '80%',
    maxWidth: 500,
    height: 300,
    padding: 20
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
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    marginLeft: 15,
    color: 'white',
    fontSize: 16,
    height: 19,
    width: 120,
    lineHeight: 19,
  },
  saveBtn: {
    marginTop: 20,
  },
  button: {
    backgroundColor: cusColors.buttonColor,
    // color: 'white',
    // fontSize: 24,
    // fontWeight: 'bold',
    // textAlign: 'center',
    width: 160,
    marginHorizontal: '25%',
  },
});

const mapStateToProps = ({ auth }) => {
  return {
    error: auth.error
  }
};

export default connect(mapStateToProps, { passwordUpdate })(UpdatePasswordScreen);
