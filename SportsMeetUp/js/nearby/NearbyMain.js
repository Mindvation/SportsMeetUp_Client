/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @Bob
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Platform,
    View,
    Text
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NearbyDailyMatch from './NearbyDailyMatch';

export default class NearbyMain extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar style={styles.tabBarStyle}
                                                          tabStyle={styles.tabStyle}
                                                          underlineHeight={0}/>}
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    tabBarTextStyle={styles.tabBarTextStyle}
                    tabBarActiveTextColor="#ffffff"
                    tabBarInactiveTextColor="#afaeae"
                    onChangeTab={() => {

                    }}
                >

                    <Text tabLabel="球场"/>
                    <NearbyDailyMatch tabLabel="比赛"/>
                    <Text tabLabel="人员"/>
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
        backgroundColor: '#323232',
    },
    tabStyle: {
        height: 60
    },
    tabBarUnderline: {
        height: 0
    },
    tabBarTextStyle: {
        fontWeight: 'bold',
        fontSize: 20
    }
});
