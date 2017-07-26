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
import LogonPage from './MainPage'
import SplashScreen from 'react-native-splash-screen'
import DataUtil from './util/DataUtil';
import FetchUtil from './util/FetchUtil';
import TabPage from './homePage/TabPage';

export default class WelcomePage extends Component {

    componentDidMount() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            SplashScreen.hide();
            navigator.resetTo({
                component: TabPage,
                name: 'TabPage',
                params:{
                }
            });
        });

        /*DataUtil.getData('userLogonInfo').then((res) => {
            this._logOnWithLocalData(res);
        }).catch((error) => {
            InteractionManager.runAfterInteractions(() => {
                SplashScreen.hide();
                navigator.resetTo({
                    component: LogonPage,
                    name: 'LogonPage',
                    // component: TabPage,
                    // name: 'TabPage',
                    params:{
                    }
                });
            });
        })*/
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    _logOnWithLocalData(userData){
        const options = {
            "url": '/sports-meetup/users/addUser',
            "params": {
                "phoneNumber": userData.phoneNumber,
                "password": userData.passWord
            },
        };
        const {navigator} = this.props;

        FetchUtil.post(options).then((res) => {
            SplashScreen.hide();
            if (navigator) {
                navigator.resetTo({
                    component: TabPage,
                    name: 'TabPageComponent',
                    params: {}
                });
            }
        }).catch((error) => {
            InteractionManager.runAfterInteractions(() => {
                SplashScreen.hide();
                navigator.resetTo({
                    component: LogonPage,
                    name: 'LogonPage',
                    params:{
                    }
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