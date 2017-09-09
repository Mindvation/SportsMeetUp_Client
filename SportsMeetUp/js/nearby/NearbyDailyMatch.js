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
    TouchableOpacity,
    Image,
    ListView,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import CommonUtil from '../util/CommonUtil';

import NearbyMatch from './NearbyMatch';
import Filter from '../common/Filter';
import FetchUtil from '../util/FetchUtil';

const {width} = Dimensions.get('window');
import {filterData} from '../data/Mapping';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const pageSize = 6;

export default class NearbyDailyMatch extends Component {
    constructor(props) {
        super(props);
        this._toggleFilter = this._toggleFilter.bind(this);
        this.state = {
            isRefreshing: false,
            page: 0,
            matches: [],
            isShowBottomRefresh: false,
            isEnded: false,
            positioning: false,
            dailyMatch: [],
            latitude: '',
            longitude: '',
            filter: []
        };
    }

    componentDidMount() {
        //this._filterMatchInfo();
        this.getNearbyMatches();
    }

    getNearbyMatches(action = 'fresh') {
        if (action === 'fresh') {
            this.setState({
                positioning: true,
                isRefreshing: true
            });
            CommonUtil.getPosition((position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    positioning: false
                });
                this.getNearbyMatchesByPosition(action);
            }, (error) => {
                this.setState({
                    positioning: false
                });
                if (this.state.latitude && this.state.longitude) {
                    this.getNearbyMatchesByPosition(action);
                } else {
                    this.setState({
                        isRefreshing: false
                    });
                    if (error.code === 1) {
                        alert("请打开手机定位");
                    } else {
                        alert(error.message);
                    }
                }
            })
        } else {
            this.getNearbyMatchesByPosition(action);
        }
    }

    getNearbyMatchesByPosition(action) {
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
            "url": '8086/sports-meetup-papi/matches/getNearbyMatches',
            "params": {
                "longitude": this.state.longitude,
                "latitude": this.state.latitude,
                "filter": this.state.filter.length > 0 ? this.state.filter.join(",") : null,
                "pageAndSize": page + "," + pageSize
            }
        };
        FetchUtil.get(options).then((res) => {
            let tempMatch = action === 'fresh' ? [] : this.state.matches;
            if (res.responseBody && res.responseBody.length > 0) {
                tempMatch = tempMatch.concat(res.responseBody);
                console.info('Match Length === ' + tempMatch.length);
                page++;
                this._filterMatchInfo(tempMatch);
                this.setState({
                    isRefreshing: false,
                    page: page,
                    matches: tempMatch,
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

    _filterMatchInfo(matches) {
        //TODO dummy data 之后日期改为当天
        let todayDate = new Date("2017/9/28");
        let firstDay = CommonUtil.dateFormat(new Date("2017/9/28"), "yyyy-MM-dd");
        let secondDay = CommonUtil.dateFormat(new Date(todayDate.setDate(todayDate.getDate() + 1)), "yyyy-MM-dd");
        let thirdDay = CommonUtil.dateFormat(new Date(todayDate.setDate(todayDate.getDate() + 1)), "yyyy-MM-dd");
        let matchArr = [{
            "date": firstDay,
            "matches": []
        }, {
            "date": secondDay,
            "matches": []
        }, {
            "date": thirdDay,
            "matches": []
        }];
        matches.map(match => {
            matchArr.map(dayMatch => {
                if (dayMatch.date === match.date) {
                    dayMatch.matches.push(this._formatMatch(match));
                }
            })
        });

        this.setState({
            dailyMatch: matchArr
        })
    }

    _formatMatch(match) {
        match.blueTeam = Math.round(match.joinedAmmount / 2);
        match.redTeam = match.joinedAmmount - match.blueTeam;
        match.startTime = CommonUtil.dateFormat(CommonUtil.parseDate(match.startTime), "hh:mm:ss");
        match.endTime = CommonUtil.dateFormat(CommonUtil.parseDate(match.endTime), "hh:mm:ss");
        match.icon = match.icon ? {uri: match.icon} : '';
        return match;
    }

    _toggleFilter() {
        this.setState({
            filterVisible: !this.state.filterVisible
        })
    }

    onEndReached() {
        if (this.state.isRefreshing || this.state.isShowBottomRefresh || this.state.isEnded || this.state.positioning) return;
        console.info('onEndReached');
        this.getNearbyMatches('load');
    }

    _renderFooter() {
        if (this.state && this.state.isShowBottomRefresh) {
            return (<View size="large">
                <ActivityIndicator/>
            </View>);
        }
        return <View/>;
    }

    _renderRowForNoData() {
        return <View style={styles.noDataCont}>
            <Text style={styles.noDataText}>附近没有比赛...</Text>
        </View>
    }

    _renderRow(rowData, sectionID, rowID) {
        return rowData.matches.length ?
            <View style={styles.itemCont}>
                <Text style={styles.matchDate}>{rowData.date}</Text>
                {rowData.matches.map((match, j) => {
                    return <NearbyMatch key={"match_" + j} match={match}/>
                })}
            </View> : null
    }

    render() {
        const {dailyMatch, isRefreshing, matches} = this.state;
        return ( <View style={styles.nearbyDailyCont}>
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
                {!isRefreshing && (!matches || matches.length === 0) ?
                    <ListView
                        dataSource={ds.cloneWithRows(['noData'])}
                        renderRow={this._renderRowForNoData.bind(this)}
                        enableEmptySections={true}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={() => this.getNearbyMatches('fresh')}
                                tintColor="#ff0000"
                                title="Loading..."
                                titleColor="#00ff00"
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#fff"
                            />
                        }
                    /> :
                    <ListView
                        dataSource={ds.cloneWithRows(dailyMatch)}
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
                                onRefresh={() => this.getNearbyMatches('fresh')}
                                tintColor="#ff0000"
                                title="Loading..."
                                titleColor="#00ff00"
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#fff"
                            />
                        }
                    />
                }
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
                            });
                            this.getNearbyMatches('fresh');
                        }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    nearbyDailyCont: {
        flex: 1
    },
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
    },
    noDataCont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noDataText: {
        fontSize: 20,
        marginTop: 50
    }
});
