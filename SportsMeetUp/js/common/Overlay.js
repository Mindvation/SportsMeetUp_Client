import React, {Component} from 'react';
import {
    StyleSheet,
    Animated,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Modal
} from 'react-native';

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

        const {color, allowClose, closeHandle, size, modalVisible} = this.props;
        return (
            <Modal transparent={true}
                   visible={modalVisible}
                   onRequestClose={() => {

                   }}>
                <View style={styles.container}>
                    <Animated.View style={styles.mask}>
                        <TouchableOpacity onPress={() => allowClose ? closeHandle() : null}>
                            <View/>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={styles.modalBackground}>
                        <ActivityIndicator
                            animating={true}
                            color={color ? color : "#0000FF"}
                            size={size ? size : "large"}
                        />
                    </Animated.View>
                </View>
            </Modal>)
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center"
    },
    mask: {
        position: 'absolute',
        backgroundColor: "#000000",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.5
    },
    modalBackground: {
        justifyContent: "center",
        alignItems: "center"
    }
});