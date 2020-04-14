import { NavigationActions } from 'react-navigation';

export default class NavigationService {
  static _navigator = null;

  static init(navigatorRef) {
    NavigationService._navigator = navigatorRef;
  }

  static navigate({ routeName, params }) {
    NavigationService._navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  }

  static back(key = null) {
    NavigationService._navigator.dispatch(NavigationActions.back({ key }));
  }
}
