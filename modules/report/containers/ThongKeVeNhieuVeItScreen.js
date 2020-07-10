import React from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/ThongKeVeNhieuVeItStyle';
import ModalExtra from "../../common/components/ModalExtra";
import IconItem from "../../common/components/IconItem";
import RegionSelectFullModal from "../../common/components/RegionSelectFullModal";
import ListModal from "../../common/components/ListModal";

class ThongKeVeNhieuVeItScreen extends React.Component {
    static navigationOptions = {
        title: 'Thống kê về nhiều, về ít'
    };
    state = {
        regionID: 'tt',
        regionTitle: 'Miền Bắc',
        setID: 1,
        setLabel: 'Về ít',
        dayNumber: 10,
        results: [],
        special_results: []
    };

    set_list = [
        {value: 1, label: 'Về ít'},
        {value: 2, label: 'Về nhiều'},
        {value: 3, label: 'Chưa về'},
    ];

    day_list = [
        {value: 10, label: '10'},
        {value: 30, label: '30'},
        {value: 60, label: '60'},
        {value: 100, label: '100'},
        {value: 365, label: '365'},
    ];

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
                            <Text style={styles.label}>Số lần quay</Text>
                            <TouchableOpacity style={styles.dropdownInput} onPress={() => this.dayNumberModal.open()}>
                                <Text style={styles.dropdownInputValue}>{this.state.dayNumber}</Text>
                                <IconItem name={`arrow-down`} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Thống kê</Text>
                            <TouchableOpacity style={styles.dropdownInput} onPress={() => this.setModal.open()}>
                                <Text style={styles.dropdownInputValue}>{this.state.setLabel}</Text>
                                <IconItem name={`arrow-down`} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.submitButtonWrap}>
                            <TouchableOpacity style={styles.submitTouch} onPress={this.goToResult}>
                                <View style={styles.submitButton}>
                                    <Text style={styles.submitText}>Xem kết quả</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ModalExtra ref={modal => this.regionModal = modal} title={"Chọn tỉnh thành"}>
                    <RegionSelectFullModal onChange={this.onRegionChange} />
                </ModalExtra>
                <ModalExtra ref={modal => this.setModal = modal} title={"Hình thức thống kê"}>
                    <ListModal onChange={this.onSetChange} data={this.set_list} />
                </ModalExtra>
                <ModalExtra ref={modal => this.dayNumberModal = modal} title={"Số lần quay"}>
                    <ListModal onChange={this.onDayNumberChange} data={this.day_list} />
                </ModalExtra>
            </View>
        );
    }

    goToResult = () => {
        this.props.goToRoute(this.props.navigation, 'ThongKeNhieuItResult', {
            region: this.state.regionID,
            region_title: this.state.regionTitle,
            type: this.state.setID,
            limit: this.state.dayNumber,
        });
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ThongKeVeNhieuVeItScreen);
