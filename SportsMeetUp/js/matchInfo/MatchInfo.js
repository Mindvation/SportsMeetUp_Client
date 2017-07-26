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
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import MatchDetail from './MatchDetail';

export default class MatchInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    onBackAndroid = () => {
        const {navigator} = this.props;
        const routers = navigator.getCurrentRoutes();
        console.log('当前路由长度：' + routers.length);
        if (routers.length > 1) {
            navigator.pop();
            return true;//接管默认行为
        }
        return false;//默认行为
    };

    render() {
        return (
            <View style={styles.container}>
                <Header navigator={this.props.navigator} title="比赛信息" hiddenRightBtn={true}/>
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar style={{height: 40,borderWidth:0,elevation:2}} tabStyle={{height: 39}}
                                                          underlineHeight={2}/>}>
                    <Text tabLabel='Tab1'/>
                    <MatchDetail tabLabel='Tab2'/>
                    <Text tabLabel='Tab3'/>
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
    }
});
