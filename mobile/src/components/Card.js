import React from 'react';
import { View, StyleSheet } from 'react-native';
import cusColors from '../constants/Colors';

const Card = props => {
  return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: cusColors.background,
  }
});

export default Card;
