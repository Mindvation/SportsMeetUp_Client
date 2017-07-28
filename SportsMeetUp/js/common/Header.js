import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Image,
    TouchableOpacity
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

        const languageBtn = this.props.hiddenRightBtn ? null :
            <View style={styles.rightBtnCont}>
                <TouchableOpacity onPress={() => {
                }}>
                    <Text style={styles.rightBtnText}>中文</Text>
                </TouchableOpacity>
            </View>;

        const titleView = this.props.title ? <View style={styles.titleCont}>
            <Text style={styles.titleText}>{this.props.title}</Text></View> : <View style={styles.titleCont}/>;

        return (<View style={styles.header}>
            <View style={styles.leftBtnCont}>
                <TouchableOpacity onPress={this._backToPrevious.bind(this)}>
                    <View style={styles.leftBtnRange}>
                        <Image style={styles.leftBtn}
                               source={require('../../res/images/backbtn_android.png')}></Image>
                    </View>
                </TouchableOpacity>
            </View>
            {titleView}
            {languageBtn}
        </View>)
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        backgroundColor: '#272727'
    },
    leftBtn: {
        width: 25,
        height: 25
    },
    leftBtnCont: {
        position: 'absolute',
        height: 48,
        width: 50,
        top: 0,
        left: 0,
    },
    leftBtnRange: {
        height: 48,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        color: '#E8E8E8',
        fontSize: 17
    },
    rightBtnCont: {
        position: 'absolute',
        right: 15
    },
    rightBtnText: {
        color: '#E8E8E8',
        fontSize: 15
    },
});