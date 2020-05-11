import 'react-native';
import React from 'react';
import StrategiesScreen from '../src/screens/StrategiesScreen';
import renderer from 'react-test-renderer';


test('StrategiesScreen snapShot', () => {
  jest.useFakeTimers();
  const snap = renderer.create(
    <StrategiesScreen />
  ).toJSON();
  expect(snap).toMatchSnapshot();
});

it('StrategiesScreen renders correctly', async () => {
  const screen = renderer.create(
    <StrategiesScreen />
  );
});
