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
    Platform,
    View
} from 'react-native';

import DataUtil from '../util/DataUtil';

import ModalConpt from '../common/ModalConpt';

export default class Guide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
    }

    nextGuide() {
        let index = this.state.index + 1;
        this.setState({
            index: index
        });

        if (index > 2) {
            DataUtil.saveData("notFirstUse", true)
        }
    }

    render() {
        const guide_first = <View style={styles.guideCont}>
            <Image source={require('../../res/images/guide/guide_first.png')}/>
            <TouchableOpacity
                onPress={() => {
                    this.nextGuide();
                }}
            >
                <Image source={require('../../res/images/guide/know.png')}/>
            </TouchableOpacity>
        </View>;
        const guide_second = <View style={styles.guideCont}>
            <Image source={require('../../res/images/guide/guide_second.png')}/>
            <TouchableOpacity
                onPress={() => {
                    this.nextGuide();
                }}
            >
                <Image source={require('../../res/images/guide/know.png')}/>
            </TouchableOpacity>
        </View>;
        const guide_third = <View style={styles.guideCont}>
            <Image source={require('../../res/images/guide/guide_third.png')}/>
            <TouchableOpacity
                onPress={() => {
                    this.nextGuide();
                }}
            >
                <Image source={require('../../res/images/guide/know.png')}/>
            </TouchableOpacity>
        </View>;

        const modalArr = [guide_first, guide_second, guide_third];
        return (
            <ModalConpt
                opacity={0.85}
                style={styles.container}
                allowClose={false}
                modalCont={modalArr[this.state.index]}
                modalVisible={this.state.index < 3}
            />
        );
    }
}

const styles = StyleSheet.create({
    guideCont: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 100
    }
});
