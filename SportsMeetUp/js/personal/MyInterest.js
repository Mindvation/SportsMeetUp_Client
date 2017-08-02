/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Dimensions
} from 'react-native';

const {width} = Dimensions.get('window');

export default class MyInterest extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.interestInfo}>
                {this.props.myTags.map((result, i) => {
                    return <View key={i}>
                        {mapping[result]}
                    </View>;
                })}
                <TouchableOpacity onPress={() => this.props.edit()}>
                    < View style={[styles.interestIconCont, {backgroundColor: '#ffff'}]}>
                        <Image source={require('../../res/images/me/add.png')}
                               style={styles.interestIcon}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    interestInfo: {
        width: width,
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingLeft: 30,
        paddingBottom: 30,
        paddingTop: 15,
        paddingRight: 30 - 9
    },
    interestIcon: {
        height: 25,
        width: 25
    },
    interestIconCont: {
        width: (width - 60 - 27) / 4,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 9,
        marginTop: 15,
        opacity: 0.9
    }
});

const basketBallImg = <View style={[styles.interestIconCont, {backgroundColor: '#f8bb1b'}]}>
        <Image source={require('../../res/images/me/basketball.png')}
               style={styles.interestIcon}/>
    </View>
;
const footBallImg =
    <View style={[styles.interestIconCont, {backgroundColor: '#58c80d'}]}>
        <Image source={require('../../res/images/me/football.png')}
               style={styles.interestIcon}/>
    </View>
;
const tennisImg =
    <View style={[styles.interestIconCont, {backgroundColor: '#17c6ab'}]}>
        <Image source={require('../../res/images/me/tennis.png')}
               style={styles.interestIcon}/>
    </View>
;
const badmintonImg =
    <View style={[styles.interestIconCont, {backgroundColor: '#5e8dc3'}]}>
        <Image source={require('../../res/images/me/badminton.png')}
               style={styles.interestIcon}/>
    </View>
;
const volleyballImg =
    <View style={[styles.interestIconCont, {backgroundColor: '#a18f59'}]}>
        <Image source={require('../../res/images/me/volleyball.png')}
               style={styles.interestIcon}/>
    </View>
;
const billiardImg =
    <View style={[styles.interestIconCont, {backgroundColor: '#4a4b4a'}]}>
        <Image source={require('../../res/images/me/billiard.png')}
               style={styles.interestIcon}/>
    </View>
;
const pingPangImg =
    <View style={[styles.interestIconCont, {backgroundColor: '#e44716'}]}>
        <Image source={require('../../res/images/me/pingpang.png')}
               style={styles.interestIcon}/>
    </View>
;
const bowlingImg =
    <View style={[styles.interestIconCont, {backgroundColor: '#c942c7'}]}>
        <Image source={require('../../res/images/me/bowling.png')}
               style={styles.interestIcon}/>
    </View>
;

const mapping = {
    "basketBall": basketBallImg,
    "footBall": footBallImg,
    "tennis": tennisImg,
    "badminton": badmintonImg,
    "volleyball": volleyballImg,
    "billiard": billiardImg,
    "pingPang": pingPangImg,
    "bowling": bowlingImg
};