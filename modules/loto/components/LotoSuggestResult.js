import React,{Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

export default class LotoSuggestResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.email
        };
    }
    render() {
        return (
            <View style={styles.wrap}>{this.props.content}</View>
        );
    }

    onClose = () => {
        this.props.onClose();
    }
}

const styles = StyleSheet.create({
    wrap: {
        padding: 15
    }
});