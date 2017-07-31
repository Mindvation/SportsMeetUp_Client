/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
} from 'react-native';

export default class MyInvite extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.settingCont}>
                <Text>123123</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    settingCont: {
        flex: 1,
        height: 700,
        backgroundColor: 'red'
    }
});
