import React,{Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, DatePickerIOS} from 'react-native';
import {Colors} from '../../common/common.constants';
import IconItem from "./IconItem";

export default class DateTimeSelectModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: props.date,
            time: '',
            mode: 'date'
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' &&
                    <DatePickerIOS
                        mode={this.state.mode}
                        date={this.state.date}
                        maximumDate={new Date()}
                        onDateChange={(date) => {this.setState({date});this.props.onChange(date)}}
                    />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    }
});