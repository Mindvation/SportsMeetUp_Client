import React, {Component} from 'react';
import {
    StyleSheet,
    Animated,
    View,
    TouchableWithoutFeedback,
    Modal
} from 'react-native';

import CommonUtil from '../util/CommonUtil';

const positionMapping = {
    "top": {
        justifyContent: "flex-start"
    },
    "bottom": {
        justifyContent: "flex-end"
    },
    "left": {
        alignItems: "flex-start"
    },
    "right": {
        alignItems: "flex-end"
    },
    "center": {
        justifyContent: "center",
        alignItems: "center"
    }
};

export default class ModalConpt extends Component {
    static propTypes = {
        allowClose: React.PropTypes.bool,
        closeHandle: React.PropTypes.func,
        modalVisible: React.PropTypes.bool.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        const {modalCont, allowClose, closeHandle, position, onRequestClose, modalVisible, opacity} = this.props;
        const modalPosition = position ? positionMapping[position] : positionMapping.center;
        const opacityStyle = CommonUtil.isEmpty(opacity) ? {opacity: 0.5} : {opacity: opacity};

        if (!modalVisible) {
            return (<View/>);
        } else {
            return (
                <Modal transparent={true} onRequestClose={() => {
                    onRequestClose ? onRequestClose() : {}
                }}>
                    <View style={[styles.container, modalPosition]}>
                        <Animated.View style={[styles.mask, opacityStyle]}>
                            <TouchableWithoutFeedback onPress={() => allowClose ? closeHandle() : null}>
                                <View style={styles.maskView}/>
                            </TouchableWithoutFeedback>
                        </Animated.View>
                        <Animated.View style={styles.modalBackground}>
                            {modalCont}
                        </Animated.View>
                    </View>
                </Modal>)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    mask: {
        position: 'absolute',
        backgroundColor: "#000000",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    maskView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalBackground: {
        justifyContent: "center",
        alignItems: "center"
    }
});