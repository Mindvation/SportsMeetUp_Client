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
    Alert,
    BackHandler
} from 'react-native';
import Header from '../common/Header';
import MainPage from "../MainPage";
import DataUtil from '../util/DataUtil';
import ModifyPwd from './ModifyPwd';
import FetchUtil from '../util/FetchUtil';

export default class Security extends Component {
    constructor(props) {
        super(props);
        this._getVrfCodeFromServer = this._getVrfCodeFromServer.bind(this);
        this._logOff = this._logOff.bind(this);
        this.state = {};
    }

    _setNewPassword() {
        const {navigator} = this.props;
        navigator.push({
            component: ModifyPwd,
            name: 'ModifyPwdPage',
            params: {
                navigator: navigator
            }
        });
    }

    _getVrfCodeFromServer() {
        const options = {
            "url": '8090/sports-meetup-user/users/getVerificationCode',
            "params": {
                "phoneNumber": globalUserInfo.phoneNumber,
                "option": 1
            }
        };

        FetchUtil.get(options).then((res) => {
            this._setNewPassword();
        }).catch((error) => {
            Alert.alert(
                error.code,
                error.message,
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            );
        })
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
        navigator.resetTo({
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
                            onPress={this._getVrfCodeFromServer}
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