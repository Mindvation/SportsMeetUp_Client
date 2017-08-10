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

import NearbyMatch from './NearbyMatch';
import Filter from '../common/Filter';

const {width} = Dimensions.get('window');
const matchs = [
    {
        "sponsor": "Darcy",
        "title": "11V11足球赛",
        "location": "西安市雁塔区雁南五路与雁塔南路十字西南 曲江圣卡纳",
        "date": "2017/08/09",
        "time": "17:30-19:30",
        "teamBlueLeft": 8,
        "teamRedLeft": 5,
        "total": 22,
        "distance": "31m"
    }, {
        "sponsor": "Frank",
        "title": "2V2足球赛",
        "location": "曲江圣卡纳1",
        "date": "2017/08/09",
        "time": "16:30-17:30",
        "teamBlueLeft": 1,
        "teamRedLeft": 0,
        "total": 4,
        "distance": "5.5km"
    }, {
        "sponsor": "Bob",
        "title": "4V4足球赛",
        "location": "曲江圣卡纳2",
        "date": "2017/08/11",
        "time": "20:30-22:30",
        "teamBlueLeft": 1,
        "teamRedLeft": 3,
        "total": 8,
        "distance": "3km"
    }, {
        "sponsor": "Frank",
        "title": "1V1乒乓球赛",
        "location": "曲江圣卡纳3",
        "date": "2017/08/09",
        "time": "17:30-19:30",
        "teamBlueLeft": 1,
        "teamRedLeft": 0,
        "total": 2,
        "distance": "5.5km"
    },
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

export default class NearbyDailyMatch extends Component {
    constructor(props) {
        super(props);
        this._toggleFilter = this._toggleFilter.bind(this);
        this.state = {
            dailyMatch: [],
            filter: [],
            filterVisible: false
        };
    }

    componentDidMount() {
        this._filterMatchInfo();
    }

    _filterMatchInfo() {
        //TODO dummy data 之后日期改为当天
        let todayDate = new Date("2017/8/9");
        let firstDay = CommonUtil.dateFormat(new Date("2017/8/9"), "yyyy/MM/dd");
        let secondDay = CommonUtil.dateFormat(new Date(todayDate.setDate(todayDate.getDate() + 1)), "yyyy/MM/dd");
        let thirdDay = CommonUtil.dateFormat(new Date(todayDate.setDate(todayDate.getDate() + 1)), "yyyy/MM/dd");
        let matchArr = {
            [firstDay]: [],
            [secondDay]: [],
            [thirdDay]: []
        };
        matchs.map(match => {
            Object.keys(matchArr).map(day => {
                if (day === match.date) {
                    matchArr[day].push(match);
                }
            })
        });

        this.setState({
            dailyMatch: matchArr
        })
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
                    style={{marginBottom:25}}
                >
                    {
                        Object.keys(this.state.dailyMatch).map((date, i) => {
                            return this.state.dailyMatch[date].length ?
                                (<View style={styles.itemCont} key={"date_" + i}>
                                        <Text style={styles.matchDate}>{date}</Text>
                                        {this.state.dailyMatch[date].map((match, j) => {
                                            return <NearbyMatch key={"match_" + j} match={match}/>
                                        })}
                                    </View>
                                ) : null
                        })
                    }

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
