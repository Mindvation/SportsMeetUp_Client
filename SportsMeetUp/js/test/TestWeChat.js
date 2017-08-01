/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @Bob
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Share,
} from 'react-native';

import WeChat from 'react-native-wechat';

export default class TestWeChat extends Component {

    constructor(props) {
        super(props);

        this._shareMessage = this._shareMessage.bind(this);
        this._shareText = this._shareText.bind(this);

        this.state = {
            result: ''
        };
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.wrapper}
                                    onPress={this._shareMessage}>
                    <View style={styles.button}>
                        <Text>Click to share message</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.wrapper}
                                    onPress={this._shareImage.bind(this)}>
                    <View style={styles.button}>
                        <Text>Click to share Image</Text>
                    </View>
                </TouchableOpacity>
                <Text>{this.state.result}</Text>
            </View>
        );
    }

    async _shareMessage() {
        // Code example to share text message:
        try {
            let result = await WeChat.shareToTimeline({
                type: 'text',
                description: 'hello, wechat'
            });

            this.setState({
                result: 'share text message to time line successful:' + result
            })
        } catch (e) {
            if (e instanceof WeChat.WechatError) {
                console.error(e.stack);
            } else {
                throw e;
            }
        }
    }

    async _shareImage(){
        try {
            let result = await WeChat.shareToTimeline({
                type: 'imageUrl',
                title: 'web image',
                description: 'share web image to time line',
                mediaTagName: 'email signature',
                messageAction: undefined,
                messageExt: undefined,
                imageUrl: 'http://www.ncloud.hk/email-signature-262x100.png'
            });
            console.log('share image url to time line successful:', result);
        } catch (e) {
            if (e instanceof WeChat.WechatError) {
                console.error(e.stack);
            } else {
                throw e;
            }
        }
    }

    async _shareText() {
        Share.share({
            message: 'A framework for building native apps using React',
            url: 'http://facebook.github.io/react-native/',
            title: 'React Native'
        }, {
            dialogTitle: 'Share React Native website',
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ],
            tintColor: 'green'
        })
            .then(this._showResult)
            .catch((error) => this.setState({result: 'error: ' + error.message}));
    }
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 5,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#eeeeee',
        padding: 10,
    },
});