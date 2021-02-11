import React from 'react';


import { AppLoading } from 'expo';
import * as Font from 'expo-font';

class AppFontLoader extends React.Component {


  state = {


    fontLoaded: false


  };

  async componentWillMount() {

    await Font.loadAsync({
        'Poppins-Medium': require('../res/assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Black': require('../res/assets/fonts/Poppins-Black.ttf'),
        'Poppins-Bold': require('../res/assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Light': require('../res/assets/fonts/Poppins-Light.ttf'),
        'Poppins-SemiBold': require('../res/assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Regular': require('../res/assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Thin': require('../res/assets/fonts/Poppins-Thin.ttf')
    });

    this.setState({ fontLoaded: true });

  }

  render() {

    if (!this.state.fontLoaded) {


      return <AppLoading />;


    }

    return this.props.children;


  }


}

export { AppFontLoader };