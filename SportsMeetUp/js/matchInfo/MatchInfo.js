/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @Bob
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    BackHandler,
    Platform,
    View
} from 'react-native';
import Header from '../common/Header';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import DailyMatch from './DailyMatch';
import CommonUtil from '../util/CommonUtil';

export default class MatchInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _getTabDate() {
        let todayDate = new Date();
        let firstDay = new Date();
        let secondDay = new Date(todayDate.setDate(todayDate.getDate() + 1));
        let thirdDay = new Date(todayDate.setDate(todayDate.getDate() + 1));

        return [
            {
                "date": firstDay,
                "value": CommonUtil.dateFormat(firstDay, "M月d日")
            },
            {
                "date": secondDay,
                "value": CommonUtil.dateFormat(secondDay, "M月d日")
            },
            {
                "date": thirdDay,
                "value": CommonUtil.dateFormat(thirdDay, "M月d日")
            }
        ]

    }

    render() {
        const matchDate = this._getTabDate();
        return (
            <View style={styles.container}>
                <Header navigator={this.props.navigator} title="比赛信息" hiddenRightBtn={true}/>
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar style={styles.tabBarStyle}
                                                          tabStyle={styles.tabStyle}
                                                          underlineHeight={0}/>}
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    tabBarTextStyle={styles.tabBarTextStyle}
                    tabBarActiveTextColor="#ffffff"
                    tabBarInactiveTextColor="#afaeae"
                >
                    {matchDate.map((result, i) => {
                        return <DailyMatch key={i} matchDate={result} tabLabel={result.value}/>
                    })}
                </ScrollableTabView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabBarStyle: {
        height: 60,
        borderWidth: 0,
        backgroundColor: '#272727',
    },
    tabStyle: {
        height: 60
    },
    tabBarUnderline:{
        height: 0
    },
    tabBarTextStyle:{
        fontWeight: 'bold',
        fontSize: 20
    }
});
