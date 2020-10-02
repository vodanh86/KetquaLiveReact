import React from 'react';
import {
    ScrollView,
    Text,
    View
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/ThongKeTongSoStyle';
import {Colors} from "../../common/common.constants";
import IconLoading from "../../common/components/IconLoading";
import {callAPI} from "../../common/api/callAPI";

class ThongKeTongSoScreen extends React.Component {
    static navigationOptions = {
        title: 'Thống kê tổng số'
    };

    constructor(props){
        super(props);
        this.state = {
            region: props.navigation.getParam('region'),
            region_title: props.navigation.getParam('region_title'),
            set: props.navigation.getParam('set'),
            start: props.navigation.getParam('start'),
            end: props.navigation.getParam('end'),
            results: []
        };
    }

    async componentDidMount() {
        await this.getResult();
    }

    getResult = async () => {
        this.setState({results: null});
        let result = await callAPI('loto/total', {
            region_code: this.state.region,
            start_date: this.state.start,
            end_date: this.state.end,
            sum: this.state.set
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
                <View style={styles.statMetaText}>
                    <Text style={styles.statText}>Tổng <Text style={styles.textHighlight}>{this.state.set}</Text> tại <Text style={styles.textHighlight}>{this.state.region_title}</Text></Text>
                    <Text style={styles.statText}>Từ {this.state.start} đến {this.state.end}</Text>
                </View>
                <View style={styles.filterForm}>
                    <View style={styles.resultHead}>
                        <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Cặp số</Text></View>
                        <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Số lần về</Text></View>
                        <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Về gần nhất</Text></View>
                        <View style={styles.resultHeadCol}><Text style={styles.resultHeadText}>Ngày chưa về</Text></View>
                    </View>
                </View>
                {this.renderResult()}
            </View>
        );
    }

    renderResult = () => {
        if(this.state.results === null){
            return (<IconLoading color={Colors.lightBlack} style={{paddingTop: 30}}/>)
        }
        var newResults = [];
        for (var key in this.state.results) {
            if (this.state.results.hasOwnProperty(key)) {
                newResults.push(this.state.results[key])
            }
          }
        return (<ScrollView style={styles.resultBodyList}>
            {newResults.map(item => {
               return (<View style={styles.resultBody} key={item.number}>
                   <View style={styles.resultHeadCol}><Text style={styles.resultColTextHighlight}>{item.number}</Text></View>
                   <View style={styles.resultHeadCol}><Text style={styles.resultColText}>{item.number_times}</Text></View>
                   <View style={styles.resultHeadCol}><Text style={styles.resultColText}>{item.end_time}</Text></View>
                   <View style={styles.resultHeadCol}><Text style={styles.resultColText}>{item.count+1}</Text></View>
               </View>);
            })}
        </ScrollView>)
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

export default connect(mapStateToProps, mapDispatchToProps)(ThongKeTongSoScreen);
