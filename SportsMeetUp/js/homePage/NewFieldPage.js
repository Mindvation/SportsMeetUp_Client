'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Modal,
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Image,
    Platform,
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import ImagePicker from 'react-native-image-picker';

var options = {
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


const {width, height} = Dimensions.get('window');

const fieldTyleLabels = ['足球场', '篮球场', "羽毛球", '台球', '保龄球', '网球', '乒乓球', '排球'];
const fieldTypeValues = ['football', 'basketball', 'badminton', 'billiards', 'bowling', 'tennis', 'tabletennis', 'volleyball'];

class NewFieldPage extends Component {

    constructor(props) {
        super(props);

        this.imageArray = new Array(3);

    this.state = {
    	visible: false,
    	address: '',
    	fieldType: '',
    	adminTel: '',
    	description:'',
      image1:null,
      image2:null,
      image3:null,
      ftWidth:0,
      overlayVisible:false,
    };
  }

    componentDidMount() {
    }

  _visibleModel(visible) {
    if (visible == this.state.visible) {
      return;
    }
    this.state.visible = visible;
    this.setState({visible:visible})
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
            this.refs.toast.show('请输入管理员电话');
            return;
        }

        if (this.imageArray === undefined || this.imageArray.length === 0) {
            this.refs.toast.show('请添加场地图片');
            return;
        }

        this._uploadImages();
    }

    _onSelected(index) {
        this.setState({fieldType: fieldTypeValues[index]})
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
                if (postion == 1) {
                    this.setState({image1: source});
                    this.testData = response.data;
                    this.imageArray[0] = uploadData;
                } else if (postion == 2) {
                    this.setState({image2: source});
                    this.imageArray[1] = uploadData;
                } else if (postion == 3) {
                    this.setState({image3: source});
                    this.imageArray[2] = uploadData;
                }
            }
        });
    }

  _uploadImages() {
    // show loading 
    this.setState({overlayVisible: true});


    let filesToUpload = new Array();
    if (this.imageArray[0]) {filesToUpload.push(this.imageArray[0])};
    if (this.imageArray[1]) {filesToUpload.push(this.imageArray[1])};
    if (this.imageArray[2]) {filesToUpload.push(this.imageArray[2])};

        fetch('http://192.168.0.102:8084/sports-meetup-papi/sportfields/uploadBase64', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uploadFiles: filesToUpload
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.responseCode === '000') {
                    let urls = '';
                    for (var i = responseJson.responseBody.length - 1; i >= 0; i--) {
                        urls += responseJson.responseBody[i]
                        if (i != 0) {
                            urls += "&"
                        }
                    }
                    console.log(urls);

          return fetch('http://192.168.0.102:8084/sports-meetup-papi/sportfields/addSportField', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              creatorId: 1000,
              fieldLocation: this.state.address,
              fieldType: this.state.fieldType,
              adminPhone: this.state.adminTel,
              fieldDetail: this.state.description ? this.state.description : '',
              longitude: this.props.location.longitude,
              latitude: this.props.location.latitude,
              picsOfField: urls,
            })
          });
        } else {
          this.refs.toast.show('上传图片失败，请重试');
          this.setState({overlayVisible: false});
        }
     })
    .then((response2) => response2.json())
    .then((result) => {
      console.log(result);
      if (result.responseCode != '000') {
        this.refs.toast.show('提交数据失败，请重试');
      } else {
        this.refs.toast.show('添加成功');
        this._visibleModel(false);
      }
      this.setState({overlayVisible: false});
    })
    .catch((error) => {
        console.error(error);
        this.setState({overlayVisible: false});
    });
  }


  render() {
    let buttonColor = Platform.select({ios: '#ffffff', android:'#df3939'});
    return (
      <Modal
          ref='modal'
          animationType={"fade"}
          transparent={true}
          visible={this.state.visible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <TouchableOpacity style={{flex:1}} activeOpacity ={1} onPress={() => console.log('click outside')}>
            <View style={styles.modalBackground} onPress={() => {Alert.alert('box click');}}>
              <View style={styles.modalBox}>
              	<View style={{justifyContent:'center', paddingHorizontal:18, paddingTop:24}}>
				        <View style={styles.modalItemRow}>
                  <Text style={styles.text}>地点</Text>
                  <View style={{flex:1, borderWidth:0, borderBottomWidth:1, borderTopWidth:0, borderLeftWidth:0, borderRightWidth:0, borderColor:'#8b8b83'}}>
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
                  <ModalDropdown style={styles.dropdownButton}
                  	textStyle={styles.dropdownText}
                  	dropdownStyle={[styles.dropdownStyle, {width:this.state.ftWidth}]}
                  	dropdownTextStyle={styles.dropdownTextStyle}
                  	defaultValue='请选择场地类型'
                  	options={fieldTyleLabels}
                  	onSelect={(index) => this._onSelected(index)}
                    onLayout={(event) => {
                              var {width} = event.nativeEvent.layout;
                              this.setState({ftWidth: width})
                              }}/>
                </View>
                <View style={styles.modalItemRow}>
                  <Text style={styles.text}>电话号码</Text>
                  <View style={{flex:1, borderWidth:0, borderBottomWidth:1, borderTopWidth:0, borderLeftWidth:0, borderRightWidth:0, borderColor:'#8b8b83'}}>
                    <TextInput style={styles.textInput}
                    underlineColorAndroid='transparent'
                    keyboardType='numeric'
                    placeholder='清输入你的电话号码'
                    maxLength={11}
                    placeholderTextColor='#b5b2b2'
                    onChangeText={(adminTel) => this.setState({adminTel})}
                    value={this.state.adminTel}/>
                  </View>
                </View>
                <Text style={styles.text}>详细信息</Text>
                <TextInput 
                  style={[styles.textInput, {flex:0, borderRadius:4, borderWidth:1, marginTop:8, marginBottom:10, padding:6, textAlignVertical:'top'}]}
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
        fontSize: 12
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
        fontSize: 12,
        color: '#595959',
    },

    dropdownStyle: {
        flex: 1,
        width: 100
    },

    dropdownTextStyle: {
        flex: 1,
        fontSize: 12
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