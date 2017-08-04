/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Platform,
    Image,
    View,
    Text,
    BackHandler
} from 'react-native';
import Header from '../common/Header';

export default class ScoreCenter extends Component {
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
                <Header navigator={this.props.navigator} title="积分商城" hiddenRightBtn={true}/>
                <View style={styles.centerCont}>
                    <Image source={require('../../res/images/me/no_commodity.png')}
                           style={styles.centerIcon}
                           resizeMode="contain"/>
                    <Text style={styles.firstLine}>商城老板，去“进货”啦......</Text>
                    <Text style={styles.secondLine}>过些天回来请好好收拾“他”</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerCont: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 69
    },
    centerIcon: {
        width: 177,
        height: 111
    },
    firstLine: {
        fontSize: 24,
        marginTop: 19
    },
    secondLine: {
        fontSize: 18,
        marginTop: 9
    }
});