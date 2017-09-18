'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Modal,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Image,
    Platform,
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import ImagePicker from 'react-native-image-picker';
import ModalPicker from '../common/Picker';

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

import Toast, {DURATION} from 'react-native-easy-toast'
import CommonUtil from '../util/CommonUtil'
import Overlay from '../common/Overlay'
import FetchUtil from '../util/FetchUtil'
import {sportTypeMapping} from '../data/Mapping';

const {width, height} = Dimensions.get('window');

const sportTypeMappingData = [
    {key: '', section: true, label: '请选择场地类型'}
];

class NewFieldPage extends Component {

    constructor(props) {
        super(props);

        this.imageArray = new Array(3);

        this.state = {
            visible: false,
            address: '',
            fieldType: '',
            adminTel: '',
            description: '',
            image1: null,
            image2: null,
            image3: null,
            ftWidth: 0,
            overlayVisible: false,
        };
    }

    componentDidMount() {
        Object.keys(sportTypeMapping).map((mapKey) => {
            sportTypeMappingData.push({key: mapKey, label: sportTypeMapping[mapKey]})
        });
    }

    _visibleModel(visible) {
        if (visible === this.state.visible) {
            return;
        }
        this.state.visible = visible;
        this.setState({visible: visible})
    }

    _handleSubmitClick() {
        if (CommonUtil.isEmpty(this.state.address)) {
            this.refs.toast.show('请输入地址或名称');
            return;
        }

        if (CommonUtil.isEmpty(this.state.fieldType)) {
            this.refs.toast.show('请选择场地类型');
            return;
        }

        if (CommonUtil.isEmpty(this.state.adminTel)) {
            this.refs.toast.show('请输入场地电话');
            return;
        }

        if (this.imageArray === undefined || this.imageArray.length === 0) {
            this.refs.toast.show('请添加场地图片');
            return;
        }

        this._uploadImages();
    }

    _onSelected(index) {
        this.setState({fieldType: Object.keys(sportTypeMapping)[index]})
    }

    _pickImages(postion) {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {

            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = {uri: response.uri};
                let uploadData = {
                    name: response.fileName,
                    data: response.data
                };
                if (postion === 1) {
                    this.setState({image1: source});
                    this.imageArray[0] = uploadData;
                } else if (postion === 2) {
                    this.setState({image2: source});
                    this.imageArray[1] = uploadData;
                } else if (postion === 3) {
                    this.setState({image3: source});
                    this.imageArray[2] = uploadData;
                }
            }
        });
    }

    _uploadImages() {
        // show loading
        this.setState({overlayVisible: true});
        console.log(this.props.location);

        let filesToUpload = [];
        if (this.imageArray[0]) {
            filesToUpload.push(this.imageArray[0])
        }
        if (this.imageArray[1]) {
            filesToUpload.push(this.imageArray[1])
        }
        if (this.imageArray[2]) {
            filesToUpload.push(this.imageArray[2])
        }

        const options = {
            "url": '8084/sports-meetup-papi/sportfields/uploadBase64',
            "params": {
                uploadFiles: filesToUpload
            }
        };

        FetchUtil.post(options).then((responseJson) => {
            console.log(responseJson);
            let urls = '';
            /*for (var i = responseJson.responseBody.length - 1; i >= 0; i--) {
                urls += responseJson.responseBody[i]
                if (i != 0) {
                    urls += "&"
                }
            }*/

            if (responseJson.responseBody && responseJson.responseBody.length) {
                urls = responseJson.responseBody.join(",")
            }

            const options2 = {
                "url": '8084/sports-meetup-papi/sportfields/addSportField',
                "params": {
                    creatorId: globalUserInfo.userId,
                    address: this.state.address,
                    fieldType: this.state.fieldType,
                    adminPhone: this.state.adminTel,
                    fieldDetail: this.state.description ? this.state.description : '',
                    longitude: this.props.location.longitude,
                    latitude: this.props.location.latitude,
                    picsOfField: urls,
                }
            };
            // options2.params.picsOfField = urls;

            return FetchUtil.post(options2)
                .then((result) => {
                    this.setState({
                        overlayVisible: false
                    });
                    this.refs.toast.show('添加成功');
                    this._visibleModel(false);
                });
        })
            .catch((error) => {
                this.refs.toast.show('添加失败，请重试');
                this.setState({overlayVisible: false});
            });
    }

    _onClose = () => {
        // 关闭界面时清楚数据
        this.imageArray = new Array();
        this.setState({
            address: '',
            fieldType: '',
            adminTel: '',
            description: '',
        });
    };

    render() {
        let buttonColor = Platform.select({ios: '#ffffff', android: '#df3939'});
        return (
            <Modal
                ref='modal'
                animationType={"fade"}
                transparent={true}
                visible={this.state.visible}
                onRequestClose={this._onClose}
            >
                <TouchableOpacity style={{flex: 1}} activeOpacity={1} onPress={() => console.log('click outside')}>
                    <View style={styles.modalBackground} onPress={() => {
                    }}>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={{alignSelf: 'flex-end', marginRight: 14, marginTop: 14}}
                                              onPress={() => this._visibleModel(false)}>
                                <Image source={require('../../res/images/close.png')}/>
                            </TouchableOpacity>
                            <View style={{justifyContent: 'center', paddingHorizontal: 18, paddingTop: 9}}>
                                <View style={styles.modalItemRow}>
                                    <Text style={styles.text}>地点</Text>
                                    <View style={{
                                        flex: 1,
                                        borderWidth: 0,
                                        borderBottomWidth: 1,
                                        borderTopWidth: 0,
                                        borderLeftWidth: 0,
                                        borderRightWidth: 0,
                                        borderColor: '#8b8b83'
                                    }}>
                                        <TextInput
                                            style={styles.textInput}
                                            underlineColorAndroid='transparent'
                                            keyboardType='default'
                                            placeholder='请输入地址或名称'
                                            placeholderTextColor='#b5b2b2'
                                            multiline={false}
                                            onChangeText={(address) => this.setState({address})}
                                            value={this.state.address}/>
                                    </View>
                                </View>
                                <View style={styles.modalItemRow}>
                                    <Text style={styles.text}>场地类型</Text>
                                    {/*<ModalDropdown style={styles.dropdownButton}
                                                   textStyle={styles.dropdownText}
                                                   dropdownStyle={[styles.dropdownStyle, {width: this.state.ftWidth}]}
                                                   dropdownTextStyle={styles.dropdownTextStyle}
                                                   defaultValue='请选择场地类型'
                                                   options={Object.values(sportTypeMapping)}
                                                   onSelect={(index) => this._onSelected(index)}
                                                   onLayout={(event) => {
                                                       var {width} = event.nativeEvent.layout;
                                                       this.setState({ftWidth: width})
                                                   }}/>*/}
                                    <ModalPicker
                                        data={sportTypeMappingData}
                                        onChange={(option) => {
                                            this.setState({fieldType: option.key})
                                        }}
                                        cancelText="取消"
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14
                                            }}>
                                            {this.state.fieldType ? sportTypeMapping[this.state.fieldType] : "请选择场地类型"}
                                        </Text>
                                    </ModalPicker>
                                </View>
                                <View style={styles.modalItemRow}>
                                    <Text style={styles.text}>场地电话</Text>
                                    <View style={{
                                        flex: 1,
                                        borderWidth: 0,
                                        borderBottomWidth: 1,
                                        borderTopWidth: 0,
                                        borderLeftWidth: 0,
                                        borderRightWidth: 0,
                                        borderColor: '#8b8b83'
                                    }}>
                                        <TextInput style={styles.textInput}
                                                   underlineColorAndroid='transparent'
                                                   keyboardType='numeric'
                                                   placeholder='请输入场地电话'
                                                   maxLength={11}
                                                   placeholderTextColor='#b5b2b2'
                                                   onChangeText={(adminTel) => this.setState({adminTel})}
                                                   value={this.state.adminTel}/>
                                    </View>
                                </View>
                                <Text style={styles.text}>详细信息</Text>
                                <TextInput
                                    style={[styles.textInput, {
                                        flex: 0,
                                        borderRadius: 4,
                                        borderWidth: 1,
                                        marginTop: 8,
                                        marginBottom: 10,
                                        padding: 6,
                                        textAlignVertical: 'top'
                                    }]}
                                    multiline={true}
                                    numberOfLines={3}
                                    underlineColorAndroid="transparent"
                                    placeholder='请添加场地描述'
                                    placeholderTextColor='#b5b2b2'
                                    onChangeText={(description) => this.setState({description})}
                                    value={this.state.description}/>
                                <Text style={styles.text}>添加图片</Text>
                                <View style={styles.imageContainer}>
                                    <TouchableOpacity onPress={() => this._pickImages(1)}>
                                        <Image style={styles.image}
                                               resizeMode='cover'
                                               source={this.state.image1 ? this.state.image1 : require('../../res/images/add_pic.png')}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this._pickImages(2)}>
                                        <Image style={styles.image}
                                               resizeMode='cover'
                                               source={this.state.image2 ? this.state.image2 : require('../../res/images/add_pic.png')}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this._pickImages(3)}>
                                        <Image style={styles.image}
                                               resizeMode='cover'
                                               source={this.state.image3 ? this.state.image3 : require('../../res/images/add_pic.png')}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Button style={styles.button}
                                    title='提交'
                                    color="#df3939"
                                    onPress={() => this._handleSubmitClick()}/>
                        </View>
                        <Toast ref='toast'/>
                    </View>
                </TouchableOpacity>
                <Overlay
                    allowClose={false}
                    modalVisible={this.state.overlayVisible}
                />
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalBox: {
        width: width * 0.8,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 4,
        marginHorizontal: 24,
    },

    modalItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    text: {
        width: 72,
        color: '#393939',
        fontSize: 15
    },

    textInput: {
        flex: 1,
        // borderBottomWidth:1,
        // borderTopWidth:0,
        // borderLeftWidth:0,
        // borderRightWidth:0,
        padding: 0,
        borderColor: '#8b8b83',
        color: '#595959',
        fontSize: 14
    },

    picker: {
        flex: 1,
    },

    dropdownButton: {
        flex: 1,
        borderBottomWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },

    dropdownText: {
        fontSize: 14,
        color: '#595959',
    },

    dropdownStyle: {
        flex: 1,
        width: 100
    },

    dropdownTextStyle: {
        flex: 1,
        fontSize: 14
    },

    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        marginBottom: 24
    },

    image: {
        width: 56,
        height: 50,
        resizeMode: 'contain',
    },

    button: {
        width: width * 0.8,
        height: 40,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        borderWidth: 0,
        // backgroundColor:'#ff0000',
        ...Platform.select({
            ios: {
                backgroundColor: '#df3939',
            },
            android: {
                backgroundColor: '#ffffff',
            },
        })
    },
});


export default NewFieldPage;