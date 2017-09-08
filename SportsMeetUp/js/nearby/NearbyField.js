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
import CommonUtil from '../util/CommonUtil';

const {width} = Dimensions.get('window');

import {filterData} from '../data/Mapping';

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
            isEnded: true,
            positioning: false,
            longitude: '',
            latitude: '',
            selectedRow: ''
        };
    }

    componentDidMount() {
        this.getNearbyFields();
    }

    getNearbyFields(action = 'fresh') {
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
                this.getNearbyFieldsByPosition(action);
            }, () => {
                this.setState({
                    positioning: false
                });
                if (this.state.latitude && this.state.longitude) {
                    this.getNearbyFieldsByPosition(action);
                } else {
                    this.setState({
                        isRefreshing: false
                    });
                    alert("获取位置失败");
                }
            })
        } else {
            this.getNearbyFieldsByPosition(action);
        }
    }

    getNearbyFieldsByPosition(action) {
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
            "url": '8084/sports-meetup-papi/sportfields/getNearbySportFields',
            "params": {
                "longitude": this.state.longitude,
                "latitude": this.state.latitude,
                "filter": this.state.filter.length > 0 ? this.state.filter.join(",") : null,
                "pageAndSize": page + "," + pageSize,
            }
        };
        FetchUtil.get(options).then((res) => {
            let tempFields = action === 'fresh' ? [] : this.state.fields;
            if (res.responseBody) {
                tempFields = tempFields.concat(res.responseBody);
                console.info('Fields Length === ' + tempFields.length);
                page++;
                this.setState({
                    isRefreshing: false,
                    page: page,
                    fields: tempFields,
                    isShowBottomRefresh: false,
                    selectedRow: ''
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
        if (this.state.isRefreshing || this.state.isShowBottomRefresh || this.state.isEnded || this.state.positioning) return;
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
            <FieldInfo field={rowData} rowId={rowID} selectedIndex={this.state.selectedRow}
                       setSelectedIndex={(index) => this.setSelectedIndex(index)}
            />
        );
    }

    _toggleFilter() {
        this.setState({
            filterVisible: !this.state.filterVisible
        })
    }

    setSelectedIndex(index) {
        this.setState({
            selectedRow: index
        })
    }

    render() {
        const {fields, isRefreshing} = this.state;
        return ( <View style={styles.nearbyFieldsCont}>
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
                            });
                            this.getNearbyFields('fresh');
                        }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    nearbyFieldsCont: {
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
    }
});
