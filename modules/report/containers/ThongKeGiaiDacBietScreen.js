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
import styles from '../styles/ThongKeGiaiDacBietStyle';
import ModalExtra from "../../common/components/ModalExtra";
import IconItem from "../../common/components/IconItem";
import RegionSelectFullModal from "../../common/components/RegionSelectFullModal";

class ThongKeGiaiDacBietScreen extends React.Component {
    static navigationOptions = {
        title: 'Thống kê giải đặc biệt'
    };
    state = {
        regionID: 'tt',
        regionTitle: 'Miền Bắc',
    };

    onRegionChange = region => {
        this.setState({regionID: region.id, regionTitle: region.title});
        this.regionModal.close();
    };

    submitForm = () => {
        this.props.goToRoute(this.props.navigation, 'ThongKeGiaiDacBietResult', {
            region: this.state.regionID,
            region_title: this.state.regionTitle
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

export default connect(mapStateToProps, mapDispatchToProps)(ThongKeGiaiDacBietScreen);
