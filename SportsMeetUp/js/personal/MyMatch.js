/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    View,
    Image
} from 'react-native';

const {width} = Dimensions.get('window');

import MyMatchInfo from './MyMatchInfo';

const matchs = [
    {
        "title": "5V5篮球赛",
        "date": "2017/7/31",
        "location": "石油大学篮球场",
        "time": "17:30 - 19:30"
    },
    {
        "title": "1V1乒乓球赛",
        "date": "2017/7/31",
        "location": "北京大学乒乓球场",
        "time": "17:30 - 19:30"
    },
    {
        "title": "11V11足球赛",
        "date": "2017/7/31",
        "location": "陕西省体育场",
        "time": "17:30 - 19:30"
    },
];

export default class MyMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '123123'
        };
    }

    render() {
        return (
            <View style={styles.myMatchCont}>
                <MyMatchInfo matchs={matchs}/>
                <View style={styles.approveCont}>
                    <View style={styles.matchCont}>
                        <View style={styles.basicInfoCont}>
                            <Text style={styles.basicInfoTitle}>3V3篮球赛</Text>
                            <Text style={styles.timeText}>2017/7/31 19:20</Text>
                        </View>
                        <View style={styles.locationCont}>
                            <Text style={styles.locationText}>地点：西安市雁塔区雁南五路与雁塔南路十字西南 曲江圣卡纳</Text>
                            <Text style={styles.approveText}>3条申请</Text>
                        </View>
                    </View>
                    <View style={styles.inviteCont}>
                        <Text>Frank发来一个比赛申请</Text>
                    </View>
                    <View style={styles.bottomCont}>
                        <View style={styles.ignoreCont}>
                            <TouchableOpacity onPress={()=>{}}>
                                <View>
                                    <Text
                                        style={styles.ignoreText}> 忽略 </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={styles.acceptCont}>
                            <TouchableOpacity onPress={()=>{}}>
                                <View>
                                    <Text
                                        style={styles.ignoreText}> 接受邀请 </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    myMatchCont: {
        flex: 1
    },
    matchCont: {
        backgroundColor: '#ffffff',
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
    inviteCont:{
        height: 80,
        backgroundColor: '#272727',
        justifyContent: 'center',
        alignItems: 'center',
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
    }
});
