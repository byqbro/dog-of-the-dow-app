import 'react-native';
import React from 'react';
import MarketScreen from '../src/screens/MarketScreen';
import renderer from 'react-test-renderer';


test('MarketScreen snapShot', ()=>{
  const snap = renderer.create(
    <MarketScreen />
  ).toJSON();
  expect(snap).toMatchSnapshot();
});
