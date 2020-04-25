import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Modal,
  TouchableHighlight
} from 'react-native';
import axios from 'axios';
import { API_HOST } from 'react-native-dotenv';
import Card from '../components/Card';
import cusColors from '../constants/Colors';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import IconE from 'react-native-vector-icons/EvilIcons';
import { HOST, HOST_PORT, CONTEXT_PATH } from 'react-native-dotenv';


class StockScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: "",
      price: "",
      volAvg: "",
      mktCap: "",
      lastDividend: "",
      priceYearlow: "",
      priceYearHigh: "",
      companyName: "",
      website: "",
      industry: "",
      description: "",
      ceo: "",
      sector: "",
      image: "",
      dayLow: "",
      dayHigh: "",
      volume: "",
      openPrice: "",
      tradeModalVisible: false,
      buyOrSellPrice: "",
      amount: "",
      buyOrSell: "",
    }

    this.getStockInfo = this.getStockInfo.bind(this);
  }

  componentDidMount() {
    this.getStockInfo();
  }

  getStockInfo() {
    const stockSymbol = this.props.navigation.getParam('stockSymbol');

    axios.get(`${API_HOST}company/profile/${stockSymbol}`)
      .then((response) => {
        const stockInfo = response.data;
        const profile = stockInfo.profile;
        const priceRange = profile.range.split('-');
        // console.log("stockInfo:", stockInfo);

        this.setState({ 
          symbol: stockInfo.symbol,
          price: profile.price,
          volAvg: profile.volAvg,
          mktCap: profile.mktCap,
          lastDividend: profile.lastDiv,
          priceYearlow: priceRange[0],
          priceYearHigh: priceRange[1],
          companyName: profile.companyName,
          industry: profile.industry,
          website: profile.website,
          description: profile.description,
          ceo: profile.ceo,
          sector: profile.sector,
          image: profile.image
        });
    }).catch((err) => {
        console.log('err', err);
    });

    axios.get(`${API_HOST}quote/${stockSymbol}`)
      .then((response) => {
        const stockInfo = response.data[0];

        this.setState({ 
          dayLow: stockInfo.dayLow,
          dayHigh: stockInfo.dayHigh,
          volume: stockInfo.volume,
          openPrice: stockInfo.open,
        });
    }).catch((err) => {
        console.log('err', err);
    });
  }

  setTradeModalVisible(visible) {
    this.setState({
      tradeModalVisible: visible,
      amount: "",
      buyOrSellPrice: "",
      estimatedTotal: 0.00,
    });
  }

  async onTradePress() {
    const userId = await AsyncStorage.getItem('userId');
    const jwt = await AsyncStorage.getItem('jwt');
    // console.log("userSignInSuccess", this.state.userSignInSuccess);

    if (userId == null || jwt == null) {
      this.props.navigation.navigate('AccountStack', { screen: 'SignIn' });
    } else {
      this.setTradeModalVisible(true);
    }
  }

  onBuyPress() {
    this.makeTransaction("buy");
  }

  onSellPress() {
    this.makeTransaction("sell");
  }

  async makeTransaction(buyOrSell) {
    const userId = await AsyncStorage.getItem('userId');
    const jwt = await AsyncStorage.getItem('jwt');

    axios
      .post(`http://${HOST}:${HOST_PORT}${CONTEXT_PATH}/users/transactions`, {
        userId: userId,
        stockSymbol: this.state.symbol,
        stockName: this.state.companyName,
        buyOrSell: buyOrSell,
        price: parseFloat(this.state.buyOrSellPrice),
        amount: parseFloat(this.state.amount),
        currency: "USD"
      },
      {
        headers: {
          "Authorization": jwt
        }
    }).then((response) => {

    }).catch((err) => {
      console.log('err', err);
    });

    this.setTradeModalVisible(!this.state.tradeModalVisible);
  }

  inputStyle(color) {
    return {
      marginTop: 5,
      height: 40,
      width: 285,
      marginLeft: -10,
      borderWidth: 1,
      borderColor: color,
      borderRadius: 5,
    };
  }

  getEstimatedTotal() {
    if (this.state.buyOrSellPrice != "" && this.state.amount != "") {
      const price = parseFloat(this.state.buyOrSellPrice);
      const amount = parseFloat(this.state.amount);
      const total = price * amount;
      return total;
    }

    return "0.00";
  }

  render() {
    return (
      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.titleView}>
            <View style={styles.titleTextView}>
              <Text style={{ color: 'white', fontSize: 18 }}>{this.state.symbol}</Text>
              <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', marginTop: 10 }}>{this.state.companyName}</Text>
              <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>${this.state.price}</Text>
            </View>
            <Button buttonStyle={styles.tradeBtn} title="Trade" titleStyle={{color: "black", fontSize: 26}} onPress={() => this.onTradePress()} />
            <View>
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.tradeModalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                  <View style={styles.tradeModalView}>
                    <TouchableHighlight style={styles.tradeCloseTouch}
                        onPress={() => {
                          this.setTradeModalVisible(!this.state.tradeModalVisible);
                        }}
                        underlayColor='cusColors.background'
                        >
                        <View style={styles.tradeCloseView}>
                          <IconE color='black' name="close-o" size={40} />
                          <Text style={styles.closeText}>Close</Text>
                        </View>
                      </TouchableHighlight>
                    <Text style={{ color: 'black', fontSize: 28, marginBottom: 50 }}>{this.state.companyName}</Text>
                    <Card style={styles.tradeCardView}>
                      <View style={styles.tradeView}>
                        <Input
                          placeholder="0"
                          containerStyle={styles.inputContainer}
                          inputContainerStyle={this.inputStyle('rgba(0,0,0,0)')}
                          label={<Text style={styles.labelInput}>Number of Shares</Text>}
                          inputStyle={styles.inputText}
                          autoFocus={false}
                          autoCapitalize="none"
                          autoCorrect={false}
                          onChangeText={(text) => {
                            this.setState({ amount: text });
                          }}
                          value={this.state.amount}
                        />
                        <Input
                          placeholder={"$"+this.state.price.toString()}
                          containerStyle={styles.inputContainer}
                          inputContainerStyle={this.inputStyle('rgba(0,0,0,0)')}
                          label={<Text style={styles.labelInput}>Price</Text>}
                          inputStyle={styles.inputText}
                          autoFocus={false}
                          autoCapitalize="none"
                          autoCorrect={false}
                          onChangeText={(text) => {
                            this.setState({ buyOrSellPrice: text });
                          }}
                          value={this.state.buyOrSellPrice}
                        />
                        <Input
                          disabled={true}
                          containerStyle={styles.inputContainer}
                          inputContainerStyle={this.inputStyle('rgba(0,0,0,0)')}
                          label={<Text style={styles.labelInput}>Estimated Total Price</Text>}
                          inputStyle={styles.inputText}
                          autoFocus={false}
                          autoCapitalize="none"
                          autoCorrect={false}
                          value={"$" + this.getEstimatedTotal()}
                        />

                        <View style={styles.btnView}>
                          <View>
                            <Button buttonStyle={styles.button} title="Buy" onPress={() => this.onBuyPress()} />
                          </View>
                          <View style={styles.btnRightView}>
                            <Button buttonStyle={styles.button} title="Sell" onPress={() => this.onSellPress()} />
                          </View>
                        </View>
                      </View>
                    </Card>
                  </View>
              </Modal>
            </View>
          </View>
          <View>
            <Card style={styles.cardView}>
              <View style={styles.leftCardView}>
                <View style={styles.imageView}>
                  <Image source={{url: this.state.image}} style={styles.image} />
                </View>
                <View style={styles.itemsLeftView}>
                  <View style={styles.itemView}>
                    <Text style={{ color: 'black', fontSize: 13, marginBottom: 5 }}>52 WK HIGH</Text>
                    <Text style={{ color: 'white', position: 'absolute', right: 2, fontSize: 13, marginBottom: 5 }}>{this.state.priceYearHigh}</Text>
                  </View>
                  <View style={styles.itemView}>
                    <Text style={{ color: 'black', fontSize: 13, marginBottom: 5 }}>52 WK LOW</Text>
                    <Text style={{ color: 'white', position: 'absolute', right: 2, fontSize: 13, marginBottom: 5 }}>{this.state.priceYearlow}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.rightCardView}>
                <View style={styles.itemsRightView}>
                  <View style={styles.itemView}>
                    <Text style={styles.itemName}>OPEN</Text>
                    <Text style={styles.itemValue}>{this.state.openPrice}</Text>
                  </View>
                  <View style={styles.itemView}>
                    <Text style={styles.itemName}>HIGH</Text>
                    <Text style={styles.itemValue}>{this.state.dayHigh}</Text>
                  </View>
                  <View style={styles.itemView}>
                    <Text style={styles.itemName}>LOW</Text>
                    <Text style={styles.itemValue}>{this.state.dayLow}</Text>
                  </View>
                  <View style={styles.itemView}>
                    <Text style={styles.itemName}>VOLUME</Text>
                    <Text style={styles.itemValue}>{this.state.volume}</Text>
                  </View>
                  <View style={styles.itemView}>
                    <Text style={styles.itemName}>AVG VOL</Text>
                    <Text style={styles.itemValue}>{this.state.volAvg}</Text>
                  </View>
                  <View style={styles.itemView}>
                    <Text style={styles.itemName}>MKT CAP</Text>
                    <Text style={styles.itemValue}>{this.state.mktCap}</Text>
                  </View>
                  <View style={styles.itemView}>
                    <Text style={styles.itemName}>LAST DIV</Text>
                    <Text style={styles.itemValue}>{this.state.lastDividend}</Text>
                  </View>
                </View>
              </View>
            </Card>
          </View>
          <View style={styles.descriptionView} >
            <View>
              <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>About {this.state.companyName}</Text>
              <Text style={{ color: 'white', fontSize: 18, marginTop: 10 }} >{this.state.description}</Text>
            </View>
            <View style={styles.itemsBottomView}>
              <View style={styles.itemView}>
                <Text style={styles.itemName}>CEO</Text>
                <Text style={styles.itemValue}>{this.state.ceo}</Text>
              </View>
              <View style={styles.itemView}>
                <Text style={styles.itemName}>SECTOR</Text>
                <Text style={styles.itemValue}>{this.state.sector}</Text>
              </View>
              <View style={styles.itemView}>
                <Text style={styles.itemName}>INDUSTRY</Text>
                <Text style={styles.itemValue}>{this.state.industry}</Text>
              </View>
              <View >
                <TouchableOpacity style={styles.itemView}
                    onPress={() => Linking.openURL(`${this.state.website}`)}>
                  <Text style={styles.itemName}>WEBSITE</Text>
                  <Text style={styles.itemValue}>{this.state.website}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: cusColors.background,
  },
  container: {
    //alignItems: 'center',
  },
  titleView: {
    // flexDirection: 'row',
  },
  titleTextView: {
    marginLeft: 20,
    marginTop: 35,
    marginBottom: -15,
  },
  tradeBtn: {
    alignSelf: 'flex-end',
    backgroundColor: '#92d192',
    width: 130,
    marginRight: 30,
    marginBottom: 15,
    borderRadius:20,
  },
  cardView: {
    flexDirection: 'row',
    height: 300,
    paddingTop: 15,
    paddingBottom: 10,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderRadius: 2,
  },
  leftCardView: {
    marginLeft: 5,
    width: '40%',
  },
  imageView: {
    marginLeft: 5,
    // width: '40%',
    height:175,
  },
  image: {
    flex: 1,
    margin: 5,
    height: 170,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  itemsLeftView: {
    width: '90%',
    height: 58,
    marginLeft: 15,
    marginTop: 18,
  },
  rightCardView: {
    marginLeft: 5,
    width: '60%',
    height:180,
  },
  itemsRightView: {
    width: '85%',
    height: 98,
    marginLeft: 15,
    marginTop: 5,
  },
  itemView: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginBottom: 8,
  },
  itemName: {
    color: 'black', 
    fontSize: 18,
    marginBottom: 5,
  },
  itemValue: {
    position: 'absolute',
    right: 2,
    color: 'white', 
    fontSize: 18, 
    marginBottom: 5,
  },
  descriptionView: {
    marginLeft: 20,
    marginTop: 35,
    marginRight: 18
  },
  itemsBottomView: {
    width: '95%',
    height: 150,
    marginTop: 15,
  },

  tradeModalView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '30%',
    backgroundColor: cusColors.background,
  },
  tradeCloseTouch: {
    alignSelf: 'flex-end',
    marginRight: 50,
  },
  tradeCloseView: {
    flexDirection: 'row',
  },
  closeText: {
    fontSize: 18,
    paddingTop: 5,
  },
  tradeCardView: {
    width: '80%',
    maxWidth: 500,
    height: 450,
    padding: 20
  },
  tradeView: {
    marginTop: 26,
    marginLeft: 3,
  },
  inputContainer: {
    marginTop: 15,
    height: 80,
    width: 336,
  },
  labelInput: {
    height: 30,
    width: 220,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  inputText: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    marginLeft: 15,
    color: 'black',
    fontSize: 20,
    height: 19,
    width: 180,
    lineHeight: 19,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 35
  },
  button: {
    width: 130,
    borderRadius:15,
  },
  btnRightView: {
    alignSelf: 'flex-end',
  },
});

export default StockScreen;
