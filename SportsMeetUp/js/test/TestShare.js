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

export default class TestShareMe extends Component {

    constructor(props) {
        super(props);

        this._shareMessage = this._shareMessage.bind(this);
        this._shareText = this._shareText.bind(this);
        this._showResult = this._showResult.bind(this);

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
                                    onPress={this._shareText}>
                    <View style={styles.button}>
                        <Text>Click to share message, URL and title</Text>
                    </View>
                </TouchableOpacity>
                <Text>{this.state.result}</Text>
            </View>
        );
    }

    _shareMessage() {
        Share.share({
            message: 'React Native | A framework for building native apps using React'
        })
            .then(this._showResult)
            .catch((error) => this.setState({result: 'error: ' + error.message}));
    }

    _shareText() {
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

    _showResult(result) {
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                this.setState({result: 'shared with an activityType: ' + result.activityType});
            } else {
                this.setState({result: 'shared'});
            }
        } else if (result.action === Share.dismissedAction) {
            this.setState({result: 'dismissed'});
        }
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