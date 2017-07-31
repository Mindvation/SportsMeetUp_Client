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

export default class MyMatchInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
                {this.props.matchs.map((result, i) => {
                    return <View key={i} style={styles.matchCont}>
                        <View style={styles.basicInfoCont}>
                            <Text style={styles.basicInfoTitle}>{result["title"]}</Text>
                            <View style={styles.rectangle}>
                                <Text style={styles.basicInfoAlert}>即将开始</Text>
                                <View style={styles.triangle}/>
                            </View>
                        </View>
                        <View style={styles.locationCont}>
                            <Text style={styles.locationText}>{result["location"]}</Text>
                            <Text style={styles.dateText}>{result["date"]}</Text>
                        </View>
                        <View style={styles.TimeCont}>
                            <Text style={styles.timeText}>比赛时间：{result["time"]}</Text>
                            <Text style={styles.alertText}>请准时赴约</Text>
                        </View>
                    </View>;
                })}
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
        padding: 15
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
        marginTop: 25,
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
