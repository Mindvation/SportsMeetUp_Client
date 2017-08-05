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
    Image,
    View,
} from 'react-native';
import Security from "./Security";
import ScoreCenter from './ScoreCenter';
import Feedback from "./Feedback";

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.goToScore = this.goToScore.bind(this);
        this.goToSecurity = this.goToSecurity.bind(this);
        this.goToFeedback = this.goToFeedback.bind(this);
        this.state = {};
    }

    goToScore() {
        const {navigator} = this.props;
        navigator.push({
            component: ScoreCenter,
            name: 'ScoreCenter',
            params: {

            }
        });
    }

    goToFeedback() {
        const {navigator} = this.props;
        navigator.push({
            component: Feedback,
            name: 'Feedback',
            params: {

            }
        });
    }

    goToSecurity(){
        const {navigator} = this.props;
        navigator.push({
            component: Security,
            name: 'SecurityPage',
            params: {

            }
        });
    }

    render() {
        const socreImg = <Image source={require('../../res/images/me/statement.png')}
                                style={styles.settingIcon}/>;
        const security = <Image source={require('../../res/images/me/security.png')}
                                style={styles.settingIcon}/>;
        const helpImg = <Image source={require('../../res/images/me/help.png')}
                               style={styles.settingIcon}/>;

        const settingItems = [
            {
                "image": socreImg,
                "text": "个人积分",
                "event": this.goToScore
            },
            {
                "image": security,
                "text": "账号安全",
                "event": this.goToSecurity
            },
            {
                "image": socreImg,
                "text": "协议声明",
                "event": this.goToScore
            },
            {
                "image": helpImg,
                "text": "帮助反馈",
                "event": this.goToFeedback
            },
        ];

        return (
            <View style={styles.settingCont}>
                {settingItems.map((result, i) => {
                    return <View key={i}>
                        <TouchableOpacity onPress={result["event"]}>
                            <View style={styles.itemCont}>
                                {result["image"]}
                                <Text style={styles.settingText}>
                                    {result["text"]}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>;
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    settingCont: {
        flex: 1
    },
    itemCont: {
        height: 75,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderColor: '#dedfe0'
    },
    settingIcon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    settingText: {
        fontSize: 18,
        color: '#000000'
    }
});
