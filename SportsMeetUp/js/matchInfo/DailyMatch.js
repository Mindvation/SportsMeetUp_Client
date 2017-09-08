import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    RefreshControl,
    ActivityIndicator,
    ListView
} from 'react-native';

import MatchDetail from './MatchDetail';
import FetchUtil from '../util/FetchUtil';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const pageSize = 6;

export default class DailyMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            page: 0,
            matches: [],
            isShowBottomRefresh: false,
            isEnded: true
        };
    }

    componentDidMount() {
        let timer = setTimeout(() => {
            this._getMatchInfo();
            timer && clearTimeout(timer);
        }, 1000);

    }

    //get match info from server
    _getMatchInfo(action = 'fresh') {
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
            "url": '8086/sports-meetup-papi/matches/getMatchesByFieldId',
            "params": {
                "fieldId": "1875",
                "pageAndSize": page + "," + pageSize
            }
        };
        FetchUtil.get(options).then((res) => {
            let tempMatch = action === 'fresh' ? [] : this.state.matches;
            if (res.responseBody) {
                tempMatch = tempMatch.concat(res.responseBody);
                console.info('Match Length === ' + tempMatch.length);
                alert(tempMatch.length);
                page++;
                this.setState({
                    isRefreshing: false,
                    page: page,
                    matches: tempMatch,
                    isShowBottomRefresh: false
                });
                if (res.responseBody.length < pageSize) {
                    this.setState({
                        isEnded: true
                    })
                } else {
                    this.setState({
                        isEnded: false
                    })
                }
            } else {
                this.setState({isRefreshing: false, isShowBottomRefresh: false});
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
        this._getMatchInfo('load');
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
            <MatchDetail matchInfo={rowData}/>
        );
    }

    render() {
        const {matches, isRefreshing} = this.state;

        return (<View style={styles.mainCont}>
            <ListView
                dataSource={ds.cloneWithRows(matches)}
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
                        onRefresh={() => this._getMatchInfo('fresh')}
                        tintColor="#ff0000"
                        title="Loading..."
                        titleColor="#00ff00"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#fff"
                    />
                }
            />
        </View>)
    }
}

const styles = StyleSheet.create({
    mainCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#272727'
    },
    scrollview: {
        flex: 1,
    }
});