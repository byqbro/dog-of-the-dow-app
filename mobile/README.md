## Getting Started
  - Environment setup(make sure you have installed following things)
    - Node.js 
    - npm
    - Xcode

  - Before start running the front end interface, follow the steps and install required files

        cd mobile
        npm install
        cd ios
        pod install

  - Three ways to open the front end user interface
    - If using React Native CLI, please follow the guide: <br> https://reactnative.dev/docs/environment-setup
    - If using Expo CLI, please follow the guide: <br> https://reactnative.dev/docs/environment-setup
    - If using Xcode(the easiest, the most recommended):
      - Open Xcode
      - In Xcode, click right bottom “Open another project” button
      - Choose the directly “dog-of-the-dow-app/mobile/ios”
      - Click the run button on the top left corner in Xcode
      - The Xcode should open a simulator with iPhone screen and open the app automatically
      - The simulator environment can be controlled by mouse and keyboard 


## Troubleshooting

### react-native-vector-icons

  - iOS: If you want to use any of the bundled icons, you need to add the icon fonts to your Xcode project. 
    Check out [this guide](https://github.com/oblador/react-native-vector-icons)

### Using Jest for testing Async Storage module

  - If you are using Async Storage mock, make sure to check out [docs on how to integrate it with this module.](https://github.com/react-native-community/async-storage/blob/master/docs/Jest-integration.md)
  
### Clean Cache
  - npm start -- --reset-cache
  - npm cache clean --force
