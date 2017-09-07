/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @Bob
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Platform,
    View,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Setting from './Setting';
import ModifyInfo from './ModifyInfo';
import AddTag from './AddTag';
import MyInterest from "./MyInterest";

const {width} = Dimensions.get('window');

let photoImage, interval;

export default class PersonalCenter extends Component {
    constructor(props) {
        super(props);
        this.editPersonalInfo = this.editPersonalInfo.bind(this);
        this.editInterestInfo = this.editInterestInfo.bind(this);

        this.state = {
            myTags: globalUserInfo.tags,
            photo: globalUserInfo.photo,
            name: globalUserInfo.name,
            weekFreeTime: globalUserInfo.weekFreeTime,
            weekendFreeTime: globalUserInfo.weekendFreeTime
        };
    }

    //get photo from server
    updatePhoto() {
        interval = setInterval(() => {
            photoImage = <Image source={require('../../res/images/me/photo.png')}
                                style={styles.photoImg}
            />;
            this.setState({
                isShowPhoto: true
            });
            interval && clearInterval(interval);
        }, 1000)
    }

    editPersonalInfo() {
        const {navigator} = this.props;
        navigator.push({
            component: ModifyInfo,
            name: 'ModifyInfoPage',
            params: {
                updateInfo: (option) => {
                    this.setState({
                        photo: option.photo,
                        name: option.name,
                        weekFreeTime: option.weekFreeTime,
                        weekendFreeTime: option.weekendFreeTime
                    })
                }
            }
        });
    }

    editInterestInfo() {
        const {navigator} = this.props;
        navigator.push({
            component: AddTag,
            name: 'AddTagPage',
            params: {
                myTags: this.state.myTags,
                getTags: (option) => {
                    this.setState({
                        myTags: option
                    })
                }
            }
        });
    }

    render() {

        const {navigator} = this.props;
        let _scrollView;

        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(scrollView) => {
                        _scrollView = scrollView;
                    }}
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.personalInfo}>
                        <Image source={require('../../res/images/me/backImg.png')}
                               style={styles.bgImage}
                        />
                        <View style={styles.basicInfo}>
                            {this.state.photo ? <Image style={styles.photoImg} source={this.state.photo}/> :
                                <Image source={require('../../res/images/me/photo.png')}
                                       style={styles.photoImg}
                                />}
                            <View style={styles.nameInfo}>
                                <Text style={styles.nameText}>{this.state.name}</Text>
                                <Text
                                    style={styles.freeTimeText}>{'周末  ' + (this.state.weekendFreeTime ? this.state.weekendFreeTime : '未知')
                                + '    周内  ' + (this.state.weekFreeTime ? this.state.weekFreeTime : '未知')}</Text>
                            </View>
                            <TouchableOpacity onPress={this.editPersonalInfo}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 40,
                                    height: 40
                                }}>
                                    <Image source={require('../../res/images/me/pen.png')}
                                           style={styles.editImg}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <MyInterest myTags={this.state.myTags} edit={this.editInterestInfo}/>
                    </View>
                    <Setting navigator={navigator}/>
                </ScrollView>
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
    tabBarStyle: {
        height: 60,
        borderWidth: 0,
        backgroundColor: '#323232',
    },
    tabStyle: {
        height: 60
    },
    tabBarUnderline: {
        height: 0
    },
    tabBarTextStyle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    bgImage: {
        resizeMode: 'stretch',
        width: null,
        height: null,
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        top: 0
    },
    personalInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    basicInfo: {
        width: width,
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 30
    },
    photoImg: {
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#ffffff',
        width: 80,
        height: 80,
    },
    nameInfo: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 15
    },
    nameText: {
        fontSize: 22,
        color: '#ffffff',
        marginBottom: 10
    },
    freeTimeText: {
        fontSize: 14,
        color: '#ffffff'
    },
    editImg: {
        width: 20,
        height: 20
    }
});
