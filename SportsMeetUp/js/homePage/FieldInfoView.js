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

    render() {
        console.log(this.props.fieldInfo);
        let {filedLocation, fieldType, adminPhone, description} = this.props.fieldInfo;

        return (
            <Modal
                visible={this.state.modalVisible}
                transparent={true}
                onRequestClose={() => {
                }}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalBox}>
                        <View style={{paddingHorizontal: 12, paddingTop: 32}}>
                            <Text style={styles.text}>地点：{filedLocation}</Text>
                            <Text style={[styles.text, {marginTop: 27}]}>场地类型：{fieldType}</Text>
                            <Text style={[styles.text, {marginTop: 27}]}>电话号码：{adminPhone}</Text>
                            <Text style={[styles.text, {marginTop: 27}]}>备注：{description}</Text>
                            <Text style={[styles.text, {marginTop: 27}]}>场地图片</Text>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image}
                                       resizeMode='cover'
                                       source={this.state.image1 ? this.state.image1 : require('../../res/images/add_pic.png')}/>
                                <Image style={styles.image}
                                       resizeMode='cover'
                                       source={this.state.image2 ? this.state.image2 : require('../../res/images/add_pic.png')}/>
                                <Image style={styles.image}
                                       resizeMode='cover'
                                       source={this.state.image3 ? this.state.image3 : require('../../res/images/add_pic.png')}/>
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