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
    TouchableOpacity,
    Image,
    ScrollView,
    View,
    Alert
} from 'react-native';
import TextInputConpt from '../common/TextInputConpt';
import Toast, {DURATION} from 'react-native-easy-toast';
import VrfFields from '../util/VrfFieldsUtil';
import FetchUtil from '../util/FetchUtil';
import ModalConpt from '../common/ModalConpt';
import Overlay from '../common/Overlay';
import Header from '../common/Header';
import DataUtil from '../util/DataUtil';
import MainPage from '../MainPage';

const dismissKeyboard = require('dismissKeyboard');

let interval, interval2;

export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            questionDes: '',
            overlayVisible: false
        };
    }

    _submitQuestion() {
        dismissKeyboard();
        let fieldArray = [{
            'name': 'question',
            'isRequired': true,
            'isRegular': false,
            'requiredMsg': '请输入问题',
            'value': this.state.question
        }];

        let errorMsg = VrfFields(fieldArray);

        if (errorMsg) {
            this.refs.toast.show(errorMsg, 500);
            return;
        }

        this.submitFeedbackToServer();
    }

    submitFeedbackToServer() {
        const options = {
            "url": '8081/sports-meetup-papi/users/user/comments',
            "params": {
                "title": this.state.question,
                "content": this.state.questionDes,
                "userId": globalUserInfo.userId
            }
        };

        this.setState({
            overlayVisible: true,
        });

        FetchUtil.post(options).then((res) => {
            this.setState({
                overlayVisible: false
            });

            const {navigator} = this.props;
            if (navigator) {
                navigator.pop();
            }
        }).catch((error) => {
            this.setState({
                overlayVisible: false,
            });

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

    render() {
        return (
            <View style={styles.container}>
                <Header navigator={this.props.navigator} title="意见反馈" hiddenRightBtn={true}/>
                <View style={styles.mainCont}>
                    <ScrollView
                        ref={(scrollView) => {
                            _scrollView = scrollView;
                        }}
                        automaticallyAdjustContentInsets={false}
                        horizontal={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <Text style={styles.title}>请输入问题</Text>
                        <View style={styles.questionCont}>
                            <TextInputConpt
                                onChange={(value) => {
                                    this.setState({
                                        question: value
                                    })
                                }}
                                style={styles.questionStyle}
                                contStyle={{paddingLeft: 0, paddingRight: 0}}
                            />
                        </View>
                        <Text style={styles.title}>请输入问题描述</Text>
                        <View style={styles.questionCont}>
                            <TextInputConpt
                                placeholder='我们非常重视用户的提问，运营将会从提问中抽取10名优秀意见的用户，给予积分奖励。'
                                isPassword={false}
                                onChange={(value) => {
                                    this.setState({
                                        questionDes: value
                                    })
                                }}
                                style={styles.questionStyle}
                                contStyle={{paddingLeft: 0, paddingRight: 0}}
                                multiLine={true}
                            />
                        </View>
                        <View style={styles.submitBtnCont}>
                            <TouchableOpacity
                                onPress={() => {
                                    this._submitQuestion();
                                }}
                                style={styles.submitButton}
                            >
                                <Text style={styles.submitText}>提 交</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                <Toast ref="toast" position='center' style={styles.toastStyle}/>
                <Overlay
                    allowClose={false}
                    modalVisible={this.state.overlayVisible}
                />
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
    mainCont: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff'
    },
    submitBtnCont: {
        flexDirection: 'row',
        marginTop: 27,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 15
    },
    submitButton: {
        backgroundColor: '#df3939',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRadius: 5
    },
    submitText: {
        color: '#ffffff',
        fontSize: 17
    },
    title: {
        color: '#000000',
        backgroundColor: '#ffffff',
        fontSize: 18,
        paddingLeft: 15,
        paddingTop: 15,
        paddingBottom: 15
    },
    questionStyle: {
        fontSize: 18,
        marginLeft: 0
    },
    questionCont: {
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        backgroundColor: '#eeeeee'
    },
    toastStyle: {
        paddingLeft: 15,
        paddingRight: 15
    }
});
