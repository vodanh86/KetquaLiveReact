import React, { Fragment } from 'react';
import {
    ScrollView,
    Text,
    View,
    TextInput,
    TouchableOpacity, TouchableWithoutFeedback, FlatList
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/SoiCauStyle';
import IconItem from "../../common/components/IconItem";
import {goToRoute} from "../../common/common.actions";

class SoiCauScreen extends React.Component {
    static navigationOptions = {
        title: 'Soi cầu'
    };

    state = {
        num: "",
        region: "mb"
    };

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

    onChangeRegion = region => {
        this.setState({region});
    };

    onChangeNumber = text => {
        this.setState({num: text});
    };

    submitSearch = () => {
        if(parseInt(this.state.num) > 0){
            this.props.goToSearchList(this.props.navigation, 'mb','search', this.state.num)
        }else{
            this.numberInput.focus();
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.switchTab}>
                    <TouchableWithoutFeedback style={styles.switchTabItem} onPress={() => {this.onChangeRegion('mb')}}>
                        <View style={this.state.region==='mb'?styles.regionActive:styles.regionItem}>
                            <Text style={this.state.region==='mb'?styles.regionTextActive:{}}>Miền Bắc</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={styles.switchTabItem} onPress={() => {this.onChangeRegion('mt')}}>
                        <View style={this.state.region==='mt'?styles.regionActive:styles.regionItem}>
                            <Text style={this.state.region==='mt'?styles.regionTextActive:{}}>Miền Trung</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={styles.switchTabItem} onPress={() => {this.onChangeRegion('mn')}}>
                        <View style={this.state.region==='mn'?styles.regionActive:styles.regionItem}>
                            <Text style={this.state.region==='mn'?styles.regionTextActive:{}}>Miền Nam</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {this.state.region === "mb" && this._mienBac}
                {this.state.region === "mt" && this._mienTrung}
                {this.state.region === "mn" && this._mienNam}
            </View>
        );
    }

    _mienBac = (<Fragment>
            <View style={styles.filterForm}>
                <Text style={styles.label}>Cặp số:</Text>
                <TextInput ref={ref => this.numberInput = ref} onChangeText={this.onChangeNumber} style={styles.input} keyboardType={`numeric`}  enablesReturnKeyAutomatically={true} returnKeyType={`done`} maxLength={2} />
                <TouchableOpacity style={styles.submit} onPress={this.submitSearch}><Text style={styles.submitText}>Tìm cầu</Text></TouchableOpacity>
            </View>
            <View style={styles.menuItem}>
                <TouchableOpacity style={styles.option} onPress={() => this.props.goToList(this.props.navigation,'mb','mienbac')}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.optionIconContainer}>
                            <IconItem name={`compass-outline`} type={`mc`} />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionText}>Cầu Miền Bắc</Text>
                        </View>
                        <View style={styles.optionIconMore}>
                            <IconItem name={`angle-right`} type={`awesome`} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => this.props.goToList(this.props.navigation,'mb','bachthu')}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.optionIconContainer}>
                            <IconItem name={`compass-outline`} type={`mc`} />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionText}>Cầu Miền Bắc - Bạch thủ</Text>
                        </View>
                        <View style={styles.optionIconMore}>
                            <IconItem name={`angle-right`} type={`awesome`} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => this.props.goToList(this.props.navigation,'mb','hainhay')}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.optionIconContainer}>
                            <IconItem name={`compass-outline`} type={`mc`} />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionText}>Cầu Miền Bắc - Về hai nháy</Text>
                        </View>
                        <View style={styles.optionIconMore}>
                            <IconItem name={`angle-right`} type={`awesome`} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => this.props.goToList(this.props.navigation,'mb','dacbiet')}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.optionIconContainer}>
                            <IconItem name={`compass-outline`} type={`mc`} />
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionText}>Cầu Miền Bắc - Đặc biệt</Text>
                        </View>
                        <View style={styles.optionIconMore}>
                            <IconItem name={`angle-right`} type={`awesome`} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View></Fragment>);


    _renderMienTrungItem = ({item}) => {
        return <TouchableOpacity key={item.title} style={styles.option} onPress={() => this.props.goToList(this.props.navigation,'mt',item.id)}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionIconContainer}>
                    <IconItem name={`compass-outline`} type={`mc`} />
                </View>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>{item.title}</Text>
                </View>
                <View style={styles.optionIconMore}>
                    <IconItem name={`angle-right`} type={`awesome`} />
                </View>
            </View>
        </TouchableOpacity>
    };

    _renderMienNamItem = ({item}) => {
        return <TouchableOpacity key={item.title} style={styles.option} onPress={() => this.props.goToList(this.props.navigation,'mn',item.id)}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionIconContainer}>
                    <IconItem name={`compass-outline`} type={`mc`} />
                </View>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>{item.title}</Text>
                </View>
                <View style={styles.optionIconMore}>
                    <IconItem name={`angle-right`} type={`awesome`} />
                </View>
            </View>
        </TouchableOpacity>
    };

    _mienTrung = (<FlatList
            style={styles.menuItemList}
            data={this.MienTrung}
            keyExtractor={(item, index) => item.title}
            renderItem={this._renderMienTrungItem}
        />);

    _mienNam = (<FlatList
            style={styles.menuItemList}
            data={this.MienNam}
            keyExtractor={(item, index) => item.title}
            renderItem={this._renderMienNamItem}
        />);
}


const mapStateToProps = (state) => {
    return {
        ...getAppStateMap(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...getAppPropMap(dispatch),
        goToList: (navigation, region, province_id) => {
            dispatch(goToRoute(navigation, 'SoiCauList',{region: region, province_id: province_id}));
        },
        goToSearchList: (navigation, region, province_id, number) => {
            dispatch(goToRoute(navigation, 'SoiCauList',{region: region, province_id: province_id, number: number}));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SoiCauScreen);
