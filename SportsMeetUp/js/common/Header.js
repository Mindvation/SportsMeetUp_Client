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

        const languageBtn = this.props.hiddenRightBtn ? null : <TouchableWithoutFeedback onPress={() => {
        }}>
            <View style={styles.rightBtnCont}><Text style={styles.rightBtnText}>中文</Text></View>
        </TouchableWithoutFeedback>;

        const titleView = this.props.title ? <View style={styles.titleCont}>
            <Text style={styles.titleText}>{this.props.title}</Text></View> : <View style={styles.titleCont}/>;

        return (<View style={styles.header}>
            <TouchableWithoutFeedback onPress={this._backToPrevious.bind(this)}>
                <Image style={styles.leftBtn}
                       source={require('../../res/images/backbtn_android.png')}></Image>
            </TouchableWithoutFeedback>
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
    leftBtn:{
        position: 'absolute',
        left: 15,
        width: 25,
        height: 25
    },
    titleCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText:{
        color: '#E8E8E8',
        fontSize: 17
    },
    rightBtnCont:{
        position: 'absolute',
        right: 15
    },
    rightBtnText: {
        color: '#E8E8E8',
        fontSize: 15
    },
});