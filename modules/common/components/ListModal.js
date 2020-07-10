import React,{Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import {Colors} from '../../common/common.constants';
import IconItem from "./IconItem";

export default class ListModal extends Component {
    state = {
        value: 0,
        label: 'Chọn'
    };
    render() {
        return (
            <ScrollView style={styles.list}>
                <View style={styles.item}>
                    {this.props.data.map(item => {
                        return <TouchableOpacity key={item.label} style={styles.itemTouch} onPress={() => this.props.onChange({value: item.value, label: item.label})}>
                            <Text style={styles.itemText}>{item.label}</Text>
                        </TouchableOpacity>
                    })}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: Colors.white
    },
    item: {
        backgroundColor: '#fdfdfd',
    },
    itemTouch: {
        flex: 1,
        flexDirection: `row`,
        justifyContent: `space-between`,
        alignItems: `center`,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EDEDED',
    },
    itemText: {
        fontSize: 14
    },
    itemTextIndent: {
        fontSize: 14,
        paddingLeft: 15
    }
});