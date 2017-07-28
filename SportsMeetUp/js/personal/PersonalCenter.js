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
    Dimensions
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

const {width} = Dimensions.get('window');

export default class PersonalCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(scrollView) => {
                        _scrollView = scrollView;
                    }}
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{flex: 1}}
                >
                    <View style={styles.personalInfo}>
                        <Image source={require('../../res/images/matchInfo/backImg.png')}
                               style={styles.bgImage}
                        />
                        <View style={styles.basicInfo}></View>
                        <View style={styles.interestInfo}>
                            <View style={styles.interestIcon}/>
                        </View>
                    </View>
                    <ScrollableTabView
                        renderTabBar={() => <ScrollableTabBar style={styles.tabBarStyle}
                                                              tabStyle={styles.tabStyle}
                                                              underlineHeight={0}/>}
                        tabBarUnderlineStyle={styles.tabBarUnderline}
                        tabBarTextStyle={styles.tabBarTextStyle}
                        tabBarActiveTextColor="#ffffff"
                        tabBarInactiveTextColor="#afaeae"
                    >
                        <View style={{height: 700,backgroundColor: 'red'}} tabLabel="我的邀请">
                        <Text >123123</Text>
                        </View>
                        <Text tabLabel="我的比赛"></Text>
                        <Text tabLabel="其他设置"></Text>
                    </ScrollableTabView>
                </ScrollView>
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
    tabBarUnderline: {
        height: 0
    },
    tabBarTextStyle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    bgImage: {
        resizeMode: 'stretch',
        width: null,
        height: null,
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        top: 0
    },
    personalInfo: {
        height: 350,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    basicInfo: {
        flex: 1,
        width: width,
        backgroundColor: 'yellow'
    },
    interestInfo: {
        flex: 1,
        width: width,
        backgroundColor: 'green'
    },
    interestIcon: {

    }
});
