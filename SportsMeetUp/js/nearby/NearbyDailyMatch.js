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
            if (!globalUserInfo.userLocation || !globalUserInfo.userLocation.latitude || !globalUserInfo.userLocation.longitude) {
                alert("定位失败，请检查手机设置");
                return;
            }
            this.location = globalUserInfo.userLocation;
            this.nearbyDailyMatch && this.nearbyDailyMatch.scrollTo({y: 0, animated: true});
            this.setState({
                isRefreshing: true
            });
            this.getNearbyMatchesByPosition(action);

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
                "longitude": this.location.longitude,
                "latitude": this.location.latitude,
                "filter": this.state.filter.length > 0 ? this.state.filter.join(",") : null,
                "pageAndSize": page + "," + pageSize
            }
        };
        FetchUtil.get(options).then((res) => {
            let tempMatch = action === 'fresh' ? [] : this.state.matches;
            if (res.responseBody) {
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
        let todayDate = new Date();
        let firstDay = CommonUtil.dateFormat(new Date(), "yyyy-MM-dd");
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
        match.icon = match.createdUserInfo && match.createdUserInfo.icon ? {uri: match.createdUserInfo.icon} : '';
        match.name = match.createdUserInfo && match.createdUserInfo.name ? match.createdUserInfo.name : '未知';
        return match;
    }

    _toggleFilter() {
        this.setState({
            filterVisible: !this.state.filterVisible
        })
    }

    onEndReached() {
        if (this.state.isRefreshing || this.state.isShowBottomRefresh || this.state.isEnded) return;
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
                    return <NearbyMatch key={"match_" + j} match={match}
                                        update={(matchInfo) => this.updateMatchInfo(matchInfo)}/>
                })}
            </View> : null
    }

    updateMatchInfo(matchInfo) {
        let tempMatches = this.state.matches;
        tempMatches.some((tempMatch) => {
            if (tempMatch.matchId === matchInfo.matchId) {
                Object.assign(tempMatch, this._formatMatch(matchInfo));
                return true;
            }
        });
        this.setState({
            matches: tempMatches
        })
    }

    hasData(dailyMatch) {
        let length = 0;
        dailyMatch.map((day) => {
            length += day.matches.length;
        });
        return length;
    }

    render() {
        const {dailyMatch, isRefreshing} = this.state;
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
                {!isRefreshing && (this.hasData(dailyMatch) === 0) ?
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
                        ref={node => this.nearbyDailyMatch = node}
                        dataSource={ds.cloneWithRows(dailyMatch)}
                        renderRow={this._renderRow.bind(this)}
                        renderFooter={this._renderFooter.bind(this)}
                        onEndReached={this.onEndReached.bind(this)}
                        onEndReachedThreshold={1}
                        enableEmptySections={true}
                        automaticallyAdjustContentInserts={false}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
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
                            let timer = setTimeout(() => {
                                this.getNearbyMatches('fresh');
                                timer && clearTimeout(timer);
                            }, 0);

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
