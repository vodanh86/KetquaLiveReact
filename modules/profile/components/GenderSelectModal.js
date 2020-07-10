import React,{Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import {Colors} from '../../common/common.constants';

export default class GenderSelectModal extends Component {
    state = {
        gender: ''
    };
    render() {
        return (
            <ScrollView style={styles.regionList}>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange('male')}>
                        <Text style={styles.itemText}>Nam</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange('female')}>
                        <Text style={styles.itemText}>Nữ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange('')}>
                        <Text style={styles.itemText}>Khác</Text>
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
        fontSize: 14
    },
    itemTextIndent: {
        fontSize: 14,
        paddingLeft: 15
    }
});