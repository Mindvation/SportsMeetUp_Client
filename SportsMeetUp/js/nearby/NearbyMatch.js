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

import AcceptMatch from '../common/AcceptMatch';
import ShareMatch from '../common/ShareMatch';

export default class NearbyMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: "",
            modalVisible: false,
            modalCont: null,
            shareModalVisible: false
        };
    }

    _acceptInvitation() {
        this.setState({
            modalVisible: true
        })
    }

    _shareMatch() {
        this.setState({
            shareModalVisible: true
        })
    }

    render() {
        const {match} = this.props;

        return ( <View>
                <View style={styles.matchInfoCont}>
                    <Image source={require('../../res/images/me/photo.png')}
                           style={styles.photoImg}/>
                    <View style={styles.otherInfoCont}>
                        <Text style={[styles.otherInfoText, {fontSize: 15,color:'#393939'}]}>{match.sponsor}</Text>
                        <Text style={styles.otherInfoText}>{match.time}</Text>
                        <Text style={styles.otherInfoText}>{match.location}</Text>
                        <Text style={[styles.otherInfoText, {
                            marginBottom: 0,
                            textAlign: 'right',
                            paddingRight: 30
                        }]}>{match.distance}</Text>
                    </View>
                </View>
                <View style={styles.handleInviteCont}>
                    <View style={styles.invitePersonalCont}>
                        <Text style={styles.appPersonalText}>{match.sponsor}</Text>
                        <Text style={styles.appTimeText}>{match.time}</Text>
                    </View>
                    <View style={styles.locationCont}>
                        <Text style={styles.locationText}>{match.location}</Text>
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
                        style={styles.acceptCont}>
                        <TouchableOpacity onPress={() => {
                            this._acceptInvitation()
                        }}>
                            <View>
                                <Text
                                    style={styles.ignoreText}> 申请加入 </Text>
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
    shareTitleText: {
        fontSize: 20,
        color: '#000000'
    },
    matchInfoCont: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    otherInfoCont: {
        flex: 1,
        marginTop: 18,
        marginBottom: 18
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
    joinCont: {
        width: 170,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareImg: {
        width: 25,
        height: 25
    },
    joinText: {
        fontSize: 24,
        color: '#E8E8E8',
        fontStyle: 'italic',
        fontWeight: "bold"
    },
    otherInfoText: {
        marginBottom: 10,
        paddingRight: 50
    }
});
