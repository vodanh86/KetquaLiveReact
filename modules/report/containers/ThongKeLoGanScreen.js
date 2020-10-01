import React from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/ThongKeLoGanStyle';
import ModalExtra from "../../common/components/ModalExtra";
import IconItem from "../../common/components/IconItem";
import RegionSelectFullModal from "../../common/components/RegionSelectFullModal";
import {Colors} from "../../common/common.constants";
import IconLoading from "../../common/components/IconLoading";
import {callAPI} from "../../common/api/callAPI";

class ThongKeLoGanScreen extends React.Component {
    static navigationOptions = {
        title: 'Thống kê lô tô kẹt'
    };
    state = {
        regionID: 'tt',
        regionTitle: 'Miền Bắc',
        results: []
    };

    onRegionChange = region => {
        this.setState({regionID: region.id, regionTitle: region.title});
        this.regionModal.close();
    };

    getResult = async () => {
        this.setState({results: null});
        let result = await callAPI('loto/hardy', {
            region_code: this.state.regionID
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
                        <View style={styles.submitButtonWrap}>
                            <TouchableOpacity style={styles.submitTouch} onPress={this.getResult}>
                                <View style={styles.submitButton}>
                                    <Text style={styles.submitText}>Xem kết quả</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.resultHead}>
                        <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Cặp số</Text></View>
                        <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Chưa về</Text></View>
                        <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Lần về gần nhất</Text></View>
                    </View>
                </View>
                {this.renderResult()}
                <ModalExtra ref={modal => this.regionModal = modal} title={"Chọn tỉnh thành"}>
                    <RegionSelectFullModal onChange={this.onRegionChange} />
                </ModalExtra>
            </View>
        );
    }
    renderResult = () => {
        if(this.state.results === null){
            return (<IconLoading color={Colors.lightBlack} style={{paddingTop: 30}}/>);
        }
        return (<ScrollView style={styles.resultBodyList}>
            {this.state.results.map((item) => {
                    return (<View style={styles.resultBody} key={item.number}>
                        <View style={styles.resultHeadCol}><Text style={styles.resultColTextHighlight}>{item.number}</Text></View>
                        <View style={styles.resultHeadCol}><Text style={styles.resultColText}>{item.count}</Text></View>
                        <View style={styles.resultHeadCol}><Text style={styles.resultColText}>{item.end_time}</Text></View>
                    </View>)
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

export default connect(mapStateToProps, mapDispatchToProps)(ThongKeLoGanScreen);
