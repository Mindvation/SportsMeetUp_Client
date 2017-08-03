/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Platform,
    TouchableOpacity,
    Image,
    View,
    Dimensions,
    Text,
    BackHandler
} from 'react-native';
import Header from '../common/Header';

const {width} = Dimensions.get('window');

export default class AddTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myTags: props.myTags
        };
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

    _selectTags() {
        const {navigator} = this.props;
        this.props.getTags(this.state.myTags);
        if (navigator) {
            navigator.jumpBack();
        }
    }

    updateTags(tag) {
        let tags = this.state.myTags;
        tags.indexOf(tag) > -1 ? tags.splice(tags.indexOf(tag), 1) : tags.push(tag);
        this.setState({
            myTags: tags
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Header navigator={this.props.navigator} title="标签添加" hiddenRightBtn={true}/>
                <View style={styles.tagsCont}>
                    {tags.map((result, i) => {
                        return <View style={{alignItems: 'center'}} key={i}>
                            <TouchableOpacity onPress={() => this.updateTags(result["species"])}>
                                <View style={[styles.itemCont, i % 4 === 3 ? {marginRight: 0} : null]}>
                                    {result["image"]}
                                    {this.state.myTags.indexOf(result["species"]) > -1 ? addedImg
                                        : null}
                                </View>
                            </TouchableOpacity>
                            <Text
                                style={[styles.tagsText, i % 4 === 3 ? null : {marginRight: 30}]}>{result["text"]}</Text>
                        </View>;
                    })}
                </View>
                <View style={styles.submitBtnCont}>
                    <TouchableOpacity
                        onPress={() => {
                            this._selectTags()
                        }}
                        style={styles.submitButton}
                    >
                        <Text style={styles.submitText}>提 交</Text>
                    </TouchableOpacity>
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
    tagsCont: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 15,
        paddingRight: 15,
    },
    itemCont: {
        width: (width - 30 - 90) / 4,
        marginRight: 30,
        marginTop: 30,
        paddingTop: 5,
        paddingLeft: 5
    },
    interestIcon: {
        height: 25,
        width: 25
    },
    interestIconCont: {
        width: (width - 30 - 90 - 20) / 4,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        opacity: 0.9,
    },
    addedIcon: {
        position: 'absolute',
        width: 15,
        height: 15
    },
    submitBtnCont: {
        flexDirection: 'row',
        marginTop: 44,
        paddingLeft: 15,
        paddingRight: 15
    },
    submitButton: {
        backgroundColor: '#f12b2c',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRadius: 5
    },
    submitText: {
        color: '#ffffff',
        fontSize: 17
    },
    tagsText: {
        marginTop: 5,
        color: '#000000'
    }
});

const basketBallImg = <View style={[styles.interestIconCont, {backgroundColor: '#f8bb1b'}]}>
    <Image source={require('../../res/images/me/basketball.png')}
           style={styles.interestIcon}/>
</View>;
const footBallImg = <View style={[styles.interestIconCont, {backgroundColor: '#58c80d'}]}>
    <Image source={require('../../res/images/me/football.png')}
           style={styles.interestIcon}/>
</View>;
const tennisImg = <View style={[styles.interestIconCont, {backgroundColor: '#17c6ab'}]}>
    <Image source={require('../../res/images/me/tennis.png')}
           style={styles.interestIcon}/>
</View>;
const badmintonImg = <View style={[styles.interestIconCont, {backgroundColor: '#5e8dc3'}]}>
    <Image source={require('../../res/images/me/badminton.png')}
           style={styles.interestIcon}/>
</View>;
const volleyballImg = <View style={[styles.interestIconCont, {backgroundColor: '#a18f59'}]}>
    <Image source={require('../../res/images/me/volleyball.png')}
           style={styles.interestIcon}/>
</View>;
const billiardImg = <View style={[styles.interestIconCont, {backgroundColor: '#4a4b4a'}]}>
    <Image source={require('../../res/images/me/billiard.png')}
           style={styles.interestIcon}/>
</View>;
const pingPangImg = <View style={[styles.interestIconCont, {backgroundColor: '#e44716'}]}>
    <Image source={require('../../res/images/me/pingpang.png')}
           style={styles.interestIcon}/>
</View>;
const bowlingImg = <View style={[styles.interestIconCont, {backgroundColor: '#c942c7'}]}>
    <Image source={require('../../res/images/me/bowling.png')}
           style={styles.interestIcon}/>
</View>;

const addedImg = <Image source={require('../../res/images/me/added.png')}
                        style={styles.addedIcon}/>;

const tags = [
    {
        "species": "basketBall",
        "image": basketBallImg,
        "text": "篮球"
    }, {
        "species": "footBall",
        "image": footBallImg,
        "text": "足球"
    }, {
        "species": "tennis",
        "image": tennisImg,
        "text": "网球"
    }, {
        "species": "badminton",
        "image": badmintonImg,
        "text": "羽毛球"
    }, {
        "species": "volleyball",
        "image": volleyballImg,
        "text": "排球"
    }, {
        "species": "billiard",
        "image": billiardImg,
        "text": "台球"
    }, {
        "species": "pingPang",
        "image": pingPangImg,
        "text": "乒乓球"
    }, {
        "species": "bowling",
        "image": bowlingImg,
        "text": "保龄球"
    }
]