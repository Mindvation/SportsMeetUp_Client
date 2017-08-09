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
                        <Text style={[styles.otherInfoText, {fontSize: 18,color:'#393939'}]}>{match.sponsor}</Text>
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
                        <Text style={styles.appPersonalText}>{match.title}</Text>
                        <View style={styles.teamBlue}>
                            <Image source={require('../../res/images/matchInfo/team_blue.png')}/>
                            <Text>3/5</Text>
                        </View>
                        <View style={styles.teamRed}>
                            <Image source={require('../../res/images/matchInfo/team_red.png')}/>
                            <Text>3/5</Text>
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
        alignItems: 'center',
        backgroundColor: '#f12b2c'
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
    invitePersonalCont: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginBottom: 15
    },
    handleInviteCont: {
        backgroundColor: '#272727',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: 15
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
    }
});
