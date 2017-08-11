/**
 * 欢迎页
 * @flow
 * **/
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    InteractionManager,
    Platform,
} from 'react-native'
import MainPage from './MainPage'
import SplashScreen from 'react-native-splash-screen'
import FetchUtil from './util/FetchUtil';
import TabPage from './homePage/TabPage';
import DataUtil from './util/DataUtil';

export default class WelcomePage extends Component {

    componentDidMount() {
        const {navigator} = this.props;

        /*this.timer = setTimeout(() => {
            InteractionManager.runAfterInteractions(() => {
                SplashScreen.hide();
                navigator.resetTo({
                    component: TabPage,
                    name: 'TabPage',
                    params: {}
                });
            });
        }, 500);*/

        DataUtil.getData('userLogonInfo').then((res) => {
            this._logOnWithLocalData(res);
        }).catch((error) => {
            this.timer = setTimeout(() => {
                InteractionManager.runAfterInteractions(() => {
                    navigator.resetTo({
                        component: MainPage,
                        name: 'MainPage',
                        // component: TabPage,
                        // name: 'TabPage',
                        params: {}
                    });
                    SplashScreen.hide();
                });
            }, 500);
        })
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    _logOnWithLocalData(userData) {
        const options = {
            "url": '8081/sports-meetup-papi/users/login',
            "params": {
                "phoneNumber": userData.phoneNumber,
                "password": userData.password
            },
        };
        const {navigator} = this.props;

        FetchUtil.post(options).then((res) => {
            this.timer = setTimeout(() => {
                InteractionManager.runAfterInteractions(() => {
                    SplashScreen.hide();
                    navigator.resetTo({
                        component: TabPage,
                        name: 'TabPageComponent',
                        params: {
                            "phoneNumber": userData.phoneNumber
                        }
                    });
                });
            }, 500);
        }).catch((error) => {
            this.timer = setTimeout(() => {
                InteractionManager.runAfterInteractions(() => {
                    SplashScreen.hide();
                    navigator.resetTo({
                        component: MainPage,
                        name: 'MainPage',
                        params: {}
                    });
                });
            }, 500);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Image style={{flex:1,width:null}} source={require('../res/images/launch_screen.png')}/>*/}
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})