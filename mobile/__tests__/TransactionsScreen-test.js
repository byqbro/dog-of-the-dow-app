import 'react-native';
import React from 'react';
import TransactionsScreen from '../src/screens/TransactionsScreen';
import renderer from 'react-test-renderer';


test('TransactionsScreen snapShot', () => {
  jest.useFakeTimers();
  const snap = renderer.create(
    <TransactionsScreen />
  ).toJSON();
  expect(snap).toMatchSnapshot();
});

it('TransactionsScreen renders correctly', async () => {
  const screen = renderer.create(
    <TransactionsScreen />
  );
});
