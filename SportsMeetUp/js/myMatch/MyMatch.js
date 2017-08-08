/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView
} from 'react-native';

import MyMatchInfo from './MyMatchInfo';
import MyApplication from './MyApplication';

const matches = [
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
                <ScrollView
                    ref={(scrollView) => {
                        _scrollView = scrollView;
                    }}
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <MyMatchInfo matches={matches}/>
                    {/*<MyApplication/>*/}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    myMatchCont: {
        flex: 1
    }
});
