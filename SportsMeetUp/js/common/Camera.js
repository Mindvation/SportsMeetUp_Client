import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Dimensions
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ModalConpt from './ModalConpt';

const {width} = Dimensions.get('window');

export default class Camera extends Component {
    static propTypes = {
        getUri: React.PropTypes.func.isRequired,
        visible: React.PropTypes.bool.isRequired,
        closeCamera: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    _camera() {
        this.props.closeCamera();
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false
        }).then(image => {
            this.props.getUri({uri: image.path});
        });
    }

    _pickImg() {
        this.props.closeCamera();
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false,
            mediaType: 'photo'
        }).then(image => {
            this.props.getUri({uri: image.path});
        });
    }

    _cancel() {
        this.props.closeCamera();
    }

    render() {
        const pickFunc = <View>
            <TouchableOpacity
                onPress={() => {
                    this._camera();
                }}
                style={[styles.pickUpButton, {marginBottom: 5}]}>
                <Text>拍照</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    this._pickImg();
                }}
                style={[styles.pickUpButton, {marginBottom: 15}]}>
                <Text>相册</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    this._cancel();
                }}
                style={styles.pickUpButton}>
                <Text>取消</Text>
            </TouchableOpacity>
        </View>;

        return <ModalConpt allowClose={true}
                           modalCont={pickFunc}
                           modalVisible={this.props.visible}
                           position="bottom"
                           closeHandle={() => {
                           }}/>
    }
}

const styles = StyleSheet.create({
    pickUpButton: {
        backgroundColor: '#ffffff',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: width
    }
});