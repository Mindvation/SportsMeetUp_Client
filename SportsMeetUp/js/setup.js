/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet
} from 'react-native';
import TabPage from './homePage/TabPage'
import WelcomePage from './WelcomePage';
import Navigator from 'react-native-deprecated-custom-components';

export default class setup extends Component {
    render() {
        var defaultName = 'WelcomePage';
        var defaultComponment = WelcomePage;

        return (
            <Navigator.Navigator
                initialRoute={{ name:defaultName,component:defaultComponment}}
                configureScene={(route)=>{
                    var conf = Navigator.Navigator.SceneConfigs.HorizontalSwipeJump;
                    conf.gestures = { pop: false };
                    return conf;
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    if(route.component){
                        return <Component {...route.params} navigator={navigator} />
                    }
                }}
            />

        );
    }
}

const styles = StyleSheet.create({

});
