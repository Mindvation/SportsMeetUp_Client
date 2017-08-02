/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Platform,
    TouchableOpacity,
    View,
    Text,
    Alert
} from 'react-native';
import Header from '../common/Header';
import MainPage from "../MainPage";
import DataUtil from '../util/DataUtil';

export default class Security extends Component {
    constructor(props) {
        super(props);
        this._setNewPassword = this._setNewPassword.bind(this);
        this._logOff = this._logOff.bind(this);
        this.state = {};
    }

    _setNewPassword() {

    }

    _logOff() {
        Alert.alert(
            '提醒',
            '您确定要退出登录?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
                {text: 'OK', onPress: () => this._confirmLogOff()},
            ],
            {cancelable: false}
        )
    }

    _confirmLogOff() {
        DataUtil.removeData('userLogonInfo');
        const {navigator} = this.props;
        navigator.push({
            component: MainPage,
            name: 'MainPage',
            params: {}
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigator={this.props.navigator} title="账号安全" hiddenRightBtn={true}/>
                <View style={styles.securityCont}>
                    <View style={styles.itemCont}>
                        <TouchableOpacity
                            onPress={this._setNewPassword}
                        >
                            <Text style={styles.itemText}>
                                设置新密码
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemCont}>
                        <TouchableOpacity
                            onPress={this._logOff}
                        >
                            <Text style={styles.itemText}>
                                退出登录
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    securityCont: {
        flex: 1
    },
    itemCont: {
        height: 75,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderColor: '#dedfe0'
    },
    itemText: {
        fontSize: 18,
        color: '#000000'
    }
});