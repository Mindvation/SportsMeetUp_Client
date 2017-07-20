/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    Image,
    Platform,
    View
} from 'react-native';

import Register from '../register/Register'

export default class Logon extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    _signUp() {
        const { navigator } = this.props;
        if(navigator){
            navigator.push({
                name:'RegisterComponent',
                component:Register,
            })
        }
    }

    _logIn() {

    }

    render() {
        return (
            <Image source={require('../../res/images/logon.png')}
                   style={styles.bgImage}>
                <View style={styles.container}>
                    <View style={styles.welcomeCont}>
                        <Text style={[styles.commonFont,styles.title]}> Sport Teams </Text>
                        <Text style={[styles.commonFont,styles.subTitle]}> 享受你的比赛 </Text>
                    </View>
                    <View style={styles.signUpCont}>
                        <View style={styles.signUpBtnCont}>
                            <TouchableHighlight
                                onPress={() => {
                                    this._signUp();
                                }}
                                activeOpacity={0.7}
                                style={styles.signUpButton}
                                underlayColor="#dc3434"
                            >
                                <Text style={styles.signUpText}>注册</Text>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.logInCont}>
                            <Text style={styles.commonFont}>已拥有账号</Text>
                            <Text
                                onPress={this._logIn.bind(this)}
                                style={[styles.commonFont,styles.logInText]}
                            >登录</Text>
                        </View>
                    </View>
                </View>
            </Image>
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
        paddingTop: (Platform.OS === 'ios') ? 20:0,
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
