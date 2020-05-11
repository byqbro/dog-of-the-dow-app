import 'react-native';
import React from 'react';
import MarketScreen from '../src/screens/MarketScreen';
import renderer from 'react-test-renderer';
import mockAxios from "axios";
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


test('MarketScreen snapShot', () => {
  jest.useFakeTimers();
  const snap = renderer.create(
    <MarketScreen />
  ).toJSON();
  expect(snap).toMatchSnapshot();
});

jest.mock('axios');
test('MarketScreen fetches stocksInfo', () => {
  const resp = {data: "stocksInfo"};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
});

it('MarketScreen renders correctly', async () => {
  const screen = renderer.create(
    <MarketScreen />
  );
});

it('MarketScreen tests state', async () => {
  let MarketScreenData = renderer.create(<MarketScreen />).getInstance();

  // MarketScreenData.getStocksInfo();
  // const data = await MarketScreenData.getStocksInfo;

  expect(MarketScreenData.state.stocksInfo).toEqual([]);
});

let findElement = function(tree, element) {
  let result = undefined;
  for (node in tree.children) {
    if (tree.children[node].props.testId == element) {
      result = true;
    }
  }
  // console.warn(tree);
  return result;
}

it('MarketScreen finds Element', () => {
  let tree = renderer.create(
    <MarketScreen />
  ).toJSON();

  expect(findElement(tree, 'stockInfoFlatList')).toBeDefined();
});

it('MarketScreen tests props', () => {
  const wrapper = shallow(<MarketScreen />).props();
  // console.warn(wrapper.children[1].props.testId);
  expect(wrapper.children[1].props.testId).toEqual('stockInfoFlatList');
});
