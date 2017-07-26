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
import LogonPage from './logon/Logon'
import SplashScreen from 'react-native-splash-screen'
import TabPage from './homePage/TabPage'

export default class WelcomePage extends Component {

    componentDidMount() {
        const {navigator} = this.props;
        this.timer = setTimeout(() => {
            InteractionManager.runAfterInteractions(() => {
                SplashScreen.hide();
                navigator.resetTo({
                    // component: LogonPage,
                    // name: 'LogonPage',
                    component: TabPage,
                    name: 'TabPage',
                    params:{
                    }
                });
            });
        }, 1000);
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
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
    container:{
        flex:1,
    }
})