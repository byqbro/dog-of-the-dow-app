import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { HOST, HOST_PORT, CONTEXT_PATH, API_HOST } from 'react-native-dotenv';
import AsyncStorage from '@react-native-community/async-storage';
import cusColors from '../constants/Colors';
import Card from '../components/Card';


class PortfolioScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        stockInfoList: [],
        portfolioValue: 0.0,
        totalTransactionsValue: 0.0,
        profitOrLoss: 0.0
      }
  }

  static navigationOptions = {
    title: 'Portfolio',
  };

  async componentDidMount() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const jwt = await AsyncStorage.getItem('jwt');
      const portfolioResponse = await axios
        .get(`http://${HOST}:${HOST_PORT}${CONTEXT_PATH}/users/${userId}/portfolio`, {
          headers: {
            "Authorization" : jwt
          }
        });
      
      const portfolio = portfolioResponse.data;
      // console.log("portfolio", portfolio);

      this.setState({ 
        stockInfoList: portfolio.stockInfoList,
        totalTransactionsValue: portfolio.totalTransactionsValue
      });

      let stockSymbols = "";
      this.state.stockInfoList.forEach((element) => {
        stockSymbols += element.symbol + ",";
      });

      if (stockSymbols != "") {
        stockSymbols = stockSymbols.substring(0, stockSymbols.length - 1);
        const response = await axios
          .get(`${API_HOST}stock/real-time-price/${stockSymbols}`);

          const stocksArray = response.data.companiesPriceList;

          let updateStockInfoList = this.state.stockInfoList;
          let portfolioValue = 0.0;
          updateStockInfoList.forEach((element, index) => {
            element.price = stocksArray[index].price.toFixed(2);
            portfolioValue += element.amount * stocksArray[index].price;
          });

          // console.log("updateStockInfoList", updateStockInfoList);
          let profitOrLoss = portfolioValue + this.state.totalTransactionsValue;

          portfolioValue = Math.round((portfolioValue + Number.EPSILON) * 100) / 100;
          profitOrLoss = Math.round((profitOrLoss + Number.EPSILON) * 100) / 100;

          // console.log("portfolioValue:", portfolioValue);
          // console.log("profitOrLoss:", profitOrLoss);

          this.setState({ 
            stockInfoList: updateStockInfoList,
            portfolioValue: portfolioValue,
            profitOrLoss: profitOrLoss,
          });
      }
    } catch(err) {
      console.log('err', err);
    }
  }

  render() {
    return (
      <View style={styles.screen}>
          <View style={styles.titleTextView}>
              <Text style={styles.pLTitleText}>Profit/Loss</Text>
              <Text style={styles.pLValueText}>${this.state.profitOrLoss}</Text>
          </View>
          <View style={styles.stocksView}>
              <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Stocks</Text>
              <Text style={{ color: 'white', fontSize: 18, position: 'absolute', right: 15, paddingTop: 20}}>Portfolio Value: ${this.state.portfolioValue}</Text>
          </View>
          <FlatList data={this.state.stockInfoList} renderItem={
            ({ item }) =>
              <View >
                  <Card style={styles.cardView} >
                    <View style={styles.symbolText}>
                      <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>{item.symbol}</Text>
                      <Text style={{ color: 'grey', fontSize: 20, marginTop: 5 }}>{item.amount} shares</Text>
                    </View>
                    <View style={styles.priceText}>
                      <Text style={{ color: 'white', fontSize: 20 }}>${item.price}</Text>
                    </View>
                  </Card>
              </View>
          }
            keyExtractor={(item, index) => index.toString()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: cusColors.background,
  },
  titleTextView: {
    marginLeft: 25,
  },
  pLTitleText: {
    marginTop: 30,
    height: 40,
    color: "white",
    fontSize: 28,
    fontWeight: 'bold',
  },
  pLValueText: {
    marginBottom: 35,
    height: 40,
    color: "white",
    fontSize: 30,
    fontWeight: 'bold',
  },
  stocksView: {
    flexDirection: 'row',
    marginLeft: 25,
    marginBottom: 25,
  },
  cardView: {
    flexDirection: 'row',
    height: 90,
    padding: 10,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderRadius: 2,
  },
  symbolText: {
    marginTop: 5,
    marginLeft: 15
  },
  priceText: {
    position: 'absolute',
    right: 15,
    marginTop: 20,
    marginRight: 25,
  },
});

export default PortfolioScreen;
