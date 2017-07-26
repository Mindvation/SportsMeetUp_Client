/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    BackHandler,
    Platform,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Alert,
    ScrollView,
    View
} from 'react-native';
import TextInputConpt from '../common/TextInputConpt';
import Toast, {DURATION} from 'react-native-easy-toast';
import VrfFields from '../util/VrfFieldsUtil';
import ModifyPwd from './ModifyPwd';
import Header from '../common/Header';
import FetchUtil from '../util/FetchUtil';

const dismissKeyboard = require('dismissKeyboard');

export default class PhoneNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
        };
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
        const {navigator} = this.props;
        const routers = navigator.getCurrentRoutes();
        console.log('当前路由长度：' + routers.length);
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为
        }
        return false;//默认行为
    };

    _submitPhoneNumber() {
        dismissKeyboard();
        let fieldArray = [{
            'name': 'phoneNumber',
            'isRequired': true,
            'isRegular': true,
            'requiredMsg': '请输入手机号',
            'regularMsg': '请输入正确的手机号',
            'value': this.state.phoneNumber
        }];

        let errorMsg = VrfFields(fieldArray);

        if (errorMsg) {
            this.refs.toast.show(errorMsg, 500);
        } else {
            this._getVrfCodeFromServer();
        }
    }

    _getVrfCodeFromServer() {
        const options = {
            "url": '/sports-meetup/users/getVerificationCode',
            "params": {
                "phoneNumber": this.state.phoneNumber
            },
            "schema": "getVerificationCode"
        };

        FetchUtil.get(options).then((res) => {
            this._goToModifyPwd();
        }).catch((error) => {
            Alert.alert(
                'Error',
                error.message,
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );
        })
    }

    _goToModifyPwd() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'ModifyPwdComponent',
                component: ModifyPwd,
                params: {
                    phoneNumber: this.state.phoneNumber
                }
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigator = {this.props.navigator}/>
                <View style={styles.mainCont}>
                    <ScrollView
                        ref={(scrollView) => {
                            _scrollView = scrollView;
                        }}
                        automaticallyAdjustContentInsets={false}
                        horizontal={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <TextInputConpt
                            labelCont='手机号'
                            placeholder='请输入手机号'
                            isPassword={false}
                            isShowClear={true}
                            keyboardType="numeric"
                            isHideBorder={false}
                            onChange={(value) => {
                                this.setState({
                                    phoneNumber: value
                                })
                            }}
                        />

                        <View style={styles.submitBtnCont}>
                            <TouchableHighlight
                                onPress={() => {
                                    this._submitPhoneNumber();
                                }}
                                activeOpacity={0.7}
                                style={styles.submitButton}
                                underlayColor="#df3939"
                            >
                                <Text style={styles.submitText}>下一步</Text>
                            </TouchableHighlight>
                        </View>

                    </ScrollView>
                </View>
                <Toast ref="toast" position='center' style={styles.toastStyle}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        backgroundColor: '#272727',
        paddingLeft: 15,
        paddingRight: 15
    },
    headerText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightBtnText: {
        color: '#E8E8E8',
        fontSize: 15
    },
    mainCont: {
        flex: 1,
        flexDirection: 'row'
    },
    submitBtnCont: {
        flexDirection: 'row',
        marginTop: 27,
        paddingLeft: 15,
        paddingRight: 15
    },
    submitButton: {
        backgroundColor: '#df3939',
        height: 38,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        opacity: 0.7,
        borderRadius: 5
    },
    submitText: {
        color: '#ffffff',
        fontSize: 17
    },
    toastStyle: {
        paddingLeft: 15,
        paddingRight: 15
    }
});
