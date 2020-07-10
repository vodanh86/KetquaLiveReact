import React,{Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import {Colors, CONFIG} from '../../common/common.constants';

export default class VipDaySelectModal extends Component {
    render() {
        return (
            <ScrollView style={styles.list}>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange({day: 1, price: CONFIG.vip_price, price_formatted: CONFIG.vip_price_formatted})}>
                        <Text style={styles.itemText}>1 Ngày</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange({day: 7, price: CONFIG.vip_price_7, price_formatted: CONFIG.vip_price_formatted_7})}>
                        <Text style={styles.itemText}>7 Ngày</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange({day: 30, price: CONFIG.vip_price_30, price_formatted: CONFIG.vip_price_formatted_30})}>
                        <Text style={styles.itemText}>30 Ngày</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange({day: 90, price: CONFIG.vip_price_90, price_formatted: CONFIG.vip_price_formatted_90})}>
                        <Text style={styles.itemText}>90 Ngày</Text>
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