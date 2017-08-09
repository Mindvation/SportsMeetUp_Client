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
import DataUtil from './util/DataUtil';
import FetchUtil from './util/FetchUtil';
import TabPage from './homePage/TabPage';
import PersonalCenter from './personal/PersonalCenter';
import NearbyMain from './nearby/NearbyMain';

export default class WelcomePage extends Component {

    componentDidMount() {
        const {navigator} = this.props;
        /*InteractionManager.runAfterInteractions(() => {
            navigator.resetTo({
                component: NearbyMain,
                name: 'NearbyMain',
                params:{
                }
            });
            SplashScreen.hide();
        });*/

        DataUtil.getData('userLogonInfo').then((res) => {
            this._logOnWithLocalData(res);
        }).catch((error) => {
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
            SplashScreen.hide();
            if (navigator) {
                navigator.resetTo({
                    component: TabPage,
                    name: 'TabPageComponent',
                    params: {
                        "phoneNumber": userData.phoneNumber
                    }
                });
            }
        }).catch((error) => {
            InteractionManager.runAfterInteractions(() => {
                SplashScreen.hide();
                navigator.resetTo({
                    component: MainPage,
                    name: 'MainPage',
                    params: {}
                });
            });
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