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
    ListView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import FetchUtil from '../util/FetchUtil';

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

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const pageSize = 6;

export default class NearbyField extends Component {
    constructor(props) {
        super(props);
        this._toggleFilter = this._toggleFilter.bind(this);
        this.state = {
            filter: [],
            filterVisible: false,
            isRefreshing: false,
            page: 0,
            fields: [],
            isShowBottomRefresh: false,
            isEnded: false
        };
    }

    componentDidMount() {
        this.getNearbyFields();
    }

    getNearbyFields(action = 'fresh') {
        let page = this.state.page;
        if (action === 'fresh') {
            page = 0;
            this.setState({
                isRefreshing: true
            })
        } else {
            this.setState({
                isShowBottomRefresh: true
            })
        }
        const options = {
            "url": '8086/sports-meetup-papi/matches/getApplyMatches',
            "params": {
                "userId": globalUserInfo.userId,
                "pageAndSize": page + "," + pageSize,
            }
        };
        FetchUtil.get(options).then((res) => {
            let tempFields = action === 'fresh' ? [] : this.state.fields;
            if (res.responseBody && res.responseBody.length > 0) {
                tempFields = tempFields.concat(res.responseBody);
                console.info('Fields Length === ' + tempFields.length);
                page++;
                this.setState({
                    isRefreshing: false,
                    page: page,
                    fields: tempFields,
                    isShowBottomRefresh: false
                });
            } else {
                this.setState({isRefreshing: false, isShowBottomRefresh: false});
            }

            if (res.responseBody) {
                if (res.responseBody.length < pageSize) {
                    this.setState({
                        isEnded: true
                    })
                } else {
                    this.setState({
                        isEnded: false
                    })
                }

            }
        }).catch((error) => {
            this.setState({
                isRefreshing: false,
                isShowBottomRefresh: false
            });
        })
    }

    onEndReached() {
        if (this.state.isRefreshing || this.state.isShowBottomRefresh || this.state.isEnded) return;
        console.info('onEndReached');
        this.getNearbyFields('load');
    }

    _renderFooter() {
        if (this.state && this.state.isShowBottomRefresh) {
            return (<View size="large">
                <ActivityIndicator/>
            </View>);
        }
        return <View/>;
    }

    _renderRow(rowData, sectionID, rowID) {
        return (
            <FieldInfo field={rowData} rowId={rowID}/>
        );
    }

    _toggleFilter() {
        this.setState({
            filterVisible: !this.state.filterVisible
        })
    }

    render() {
        const {fields, isRefreshing} = this.state;
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
                <ListView
                    dataSource={ds.cloneWithRows(fields)}
                    renderRow={this._renderRow.bind(this)}
                    renderFooter={this._renderFooter.bind(this)}
                    onEndReached={this.onEndReached.bind(this)}
                    onEndReachedThreshold={1}
                    enableEmptySections={true}
                    automaticallyAdjustContentInserts={false}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={() => this.getNearbyFields('fresh')}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#fff"
                        />
                    }
                />
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
