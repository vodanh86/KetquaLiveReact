import React,{Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import {Colors} from '../../common/common.constants';
import IconItem from "./IconItem";
import {window} from "../common.constants";

export default class RegionSelectModal extends Component {
    state = {
        provinces: this.props.data
    };
    render() {
        return (
            <ScrollView style={styles.regionList}>
                {this.state.provinces.map(item => {
                    return (<View style={styles.item} key={item.code}>
                        <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange(item)}>
                            <Text style={styles.itemText}>{item.title}</Text>
                        </TouchableOpacity>
                    </View>);
                })}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    regionList: {
        flex: 1,
        backgroundColor: Colors.white,
        maxHeight: window.height*0.5
    },
    regionListChild: {
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