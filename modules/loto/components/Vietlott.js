import React, {Component, Fragment} from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import styles from "../styles/LotoStyle";
import IconItem from "../../common/components/IconItem";
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from "react-redux";
import {callAPI} from "../../common/api/callAPI";
import moment from "./Loto";
import IconLoading from "../../common/components/IconLoading";
import {Colors} from "../../common/common.constants";


class Vietlott extends Component {

    liveObj = null;

    state = {
        loading: true,
        isRefreshing: false,
        no_more: false,
        fetching: false,
        has_live: false,
        limit: 10,
        vietlott_type: 'mega',
        max4d: null,
        power: [],
        power_latest: null,
        vietlott_mega: [],
        vietlott_mega_latest: null
    };


    async UNSAFE_componentWillMount(){
        await this.getMega();
    }

    getMega = async () => {
        if(this.liveObj !== null){
            clearTimeout(this.liveObj);
            this.liveObj = null;
        }
        if(this.state.fetching === false){
            await this.setState({fetching: true});
            let max_id = 0;
            if(this.state.vietlott_mega.length > 0){
                max_id = await this.state.vietlott_mega[this.state.vietlott_mega.length - 1].id;
            }
            let result = await callAPI('vietlott/mega',{max_id: max_id, limit: this.state.limit});
            if(result.error === 0){
                let listMega = this.state.vietlott_mega;
                let mega = listMega.concat(result.data.items);
                this.setState({
                    loading: false,
                    fetching: false,
                    isRefreshing: false,
                    no_more: (result.data.length < this.state.limit),
                    vietlott_mega: mega,
                    vietlott_mega_latest: result.data.latest
                });
            }else{
                this.setState({
                    loading: false,
                    fetching: false,
                    isRefreshing: false,
                });
            }
        }
    };

    getPower = async () => {
        if(this.liveObj !== null){
            clearTimeout(this.liveObj);
            this.liveObj = null;
        }
        if(this.state.fetching === false){
            await this.setState({fetching: true});
            let max_id = 0;
            if(this.state.power.length > 0){
                max_id = await this.state.power[this.state.power.length - 1].id;
            }
            let result = await callAPI('vietlott/power',{max_id: max_id, limit: this.state.limit});
            if(result.error === 0){
                let listPower = this.state.power;
                let power = listPower.concat(result.data.items);
                this.setState({
                    loading: false,
                    fetching: false,
                    isRefreshing: false,
                    no_more: (result.data.length < this.state.limit),
                    power: power,
                    power_latest: result.data.latest
                });
            }else{
                this.setState({
                    loading: false,
                    fetching: false,
                    isRefreshing: false,
                });
            }
        }
    };


    max4d_latest = async () => {
        this.setState({isRefreshing: true});
        if(this.liveObj !== null){
            clearTimeout(this.liveObj);
            this.liveObj = null;
        }
        if(this.state.fetching === false){
            await this.setState({fetching: true});
            let result = await callAPI('vietlott/max4d-latest',{});
            if(result.error === 0){
                this.setState({
                    loading: false,
                    fetching: false,
                    isRefreshing: false,
                    max4d: result.data,
                });
            }else{
                this.setState({
                    loading: false,
                    fetching: false,
                    isRefreshing: false,
                });
            }
        }
    };


    onChangeVietlottType = type => {
        this.setState({vietlott_type: type, fetching: false, max4d: null}, async () => {
            if(type === "mega"){
                await this._onRefreshMega();
            }else if(type === "max"){
                await this.max4d_latest();
            }else if(type === "power"){
                await this._onRefreshPower();
            }
        });
    };

    max4d_next = async () => {
        this.setState({isRefreshing: true});
        if(this.liveObj !== null){
            clearTimeout(this.liveObj);
            this.liveObj = null;
        }
        if(this.state.fetching === false){
            await this.setState({fetching: true});
            let result = await callAPI('vietlott/max4d-next',{max4d_id: this.state.max4d.id});
            if(result.error === 0){
                this.setState({
                    loading: false,
                    fetching: false,
                    isRefreshing: false,
                    max4d: result.data,
                });
            }else{
                this.setState({
                    loading: false,
                    fetching: false,
                    isRefreshing: false,
                });
            }
        }
    };
    max4d_prev = async () => {
        this.setState({isRefreshing: true});
        if(this.liveObj !== null){
            clearTimeout(this.liveObj);
            this.liveObj = null;
        }
        if(this.state.fetching === false){
            await this.setState({fetching: true});
            let result = await callAPI('vietlott/max4d-prev',{max4d_id: this.state.max4d.id});
            if(result.error === 0){
                this.setState({
                    loading: false,
                    fetching: false,
                    isRefreshing: false,
                    max4d: result.data,
                });
            }else{
                this.setState({
                    loading: false,
                    fetching: false,
                    isRefreshing: false,
                });
            }
        }
    };

    render() {
        if(this.state.loading === true){
            return (<IconLoading style={{paddingVertical: 30}} color={Colors.lightBlack} />);
        }
        return (
            <Fragment>
                <View style={styles.vietlottType}>
                    <TouchableWithoutFeedback onPress={() => {this.onChangeVietlottType('mega')}}>
                        <View style={this.state.vietlott_type==='mega'?styles.vietlottTypeActive:styles.vietlottTypeItem}>
                            <Text style={this.state.vietlott_type==='mega'?styles.regionTextActive:{}}>Mega 6/45</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {this.onChangeVietlottType('max')}}>
                        <View style={this.state.vietlott_type==='max'?styles.vietlottTypeActive:styles.vietlottTypeItem}>
                            <Text style={this.state.vietlott_type==='max'?styles.regionTextActive:{}}>Max 4D</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {this.onChangeVietlottType('power')}}>
                        <View style={this.state.vietlott_type==='power'?styles.vietlottTypeActive:styles.vietlottTypeItem}>
                            <Text style={this.state.vietlott_type==='power'?styles.regionTextActive:{}}>Power 6/55</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {this.state.isRefreshing === true && (<IconLoading style={{paddingVertical: 30}} color={Colors.lightBlack} />)}
                {this.state.vietlott_type === 'mega' && this.state.vietlott_mega.length > 0 &&
                (<Fragment>
                    <View style={styles.vietlottCurrentValue}>
                        <Text style={styles.textBoldHead}>Jackpot Mega 6/45</Text>
                        <Text style={styles.textBoldHead}>Ngày quay thưởng {this.state.vietlott_mega_latest.next_time}</Text>
                        <Text style={styles.vietlottValueNumber}>{this.state.vietlott_mega_latest.jackpot} VNĐ</Text>
                    </View>
                    <FlatList
                        style={styles.listVietlottMega}
                        data={this.state.vietlott_mega}
                        keyExtractor={(item, index) => item.code}
                        renderItem={this._renderVietlottMegaItem}
                        initialNumToRender={5}
                        extraData={this.state}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefreshMega}
                            />
                        }
                        ListFooterComponent={this._renderFooterMega}
                        onEndReachedThreshold={0.4}
                        onEndReached={this._handleLoadMoreMega}
                    />
                </Fragment>)
                }
                {this.state.vietlott_type === 'max' && this.state.isRefreshing === false && this.state.max4d !== null && this._renderMax4D()}
                {this.state.vietlott_type === 'power' && this.state.power.length > 0 &&
                <Fragment>
                    <View style={styles.vietlottCurrentValue}>
                        <Text style={styles.textBoldHead}>Ngày quay thưởng {this.state.power_latest.next_time}</Text>
                        <Text style={styles.textBoldHead}>Jackpot 1</Text>
                        <Text style={styles.vietlottValueNumber}>{this.state.power_latest.jackpot_1}</Text>
                        <Text style={styles.textBoldHead}>Jackpot 2</Text>
                        <Text style={styles.vietlottValueNumber}>{this.state.power_latest.jackpot_2}</Text>
                    </View>
                    <FlatList
                        style={styles.listVietlottMega}
                        data={this.state.power}
                        keyExtractor={(item, index) => item.code}
                        renderItem={this._renderVietlottPowerItem}
                        initialNumToRender={5}
                        extraData={this.state}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefreshPower}
                            />
                        }
                        ListFooterComponent={this._renderFooterPower}
                        onEndReachedThreshold={0.4}
                        onEndReached={this._handleLoadMorePower}
                    />
                </Fragment>}
            </Fragment>
        );
    }

    _onRefreshMega = async () => {
        if(this.state.isRefreshing === false){
            this.setState({
                vietlott_mega: [],
                vietlott_mega_latest: null,
                no_more: false,
                isRefreshing: true,
                loading: false,
                fetching: false
            }, async () => {
                await this.getMega();
            });
        }
    };

    _handleLoadMoreMega = async () => {
        if(this.state.no_more === false && this.state.fetching === false){
            await this.getMega();
        }
    };

    _renderFooterMega = () => {
        if (!this.state.fetching || this.state.isRefreshing) return null;
        return (<IconLoading color={Colors.lightBlack} />);
    };


    _renderVietlottMegaItem = ({item}) => {
        return (<View style={styles.vietlottMegaItem}>
                <Text style={styles.vietlottMegaText}>Kỳ quay thưởng {item.code}</Text>
                <Text style={styles.vietlottMegaText}>Ngày quay thưởng {item.result_time}</Text>
                <View style={styles.vietlottMegaNumbers}>
                    <View style={styles.vietlottMegaNumberItem}>
                        <Text style={styles.vietlottMegaNumberItemText}>{item.num_1}</Text>
                    </View>
                    <View style={styles.vietlottMegaNumberItem}>
                        <Text style={styles.vietlottMegaNumberItemText}>{item.num_2}</Text>
                    </View>
                    <View style={styles.vietlottMegaNumberItem}>
                        <Text style={styles.vietlottMegaNumberItemText}>{item.num_3}</Text>
                    </View>
                    <View style={styles.vietlottMegaNumberItem}>
                        <Text style={styles.vietlottMegaNumberItemText}>{item.num_4}</Text>
                    </View>
                    <View style={styles.vietlottMegaNumberItem}>
                        <Text style={styles.vietlottMegaNumberItemText}>{item.num_5}</Text>
                    </View>
                    <View style={styles.vietlottMegaNumberItem}>
                        <Text style={styles.vietlottMegaNumberItemText}>{item.num_6}</Text>
                    </View>
                </View>
            </View>);
    };


    _renderMax4D = () => {
        return <Fragment>
            <View style={styles.dateSwitch}>
                <TouchableOpacity onPress={() => this.max4d_prev()}>
                    <View style={styles.dateNavigator}>
                        <IconItem name={`arrow-back`} />
                    </View>
                </TouchableOpacity>
                <View style={styles.datePickerLabel}>
                    <Text style={styles.datePickerLabelText}>Ngày {this.state.max4d.result_time}</Text>
                </View>
                <TouchableOpacity onPress={() => this.max4d_next()}>
                    <View style={styles.dateNavigator}>
                        <IconItem name={`arrow-forward`} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.max4dHead}>
                <Text style={styles.max4dHeadText}>Kỳ quay thưởng {this.state.max4d.code}</Text>
            </View>
            <ScrollView style={styles.max4dTable}>
                <View style={styles.max4dRow}>
                    <View style={styles.max4dColLabel}><Text style={styles.max4dColLabelText}>G1</Text></View>
                    <View style={styles.max4dColNumbers}>
                        <View style={styles.max4dColNumberSection}>
                            {this.state.max4d.g1 !== undefined ? this.state.max4d.g1.map(item => {
                                return (
                                    <View style={styles.max4dColNumber} key={"g1-"+item+"-"+Math.random()}>
                                        <Text style={styles.max4dColNumberValue}>{item}</Text>
                                    </View>
                                )
                            }):<IconLoading color={Colors.tintColor}/>}
                        </View>
                    </View>
                </View>
                <View style={styles.max4dRow}>
                    <View style={styles.max4dColLabel}><Text style={styles.max4dColLabelText}>G2</Text></View>
                    <View style={styles.max4dColNumbers}>
                        {this.state.max4d.g2 !== undefined ? this.state.max4d.g2.map(item => {
                            return (<View style={styles.max4dColNumberSection} key={"g2-"+Math.random()}>
                                    {item.map(num => {
                                        return (<View style={styles.max4dColNumber} key={"g2-"+ num +"-"+ Math.random()}>
                                            <Text style={styles.max4dColNumberValue}>{num}</Text>
                                        </View>);
                                    })}
                            </View>)
                        }):<IconLoading/>}
                    </View>
                </View>
                <View style={styles.max4dRow}>
                    <View style={styles.max4dColLabel}><Text style={styles.max4dColLabelText}>G3</Text></View>
                    <View style={styles.max4dColNumberVertical}>

                        <View style={styles.max4dColNumberRow}>
                            {this.state.max4d.g3 !== undefined ? this.state.max4d.g3.map((item, index) => {
                                if(index === 0){
                                    return (<View style={styles.max4dColNumberSection} key={"g3-"+Math.random()}>
                                        {item.map(num => {
                                            return (<View style={styles.max4dColNumber} key={"g3-"+ num +"-"+ Math.random()}>
                                                <Text style={styles.max4dColNumberValue}>{num}</Text>
                                            </View>);
                                        })}
                                    </View>);
                                }
                            }):<IconLoading/>}
                        </View>
                        <View style={styles.max4dColNumberRow}>
                            {this.state.max4d.g3 !== undefined ? this.state.max4d.g3.map((item, index) => {
                                if(index > 0){
                                    return (<View style={styles.max4dColNumberSection} key={"g3-"+Math.random()}>
                                        {item.map(num => {
                                            return (<View style={styles.max4dColNumber} key={"g3-"+ num +"-"+ Math.random()}>
                                                <Text style={styles.max4dColNumberValue}>{num}</Text>
                                            </View>);
                                        })}
                                    </View>);
                                }
                            }):<IconLoading/>}
                        </View>
                    </View>
                </View>
                <View style={styles.max4dRow}>
                    <View style={styles.max4dColLabel}><Text style={styles.max4dColLabelText}>KK1</Text></View>
                    <View style={styles.max4dColNumbers}>
                        <View style={styles.max4dColNumberSection}>
                            {this.state.max4d.kk1 !== undefined ? this.state.max4d.kk1.map(item => {
                                return (
                                    <View style={styles.max4dColNumber} key={"kk1-"+item+"-"+Math.random()}>
                                        <Text style={styles.max4dColNumberValue}>{item}</Text>
                                    </View>
                                )
                            }):<IconLoading color={Colors.tintColor}/>}
                        </View>
                    </View>
                </View>
                <View style={styles.max4dRow}>
                    <View style={styles.max4dColLabel}><Text style={styles.max4dColLabelText}>KK2</Text></View>
                    <View style={styles.max4dColNumbers}>
                        <View style={styles.max4dColNumberSection}>
                            {this.state.max4d.kk2 !== undefined ? this.state.max4d.kk2.map(item => {
                                return (
                                    <View style={styles.max4dColNumber} key={"kk2-"+item+"-"+Math.random()}>
                                        <Text style={styles.max4dColNumberValue}>{item}</Text>
                                    </View>
                                )
                            }):<IconLoading color={Colors.tintColor}/>}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Fragment>
    };


    _onRefreshPower = async () => {
        if(this.state.isRefreshing === false){
            this.setState({
                power: [],
                power_latest: null,
                no_more: false,
                isRefreshing: true,
                loading: false,
                fetching: false
            }, async () => {
                await this.getPower();
            });
        }
    };

    _handleLoadMorePower = async () => {
        if(this.state.no_more === false && this.state.fetching === false){
            await this.getPower();
        }
    };

    _renderFooterPower = () => {
        if (!this.state.fetching || this.state.isRefreshing) return null;
        return (<IconLoading color={Colors.lightBlack} />);
    };

    _renderVietlottPowerItem = ({item}) => {
        return <Fragment>
            <View style={styles.vietlottMegaItem}>
                <Text style={styles.vietlottMegaText}>Kỳ quay thưởng {item.code}</Text>
                <Text style={styles.vietlottMegaText}>Ngày quay thưởng {item.result_time}</Text>
                <View style={styles.vietlottMegaNumbers}>
                    <View style={styles.vietlottMegaNumberItem}>
                        <Text style={styles.vietlottMegaNumberItemText}>{item.num_1}</Text>
                    </View>
                    <View style={styles.vietlottMegaNumberItem}>
                        <Text style={styles.vietlottMegaNumberItemText}>{item.num_2}</Text>
                    </View>
                    <View style={styles.vietlottMegaNumberItem}>
                        <Text style={styles.vietlottMegaNumberItemText}>{item.num_3}</Text>
                    </View>
                    <View style={styles.vietlottMegaNumberItem}>
                        <Text style={styles.vietlottMegaNumberItemText}>{item.num_4}</Text>
                    </View>
                    <View style={styles.vietlottMegaNumberItem}>
                        <Text style={styles.vietlottMegaNumberItemText}>{item.num_5}</Text>
                    </View>
                    <View style={styles.vietlottMegaNumberItem}>
                        <Text style={styles.vietlottMegaNumberItemText}>{item.num_6}</Text>
                    </View>
                    <View style={styles.vietlottMegaNumberItemLast}>
                        <View style={styles.vietlottMegaNumberItem}>
                            <Text style={styles.vietlottMegaNumberItemText}>{item.num_7}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Fragment>;
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

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(Vietlott);
