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
    TouchableOpacity
} from 'react-native';

export default class ApplicationInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: "",
            app: props.application
        };
    }

    selectApplication(index) {
        this.setState({
            selectIndex: index
        })
    }

    _ignoreApp(index) {
        let application = this.state.app;
        application.apps.splice(index, 1);
        this.setState({
            app: application,
            selectIndex: ""
        })
    }

    _acceptApp(index) {
        let application = this.state.app;
        application.apps.splice(index, 1);
        this.setState({
            app: application,
            selectIndex: ""
        })
    }

    render() {
        return ( <View style={styles.approveCont}>
                <View style={styles.matchCont}>
                    <View style={styles.basicInfoCont}>
                        <Text style={styles.basicInfoTitle}>{this.state.app["title"]}</Text>
                        <Text style={styles.timeText}>{this.state.app["time"]}</Text>
                    </View>
                    <View style={styles.locationCont}>
                        <Text style={styles.locationText}>地点：{this.state.app["location"]}</Text>
                        <Text style={styles.approveText}>{this.state.app["apps"].length}条申请</Text>
                    </View>
                </View>
                {this.state.app["apps"].map((app, k) => {
                    return <View key={k}>
                        <View style={[styles.borderLine, this.state.selectIndex === k ? null : {display: 'none'}]}>
                            <View style={styles.inviteCont}>
                                <View style={styles.appPersonalCont}>
                                    <Image source={require('../../res/images/me/photo.png')}
                                           style={styles.photoImg}/>
                                    <Text style={styles.appPersonalText}>{app["applicant"]}发来一个比赛申请</Text>
                                </View>
                                <View style={styles.appTimeCont}>
                                    <Text style={styles.appTimeText}>{app["time"]}</Text>
                                </View>
                            </View>
                            <View style={styles.bottomCont}>
                                <View style={styles.ignoreCont}>
                                    <TouchableOpacity onPress={() => {
                                        this._ignoreApp(k)
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
                                        this._acceptApp(k)
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
                                            style={styles.closeAppPersonalText}>{app["applicant"]}发来一个比赛申请</Text>
                                    </View>
                                    <View style={styles.appTimeCont}>
                                        <Text style={styles.closeAppTimeText}>{app["time"]}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                })}
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
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 15
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
    locationText: {
        fontSize: 15,
        flex: 1
    },
    timeText: {
        fontSize: 15
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
        fontSize: 16,
        color: '#ffffff',
        paddingLeft: 15
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
    borderLine: {
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1
    }
});
