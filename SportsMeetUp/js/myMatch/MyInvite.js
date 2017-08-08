/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native';

const {width} = Dimensions.get('window');

import ModalConpt from '../common/ModalConpt';

const invitation = [
    {
        "invitee": "Darcy",
        "title": "11V11足球赛",
        "location": "西安市雁塔区雁南五路与雁塔南路十字西南 曲江圣卡纳",
        "date": "2017/7/31",
        "time": "17:30",
        "joined": 8,
        "total": 10
    }, {
        "invitee": "Frank",
        "title": "2V2足球赛",
        "location": "西安市雁塔区雁南五路与雁塔南路十字西南 曲江圣卡纳",
        "date": "2017/7/31",
        "time": "17:30",
        "joined": 4,
        "total": 4
    }, {
        "invitee": "Bob",
        "title": "4V4足球赛",
        "location": "西安市雁塔区雁南五路与雁塔南路十字西南 曲江圣卡纳",
        "date": "2017/7/31",
        "time": "17:30",
        "joined": 5,
        "total": 8
    }
];

export default class MyInvite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: "",
            invite: invitation,
            modalVisible: false,
            modalCont: null
        };
    }

    selectApplication(index) {
        this.setState({
            selectIndex: index
        })
    }

    _ignoreInvitation(index) {
        let invitation = this.state.invite;
        invitation.splice(index, 1);
        this.setState({
            invite: invitation,
            selectIndex: ""
        })
    }

    _closeAcceptDialog(index) {
        let invitation = this.state.invite;
        invitation.splice(index, 1);
        this.setState({
            modalVisible: false,
            invite: invitation,
            selectIndex: ""
        });
    }

    _acceptInvitation(index) {
        const playerImg = <Image style={styles.playerImage} source={require('../../res/images/me/player.png')}/>;
        const localImg = <Image style={styles.playerImage} source={require('../../res/images/me/location.png')}/>;
        const calendarImg = <Image style={styles.playerImage} source={require('../../res/images/me/calendar.png')}/>;
        const clockImg = <Image style={styles.playerImage} source={require('../../res/images/me/clock.png')}/>;

        let invitation = this.state.invite[index];

        let ivt = [
            {
                "text": <Text><Text style={{color: '#ff8400', fontSize: 16}}>{invitation.joined}</Text><Text
                    style={{color: '#000000', fontSize: 16}}>/{invitation.total}</Text></Text>,
                "image": playerImg
            },
            {
                "text": invitation.location,
                "image": localImg
            },
            {
                "text": invitation.date,
                "image": calendarImg
            },
            {
                "text": invitation.time,
                "image": clockImg
            }
        ]

        let modal = <View style={styles.acceptSucCont}>
            <View style={styles.titleCont}>
                <Image style={styles.titleImage} source={require('../../res/images/me/acptSuc.png')}/>
                <Text style={styles.titleText}>接受邀请成功</Text>
            </View>
            <View style={styles.matchInfoCont}>
                {
                    ivt.map((result, i) => {
                        return <View key={i} style={styles.playerCont}>
                            {result.image}
                            <Text style={styles.playerText}>{result.text}</Text>
                        </View>
                    })
                }
            </View>
            <TouchableOpacity
                onPress={() => {
                    this._closeAcceptDialog(index);
                }}
                style={styles.closeDialogBtn}
            >
                <Text style={styles.closeDialogText}>确 认</Text>
            </TouchableOpacity>
        </View>;

        this.setState({
            modalCont: modal,
            modalVisible: true
        })
    }

    render() {
        return ( <View style={styles.approveCont}>
                <ScrollView
                    ref={(scrollView) => {
                        _scrollView = scrollView;
                    }}
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {this.state.invite.map((app, k) => {
                        return <View key={k}>
                            <View style={[styles.borderLine, this.state.selectIndex === k ? null : {display: 'none'}]}>
                                <View style={styles.handleInviteCont}>
                                    <View style={styles.invitePersonalCont}>
                                        <Text style={styles.appPersonalText}>{app["invitee"]}发来一个比赛申请</Text>
                                        <Text style={styles.appTimeText}>时间：{app["date"] + " " + app["time"]}</Text>
                                    </View>
                                    <View style={styles.locationCont}>
                                        <Text style={styles.locationText}>地点：{app["location"]}</Text>
                                        <Text style={styles.titleText}>{app["title"]}</Text>
                                    </View>
                                </View>
                                <View style={styles.bottomCont}>
                                    <View style={styles.ignoreCont}>
                                        <TouchableOpacity onPress={() => {
                                            this._ignoreInvitation(k)
                                        }}>
                                            <View>
                                                <Text
                                                    style={styles.ignoreText}> 忽略 </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={styles.acceptCont}>
                                        <TouchableOpacity onPress={() => {
                                            this._acceptInvitation(k)
                                        }}>
                                            <View>
                                                <Text
                                                    style={styles.ignoreText}> 接受申请 </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            < View style={[styles.borderLine, this.state.selectIndex === k ? {display: 'none'} : null]}>
                                <TouchableOpacity onPress={() => this.selectApplication(k)}>
                                    <View style={styles.closeInviteCont}>
                                        <View style={styles.closeAppPersonalCont}>
                                            <Image source={require('../../res/images/me/photo.png')}
                                                   style={styles.photoImg}/>
                                            <Text
                                                style={styles.closeAppPersonalText}>{app["invitee"]}发来一个比赛申请</Text>
                                        </View>
                                        <View style={styles.appTimeCont}>
                                            <Text
                                                style={styles.closeAppTimeText}>{app["date"] + " " + app["time"]}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    })}
                </ScrollView>
                <ModalConpt
                    allowClose={false}
                    modalCont={this.state.modalCont}
                    modalVisible={this.state.modalVisible}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    approveCont: {
        marginBottom: 15
    },
    matchCont: {
        backgroundColor: '#ffffff',
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1
    },
    basicInfoCont: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15
    },
    locationCont: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    TimeCont: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 25,
        marginBottom: 15
    },
    basicInfoTitle: {
        fontSize: 22,
        color: '#000000'
    },
    approveText: {
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold',
        marginLeft: 15
    },
    inviteCont: {
        backgroundColor: '#272727',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15
    },
    appPersonalCont: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        marginRight: 60
    },
    appPersonalText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10
    },
    appTimeCont: {
        paddingLeft: 15
    },
    appTimeText: {
        color: '#E8E8E8'
    },
    photoImg: {
        borderRadius: 30,
        borderWidth: 0,
        width: 60,
        height: 60,
    },
    bottomCont: {
        height: 40,
        backgroundColor: '#323232',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    ignoreCont: {
        width: 120,
        backgroundColor: '#191919',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    acceptCont: {
        width: 170,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f12b2c'
    },
    ignoreText: {
        fontSize: 24,
        color: '#E8E8E8',
        fontStyle: 'italic',
        fontWeight: "bold"
    },
    closeInviteCont: {
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15
    },
    closeAppPersonalCont: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        marginRight: 60
    },
    closeAppPersonalText: {
        fontSize: 16,
        color: '#000000',
        paddingLeft: 15
    },
    closeAppTimeText: {},
    locationText: {
        fontSize: 15,
        color: '#E8E8E8',
        flex: 1,
        marginRight: 10
    },
    timeText: {
        fontSize: 15,
        color: '#E8E8E8'
    },
    invitePersonalCont: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 15
    },
    handleInviteCont: {
        backgroundColor: '#272727',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 15
    },
    titleText: {
        fontSize: 18,
        color: '#E8E8E8',
        fontWeight: 'bold'
    },
    borderLine: {
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1
    },
    acceptSucCont: {
        backgroundColor: '#ffffff',
        width: width - 60,
        borderRadius: 5
    },
    titleCont: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 76,
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1
    },
    titleImage: {
        width: 25,
        height: 25,
        marginRight: 15
    },
    titleText: {
        fontSize: 20,
        color: '#000000'
    },
    matchInfoCont: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginBottom: 30
    },
    playerCont: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 15
    },
    playerImage: {
        width: 25,
        height: 25,
        marginRight: 15
    },
    playerText: {
        flex: 1,
        fontSize: 16
    },
    closeDialogBtn: {
        backgroundColor: '#df3939',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    closeDialogText: {
        fontSize: 18,
        color: '#ffffff'
    }
});
