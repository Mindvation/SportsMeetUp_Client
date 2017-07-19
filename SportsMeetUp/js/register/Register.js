/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    BackHandler,
    Platform,
    TouchableHighlight,
    Image,
    View
} from 'react-native';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

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
        const { navigator } = this.props;
        const routers = navigator.getCurrentRoutes();
        console.log('当前路由长度：'+routers.length);
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为
        }
        return false;//默认行为
    };

    _backToPrevious(){
        const { navigator } = this.props;
        if(navigator){
            navigator.pop();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Register
                </Text>

                <Text style={styles.welcome}
                      onPress={this._backToPrevious.bind(this)}
                      >
                    Back To Logon Page
                </Text>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    commonFont: {
        color: '#F5F5F5',
        fontSize: 17
    },
    title: {
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 15,
        fontStyle: 'italic'
    },
    subTitle: {
        fontSize: 18,
        fontStyle: 'italic'
    },
    welcomeCont: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    signUpCont: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpBtnCont: {
        flexDirection: 'row',
    },
    signUpButton:{
        backgroundColor: '#dc3434',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        opacity: 0.7
    },
    signUpText:{
        color: '#ffffff',
        fontSize: 17
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    bgImage: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        resizeMode: 'stretch',
        width: null,
        height: null
    },
    logInCont: {
        flexDirection: 'row',
        marginTop: 24
    },
    logInText: {
        textDecorationLine: 'underline',
        marginLeft: 5,
    }
});
