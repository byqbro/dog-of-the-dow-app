import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';

const appNavigator = createSwitchNavigator({
    Main: MainTabNavigator,
  },{
    initialRouteName: 'Main',
  }
);

export default createAppContainer(appNavigator);
