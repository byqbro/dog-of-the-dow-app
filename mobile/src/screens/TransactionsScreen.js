import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { HOST, HOST_PORT, CONTEXT_PATH } from 'react-native-dotenv';
import AsyncStorage from '@react-native-community/async-storage';
import cusColors from '../constants/Colors';
import Card from '../components/Card';


class TransactionsScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        transHistory: []
      }
  }

  static navigationOptions = {
    title: 'Transactions',
  };

  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    const jwt = await AsyncStorage.getItem('jwt');

    axios
    .get(`http://${HOST}:${HOST_PORT}${CONTEXT_PATH}/users/${userId}/transactions`, {
      headers: {
        "Authorization": jwt
      }
    }).then((response) => {
      // console.log("transHistory", response.data);
      this.setState({ transHistory: response.data.reverse() });
    }).catch((err) => {
      console.log("err", err);
    });
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          {this.state.transHistory.length > 0 ?
            <View style={styles.resultTitleView}>
              <Text style={styles.resultTitle}>Recent History</Text>
            </View>
            : <View style={styles.resultTitleView}>
                <Text style={styles.resultTitle}>No History</Text>
              </View> 
          }
          <FlatList
            data={this.state.transHistory}
            renderItem={({ item }) => (
              <View>
                <Card style={styles.cardView}>
                  <View style={styles.itemsView}>
                    <View style={styles.itemTopTitleView}>
                      <Text style={styles.itemByOrSell}>{item.buyOrSell}</Text>
                      <Text style={styles.itemStockName}>{item.stockName}</Text>
                    </View>

                    <View style={styles.itemView}>
                      <Text style={styles.itemTitle}>Number of Shares</Text>
                      <Text style={styles.itemValue}>{item.amount}</Text>
                    </View>

                    <View style={styles.itemView}>
                      <Text style={styles.itemTitle}>Price</Text>
                      <Text style={styles.itemValue}>${item.price}</Text>
                    </View>

                    <View style={styles.itemView}>
                      <Text style={styles.itemTitle}>Submitted</Text>
                      <Text style={styles.itemValue}>{item.createAt}</Text>
                    </View>

                  </View>
                </Card>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
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
  resultTitleView: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  resultTitle: {
    height: 34,
    color: "black",
    fontSize: 25,
    fontWeight: 'bold',
  },
  cardView: {
    height: 270,
    paddingTop: 5,
    paddingBottom: 5,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 5,
  },
  itemsView: {
    width: '82%',
    marginLeft: 25,
  },
  itemTopTitleView: {
    height: 30,
    marginTop: 5,
    marginBottom: 40
  },
  itemView: {
    height: 30,
    marginTop: 10,
    marginBottom: 15
  },
  itemByOrSell: {
    color: 'white', 
    fontSize: 25, 
    fontWeight: 'bold',
    marginBottom: 2,
  },
  itemStockName: {
    color: 'white', 
    fontSize: 18, 
  },
  itemTitle: {
    color: 'grey', 
    fontSize: 15,
    marginBottom: 2,
  },
  itemValue: {
    color: 'white', 
    fontSize: 18, 
  },
});

export default TransactionsScreen;