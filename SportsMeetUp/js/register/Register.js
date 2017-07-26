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
    Image,
    ScrollView,
    View,
    Alert
} from 'react-native';
import TextInputConpt from '../common/TextInputConpt';
import CheckBoxConpt from '../common/CheckBoxConpt';
import Toast, {DURATION} from 'react-native-easy-toast';
import VrfFields from '../util/VrfFieldsUtil';
import FetchUtil from '../util/FetchUtil';
import ModalConpt from '../common/ModalConpt';
import Overlay from '../common/Overlay';
import Header from '../common/Header';
import HomePage from '../homePage/HomePage';
import DataUtil from '../util/DataUtil';

const dismissKeyboard = require('dismissKeyboard');

let interval;

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeRemaining: 0,
            phoneNumber: '',
            vrfCode: '',
            passWord: '',
            isChecked: true,
            succModalVisible: false,
            overlayVisible: false
        };
    }



    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        clearInterval(interval);
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

    _backToPrevious() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    _getVrfCode() {
        let fieldArray = [{
            'name': 'phoneNumber',
            'isRequired': true,
            'isRegular': true,
            'requiredMsg': '请输入手机号',
            'regularMsg': '请输入正确的手机号',
            'value': this.state.phoneNumber
        }];

        if (!this.state.timeRemaining) {
            let errorMsg = VrfFields(fieldArray);
            if (errorMsg) {
                this.refs.toast.show(errorMsg, 500);
            } else {
                this.setState({
                    timeRemaining: 10
                });
                this._getVrfCodeFromServer();
                this._countDownAction();
            }
        }
    }

    _getVrfCodeFromServer() {
        const options = {
            "url": '/sports-meetup/users/getVerificationCode',
            "params": {
                "phoneNumber": this.state.phoneNumber
            },
            "schema": "getVerificationCode"
        }

        FetchUtil.get(options).then((res) => {

        }).catch((error) => {
            Alert.alert(
                'Error',
                error.message,
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            );

            this.setState({
                timeRemaining: 0,
            });
            interval && clearInterval(interval);
        })
    }

    _countDownAction() {
        let leftTimerCount = this.state.timeRemaining;
        interval = setInterval(() => {
            leftTimerCount = this.state.timeRemaining - 1;
            if (leftTimerCount === 0) {
                this.setState({
                    timeRemaining: leftTimerCount,
                });
                interval && clearInterval(interval);
            } else {
                this.setState({
                    timeRemaining: leftTimerCount,
                });
            }
        }, 1000)
    }

    _submitRegister() {
        dismissKeyboard();
        let fieldArray = [{
            'name': 'phoneNumber',
            'isRequired': true,
            'isRegular': true,
            'requiredMsg': '请输入手机号',
            'regularMsg': '请输入正确的手机号',
            'value': this.state.phoneNumber
        }, {
            'name': 'vrfCode',
            'isRequired': true,
            'isRegular': true,
            'requiredMsg': '请输入验证码',
            'regularMsg': '请输入6位数字的验证码',
            'value': this.state.vrfCode
        }, {
            'name': 'passWord',
            'isRequired': true,
            'isRegular': true,
            'requiredMsg': '请输入密码',
            'regularMsg': '请输入6到12位的密码',
            'value': this.state.passWord
        }, {
            'name': 'isChecked',
            'isRequireCheck': true,
            'requiredMsg': '请阅读用户协议',
            'value': this.state.isChecked
        }];

        let errorMsg = VrfFields(fieldArray);

        if (errorMsg) {
            this.refs.toast.show(errorMsg, 500);
        } else {
            this._submitUserData();
        }
    }

    _submitUserData() {
        const options = {
            "url": '/sports-meetup/users/addUser',
            "params": {
                "phoneNumber": this.state.phoneNumber,
                "verificationCode": this.state.vrfCode,
                "password": this.state.passWord
            },
            "schema": "addUser"
        };

        this.setState({
            overlayVisible: true,
        });

        FetchUtil.post(options).then((res) => {
            this.setState({
                succModalVisible: true,
                overlayVisible: false
            });

            DataUtil.saveData('userLogonInfo',{
                "phoneNumber": this.state.phoneNumber,
                "password": this.state.passWord
            });

            interval = setInterval(() => {
                interval && clearInterval(interval);
                this._goToHomePage();
            }, 1000)

        }).catch((error) => {
            this.setState({
                overlayVisible: false,
            });

            Alert.alert(
                'Error',
                error.message,
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            );
        })

    }

    _goToHomePage() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.resetTo({
                component: HomePage,
                name: 'HomePageComponent',
                params: {}
            });
        }
    }

    render() {
        const declaration = <View style={styles.declTextCont}>
            <Text style={styles.declText}>我已阅读</Text>
            <TouchableWithoutFeedback onPress={this._backToPrevious.bind(this)}>
                <View>
                    <Text style={styles.declTextLink}>《用户协议》</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>;

        const succModal = <View style={styles.succModalMainCont}>
            <View style={styles.succModalCont}>
                <Image style={styles.succModalImage}
                       source={require('../../res/images/success.png')}/>
                <Text style={styles.succModalText}>注册成功</Text>
            </View>
        </View>;

        return (
            <View style={styles.container}>
                <Header navigator={this.props.navigator}/>
                <View style={styles.mainCont}>
                    <ScrollView
                        ref={(scrollView) => {
                            _scrollView = scrollView;
                        }}
                        automaticallyAdjustContentInsets={false}
                        horizontal={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.getVrfCodeCont}>
                            <TextInputConpt
                                labelCont='手机号'
                                placeholder='请输入手机号'
                                isPassword={false}
                                isShowClear={true}
                                keyboardType="numeric"
                                isHideBorder={true}
                                onChange={(value) => {
                                    this.setState({
                                        phoneNumber: value
                                    })
                                }}
                            />
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this._getVrfCode()
                                }}
                            >
                                <View
                                    style={[styles.getVrfCodeBtn, this.state.timeRemaining ? {backgroundColor: '#e7e6e6'} : {backgroundColor: '#df3939'}]}>
                                    <Text style={[this.state.timeRemaining ? {color: '#000000'} : {color: '#ffffff'}, {
                                        paddingLeft: 5,
                                        paddingRight: 5
                                    }]}>
                                        获取验证码{this.state.timeRemaining ? '(' + this.state.timeRemaining + 's)' : ''}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <TextInputConpt
                            labelCont='验证码'
                            placeholder='请输入验证码'
                            isPassword={false}
                            isShowClear={true}
                            keyboardType="numeric"
                            onChange={(value) => {
                                this.setState({
                                    vrfCode: value
                                })
                            }}
                        />
                        <TextInputConpt
                            labelCont='密    码'
                            placeholder='请输入密码'
                            isPassword={true}
                            onChange={(value) => {
                                this.setState({
                                    passWord: value
                                })
                            }}
                        />
                        <CheckBoxConpt
                            labelCont={declaration}
                            isChecked={this.state.isChecked}
                            onChange={(value) => {
                                this.setState({
                                    isChecked: value
                                })
                            }}
                        />
                        <View style={styles.submitBtnCont}>
                            <TouchableHighlight
                                onPress={() => {
                                    this._submitRegister();
                                }}
                                activeOpacity={0.7}
                                style={styles.submitButton}
                                underlayColor="#df3939"
                            >
                                <Text style={styles.submitText}>提 交</Text>
                            </TouchableHighlight>
                        </View>

                    </ScrollView>
                </View>
                <Toast ref="toast" position='center' style={styles.toastStyle}/>
                <ModalConpt
                    allowClose={false}
                    modalCont={succModal}
                    modalVisible={this.state.succModalVisible}
                ></ModalConpt>
                <Overlay
                    allowClose={false}
                    modalVisible={this.state.overlayVisible}
                ></Overlay>
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
    getVrfCodeCont: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 15
    },
    getVrfCodeBtn: {
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingLeft: 5,
        paddingRight: 5
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
    declTextCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    declText: {
        color: '#393939',
        fontSize: 11
    },
    declTextLink: {
        color: '#0000FF',
        fontSize: 11
    },
    succModalMainCont: {
        marginLeft: 55,
        marginRight: 55,
        flexDirection: 'row'
    },
    succModalCont: {
        height: 73,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    succModalImage: {
        height: 25,
        width: 25,
        marginRight: 25
    },
    succModalText: {
        fontSize: 17,
        color: '#000000'
    },
    toastStyle: {
        paddingLeft: 15,
        paddingRight: 15
    }
});
