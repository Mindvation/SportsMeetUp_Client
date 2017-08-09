import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    Dimensions
} from 'react-native';

import ModalConpt from '../common/ModalConpt';

const {width} = Dimensions.get('window');

export default class ShareMatch extends Component {
    static propTypes = {
        modalVisible: React.PropTypes.bool.isRequired,
        closeHandle: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const shareModal = <View style={styles.shareTrdCont}>
            <View style={styles.shareImageCont}>
                <Image style={styles.shareImage}
                       source={require('../../res/images/share_weChat.png')}/>
                <Text style={styles.shareImageText}>微信</Text>
            </View>
            <View style={styles.shareImageCont}>
                <Image style={styles.shareImage}
                       source={require('../../res/images/share_weiBo.png')}/>
                <Text style={styles.shareImageText}>微博</Text>
            </View>
            <View style={styles.shareImageCont}>
                <Image style={styles.shareImage}
                       source={require('../../res/images/share_qq.png')}/>
                <Text style={styles.shareImageText}>QQ</Text>
            </View>
        </View>;

        return (
            <ModalConpt
                allowClose={true}
                modalCont={shareModal}
                modalVisible={this.props.modalVisible}
                opacity={0}
                position="bottom"
                closeHandle={() => {
                    this.props.closeHandle();
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    shareTrdCont: {
        width: width,
        height: 130,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: 60,
        paddingRight: 60,
        borderTopWidth: 1,
        borderTopColor: '#E8E8E8'
    },
    shareImageCont: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    shareImage: {
        width: 45,
        height: 45
    },
    shareImageText: {
        marginTop: 15
    }
});