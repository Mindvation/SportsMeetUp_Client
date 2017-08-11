/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import CommonUtil from '../util/CommonUtil';

import FieldInfo from './FieldInfo';
import Filter from '../common/Filter';

const {width} = Dimensions.get('window');

const fields = [
    {
        "type": "足球场",
        "location": "西安市雁塔区雁南五路与雁塔南路十字西南 曲江圣卡纳",
        "weekTime": "9:00 - 21:00",
        "weekendTime": "8:00 - 22:00",
        "cost": 30,
        "distance": "31m"
    }, {
        "type": "篮球场",
        "location": "曲江圣卡纳1",
        "weekTime": "9:00 - 21:00",
        "weekendTime": "8:00 - 22:00",
        "cost": 0,
        "distance": "1.5km"
    }, {
        "type": "兵乓球场",
        "location": "曲江圣卡纳2",
        "weekTime": "9:00 - 21:00",
        "weekendTime": "8:00 - 22:00",
        "cost": 120,
        "distance": "5.5km"
    }, {
        "type": "足球场",
        "location": "曲江圣卡纳3",
        "weekTime": "9:00 - 21:00",
        "weekendTime": "8:00 - 22:00",
        "cost": 0,
        "distance": "31m"
    }
];

const filterData = [
    {
        "key": "basketBall",
        "value": "篮球"
    }, {
        "key": "footBall",
        "value": "足球"
    }, {
        "key": "tennis",
        "value": "网球"
    }, {
        "key": "badminton",
        "value": "羽毛球"
    }, {
        "key": "volleyball",
        "value": "排球"
    }, {
        "key": "billiard",
        "value": "台球"
    }, {
        "key": "pingPang",
        "value": "乒乓球"
    }, {
        "key": "bowling",
        "value": "保龄球"
    }
];

export default class NearbyField extends Component {
    constructor(props) {
        super(props);
        this._toggleFilter = this._toggleFilter.bind(this);
        this.state = {
            dailyMatch: [],
            filter: [],
            filterVisible: false
        };
    }

    _toggleFilter() {
        this.setState({
            filterVisible: !this.state.filterVisible
        })
    }

    render() {
        return ( <View>
                <View style={styles.filterTitle}>
                    <TouchableOpacity
                        onPress={this._toggleFilter}
                        style={styles.filterTitleCont}
                    >
                        <Text style={styles.filterTitleText}>球类筛选</Text>
                        <Image style={{transform: [this.state.filterVisible ? {rotateX: '180deg'} : {rotateX: '0deg'}]}}
                               source={require('../../res/images/arrow.png')}/>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    ref={(scrollView) => {
                        _scrollView = scrollView;
                    }}
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    keyboardShouldPersistTaps="handled"
                    style={{marginBottom:40}}
                >
                    <FieldInfo fields={fields}/>
                </ScrollView>
                <Filter isMultiple={true}
                        data={filterData}
                        visible={this.state.filterVisible}
                        onClose={() => {
                            this.setState({
                                filterVisible: false
                            })
                        }}
                        onSubmit={(value) => {
                            this.setState({
                                filter: value,
                                filterVisible: false
                            })
                        }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemCont: {
        backgroundColor: '#ffffff',
        marginBottom: 15
    },
    matchDate: {
        backgroundColor: '#191919',
        paddingLeft: 15,
        color: '#dedede',
        height: 40,
        fontSize: 15,
        textAlignVertical: 'center'
    },
    filterTitle: {
        height: 40,
        backgroundColor: '#323232',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 30
    },
    filterTitleText: {
        fontSize: 15,
        marginRight: 5,
        color: '#e8e8e8'
    },
    filterTitleCont: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
});
