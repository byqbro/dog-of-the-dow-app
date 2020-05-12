import 'react-native';
import React from 'react';
import AccountScreen from '../src/screens/AccountScreen';
import renderer from 'react-test-renderer';


test('AccountScreen snapShot', () => {
  jest.useFakeTimers();
  const snap = renderer.create(
    <AccountScreen />
  ).toJSON();
  expect(snap).toMatchSnapshot();
});

it('AccountScreen renders correctly', async () => {
  const screen = renderer.create(
    <AccountScreen />
  );
});
