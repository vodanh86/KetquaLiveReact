import React,{Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import {Colors} from '../../common/common.constants';
import IconItem from "./IconItem";

export default class ImagePickerModal extends Component {
    state = {
        gender: ''
    };
    render() {
        return (
            <ScrollView style={styles.regionList}>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange('library')}>
                        <Text style={styles.itemText}>Ảnh trong điện thoại</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange('camera')}>
                        <Text style={styles.itemText}>Chụp ảnh mới</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    regionList: {
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
        fontSize: 16
    },
    itemTextIndent: {
        fontSize: 14,
        paddingLeft: 15
    }
});