import React, {Fragment} from 'react';
import {
    ScrollView,
    Text, TouchableOpacity,
    View
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/ThongKeVeNhieuVeItStyle';
import {Colors} from "../../common/common.constants";
import IconLoading from "../../common/components/IconLoading";
import {callAPI} from "../../common/api/callAPI";

class ThongKeVeItVeNhieuResultScreen extends React.Component {
    static navigationOptions = {
        title: 'Thống kê về nhiều, về ít'
    };

    constructor(props){
        super(props);
        this.state = {
            tab: 'loto',
            region: props.navigation.getParam('region'),
            region_title: props.navigation.getParam('region_title'),
            type: props.navigation.getParam('type'),
            limit: props.navigation.getParam('limit'),
            results: [],
            special_results: []
        };
    }

    async componentDidMount() {
        await this.getResult();
    }


    getResult = async () => {
        this.setState({results: null});
        let result = await callAPI('loto/times', {
            region_code: this.state.region,
            limit: this.state.limit,
            type: this.state.type
        });
        if(result.error === 0){
            this.setState({
                results: result.data.loto,
                special_results: result.data.special
            });
        }else{
            this.props.alert_error(result.message);
            setTimeout(() => {
                this.props.hide_alert();
            }, 3000);
        }
    };

    changeTab = tab => {
        this.setState({tab: tab});
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mainTab}>
                    <TouchableOpacity
                        onPress={() => {this.changeTab('loto')}}
                        style={this.state.tab==='loto'?styles.mainTabItemActive:styles.mainTabItem}
                    >
                        <View style={styles.mainTabItemView}>
                            <Text style={this.state.tab==='loto'?styles.mainTabItemTextActive:styles.mainTabItemText}>Lô tô</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {this.changeTab('special')}}
                        style={this.state.tab==='special'?styles.mainTabItemActive:styles.mainTabItem}
                    >
                        <View style={styles.mainTabItemView}>
                            <Text style={this.state.tab==='special'?styles.mainTabItemTextActive:styles.mainTabItemText}>Giải đặc biệt</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {this.state.tab === 'loto'?this.renderResult():null}
                {this.state.tab === 'special'?this.renderSpecialResult():null}
            </View>
        );
    }


    renderResult = () => {
        if(this.state.results === null){
            return (<IconLoading color={Colors.lightBlack} style={{paddingTop: 30}}/>);
        }
        return (<Fragment>
            <View style={styles.resultHead}>
                <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Bộ số</Text></View>
                <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Số lần</Text></View>
            </View>
            <ScrollView style={styles.resultBodyList}>
            {this.state.results.map((item) => {
                return (<View style={styles.resultBody} key={item.number}>
                    <View style={styles.resultHeadCol}><Text style={styles.resultColTextHighlight}>{item.number}</Text></View>
                    <View style={styles.resultHeadCol}><Text style={styles.resultColText}>{item.number_times}</Text></View>
                </View>)
            })}
            </ScrollView>
        </Fragment>);
    };

    renderSpecialResult = () => {
        if(this.state.special_results === null){
            return (<IconLoading color={Colors.lightBlack} style={{paddingTop: 30}}/>);
        }
        return (<Fragment>
            <View style={styles.resultHead}>
                <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Bộ số</Text></View>
                <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Số lần</Text></View>
            </View>
            <ScrollView style={styles.resultBodyList}>
            {this.state.special_results.map((item) => {
                return (<View style={styles.resultBody} key={item.number}>
                    <View style={styles.resultHeadCol}><Text style={styles.resultColTextHighlight}>{item.number}</Text></View>
                    <View style={styles.resultHeadCol}><Text style={styles.resultColText}>{item.number_times}</Text></View>
                </View>)
            })}
            </ScrollView></Fragment>);
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

export default connect(mapStateToProps, mapDispatchToProps)(ThongKeVeItVeNhieuResultScreen);
