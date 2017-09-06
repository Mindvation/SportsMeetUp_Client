/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native';

const matchs = [{
    "title": "5V5篮球赛",
    "location": "石油大学篮球场",
    "startTime": "2017/7/31 17:30"
},
    {
        "title": "11V11足球赛",
        "location": "西安市雁塔区雁南五路与雁塔南路十字西南 曲江圣卡纳",
        "startTime": "2017/7/31 17:30"
    }];

export default class MatchHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: ""
        };
    }

    selectApplication(index) {
        this.setState({
            selectIndex: index
        })
    }

    render() {
        return (
            <View>
                <ScrollView
                    ref={(scrollView) => {
                        _scrollView = scrollView;
                    }}
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {
                        matchs.map((result, i) => {
                            return <View key={i} style={styles.matchCont}>
                                <View
                                    style={[styles.borderLine, this.state.selectIndex === i ? {display: 'none'} : null]}>
                                    <TouchableOpacity onPress={() => this.selectApplication(i)}>
                                        <View style={styles.closeInviteCont}>
                                            <Text
                                                style={styles.closeAppPersonalText}>{result["startTime"] + "  " + result["title"]}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={[styles.borderLine, this.state.selectIndex === i ? null : {display: 'none'}]}>
                                    <View style={styles.handleInviteCont}>
                                        <View style={styles.invitePersonalCont}>
                                            <Text style={styles.appPersonalText}>{result["title"]}</Text>
                                            <Text style={styles.appTimeText}>时间：{result["startTime"]}</Text>
                                        </View>
                                        <View style={styles.locationCont}>
                                            <Text style={styles.locationText}>地点：{result["location"]}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>;
                        })
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    matchCont: {
        backgroundColor: '#ffffff',
        marginBottom: 15
    },
    borderLine: {
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1
    },
    handleInviteCont: {
        backgroundColor: '#272727',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 15
    },
    closeInviteCont: {
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15
    },
    invitePersonalCont: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 15
    },
    appPersonalText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10
    },
    appTimeText: {
        color: '#E8E8E8'
    },
    locationText: {
        fontSize: 15,
        color: '#E8E8E8',
        flex: 1,
        marginRight: 10
    },
    locationCont: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    closeAppPersonalText: {
        fontSize: 16,
        color: '#000000',
        paddingLeft: 15
    }
});

