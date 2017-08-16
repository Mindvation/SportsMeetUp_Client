'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Modal,
    Dimensions,
    Platform,
    Button,
    Text,
    Image,
} from 'react-native';

import CommonUtil from '../util/CommonUtil'

const {
    width,
    height,
} = Dimensions.get('window');

class FieldInfoView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
        };
    }

    visible(visible) {
        if (visible == this.state.modalVisible) return;

        this.setState({
            modalVisible: visible,
        });
    }

    _renderImages() {
        let urls = this.props.fieldInfo.picsOfField.split("&");
        let images = [];
        for (var i = urls.length - 1; i >= 0; i--) {
            if (!CommonUtil.isEmpty(urls[i])) {
                images.push(<Image style={styles.image}
                            key={i} resizeMode='cover' source={{uri: urls[i]}}/>);                
            }
        }

        if (images.length == 0) {
            return <Image style={styles.image} resizeMode='cover' source={require('../../res/images/add_pic.png')} />;
        } else {
            return images.map((item, index) => {return item;});
        }
    }

    render() {
        console.log(this.props.fieldInfo);
        let {address, fieldType, adminPhone, fieldDetail, picsOfField} = this.props.fieldInfo;
        let images = picsOfField.split("&");
        return (
            <Modal
                visible={this.state.modalVisible}
                transparent={true}
                onRequestClose={() => {
                }}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalBox}>
                        <View style={{paddingHorizontal: 12, paddingTop: 32}}>
                            <Text style={styles.text}>地点：{address}</Text>
                            <Text style={[styles.text, {marginTop: 27}]}>场地类型：{CommonUtil.typeToName(fieldType)}</Text>
                            <Text style={[styles.text, {marginTop: 27}]}>电话号码：{adminPhone}</Text>
                            <Text style={[styles.text, {marginTop: 27}]}>备注：{fieldDetail}</Text>
                            <Text style={[styles.text, {marginTop: 27}]}>场地图片</Text>
                            <View style={styles.imageContainer}>
                                {this._renderImages()}
                            </View>
                        </View>
                        <Button
                            style={styles.button}
                            title='确定'
                            color='#df3939'
                            onPress={() => this.setState({modalVisible: false})}/>
                    </View>
                </View>
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
        width: width * 0.9,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 4,
        marginHorizontal: 24,
    },

    text: {
        fontSize: 15,
    },

    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 30
    },

    image: {
        width: 76,
        height: 76,
    },

    button: {
        width: width * 0.9,
        height: 40,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        borderWidth: 1,
        backgroundColor: '#00000000',
        borderRadius: 4,
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


export default FieldInfoView;