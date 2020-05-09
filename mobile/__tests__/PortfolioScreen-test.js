import 'react-native';
import React from 'react';
import PortfolioScreen from '../src/screens/PortfolioScreen';
import renderer from 'react-test-renderer';


test('PortfolioScreen snapShot', () => {
  jest.useFakeTimers();
  const snap = renderer.create(
    <PortfolioScreen />
  ).toJSON();
  expect(snap).toMatchSnapshot();
});

it('PortfolioScreen renders correctly', async () => {
  const screen = renderer.create(
    <PortfolioScreen />
  );
});
