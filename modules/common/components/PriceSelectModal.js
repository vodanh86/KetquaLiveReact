import React,{Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import {Colors} from '../../common/common.constants';
import IconItem from "./IconItem";

export default class PriceSelectModal extends Component {
    state = {
        price: 0,
        label: 'Chọn đúng mệnh giá'
    };
    render() {
        return (
            <ScrollView style={styles.list}>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange({price: 20000, label: '20.000 VNĐ'})}>
                        <Text style={styles.itemText}>20.000 VNĐ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange({price: 50000, label: '50.000 VNĐ'})}>
                        <Text style={styles.itemText}>50.000 VNĐ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange({price: 100000, label: '100.000 VNĐ'})}>
                        <Text style={styles.itemText}>100.000 VNĐ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange({price: 200000, label: '200.000 VNĐ'})}>
                        <Text style={styles.itemText}>200.000 VNĐ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange({price: 300000, label: '300.000 VNĐ'})}>
                        <Text style={styles.itemText}>300.000 VNĐ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange({price: 500000, label: '500.000 VNĐ'})}>
                        <Text style={styles.itemText}>500.000 VNĐ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange({price: 1000000, label: '1.000.000 VNĐ'})}>
                        <Text style={styles.itemText}>1.000.000 VNĐ</Text>
                    </TouchableOpacity>
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