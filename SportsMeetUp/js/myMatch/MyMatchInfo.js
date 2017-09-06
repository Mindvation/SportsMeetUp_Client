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
} from 'react-native';
import {matchTypeMapping, sportTypeMapping} from '../data/Mapping';

export default class MyMatchInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        //const test = [{"date":"2017-09-28","startTime":"2017-09-28 14:46:28","endTime":"2017-09-28 14:44:18","matchType":"5","fieldType":"080104","totalNumber":"10","joinedAmmount":4,"address":"兴庆南路135号"}];
        const {match} = this.props;
        return ( <View style={styles.matchCont}>
                <View style={styles.basicInfoCont}>
                    <Text
                        style={styles.basicInfoTitle}>{matchTypeMapping[match["matchType"]] + " " + sportTypeMapping[match["fieldType"]]}</Text>
                    <View style={styles.rectangle}>
                        <Text style={styles.basicInfoAlert}>即将开始</Text>
                        <View style={styles.triangle}/>
                    </View>
                </View>
                <View style={styles.locationCont}>
                    <Text style={styles.locationText}>{match["address"]}</Text>
                    <Text style={styles.dateText}>{match["date"]}</Text>
                </View>
                <View style={styles.TimeCont}>
                    <Text style={styles.timeText}>比赛时间：{match["startTime"]}</Text>
                    <Text style={styles.alertText}>请准时赴约</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    matchCont: {
        backgroundColor: '#ffffff',
        marginBottom: 15
    },
    basicInfoCont: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 5
    },
    locationCont: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15
    },
    TimeCont: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 15,
        marginBottom: 15
    },
    basicInfoTitle: {
        fontSize: 22,
        color: '#000000'
    },
    basicInfoAlert: {
        fontSize: 12,
        color: '#ffffff',
        paddingLeft: 10,
        paddingRight: 15
    },
    rectangle: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 20,
        backgroundColor: 'red'
    },
    triangle: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 0,
        height: 0,
        borderBottomWidth: 10,
        borderBottomColor: 'red',
        borderRightWidth: 5,
        borderRightColor: '#ffffff',
        borderLeftWidth: 0,
        borderTopWidth: 10,
        borderTopColor: 'red',
    },
    locationText: {
        fontSize: 15
    },
    dateText: {
        fontSize: 15
    },
    timeText: {
        fontSize: 15
    },
    alertText: {
        fontSize: 15,
        color: '#000000'
    }
});
