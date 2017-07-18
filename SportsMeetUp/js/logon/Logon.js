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
    View
} from 'react-native';

export default class setup extends Component {
    _signUp() {

    }

    _logIn() {

    }

    render() {
        return (
            <Image source={require('../../res/images/logon.jpg')}
                   style={styles.bgImage}>
                <View style={styles.container}>
                    <View style={styles.welcomeCont}>
                        <Text style={[styles.commonFont,styles.titleFont]}>Sports Teams</Text>
                        <Text style={styles.commonFont}>Enjoy your tournament!</Text>
                    </View>
                    <View style={styles.signUpCont}>
                        <View>
                            <TouchableHighlight
                                onPress={() => {
                                    this._signUp();
                                }}
                                activeOpacity={0.7}
                                style={styles.signUpButton}
                            >
                                <Text style={styles.signUpText}>Sign Up</Text>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.logInCont}>
                            <Text style={styles.commonFont}>Already have an account?</Text>
                            <Text
                                onPress={this._logIn.bind(this)}
                                style={[styles.commonFont,styles.logInText]}
                            >Log In</Text>
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
        color: '#14507a',
        fontSize: 13,
        fontStyle: 'italic'
    },
    titleFont: {
        fontSize: 24
    },
    welcomeCont: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpCont: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    signUpButton:{
        backgroundColor: '#14507a',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpText:{
        color: '#ffffff',
        fontSize: 18
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
    },
    logInText: {
        textDecorationLine: 'underline',
        marginLeft: 5,
    }
});
