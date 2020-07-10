import React, { Fragment } from 'react';
import {
    ScrollView,
    Text,
    View,
    TextInput,
    TouchableOpacity, Platform, DatePickerAndroid,
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from "../styles/SoiCauListStyle";
import IconItem from "../../common/components/IconItem";
import {goToRoute} from "../../common/common.actions";
import {callAPI} from "../../common/api/callAPI";
import IconLoading from "../../common/components/IconLoading";
import {Colors} from "../../common/common.constants";

class SoiCauListScreen extends React.Component {
    static navigationOptions = {
        title: 'Soi Cầu'
    };

    state = {
        region: this.props.navigation.getParam('region'),
        province_id: this.props.navigation.getParam('province_id'),
        date: new Date(),
        date_formatted: new Date().getDate() +'/'+ (new Date().getMonth()+1) +'/'+ new Date().getFullYear(),
        lists: [],
        fetching: true
    };

    async componentDidMount() {
        switch (this.state.region) {
            case 'mb':
                switch (this.state.province_id) {
                    case 'search':
                        let result = await callAPI('loto/prayOne', {
                            number: this.props.navigation.getParam('number'),
                            highlight: 1
                        });
                        if(result.error === 0){
                            this.setState({
                                lists: result.data,
                                fetching: false,
                            });
                        }else{
                            this.setState({
                                fetching: false
                            });
                        }
                        break;
                    case 'bachthu':
                        let result_mb_bt = await callAPI('loto/prayOneWay', {
                            date: this.state.date_formatted,
                            highlight: 1
                        });
                        if(result_mb_bt.error === 0){
                            this.setState({
                                lists: result_mb_bt.data,
                                fetching: false,
                            });
                        }else{
                            this.setState({
                                fetching: false
                            });
                        }
                        break;
                    case 'hainhay':
                        let result_mb_hn = await callAPI('loto/prayDouble', {
                            date: this.state.date_formatted,
                            highlight: 1
                        });
                        if(result_mb_hn.error === 0){
                            this.setState({
                                lists: result_mb_hn.data,
                                fetching: false,
                            });
                        }else{
                            this.setState({
                                fetching: false
                            });
                        }
                        break;
                    case 'dacbiet':
                        let result_mb_db = await callAPI('loto/praySpecial', {
                            date: this.state.date_formatted,
                            highlight: 1
                        });
                        if(result_mb_db.error === 0){
                            this.setState({
                                lists: result_mb_db.data,
                                fetching: false,
                            });
                        }else{
                            this.setState({
                                fetching: false
                            });
                        }
                        break;
                    case 'mienbac':
                    default:
                        let result_mb = await callAPI('loto/prayAll', {
                            region_code: 'tt',
                            date: this.state.date_formatted,
                            highlight: 1
                        });
                        if(result_mb.error === 0){
                            this.setState({
                                lists: result_mb.data,
                                fetching: false,
                            });
                        }else{
                            this.setState({
                                fetching: false
                            });
                        }
                        break;
                }
                break;
            case 'mt':
                let result_mt = await callAPI('loto/prayAll', {
                    region_code: this.state.province_id,
                    date: this.state.date_formatted,
                    highlight: 1
                });
                if(result_mt.error === 0){
                    this.setState({
                        lists: result_mt.data,
                        fetching: false,
                    });
                }else{
                    this.setState({
                        fetching: false
                    });
                }
                break;
            case 'mn':
                let result_mn = await callAPI('loto/prayAll', {
                    region_code: this.state.province_id,
                    date: this.state.date_formatted,
                    highlight: 1
                });
                if(result_mn.error === 0){
                    this.setState({
                        lists: result_mn.data,
                        fetching: false,
                    });
                }else{
                    this.setState({
                        fetching: false
                    });
                }
                break;
        }
    }

    updateLotoTable = () => {
        this.props.comingSoon();
    };
/*
    onChangeDate = (date) => {
        this.setState({date: date, date_formatted: date.getDate() +'/'+ (date.getMonth()+1) +'/'+ date.getFullYear()});
        this.updateLotoTable();
    };*/

    prev = () => {
        this.props.comingSoon();
    };

    next = () => {
        this.props.comingSoon();
    };

    render() {
        return (<View style={styles.container}>
            <View style={styles.dateSwitch}>
                {this.state.region === 'mb' && this.state.province_id === 'search' || 1===1?null:(
                    <TouchableOpacity onPress={this.prev}>
                        <View style={styles.dateNavigator}>
                            <IconItem name={`arrow-back`} />
                        </View>
                    </TouchableOpacity>
                )}
                <View style={styles.datePickerLabel}>
                    <Text style={styles.datePickerLabelText}>Ngày {this.state.date_formatted}</Text>
                </View>
                {this.state.region === 'mb' && this.state.province_id === 'search' || 1===1?null:(
                    <TouchableOpacity onPress={this.next}>
                        <View style={styles.dateNavigator}>
                            <IconItem name={`arrow-forward`} />
                        </View>
                    </TouchableOpacity>
                )}
            </View>
            {this._renderList()}
        </View>);
    }

    _renderList = () => {
        if(this.state.fetching === true){
            return (<IconLoading color={Colors.lightBlack} style={{paddingTop: 30}}/>);
        }
        return (<ScrollView style={styles.ruleList}>
            {this.state.lists.map(item => {
                return (<View style={styles.ruleSection} key={item.count}>
                    <View style={styles.ruleSectionHead}><Text style={styles.ruleSectionHeadText}>Biên độ {item.count} ngày</Text></View>
                    <View style={styles.ruleSectionList}>
                        {item.result.map(num => {
                            return (<TouchableOpacity key={num.position} onPress={() => this.props.goToDetail(this.props.navigation, num, this.state.date, this.state.region)} style={styles.ruleSectionItemTouch}>
                                <Text style={styles.ruleSectionItemText}>{num.number}</Text>
                            </TouchableOpacity>)
                        })}
                    </View>
                </View>)
            })}
        </ScrollView>);
    }
}

const mapStateToProps = (state) => {
    return {
        ...getAppStateMap(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...getAppPropMap(dispatch),
        goToDetail: (navigation, item, date, region) => {
            dispatch(goToRoute(navigation, 'SoiCauDetail', {item: item, date: date, area: region}))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SoiCauListScreen);