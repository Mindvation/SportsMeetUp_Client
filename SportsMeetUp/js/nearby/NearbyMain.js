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
    Dimensions
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NearbyDailyMatch from './NearbyDailyMatch';
import NearbyField from "./NearbyField";

const {width} = Dimensions.get('window');

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
                    <NearbyDailyMatch tabLabel="比赛"/>
                    <NearbyField tabLabel="球场"/>
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
        width: width
    },
    tabStyle: {
        height: 60,
        width: width / 2
    },
    tabBarUnderline: {
        height: 0
    },
    tabBarTextStyle: {
        fontWeight: 'bold',
        fontSize: 20
    }
});
