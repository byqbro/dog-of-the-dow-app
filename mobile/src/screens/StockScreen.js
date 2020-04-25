import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import axios from 'axios';
import { API_HOST } from 'react-native-dotenv';
import Card from '../components/Card';
import cusColors from '../constants/Colors';


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
        // console.log("profile:", profile);
        // console.log("priceRange:", priceRange);

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

  render() {
    return (
      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text style={{ color: 'white', fontSize: 18 }}>{this.state.symbol}</Text>
            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', marginTop: 10 }}>{this.state.companyName}</Text>
            <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>${this.state.price}</Text>
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
    marginLeft: 20,
    marginTop: 35,
    marginBottom: 30,
  },
  titleText: {
    height: 34,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
});

export default StockScreen;
