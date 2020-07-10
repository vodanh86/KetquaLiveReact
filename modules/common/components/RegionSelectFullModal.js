import React,{Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import {Colors} from '../../common/common.constants';
import IconItem from "./IconItem";
import {window} from "../common.constants";

export default class RegionSelectFullModal extends Component {
    state = {
        region: ''
    };
    MienBac = {id: "tt", title: "Miền Bắc"};
    MienTrung = [
        {id: "bd", title: "Bình Định"},
        {id: "dn", title: "Đà Nẵng"},
        {id: "dl", title: "Đắk Lắk"},
        {id: "dng", title: "Đắc Nông"},
        {id: "gl", title: "Gia Lai"},
        {id: "kh", title: "Khánh Hòa"},
        {id: "kt", title: "Kon Tum"},
        {id: "nt", title: "Ninh Thuận"},
        {id: "qb", title: "Quảng Bình"},
        {id: "qn", title: "Quảng Ngãi"},
        {id: "qna", title: "Quảng Nam"},
        {id: "qt", title: "Quảng Trị"},
        {id: "tth", title: "Thừa Thiên Huế"},
        {id: "py", title: "Phú Yên"},
    ];
    MienNam = [
        {id: "ag", title: "An Giang"},
        {id: "bl", title: "Bạc Liêu"},
        {id: "bt", title: "Bến Tre"},
        {id: "bdu", title: "Bình Dương"},
        {id: "bp", title: "Bình Phước"},
        {id: "bth", title: "Bình Thuận"},
        {id: "cm", title: "Cà Mau"},
        {id: "ct", title: "Cần Thơ"},
        {id: "dla", title: "Đà Lạt"},
        {id: "dna", title: "Đồng Nai"},
        {id: "dt", title: "Đồng Tháp"},
        {id: "hg", title: "Hậu Giang"},
        {id: "hcm", title: "Hồ Chí Minh"},
        {id: "kg", title: "Kiên Giang"},
        {id: "la", title: "Long An"},
        {id: "st", title: "Sóc Trăng"},
        {id: "tn", title: "Tây Ninh"},
        {id: "tg", title: "Tiền Giang"},
        {id: "tv", title: "Trà Vinh"},
        {id: "vl", title: "Vĩnh Long"},
        {id: "vt", title: "Vũng Tàu"},

    ];
    render() {
        return (
            <ScrollView style={styles.regionList}>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange(this.MienBac)}>
                        <Text style={styles.itemText}>Miền Bắc</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                    <TouchableWithoutFeedback onPress={() => this.setState({region: this.state.region==='middle'?'':'middle'})}>
                        <View style={styles.itemTouch}>
                            <Text style={styles.itemText}>Miền Trung</Text>
                            <IconItem name={this.state.region==='middle'?`arrow-down`:`arrow-forward`} size={22} />
                        </View>
                    </TouchableWithoutFeedback>
                    {this.state.region==='middle' &&
                        <View style={styles.regionListChild}>
                            {this.MienTrung.map(item => {
                                return <View style={styles.item} key={item.title}>
                                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange(item)}>
                                        <Text style={styles.itemTextIndent}>{item.title}</Text>
                                    </TouchableOpacity>
                                </View>
                            })}
                        </View>
                    }
                </View>
                <View style={styles.item}>
                    <TouchableWithoutFeedback onPress={() => this.setState({region: this.state.region==='bottom'?'':'bottom'})}>
                        <View style={styles.itemTouch}>
                            <Text style={styles.itemText}>Miền Nam</Text>
                            <IconItem name={this.state.region==='bottom'?`arrow-down`:`arrow-forward`} size={22} />
                        </View>
                    </TouchableWithoutFeedback>
                    {this.state.region==='bottom' &&
                        <View style={styles.regionListChild}>
                            {this.MienNam.map(item => {
                                return <View style={styles.item} key={item.title}>
                                    <TouchableOpacity style={styles.itemTouch} onPress={() => this.props.onChange(item)}>
                                        <Text style={styles.itemTextIndent}>{item.title}</Text>
                                    </TouchableOpacity>
                                </View>
                            })}
                        </View>
                        }
                </View>
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
    itemChild: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 10
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