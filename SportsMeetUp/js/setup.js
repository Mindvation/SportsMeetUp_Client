/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Platform,
    BackHandler
} from 'react-native';
import WelcomePage from './WelcomePage';
import Navigator from 'react-native-deprecated-custom-components';

export default class setup extends Component {
    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        const {navigator} = this.refs;
        const routers = navigator.getCurrentRoutes();
        console.log('当前路由长度：' + routers.length);
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为
        }
        return false;//默认行为
    };

    render() {
        var defaultName = 'WelcomePage';
        var defaultComponment = WelcomePage;

        return (
            <Navigator.Navigator
                ref="navigator"
                initialRoute={{name: defaultName, component: defaultComponment}}
                configureScene={(route) => {
                    var conf = Navigator.Navigator.SceneConfigs.HorizontalSwipeJump;
                    conf.gestures = {pop: false};
                    return conf;
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    if (route.component) {
                        return <Component {...route.params} navigator={navigator}/>
                    }
                }}
            />

        );
    }
}

const styles = StyleSheet.create({});
