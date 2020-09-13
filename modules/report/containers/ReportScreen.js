import React from 'react';
import {
    TouchableOpacity,
    ScrollView,
    Text,
    View
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/ReportStyle';
import MenuLeftButton from '../../../modules/common/components/MenuLeftButton';
import MenuNotifyButton from '../../../modules/common/components/MenuNotifyButton';
import IconItem from "../../common/components/IconItem";

class ReportScreen extends React.Component {
    static navigationOptions = {
        title: 'Thống kê',
        headerLeft: <MenuLeftButton />,
        headerRight: <MenuNotifyButton />,
    };
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.menuItem}>
                    <TouchableOpacity style={styles.option} onPress={() => this.props.goToRoute(this.props.navigation, 'SoiCau')}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.optionIconContainer}>
                                <IconItem name={`compass-outline`} type={`mc`} />
                            </View>
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionText}>Soi cầu</Text>
                            </View>
                            <View style={styles.optionIconMore}>
                                <IconItem name={`angle-right`} type={`awesome`} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.menuItem}>
                    <TouchableOpacity style={styles.option} onPress={() => this.props.goToRoute(this.props.navigation, 'ThongKeTanSuat')}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.optionIconContainer}>
                                <IconItem name={`chart-bar-stacked`} type={`mc`} />
                            </View>
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionText}>Thống kê tần suất</Text>
                            </View>
                            <View style={styles.optionIconMore}>
                                <IconItem name={`angle-right`} type={`awesome`} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.menuItem}>
                    <TouchableOpacity style={styles.option} onPress={() => this.props.goToRoute(this.props.navigation, 'ThongKeVeNhieuVeIt')}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.optionIconContainer}>
                                <IconItem name={`chart-timeline`} type={`mc`} />
                            </View>
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionText}>Thống kê về nhiều, về ít</Text>
                            </View>
                            <View style={styles.optionIconMore}>
                                <IconItem name={`angle-right`} type={`awesome`} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.menuItem}>
                    <TouchableOpacity style={styles.option} onPress={() => this.props.goToRoute(this.props.navigation, 'ThongKeTongSo')}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.optionIconContainer}>
                                <IconItem name={`chart-arc`} type={`mc`} />
                            </View>
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionText}>Thống kê tổng số</Text>
                            </View>
                            <View style={styles.optionIconMore}>
                                <IconItem name={`angle-right`} type={`awesome`} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.menuItem}>
                    <TouchableOpacity style={styles.option} onPress={() => this.props.goToRoute(this.props.navigation, 'ThongKeLoGan')}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.optionIconContainer}>
                                <IconItem name={`chart-scatter-plot-hexbin`} type={`mc`} />
                            </View>
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionText}>Thống kê lô tô gan</Text>
                            </View>
                            <View style={styles.optionIconMore}>
                                <IconItem name={`angle-right`} type={`awesome`} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.menuItem}>
                    <TouchableOpacity style={styles.option} onPress={() => this.props.goToRoute(this.props.navigation, 'ThongKeLoRoi')}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.optionIconContainer}>
                                <IconItem name={`line-chart`} type={`awesome`} />
                            </View>
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionText}>Thống kê lô tô rơi</Text>
                            </View>
                            <View style={styles.optionIconMore}>
                                <IconItem name={`angle-right`} type={`awesome`} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.menuItem}>
                    <TouchableOpacity style={styles.option} onPress={() => this.props.goToRoute(this.props.navigation, 'ThongKeGiaiDacBiet')}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.optionIconContainer}>
                                <IconItem name={`bar-chart-o`} type={`awesome`} />
                            </View>
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionText}>Thống kê giải đặc biệt</Text>
                            </View>
                            <View style={styles.optionIconMore}>
                                <IconItem name={`angle-right`} type={`awesome`} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);
