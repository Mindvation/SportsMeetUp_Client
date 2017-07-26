import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    TouchableWithoutFeedback
} from 'react-native';

export default class ModalConpt extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _backToPrevious() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    render() {

        return (<View style={styles.header}>
            <TouchableWithoutFeedback onPress={this._backToPrevious.bind(this)}>
                <Image style={{width: 25, height: 25}}
                       source={require('../../res/images/backbtn_android.png')}></Image>
            </TouchableWithoutFeedback>
            <View style={styles.headerText}/>
            <TouchableWithoutFeedback onPress={() => {
            }}>
                <View><Text style={styles.rightBtnText}>中文</Text></View>
            </TouchableWithoutFeedback>
        </View>)
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        backgroundColor: '#272727',
        paddingLeft: 15,
        paddingRight: 15
    },
    headerText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightBtnText: {
        color: '#E8E8E8',
        fontSize: 15
    },
});