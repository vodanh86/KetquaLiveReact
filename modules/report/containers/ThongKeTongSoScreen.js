import React from 'react';
import {
    DatePickerAndroid,
    Platform,
    ScrollView,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/ThongKeTongSoStyle';
import ModalExtra from "../../common/components/ModalExtra";
import IconItem from "../../common/components/IconItem";
import RegionSelectFullModal from "../../common/components/RegionSelectFullModal";
import ListModal from "../../common/components/ListModal";
import DateTimeSelectModal from "../../common/components/DateTimeSelectModal";
import moment from "moment";

class ThongKeTongSoScreen extends React.Component {
    static navigationOptions = {
        title: 'Thống kê tổng số'
    };
    state = {
        regionID: 'tt',
        regionTitle: 'Miền Bắc',
        setID: 0,
        setLabel: '0',
        start_date: moment().subtract(10, 'days').toDate(),
        end_date: new Date()
    };

    set_list = [
        {value: 0, label: '0'},
        {value: 1, label: '1'},
        {value: 2, label: '2'},
        {value: 3, label: '3'},
        {value: 4, label: '4'},
        {value: 5, label: '5'},
        {value: 6, label: '6'},
        {value: 7, label: '7'},
        {value: 8, label: '8'},
        {value: 9, label: '9'}
    ];

    onRegionChange = region => {
        this.setState({regionD: region.id, regionTitle: region.title});
        this.regionModal.close();
    };

    onSetChange = set => {
        this.setState({setID: set.value, setLabel: set.label});
        this.setModal.close();
    };

    onChangeStartDate = date => {
        this.setState({start_date: date});
    };

    onChangeEndDate = date => {
        this.setState({end_date: date});
    };

    openStartDatePicker = async () => {
        if(Platform.OS === 'ios'){
            this.startDateModal.open();
        }else{
            try {
                const {action, year, month, day} = await DatePickerAndroid.open({
                    date: new Date(this.state.date)
                });
                if (action !== DatePickerAndroid.dismissedAction) {
                    this.onChangeStartDate(new Date(year, month, day));
                }
            } catch ({code, message}) {
                console.warn('Không mở được lịch của máy', message);
            }
        }
    };


    openEndDatePicker = async () => {
        if(Platform.OS === 'ios'){
            this.endDateModal.open();
        }else{
            try {
                const {action, year, month, day} = await DatePickerAndroid.open({
                    date: new Date(this.state.date)
                });
                if (action !== DatePickerAndroid.dismissedAction) {
                    this.onChangeEndDate(new Date(year, month, day));
                }
            } catch ({code, message}) {
                console.warn('Không mở được lịch của máy', message);
            }
        }
    };

    submitForm = () => {
        this.props.goToRoute(this.props.navigation, 'ThongKeTongSoResult', {
            region: this.state.regionID,
            region_title: this.state.regionTitle,
            set: this.state.setID,
            start: moment(this.state.start_date).format('DD/MM/YYYY'),
            end: moment(this.state.end_date).format('DD/MM/YYYY')
        });
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
                            <Text style={styles.label}>Từ ngày</Text>
                            <TouchableOpacity style={styles.dropdownInput} onPress={this.openStartDatePicker}>
                                <Text style={styles.dropdownInputValue}>{this.state.start_date.getDate()}/{this.state.start_date.getMonth()+1}/{this.state.start_date.getFullYear()}</Text>
                                <IconItem name={`arrow-down`} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Đến ngày</Text>
                            <TouchableOpacity style={styles.dropdownInput} onPress={this.openEndDatePicker}>
                                <Text style={styles.dropdownInputValue}>{this.state.end_date.getDate()}/{this.state.end_date.getMonth()+1}/{this.state.end_date.getFullYear()}</Text>
                                <IconItem name={`arrow-down`} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Chọn tổng</Text>
                            <TouchableOpacity style={styles.dropdownInput} onPress={() => this.setModal.open()}>
                                <Text style={styles.dropdownInputValue}>{this.state.setLabel}</Text>
                                <IconItem name={`arrow-down`} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.submitButtonWrap}>
                            <TouchableOpacity style={styles.submitTouch} onPress={this.submitForm}>
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
                <ModalExtra ref={modal => this.setModal = modal} title={"Chọn tổng muốn xem"}>
                    <ListModal onChange={this.onSetChange} data={this.set_list} />
                </ModalExtra>
                <ModalExtra ref={modal => this.startDateModal = modal} title={"Từ ngày"}>
                    <DateTimeSelectModal onChange={this.onChangeStartDate} date={this.state.start_date}/>
                </ModalExtra>
                <ModalExtra ref={modal => this.endDateModal = modal} title={"Đến ngày"}>
                    <DateTimeSelectModal onChange={this.onChangeEndDate} date={this.state.end_date} />
                </ModalExtra>
            </View>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(ThongKeTongSoScreen);
