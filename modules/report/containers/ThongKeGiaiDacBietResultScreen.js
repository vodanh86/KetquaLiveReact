import React, {Fragment} from 'react';
import {
    ScrollView,
    Text, TouchableWithoutFeedback,
    View
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/ThongKeGiaiDacBietStyle';
import IconLoading from "../../common/components/IconLoading";
import {Colors} from "../../common/common.constants";
import {callAPI} from "../../common/api/callAPI";

class ThongKeGiaiDacBietResultScreen extends React.Component {
    static navigationOptions = {
        title: 'Thống kê giải đặc biệt'
    };
    state = {
        region: this.props.navigation.getParam('region'),
        region_title: this.props.navigation.getParam('region_title'),
        Tong: null,
        Cham: null,
        Laura: null,
        Bang: null,
        tab: "tong"
    };

    async componentDidMount() {
        await this.getResult();
    }

    getResult = async () => {
        let result = await callAPI('loto/special', {
            region_code: this.state.region
        });
        if(result.error === 0){
            this.setState({
                Tong: result.data.sum,
                Cham: result.data.equal,
                Laura: result.data.all,
                Bang: result.data.recently
            });
        }else{
            this.props.alert_error(result.message);
            setTimeout(() => {
                this.props.hide_alert();
            }, 3000);
        }
    };

    onChangeTab = tab => {
        this.setState({tab});
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.switchTab}>
                    <TouchableWithoutFeedback style={styles.switchTabItem} onPress={() => {this.onChangeTab('tong')}}>
                        <View style={this.state.tab==='tong'?styles.tabActive:styles.tabItem}>
                            <Text style={this.state.tab==='tong'?styles.tabTextActive:{}}>Tổng</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={styles.switchTabItem} onPress={() => {this.onChangeTab('cham')}}>
                        <View style={this.state.tab==='cham'?styles.tabActive:styles.tabItem}>
                            <Text style={this.state.tab==='cham'?styles.tabTextActive:{}}>Chạm</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={styles.switchTabItem} onPress={() => {this.onChangeTab('laura')}}>
                        <View style={this.state.tab==='laura'?styles.tabActive:styles.tabItem}>
                            <Text style={this.state.tab==='laura'?styles.tabTextActive:{}}>Lâu ra</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={styles.switchTabItem} onPress={() => {this.onChangeTab('bang')}}>
                        <View style={this.state.tab==='bang'?styles.tabActive:styles.tabItem}>
                            <Text style={this.state.tab==='bang'?styles.tabTextActive:{}}>Bảng</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {this.state.tab === "tong" && this.renderTong()}
                {this.state.tab === "cham" && this.renderCham()}
                {this.state.tab === "laura" && this.renderLaura()}
                {this.state.tab === "bang" && this.renderBang()}
            </View>
        );
    }

    renderTong = () => {
        if(this.state.Tong === null){
            return (<IconLoading color={Colors.lightBlack} style={{paddingTop: 30}}/>);
        }
        return (<Fragment>
            <View style={styles.filterForm}>
                <View style={styles.resultHead}>
                    <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Tổng</Text></View>
                    <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Số ngày chưa về</Text></View>
                </View>
            </View>
            <ScrollView style={styles.resultBodyList}>
                {this.state.Tong.map(item => {
                    return (<View style={styles.resultBody} key={item.number}>
                        <View style={styles.resultHeadCol}><Text style={styles.resultColTextHighlight}>{item.number}</Text></View>
                        <View style={styles.resultHeadCol}><Text style={styles.resultColText}>{item.count}</Text></View>
                    </View>);
                })}
            </ScrollView>
        </Fragment>)
    };

    renderCham = () => {
        if(this.state.Cham === null){
            return (<IconLoading color={Colors.lightBlack} style={{paddingTop: 30}}/>);
        }
        return (<Fragment>
            <View style={styles.filterForm}>
                <View style={styles.resultHead}>
                    <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Chạm</Text></View>
                    <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Số ngày chưa về</Text></View>
                </View>
            </View>
            <ScrollView style={styles.resultBodyList}>
                {this.state.Cham.map(item => {
                    return (<View style={styles.resultBody} key={item.number}>
                        <View style={styles.resultHeadCol}><Text style={styles.resultColTextHighlight}>{item.number}</Text></View>
                        <View style={styles.resultHeadCol}><Text style={styles.resultColText}>{item.count}</Text></View>
                    </View>);
                })}
            </ScrollView>
        </Fragment>)
    };

    renderLaura = () => {
        if(this.state.Laura === null){
            return (<IconLoading color={Colors.lightBlack} style={{paddingTop: 30}}/>);
        }
        return (<Fragment>
            <View style={styles.filterForm}>
                <View style={styles.resultHead}>
                    <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Cặp số</Text></View>
                    <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Số ngày chưa về</Text></View>
                </View>
            </View>
            <ScrollView style={styles.resultBodyList}>
                {this.state.Laura.map(item => {
                    return (<View style={styles.resultBody} key={item.number}>
                        <View style={styles.resultHeadCol}><Text style={styles.resultColTextHighlight}>{item.number}</Text></View>
                        <View style={styles.resultHeadCol}><Text style={styles.resultColText}>{item.count}</Text></View>
                    </View>);
                })}
            </ScrollView>
        </Fragment>)
    };

    renderBang = () => {
        if(this.state.Bang === null){
            return (<IconLoading color={Colors.lightBlack} style={{paddingTop: 30}}/>);
        }
        return (<Fragment>
            <View style={styles.filterForm}>
                <View style={styles.resultHead}>
                    <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Giải đặc biệt</Text></View>
                    <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Ngày mở thưởng</Text></View>
                </View>
            </View>
            <ScrollView style={styles.resultBodyList}>
                {this.state.Bang.map(item => {
                    return (<View style={styles.resultBody} key={item.day}>
                        <View style={styles.resultRowCol}>
                            <Text style={styles.resultColText}>{item.g0.slice(0,-2)}</Text>
                            <Text style={styles.resultColTextHighlight}>{item.g0.slice(-2)}</Text>
                        </View>
                        <View style={styles.resultHeadCol}><Text style={styles.resultColText}>{item.day}</Text></View>
                    </View>);
                })}
            </ScrollView>
        </Fragment>)
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

export default connect(mapStateToProps, mapDispatchToProps)(ThongKeGiaiDacBietResultScreen);
