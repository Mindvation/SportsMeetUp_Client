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
    Alert
} from 'react-native';
import AcceptMatch from '../common/AcceptMatch';
import ShareMatch from '../common/ShareMatch';
import {matchTypeMapping, sportTypeMapping} from '../data/Mapping';
import FetchUtil from '../util/FetchUtil';
import Overlay from '../common/Overlay';

export default class NearbyMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: "",
            modalVisible: false,
            modalCont: null,
            shareModalVisible: false,
            overlayVisible: false
        };
    }

    _acceptInvitation(matchInfo, status) {
        const {update} = this.props;
        if (status === "y") {
            Alert.alert(
                "提示",
                "您已加入该比赛!",
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            );
            return;
        }

        if (matchInfo.joinedAmmount === matchInfo.totalNumber) {
            Alert.alert(
                "提示",
                "该比赛人数已满!",
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            );
            return;
        }

        const options = {
            "url": '8086/sports-meetup-papi/matches/joinMatch',
            "params": {
                "matchId": matchInfo.matchId,
                "userId": globalUserInfo.userId
            }
        };

        this.setState({
            overlayVisible: true,
        });

        FetchUtil.post(options).then((res) => {
            update && update(res.responseBody);

            this.setState({
                overlayVisible: false,
                modalVisible: true
            })

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

    _shareMatch() {
        this.setState({
            shareModalVisible: true
        })
    }

    getUserStatusInMatch(creator, appUsers) {
        let status = 'n';
        if (creator && creator.createdId === globalUserInfo.userId) {
            return 'y';
        }
        appUsers.some((appUser) => {
            if (appUser.userId === globalUserInfo.userId) {
                status = appUser.applyResult;
                return true;
            }
        });
        return status;
    }

    render() {
        const {match} = this.props;
        const status = this.getUserStatusInMatch(match.createdUserInfo, match.appliedUsersInfo);

        return ( <View>
                <View style={styles.matchInfoCont}>
                    <Image source={match.icon ? match.icon : require('../../res/images/me/photo.png')}
                           style={styles.photoImg}/>
                    <View style={styles.otherInfoCont}>
                        <Text style={[styles.otherInfoText, {fontSize: 18, color: '#393939'}]}>{match.name}</Text>
                        <Text style={styles.otherInfoText}>{match.startTime + " - " + match.endTime}</Text>
                        <Text style={[styles.otherInfoText, {marginBottom: 5}]}>{match.address}</Text>
                        <Text style={[styles.otherInfoText, {
                            marginBottom: 0,
                            textAlign: 'right',
                            paddingRight: 30
                        }]}>{match.distance + " km"}</Text>
                    </View>
                </View>
                <View style={styles.handleInviteCont}>
                    <Text
                        style={styles.appPersonalText}>{matchTypeMapping[match.matchType] + " " + sportTypeMapping[match.fieldType]}</Text>
                    <View style={styles.teamCont}>
                        <Image style={styles.teamImg} source={require('../../res/images/matchInfo/team_blue.png')}/>
                        <View style={{flexDirection: 'row'}}>
                            <Text
                                style={{
                                    fontSize: 15, color: '#f5f5f5',
                                    textAlignVertical: 'bottom'
                                }}>{match.blueTeam}/</Text>
                            <Text style={{
                                fontSize: 13,
                                color: '#d7d7d7',
                                textAlignVertical: 'bottom'
                            }}>{match.totalNumber / 2}</Text>
                        </View>
                    </View>
                    <View style={styles.teamCont}>
                        <Image style={styles.teamImg} source={require('../../res/images/matchInfo/team_red.png')}/>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{
                                fontSize: 15, color: '#f5f5f5',
                                textAlignVertical: 'bottom'
                            }}>{match.redTeam}/</Text>
                            <Text style={{
                                fontSize: 13,
                                color: '#d7d7d7',
                                textAlignVertical: 'bottom'
                            }}>{match.totalNumber / 2}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomCont}>
                    <View style={styles.shareCont}>
                        <TouchableOpacity onPress={() => this._shareMatch()}>
                            <View style={styles.sharePressRange}>
                                <Image style={styles.shareImg}
                                       source={require('../../res/images/matchInfo/share.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[styles.acceptCont, {backgroundColor: status === "y" ? "#f1a025" : '#f12b2c'}]}>
                        <TouchableOpacity onPress={() => {
                            this._acceptInvitation(match, status)
                        }}>
                            <View>
                                <Text
                                    style={styles.ignoreText}> {status === "y" ? " 已加入 " : " 申请加入 "} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <AcceptMatch
                    data={match}
                    closeHandle={() => {
                        this.setState({
                            modalVisible: false
                        })
                    }}
                    modalVisible={this.state.modalVisible}
                />
                <ShareMatch
                    closeHandle={() => {
                        this.setState({
                            shareModalVisible: false
                        })
                    }}
                    modalVisible={this.state.shareModalVisible}/>
                <Overlay
                    allowClose={false}
                    modalVisible={this.state.overlayVisible}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    approveCont: {
        marginBottom: 15
    },
    locationCont: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    appPersonalText: {
        fontSize: 18,
        color: '#ffffff',
        marginRight: 10
    },
    appTimeText: {
        color: '#E8E8E8'
    },
    photoImg: {
        borderRadius: 40,
        borderWidth: 0,
        width: 80,
        height: 80,
        marginLeft: 15,
        marginTop: 22,
        marginRight: 22,
        marginBottom: 22
    },
    bottomCont: {
        height: 40,
        backgroundColor: '#323232',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    acceptCont: {
        width: 170,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
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
    handleInviteCont: {
        backgroundColor: '#272727',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15
    },
    titleText: {
        fontSize: 18,
        color: '#E8E8E8',
        fontWeight: 'bold'
    },
    matchInfoCont: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    otherInfoCont: {
        flex: 1,
        marginTop: 18,
        marginBottom: 5
    },
    shareCont: {
        width: 120,
        backgroundColor: '#191919',
        height: 40,
    },
    sharePressRange: {
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareImg: {
        width: 25,
        height: 25
    },
    otherInfoText: {
        marginBottom: 10,
        paddingRight: 50
    },
    ignoreText: {
        fontSize: 24,
        color: '#E8E8E8',
        fontStyle: 'italic',
        fontWeight: "bold"
    },
    teamCont: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30
    },
    teamImg: {
        width: 32,
        height: 24
    }
});
