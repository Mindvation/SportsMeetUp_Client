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
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Setting from './Setting';
import MyInvite from './MyInvite';
import MyMatch from './MyMatch';
import AddTag from './AddTag';

const {width} = Dimensions.get('window');

let photoImage, interval;

const interests = ['b', 'f', 't'];

export default class PersonalCenter extends Component {
    constructor(props) {
        super(props);
        this.editPersonalInfo = this.editPersonalInfo.bind(this);
        this.editInterestInfo = this.editInterestInfo.bind(this);
        this.state = {
            isShowPhoto: false
        };
    }


    componentWillMount() {
        this.updatePhoto();
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

    }

    editInterestInfo() {
        const {navigator} = this.props;
        navigator.push({
            component: AddTag,
            name: 'AddTagPage',
            params:{
            }
        });
    }

    render() {
        const basketBallImg = <View style={[styles.interestIconCont, {backgroundColor: '#f8bb1b'}]}>
            <Image source={require('../../res/images/me/basketball.png')}
                   style={styles.interestIcon}/>
        </View>;
        const footBallImg = <View style={[styles.interestIconCont, {backgroundColor: '#58c80d'}]}>
            <Image source={require('../../res/images/me/football.png')}
                   style={styles.interestIcon}/>
        </View>;
        const tennisImg = <View style={[styles.interestIconCont, {backgroundColor: '#17c6ab'}]}>
            <Image source={require('../../res/images/me/tennis.png')}
                   style={styles.interestIcon}/>
        </View>;

        const mapping = {
            'b': basketBallImg,
            'f': footBallImg,
            't': tennisImg
        }
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
                            {this.state.isShowPhoto ? photoImage :
                                <Image source={require('../../res/images/me/photo_default.png')}
                                       style={styles.photoImg}
                                />}
                            <View style={styles.nameInfo}>
                                <Text style={styles.nameText}>Migan</Text>
                                <Text style={styles.freeTimeText}>周末 全天 周内 晚上</Text>
                            </View>
                            <TouchableOpacity onPress={this.editPersonalInfo}>
                                <Image source={require('../../res/images/me/pen.png')}
                                       style={styles.editImg}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.interestInfo}>
                            {interests.map((result, i) => {
                                return <View key={i}>
                                    {mapping[result]}
                                </View>;
                            })}
                            <TouchableOpacity onPress={this.editInterestInfo}>
                                <View style={[styles.interestIconCont, {backgroundColor: '#ffff'}]}>
                                    <Image source={require('../../res/images/me/add.png')}
                                           style={styles.interestIcon}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollableTabView
                        renderTabBar={() => <ScrollableTabBar style={styles.tabBarStyle}
                                                              tabStyle={styles.tabStyle}
                                                              underlineHeight={0}/>}
                        tabBarUnderlineStyle={styles.tabBarUnderline}
                        tabBarTextStyle={styles.tabBarTextStyle}
                        tabBarActiveTextColor="#ffffff"
                        tabBarInactiveTextColor="#afaeae"
                        style={{height: 1300}}
                    >
                        <MyInvite tabLabel="我的邀请"/>
                        <MyMatch tabLabel="我的比赛"/>
                        <Setting tabLabel="其他设置"/>
                    </ScrollableTabView>
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
    },
    interestInfo: {
        width: width,
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingLeft: 30,
        paddingBottom: 30,
        paddingTop: 15,
        paddingRight: 30 - 9
    },
    interestIcon: {
        height: 25,
        width: 25
    },
    interestIconCont: {
        width: (width - 60 - 27) / 4,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 9,
        marginTop: 15,
        opacity: 0.9
    }
});
