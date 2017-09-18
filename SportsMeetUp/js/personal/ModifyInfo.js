/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Platform,
    TouchableOpacity,
    Image,
    ScrollView,
    View,
    Alert
} from 'react-native';
import TextInputConpt from '../common/TextInputConpt';
import Toast from 'react-native-easy-toast';
import ModalConpt from '../common/ModalConpt';
import Overlay from '../common/Overlay';
import Header from '../common/Header';
import Radio from '../common/Radio';
import Util from '../util/CommonUtil';
import SimpleSelectCity from '../pickCity/SimpleSelectCity';
import FetchUtil from '../util/FetchUtil';
import DATA_JSON from '../pickCity/city-list.json';
import ImagePicker from 'react-native-image-picker';
import {freeTimeMapping} from '../data/Mapping';
import ModalPicker from '../common/Picker';

//import Camera from '../common/Camera';
const options = {
    title: '选择图片',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '相册',
    cancelButtonTitle: '取消',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
    maxWidth: 400,
    maxHeight: 400,
    mediaType: 'photo',
};

const dismissKeyboard = require('dismissKeyboard');


const gender_props = [
    {label: '男', value: "M"},
    {label: '女', value: "F"}
];

const freeTimeMappingData = [
    {key: '', section: true, label: '请选择空闲时间'}
];

export default class ModifyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: globalUserInfo.photo,
            gender: globalUserInfo.gender,
            name: globalUserInfo.name,
            weekFreeTime: globalUserInfo.weekFreeTime,
            weekendFreeTime: globalUserInfo.weekendFreeTime,
            ftWidth1: 0,
            ftWidth2: 0,
            location: globalUserInfo.location,
            overlayVisible: false
        };
    }

    componentDidMount() {
        Object.keys(freeTimeMapping).map((mapKey) => {
            freeTimeMappingData.push({key: mapKey, label: freeTimeMapping[mapKey]})
        });
        let timer = setTimeout(() => {
            this.getCityInfo();
            timer && clearTimeout(timer);
        }, 500);
    }

    getCityInfo() {
        if (!globalUserInfo.location.id && globalUserInfo.userLocation) {
            this._getCityInfoByCoord(globalUserInfo.userLocation)
        }
    }

    _getCityInfoByCoord = (position) => {
        let latitude = position.latitude;
        let longitude = position.longitude;
        if (!longitude || !latitude) return;
        const options = {
            "url": 'http://restapi.amap.com/v3/geocode/regeo?key=e71c5eb8c026dda36e7b8b8e4b0cbf57&' +
            'location=' + longitude + ',' + latitude + '&poitype=&radius=&extensions=base&batch=false&roadlevel=1'
        };

        fetch(options.url)
            .then((response) => response.json())
            .then((res) => {
                if (res.status === "1") {
                    if (res.regeocode && res.regeocode.addressComponent && res.regeocode.addressComponent.citycode) {
                        this.setState({
                            "location": this._getLocationById(res.regeocode.addressComponent.citycode),
                        });
                        Util.updateGobalData("globalUserInfo", {
                            "location": this.state.location
                        });
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _pickImages() {
        dismissKeyboard();
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {

            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = {uri: response.uri};
                this.uploadData = {
                    name: response.fileName,
                    data: response.data
                };
                this.setState({photo: source});
            }
        });
    }

    _getKey(option, value) {
        let key = "";
        Object.keys(option).some((itemKey) => {
            if (option[itemKey] === value) {
                key = itemKey;
                return true
            }
        });
        return key;
    }

    _uploadImage() {
        if (this.uploadData) {
            const options = {
                "url": '8084/sports-meetup-papi/sportfields/uploadBase64',
                "params": {
                    uploadFiles: [this.uploadData]
                }
            };
            FetchUtil.post(options).then((res) => {
                this.setState({
                    overlayVisible: false
                });
                this.imageUrl = res.responseBody[0];
                this.uploadData = null;
                this._modifyUserInfo();
            }).catch((error) => {
                this.setState({
                    overlayVisible: false,
                });

                Alert.alert(
                    error.code,
                    error.message,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false}
                );
            });
        } else {
            this._modifyUserInfo();
        }
    }

    _modifyUserInfo() {
        const options = {
            "url": '8081/sports-meetup-papi/users/updateUser',
            "params": {
                "userId": globalUserInfo.userId,
                "name": this.state.name,
                "gender": this.state.gender,
                "icon": this.imageUrl,
                "weekday": this.state.weekFreeTime,
                "weekend": this.state.weekendFreeTime,
                "city": this.state.location.id
            }
        };

        this.setState({
            overlayVisible: true,
        });

        FetchUtil.post(options).then((res) => {
            this.setState({
                overlayVisible: false
            });

            this._goBack(res.responseBody);
        }).catch((error) => {
            this.setState({
                overlayVisible: false,
            });

            Alert.alert(
                error.code,
                error.message,
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            );
        });
    }

    _goBack(res) {
        this.setState({
            "name": res.name,
            "gender": res.gender,
            "photo": res.icon ? {uri: res.icon} : '',
            "weekFreeTime": res.weekday,
            "weekendFreeTime": res.weekend,
            "location": this._getLocationById(res.city)
        });
        Util.updateGobalData("globalUserInfo", {
            "name": this.state.name,
            "gender": this.state.gender,
            "photo": this.state.photo,
            "weekFreeTime": this.state.weekFreeTime,
            "weekendFreeTime": this.state.weekendFreeTime,
            "location": this.state.location
        });

        if (this.props.updateInfo) {
            this.props.updateInfo({
                "name": this.state.name,
                "photo": this.state.photo,
                "weekFreeTime": this.state.weekFreeTime,
                "weekendFreeTime": this.state.weekendFreeTime
            })
        }

        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    _getLocationById(id) {
        let returnCity = {};
        if (id) {
            DATA_JSON.allCityList.some((city) => {
                if (city.id === id) {
                    returnCity = city;
                    return true;
                }
            });
        }
        return returnCity;
    }

    _pickCity() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                component: SimpleSelectCity,
                name: 'SimpleSelectCity',
                params: {
                    updateLocation: (option) => {
                        this.setState({
                            location: option
                        })
                    }
                }
            });
        }
    }


    render() {
        const succModal = <View style={styles.succModalMainCont}>
            <View style={styles.succModalCont}>
                <Image style={styles.succModalImage}
                       source={require('../../res/images/success.png')}/>
                <Text style={styles.succModalText}>信息修改成功</Text>
            </View>
        </View>;

        return (
            <View style={styles.container}>
                <Header navigator={this.props.navigator} title="编辑" hiddenRightBtn={true}/>
                <View style={styles.mainCont}>
                    <ScrollView
                        ref={(scrollView) => {
                            _scrollView = scrollView;
                        }}
                        automaticallyAdjustContentInsets={false}
                        horizontal={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.editPhoto}>
                            <Text style={styles.editPhotoText}>头像</Text>
                            <TouchableOpacity onPress={() => this._pickImages()}>
                                <Image style={styles.photoImg}
                                       source={this.state.photo ? this.state.photo : require('../../res/images/me/photo.png')}/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.otherInfo}>
                            <View style={[styles.editItem, {paddingLeft: 0, paddingRight: 0}]}>
                                <TextInputConpt
                                    labelCont=''
                                    placeholder=''
                                    isPassword={false}
                                    isShowClear={true}
                                    isHideBorder={true}
                                    onChange={(value) => {
                                        this.setState({
                                            name: value
                                        })
                                    }}
                                    value={globalUserInfo.name}
                                    style={{
                                        fontSize: 24,
                                        marginLeft: 0
                                    }}
                                    contStyle={{paddingLeft: 10}}
                                />
                            </View>
                            <View style={styles.editItem}>
                                <Text style={{fontSize: 15, color: '#000000'}}>常在地址：</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        this._pickCity();
                                    }}
                                >
                                    <Text
                                        style={{fontSize: 15}}>{this.state.location.name ? this.state.location.name : "请选择"}</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.editItem}>
                                <Radio options={gender_props}
                                       onPress={(value) => {
                                           this.setState({gender: value})
                                       }}
                                       initial={globalUserInfo.gender}
                                       textStyle={{
                                           fontSize: 15
                                       }}
                                />
                            </View>
                            <View style={styles.editItem}>
                                <Text style={{color: '#000000', fontSize: 15}}>周末</Text>
                                <ModalPicker
                                    data={freeTimeMappingData}
                                    initValue={this.state.weekendFreeTime}
                                    onChange={(option) => {
                                        this.setState({weekendFreeTime: option.key})
                                    }}
                                    cancelText="取消"
                                >
                                    <Text
                                        style={{
                                            width: 100,
                                            padding: 10,
                                            fontSize: 15
                                        }}>
                                        {this.state.weekendFreeTime ? freeTimeMapping[this.state.weekendFreeTime] : "请选择"}
                                    </Text>
                                </ModalPicker>

                                <Text style={{color: '#000000', fontSize: 15, marginLeft: 15}}>周内</Text>
                                <ModalPicker
                                    data={freeTimeMappingData}
                                    initValue={this.state.weekFreeTime}
                                    onChange={(option) => {
                                        this.setState({weekFreeTime: option.key})
                                    }}
                                    cancelText="取消"
                                >
                                    <Text
                                        style={{
                                            width: 100,
                                            padding: 10,
                                            fontSize: 15
                                        }}>
                                        {this.state.weekFreeTime ? freeTimeMapping[this.state.weekFreeTime] : "请选择"}
                                    </Text>
                                </ModalPicker>
                            </View>
                        </View>

                        <View style={styles.submitBtnCont}>
                            <TouchableOpacity
                                onPress={() => {
                                    this._uploadImage();
                                }}
                                style={styles.submitButton}
                            >
                                <Text style={styles.submitText}>确 认</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </View>
                <Toast
                    ref="toast"
                    position='center'
                    style={styles.toastStyle
                    }/>
                <ModalConpt
                    allowClose={false}
                    modalCont={succModal}
                    modalVisible={false}
                />
                <Overlay
                    allowClose={false}
                    modalVisible={this.state.overlayVisible}
                />
                {/*<Camera
                    visible={this.state.cameraVisible}
                    getUri={(value) => {
                        this.setState({
                            photo: value
                        })
                    }}
                    closeCamera={() => {
                        this.setState({
                            cameraVisible: false
                        })
                    }}/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainCont: {
        flex: 1,
        flexDirection: 'row'
    },
    submitBtnCont: {
        flexDirection: 'row',
        marginTop: 27,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 15
    },
    submitButton: {
        backgroundColor: '#df3939',
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
    succModalMainCont: {
        marginLeft: 55,
        marginRight: 55,
        flexDirection: 'row'
    },
    succModalCont: {
        height: 73,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    succModalImage: {
        height: 25,
        width: 25,
        marginRight: 25
    },
    succModalText: {
        fontSize: 17,
        color: '#000000'
    },
    toastStyle: {
        paddingLeft: 15,
        paddingRight: 15
    },
    photoImg: {
        borderRadius: 30,
        borderWidth: 0,
        borderColor: '#ffffff',
        width: 60,
        height: 60,
    },
    editPhoto: {
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    editPhotoText: {
        fontSize: 17,
        color: '#000000'
    },
    otherInfo: {
        backgroundColor: '#ffffff',
        marginTop: 10
    },
    editItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        height: 76,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    dropdownButton: {
        borderWidth: 0,
        paddingLeft: 15,
        paddingRight: 15,
    },
    dropdownText: {
        fontSize: 15
    },
    dropdownStyle: {},
    dropdownTextStyle: {
        fontSize: 15,
    },
});
