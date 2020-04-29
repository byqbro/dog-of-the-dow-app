import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { API_HOST } from 'react-native-dotenv';
import Card from '../components/Card';
import cusColors from '../constants/Colors';
import { DOW_LIST } from '../constants/DowList';

class StrategiesScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        "stocksInfo": [],
        "sdodStocks": []
      }
  
      this.getStocksInfo = this.getStocksInfo.bind(this);
      
  }

  static navigationOptions = {
    title: 'Strategies',
  };

  componentDidMount() {
    this.getStocksInfo();
  }

  getStocksInfo() {
    // console.log("api host", API_HOST);
    const stocks = DOW_LIST;
    
    stocks.forEach(stock => 
      axios.get(`${API_HOST}company/profile/${stock}`)
        .then((response) => {
          var stockSymbol = response.data.symbol;
          var stockPrice = parseFloat(response.data.profile.price);
          var stockLastDividend = parseFloat(response.data.profile.lastDiv).toFixed(2);
          var stockDividendYield = (stockLastDividend/stockPrice);

          var singleStock = {symbol: stockSymbol,
                            price: stockPrice,
                            lastDividend: stockLastDividend,
                            dividendYield: stockDividendYield}
          this.setState({
            stocksInfo: [...this.state.stocksInfo, singleStock].sort((a, b) => 
              (a.dividendYield > b.dividendYield) ? -1 : 1)
          }); 

          var tmp = this.state.stocksInfo.slice(0,10);

          this.setState({
            sdodStocks: tmp.sort((a, b) => 
              (a.price > b.price) ? 1 : -1)
          });

      }).catch((err) => {
          console.log('err', err);
      })
    );
  }



  renderHeader = () => {
    //View to set in Header
    return (
      <View style={styles.header_footer_style}>
           <Card style={styles.cardView} >
                  <View style={styles.symbolText}>
                      <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Symbol</Text>
                  </View>
                  <View style={styles.priceText}>
                    <Text style={{ color: 'white', fontSize: 12 }}>Price</Text>
                  </View>
                  <View style={styles.lastDividendText}>
                    <Text style={{ color: 'white', fontSize: 12 }}>Dividend</Text>
                  </View>
                  <View style={styles.dividendYieldText}>
                    <Text style={{ color: 'white', fontSize: 12 }}>Dividend Yield</Text>
                  </View>
                </Card>
      </View>
    );
  };


  render() {
    return (
      <View style={styles.screen}>
        {/* <View style={styles.container}> */}
        <View>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Dog of the Dow</Text>
        </View>
          <Card style={styles.strategyView}>
              <FlatList data={this.state.stocksInfo.slice(0,10)} 
              ListHeaderComponent={this.renderHeader}
              renderItem={
                  ({ item, index}) =>
                  <View>
                    <TouchableOpacity 
                    onPress={() => {
                      this.props.navigation.navigate({
                          routeName: 'Stock',
                          params: {
                              stockSymbol: item.symbol,
                          }
                      });
                    }}>
                      <Card style={styles.cardView} >
                        <View style={styles.symbolText}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{index + 1}. {item.symbol} </Text>
                        </View>
                        <View style={styles.priceText}>
                          <Text style={{ color: 'white', fontSize: 15 }}>$ {item.price}</Text>
                        </View>
                        <View style={styles.lastDividendText}>
                          <Text style={{ color: 'white', fontSize: 15 }}>$ {item.lastDividend}</Text>
                        </View>
                        <View style={styles.dividendYieldText}>
                          <Text style={{ color: 'white', fontSize: 15 }}>{(item.dividendYield * 100).toFixed(2)} %</Text>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  </View>
                }
                  keyExtractor={(item, index) => index.toString()} />
            </Card>
        {/* </View> */}
        <View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Small Dog of the Dow</Text>
          <Card style={styles.strategyView}>
              <FlatList data={this.state.sdodStocks.slice(0,5)} 
              ListHeaderComponent={this.renderHeader}
              renderItem={
                  ({ item, index}) =>
                  <View>
                    <TouchableOpacity 
                    onPress={() => {
                      this.props.navigation.navigate({
                          routeName: 'Stock',
                          params: {
                              stockSymbol: item.symbol,
                          }
                      });
                    }}>
                      <Card style={styles.cardView} >
                        <View style={styles.symbolText}>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{index + 1}. {item.symbol} </Text>
                        </View>
                        <View style={styles.priceText}>
                          <Text style={{ color: 'white', fontSize: 15 }}>$ {item.price}</Text>
                        </View>
                        <View style={styles.lastDividendText}>
                          <Text style={{ color: 'white', fontSize: 15 }}>$ {item.lastDividend}</Text>
                        </View>
                        <View style={styles.dividendYieldText}>
                          <Text style={{ color: 'white', fontSize: 15 }}>{(item.dividendYield * 100).toFixed(2)} %</Text>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  </View>
                }
                  keyExtractor={(item, index) => index.toString()} />
            </Card>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: cusColors.background,
  },
  container: {
    alignItems: 'center',
  },
  strategyView:{
    flexDirection: 'row',
    height: 400,
    padding: 10,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderRadius: 2,
  },
  cardView: {
    flexDirection: 'row',
    height: 45,
    padding: 8,
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
    right: 200,
    marginTop: 20,
    marginRight: 25,
  },
  lastDividendText: {
    position: 'absolute',
    right: 115,
    marginTop: 20,
    marginRight: 25,
  },
  dividendYieldText: {
    position: 'absolute',
    right: 10,
    marginTop: 20,
    marginRight: 25,
  },
});

export default StrategiesScreen;