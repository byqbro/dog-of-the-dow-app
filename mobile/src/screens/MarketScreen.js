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
import { DOW_30_STOCKS } from '../constants/DowStocks';


class MarketScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "stocksInfo": []
    }

    this.getStocksInfo = this.getStocksInfo.bind(this);
  }

  static navigationOptions = {
    title: 'Market',
  };

  componentDidMount() {
    this.getStocksInfo();
  }

  async getStocksInfo() {
    const response = await axios
      .get(`${API_HOST}stock/real-time-price/${DOW_30_STOCKS}`);

    // console.log(response.data.companiesPriceList);
    const stocksArray = response.data.companiesPriceList;
    this.setState({ stocksInfo: stocksArray });
  }

  render() {
    return (
      <View style={styles.screen}>
          <View style={styles.container}>
              <Text style={styles.title}>
                  Dow 30
              </Text>
          </View>

          <FlatList testId={'stockInfoFlatList'} data={this.state.stocksInfo} renderItem={
            ({ item }) =>
                <View >
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
                          <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>{item.symbol}</Text>
                      </View>
                      <View style={styles.priceText}>
                        <Text style={{ color: 'white', fontSize: 20 }}>${(item.price).toFixed(2)}</Text>
                      </View>
                    </Card>
                  </TouchableOpacity>
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
  container: {
    alignItems: 'center',
  },
  title: {
    marginTop: 30,
    height: 40,
    color: "white",
    fontSize: 28,
    fontWeight: 'bold',
  },
  cardView: {
    flexDirection: 'row',
    height: 66,
    padding: 10,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: 'white',
    borderRadius: 2,
  },
  symbolText: {
    marginTop: 5,
    marginLeft: 15
  },
  priceText: {
    position: 'absolute',
    right: 20,
    marginTop: 20,
    marginRight: 25,
  },
});

export default MarketScreen;
