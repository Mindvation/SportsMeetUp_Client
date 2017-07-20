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
    TouchableWithoutFeedback,
    Image,
    ScrollView,
    View
} from 'react-native';
import TextInputConpt from '../common/TextInputConpt';

let interval;
export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            timeRemaining: 0
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

    _getVrfCode(){
        if(!this.state.timeRemaining){
            this.setState({
                timeRemaining: 10
            })
            this._countDownAction();
        }
    }

    _countDownAction(){
        let leftTimerCount = this.state.timeRemaining;
        interval = setInterval(() => {
            leftTimerCount = this.state.timeRemaining-1;
            if(leftTimerCount === 0){
                this.setState({
                    timeRemaining:leftTimerCount,
                });
                interval && clearInterval(interval);
            }else{
                this.setState({
                    timeRemaining:leftTimerCount,
                });
            }
        },1000)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableWithoutFeedback onPress={this._backToPrevious.bind(this)}>
                        <Image style={{width:25,height:25}} source={require('../../res/images/backbtn_android.png')}></Image>
                    </TouchableWithoutFeedback>
                    <View style={styles.headerText}/>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View><Text style={styles.rightBtnText}>中文</Text></View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.mainCont}>
                    <ScrollView
                        ref={(scrollView) => {
                            _scrollView = scrollView;
                        }}
                        automaticallyAdjustContentInsets={false}
                        horizontal={false}
                    >
                        <View style={styles.getVrfCodeCont}>
                            <TextInputConpt
                                labelCont='手机号'
                                placeholder='请输入手机号'
                                isPassword={false}
                                isShowClear={true}
                                isHideBorder={true}
                            />
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this._getVrfCode()
                                }}
                            >
                                <View style={[styles.getVrfCodeBtn,this.state.timeRemaining?{backgroundColor: '#e7e6e6'}:{backgroundColor: '#df3939'}]}>
                                    <Text style={this.state.timeRemaining?{color: '#000000'}:{color: '#ffffff'}}>
                                        获取验证码{this.state.timeRemaining?'('+this.state.timeRemaining+'s)':''}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <TextInputConpt
                            labelCont='验证码'
                            placeholder='请输入验证码'
                            isPassword={false}
                            isShowClear={true}
                        />
                        <TextInputConpt
                            labelCont='密    码'
                            placeholder='请输入密码'
                            isPassword={true}
                        />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        height:48,
        backgroundColor: '#272727',
        paddingLeft: 15,
        paddingRight: 15
    },
    headerText:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightBtnText:{
        color: '#E8E8E8',
        fontSize: 15
    },
    mainCont:{
        flex:1,
        flexDirection: 'row'
    },
    getVrfCodeCont: {
        flex:1,
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
    }
});
