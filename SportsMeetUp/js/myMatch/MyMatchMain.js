/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @Bob
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Platform,
    View,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import MyInvite from './MyInvite';
import MyMatch from './MyMatch';
import Header from '../common/Header';

export default class MyMatchMain extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <View style={styles.container}>
                <Header title="比赛" hiddenLeftBtn={true} hiddenRightBtn={true}/>
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
                    <MyMatch tabLabel="我的比赛"/>
                    <MyInvite tabLabel="我的邀请"/>

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
