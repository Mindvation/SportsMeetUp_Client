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
import FetchUtil from '../util/FetchUtil';
import Overlay from '../common/Overlay';
import PhoneNumber from './PhoneNumber';
import Header from '../common/Header';
import DataUtil from '../util/DataUtil';
import TabPage from '../homePage/TabPage';

const dismissKeyboard = require('dismissKeyboard');

export default class Logon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            passWord: '',
            overlayVisible: false
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

    _submitLogonInfo() {
        dismissKeyboard();
        let fieldArray = [{
            'name': 'phoneNumber',
            'isRequired': true,
            'isRegular': true,
            'requiredMsg': '请输入手机号',
            'regularMsg': '请输入正确的手机号',
            'value': this.state.phoneNumber
        }, {
            'name': 'passWord',
            'isRequired': true,
            'isRegular': true,
            'requiredMsg': '请输入密码',
            'regularMsg': '请输入6到12位的密码',
            'value': this.state.passWord
        }];

        let errorMsg = VrfFields(fieldArray);

        if (errorMsg) {
            this.refs.toast.show(errorMsg, 500);
        } else {
            this._submitLogonData();
        }
    }

    _submitLogonData() {
        const options = {
            "url": 'sports-meetup-papi/users/login',
            "params": {
                "phoneNumber": this.state.phoneNumber,
                "password": this.state.passWord
            },
            "schema": "login"
        };

        this.setState({
            overlayVisible: true,
        });

        FetchUtil.post(options).then((res) => {
            this.setState({
                overlayVisible: false
            });

            DataUtil.saveData('userLogonInfo',{
                "phoneNumber": this.state.phoneNumber,
                "password": this.state.passWord
            });

            this._goToHomePage();
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
                { cancelable: false }
            );

        })

    }

    _goToHomePage(){
        const {navigator} = this.props;
        if (navigator) {
            navigator.resetTo({
                component: TabPage,
                name: 'TabPageComponent',
                params:{
                }
            });
        }
    }

    _goToPhoneNumber(){
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'PhoneNumberComponent',
                component: PhoneNumber,
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

                        <View style={styles.forgetPwdCont}>
                            <TouchableWithoutFeedback
                                onPress={this._goToPhoneNumber.bind(this)}>
                                <View>
                                    <Text style={styles.forgetPwdTextLink}>忘记密码？</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={styles.submitBtnCont}>
                            <TouchableHighlight
                                onPress={() => {
                                    this._submitLogonInfo();
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
    forgetPwdCont: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 27,
        marginLeft: 15
    },
    forgetPwdTextLink: {
        fontSize: 17,
        color: '#393939',
    },
    toastStyle: {
        paddingLeft: 15,
        paddingRight: 15
    }
});
