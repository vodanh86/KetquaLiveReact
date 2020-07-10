import React from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/ThongKeTanSuatStyle';
import ModalExtra from "../../common/components/ModalExtra";
import IconItem from "../../common/components/IconItem";
import RegionSelectFullModal from "../../common/components/RegionSelectFullModal";
import ListModal from "../../common/components/ListModal";
import {Colors} from "../../common/common.constants";
import IconLoading from "../../common/components/IconLoading";
import {callAPI} from "../../common/api/callAPI";
import {number_format} from "../../common/common.helpers";

class ThongKeTanSuatScreen extends React.Component {
    static navigationOptions = {
        title: 'Thống kê tần suất'
    };
    state = {
        regionID: 'tt',
        regionTitle: 'Miền Bắc',
        setID: 1,
        setLabel: 'Tất cả',
        dayNumber: 10,
        results: []
    };

    set_list = [
        {value: 1, label: 'Tất cả'},
        {value: 2, label: 'Đầu'},
        {value: 3, label: 'Đuôi'},
    ];

    day_list = [
        {value: 10, label: '10'},
        {value: 30, label: '30'},
        {value: 50, label: '50'},
        {value: 100, label: '100'},
        {value: 300, label: '300'},
        {value: 500, label: '500'},
    ];

    result = [
        {num: '01', day: 6, count: 8, per: 1.33},
        {num: '02', day: 6, count: 8, per: 1.33},
        {num: '03', day: 6, count: 8, per: 1.33},
        {num: '04', day: 6, count: 8, per: 1.33},
        {num: '05', day: 6, count: 8, per: 1.33},
        {num: '06', day: 6, count: 8, per: 1.33},
        {num: '07', day: 6, count: 8, per: 1.33},
        {num: '08', day: 6, count: 8, per: 1.33},
        {num: '09', day: 6, count: 8, per: 1.33},
        {num: '10', day: 6, count: 8, per: 1.33},
    ];

    getResult = async () => {
        this.setState({results: null});
        let result = await callAPI('loto/frequency', {
            region_code: this.state.regionID,
            type: this.state.setID,
            limit: this.state.dayNumber
        });
        if(result.error === 0){
            this.setState({results: result.data});
        }else{
            this.props.alert_error(result.message);
            setTimeout(() => {
                this.props.hide_alert();
            }, 3000);
        }
    };

    onRegionChange = region => {
        this.setState({regionID: region.id, regionTitle: region.title});
        this.regionModal.close();
    };

    onSetChange = set => {
        this.setState({setID: set.value, setLabel: set.label});
        this.setModal.close();
    };

    onDayNumberChange = day => {
        this.setState({dayNumber: day.value});
        this.dayNumberModal.close();
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.filterForm}>
                    <View style={styles.filterFormInner}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Chọn tỉnh</Text>
                            <TouchableOpacity style={styles.dropdownInput} onPress={() => this.regionModal.open()}>
                                <Text style={styles.dropdownInputValue}>{this.state.regionTitle}</Text>
                                <IconItem name={`arrow-down`} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Chọn bộ số</Text>
                            <TouchableOpacity style={styles.dropdownInput} onPress={() => this.setModal.open()}>
                                <Text style={styles.dropdownInputValue}>{this.state.setLabel}</Text>
                                <IconItem name={`arrow-down`} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Chọn số ngày</Text>
                            <TouchableOpacity style={styles.dropdownInput} onPress={() => this.dayNumberModal.open()}>
                                <Text style={styles.dropdownInputValue}>{this.state.dayNumber}</Text>
                                <IconItem name={`arrow-down`} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.submitButtonWrap}>
                            <TouchableOpacity style={styles.submitTouch} onPress={this.getResult}>
                                <View style={styles.submitButton}>
                                    <Text style={styles.submitText}>Xem kết quả</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.resultHead}>
                        <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Bộ số</Text></View>
                        <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Số ngày về</Text></View>
                        <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Số lần về</Text></View>
                        <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Tần suất</Text></View>
                    </View>
                </View>
                {this.renderResult()}
                <ModalExtra ref={modal => this.regionModal = modal} title={"Chọn tỉnh thành"}>
                    <RegionSelectFullModal onChange={this.onRegionChange} />
                </ModalExtra>
                <ModalExtra ref={modal => this.setModal = modal} title={"Chọn bộ số"}>
                    <ListModal onChange={this.onSetChange} data={this.set_list} />
                </ModalExtra>
                <ModalExtra ref={modal => this.dayNumberModal = modal} title={"Chọn số ngày"}>
                    <ListModal onChange={this.onDayNumberChange} data={this.day_list} />
                </ModalExtra>
            </View>
        );
    }

    renderResult = () => {
        if(this.state.results === null){
            return (<IconLoading color={Colors.lightBlack} style={{paddingTop: 30}}/>);
        }

        return (<ScrollView style={styles.resultBodyList}>
            {this.state.results.map(item => {
                return (<View style={styles.resultBody} key={item.number}>
                    <View style={styles.resultHeadCol}><Text style={styles.resultColTextHighlight}>{item.number}</Text></View>
                    <View style={styles.resultHeadCol}><Text style={styles.resultColText}>{item.number_days}</Text></View>
                    <View style={styles.resultHeadCol}><Text style={styles.resultColText}>{item.number_times}</Text></View>
                    <View style={styles.resultHeadCol}><Text style={styles.resultColText}>{number_format(item.number_times/item.number_days, 1, '.', ',')} lần/ngày</Text></View>
                </View>);
            })}
    </ScrollView>);
    };
}


const mapStateToProps = (state) => {
    return {
        ...getAppStateMap(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...getAppPropMap(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThongKeTanSuatScreen);