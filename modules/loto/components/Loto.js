import React, {Component, Fragment} from 'react';
import {ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import styles from "../styles/LotoStyle";
import IconItem from "../../common/components/IconItem";
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from "react-redux";
import {callAPI} from "../../common/api/callAPI";
import moment from 'moment';
import IconLoading from "../../common/components/IconLoading";
import {Colors, window} from "../../common/common.constants";

class Loto extends Component {

    liveObj = null;

    state = {
        living: true,
        loading: true,
        fetching: false,
        has_live: false,
        area: 'bac',
        region: 'tt',
        provinces: [],
        loto: {},
        date_formatted: new Date().getDate() +'/'+ (new Date().getMonth()+1) +'/'+ new Date().getFullYear(),
        date: new Date(),
        region_tab_offset: 0
    };

    async componentWillMount(){
        this.living = true;
        await this.getLatest(this.state.region, true);
    }

    componentWillUnmount() {
        if(this.liveObj !== null){
            clearInterval(this.liveObj);
            this.liveObj = null;
        }
    }

    getLatest = async (region, include_province, silent_loading) => {
        if(this.liveObj !== null){
            clearInterval(this.liveObj);
            this.liveObj = null;
        }
        if(this.state.fetching === false) {
            if(silent_loading !== true){
                await this.setState({fetching: true});
            }
            let result = await callAPI('loto/get-latest', {
                region_code: region,
                include_province: include_province ? 1 : 0
            });
            if (result.error === 0) {
                this.setState({
                    loading: false,
                    fetching: false,
                    has_live: result.data.has_live === 1,
                    loto: result.data.loto,
                    area: result.data.loto.region,
                    date: moment.unix(result.data.loto.date).toDate(),
                    date_formatted: result.data.loto.date_formatted
                });
                if (include_province) {
                    this.setState({
                        provinces: result.data.provinces
                    });
                }

                if(result.data.has_live === 1){
                    this.liveObj = setTimeout(async () => {
                        await this.getLatest(region, false, true);
                    }, 5000);
                }
            }else{
                this.setState({
                    loading: false,
                    fetching: false,
                    has_live: false
                });
            }
        }
    };

    next = async () => {
        if(this.liveObj !== null){
            clearInterval(this.liveObj);
            this.liveObj = null;
        }
        if(this.state.fetching === false){
            this.setState({fetching: true});
            let result = await callAPI('loto/get-next',{region_code: this.state.region, loto_id: this.state.loto.id});
            if(result.error === 0){
                this.setState({
                    loading: false,
                    fetching: false,
                    has_live: result.data.has_live===1,
                    loto: result.data.loto,
                    area: result.data.loto.region,
                    date: moment.unix(result.data.loto.date).toDate(),
                    date_formatted: result.data.loto.date_formatted
                });
                if(result.data.has_live === 1){
                    this.liveObj = setTimeout(async () => {
                        await this.getLatest(this.state.region, false, true);
                    }, 5000);
                }
            }else{
                this.setState({
                    loading: false,
                    fetching: false,
                    has_live: false
                });
            }
        }
    };

    prev = async () => {
        if(this.liveObj !== null){
            clearInterval(this.liveObj);
            this.liveObj = null;
        }
        if(this.state.fetching === false){
            this.setState({fetching: true});
            let result = await callAPI('loto/get-prev',{region_code: this.state.region, loto_id: this.state.loto.id});
            if(result.error === 0){
                this.setState({
                    loading: false,
                    fetching: false,
                    has_live: result.data.has_live===1,
                    loto: result.data.loto,
                    area: result.data.loto.region,
                    date: moment.unix(result.data.loto.date).toDate(),
                    date_formatted: result.data.loto.date_formatted
                });
                if(result.data.has_live === 1){
                    this.liveObj = setTimeout(async () => {
                        await this.getLatest(this.state.region, false, true);
                    }, 5000);
                }
            }else{
                this.setState({
                    loading: false,
                    fetching: false,
                    has_live: false
                });
            }
        }
    };

    onChangeRegion = async (region, index) => {
        let scrollX = Math.max(index*150 - (window.width - 150)/2, 0);
        let scrollY = 0;
        this.regionTab.scrollTo({x: scrollX, y: scrollY, animated: true});
        this.setState({region: region}, async () => {
            await this.getLatest(region, false);
        });
    };

    render() {
        if(this.state.loading === true){
            return (<IconLoading style={{paddingVertical: 30}} color={Colors.lightBlack} />);
        }

        let summary = [];

        for(let i = 0; i < 10; i++){
            summary.push(
                <View style={styles.lotoSummaryRow} key={"lotoSummaryRow"+ i}>
                    <View style={styles.lotoSummaryRowCol}>
                        <View style={styles.lotoSummaryRowColLabel}>
                            <Text style={styles.lotoSummaryRowColLabelText}>{i}</Text>
                        </View>
                        <View style={styles.lotoSummaryRowColNumber}>
                            {this.state.loto.first !== undefined ? this.state.loto.first["dau"+ i].map((item, index) => {
                                return (<Text style={styles.lotoSummaryRowColNumberText} key={"dau"+ item.num}>
                                    {index>0?<Text style={styles.textNormal}>,{" "}</Text>:null}
                                    <Text style={styles.textNormal}>{item.num}</Text>
                                    {item.count>1?<Text style={styles.smallHighLight}>({item.count})</Text>:null}
                                </Text>)
                            }):<IconLoading color={Colors.tintColor}/>}
                        </View>
                    </View>
                    <View style={styles.lotoSummaryRowCol}>
                        <View style={styles.lotoSummaryRowColLabel}>
                            <Text style={styles.lotoSummaryRowColLabelText}>{i}</Text>
                        </View>
                        <View style={styles.lotoSummaryRowColNumber}>
                            {this.state.loto.last !== undefined ? this.state.loto.last["duoi"+ i].map((item, index) => {
                                return (<Text style={styles.lotoSummaryRowColNumberText} key={"duoi"+ item.num}>
                                    {index>0?<Text style={styles.textNormal}>,{" "}</Text>:null}
                                    <Text style={styles.textNormal}>{item.num}</Text>
                                    {item.count>1?<Text style={styles.smallHighLight}>({item.count})</Text>:null}
                                </Text>)
                            }):<IconLoading color={Colors.tintColor}/>}
                        </View>
                    </View>
                </View>
            )
        }

        return (
            <Fragment>
                <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} snapToAlignment={'center'} snapToInterval={150} ref={ref => this.regionTab = ref}>
                        {this.state.provinces.map((item, index) => {
                           return (
                               <TouchableWithoutFeedback key={item.code} onPress={() => {this.onChangeRegion(item.code, index)}} >
                                   <View style={this.state.region===item.code?styles.regionActive:styles.regionItem}>
                                       <Text style={this.state.region===item.code?styles.regionTextActive:styles.regionText}>{item.title}</Text>
                                   </View>
                               </TouchableWithoutFeedback>
                           )
                        })}
                    </ScrollView>
                </View>
                {this.state.fetching === true && this.state.loading === false && (<IconLoading style={{paddingVertical: 30}} color={Colors.lightBlack} />)}
                {this.state.fetching === false && (<Fragment>
                        <View style={styles.dateSwitch}>
                            <TouchableOpacity onPress={this.prev}>
                                <View style={styles.dateNavigator}>
                                    <IconItem name={`arrow-back`} />
                                </View>
                            </TouchableOpacity>
                            <View style={styles.datePickerLabel}>
                                <Text style={styles.datePickerLabelText}>Ngày {this.state.date_formatted}</Text>
                            </View>
                            <TouchableOpacity onPress={this.next}>
                                <View style={styles.dateNavigator}>
                                    <IconItem name={`arrow-forward`} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.lotoTable}>
                        <View style={styles.lotoRow}>
                            <View style={styles.lotoLabel}>
                                <Text style={styles.lotoLabelText}>ĐB</Text>
                            </View>
                            <View style={styles.lotoNumber}>
                                <View style={styles.lotoNumberSpec}>
                                    {this.state.loto.g0 !== undefined && this.state.loto.g0 !== ""?<Text style={styles.lotoNumberSpecText}>{this.state.loto.g0}</Text>:<IconLoading color={Colors.tintColor}/>}
                                </View>
                            </View>
                        </View>
                        <View style={styles.lotoRow}>
                            <View style={styles.lotoLabel}>
                                <Text style={styles.lotoLabelText}>G1</Text>
                            </View>
                            <View style={styles.lotoNumber}>
                                <View style={styles.lotoNumberCol}>
                                    {this.state.loto.g1 !== undefined && this.state.loto.g1 !== ""?(
                                        <Fragment>
                                            <Text style={styles.lotoNumberNormal}>{this.state.loto.g1.slice(0,-2)}</Text>
                                            <Text style={styles.lotoNumberHighlight}>{this.state.loto.g1.slice(-2)}</Text>
                                        </Fragment>
                                    ):<IconLoading color={Colors.tintColor}/>}
                                </View>
                            </View>
                        </View>
                        <View style={styles.lotoRow}>
                            <View style={styles.lotoLabel}>
                                <Text style={styles.lotoLabelText}>G2</Text>
                            </View>
                            <View style={styles.lotoNumber}>
                                {this.state.area === "bac" && (<Fragment>
                                    <View style={styles.lotoNumberCol}>
                                        {this.state.loto.g2 !== undefined && this.state.loto.g2.length > 0 && this.state.loto.g2[0] !== ""?(
                                            <Fragment>
                                                <Text style={styles.lotoNumberNormal}>{this.state.loto.g2[0].slice(0,-2)}</Text>
                                                <Text style={styles.lotoNumberHighlight}>{this.state.loto.g2[0].slice(-2)}</Text>
                                            </Fragment>
                                        ):<IconLoading color={Colors.tintColor}/>}
                                    </View>
                                    <View style={styles.lotoNumberCol}>
                                        {this.state.loto.g2 !== undefined && this.state.loto.g2.length > 1 && this.state.loto.g2[1] !== ""?(
                                            <Fragment>
                                                <Text style={styles.lotoNumberNormal}>{this.state.loto.g2[1].slice(0,-2)}</Text>
                                                <Text style={styles.lotoNumberHighlight}>{this.state.loto.g2[1].slice(-2)}</Text>
                                            </Fragment>
                                        ):<IconLoading color={Colors.tintColor}/>}
                                    </View>
                                </Fragment>)}
                                {this.state.area !== "bac" && (<Fragment>
                                    <View style={styles.lotoNumberCol}>
                                        {this.state.loto.g2 !== undefined && this.state.loto.g2.length > 0 && this.state.loto.g2[0] !== ""?(
                                            <Fragment>
                                                <Text style={styles.lotoNumberNormal}>{this.state.loto.g2[0].slice(0,-2)}</Text>
                                                <Text style={styles.lotoNumberHighlight}>{this.state.loto.g2[0].slice(-2)}</Text>
                                            </Fragment>
                                        ):<IconLoading color={Colors.tintColor}/>}
                                    </View>
                                </Fragment>)}
                            </View>
                        </View>
                        <View style={styles.lotoRow}>
                            <View style={styles.lotoLabel}>
                                <Text style={styles.lotoLabelText}>G3</Text>
                            </View>
                            {this.state.area === "bac" && (<Fragment>
                                <View style={styles.lotoNumberGroup}>
                                    <View style={styles.lotoNumber}>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g3 !== undefined && this.state.loto.g3.length > 0 && this.state.loto.g3[0] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g3[0].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g3[0].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g3 !== undefined && this.state.loto.g3.length > 1 && this.state.loto.g3[1] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g3[1].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g3[1].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g3 !== undefined && this.state.loto.g3.length > 2 && this.state.loto.g3[2] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g3[2].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g3[2].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                    </View>
                                    <View style={styles.lotoNumberBottom}>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g3 !== undefined && this.state.loto.g3.length > 3 && this.state.loto.g3[3] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g3[3].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g3[3].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g3 !== undefined && this.state.loto.g3.length > 4 && this.state.loto.g3[4] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g3[4].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g3[4].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g3 !== undefined && this.state.loto.g3.length > 5 && this.state.loto.g3[5] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g3[5].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g3[5].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                    </View>
                                </View>
                            </Fragment>)}
                            {this.state.area !== "bac" && (<Fragment>
                                <View style={styles.lotoNumberCol}>
                                    {this.state.loto.g3 !== undefined && this.state.loto.g3.length > 0 && this.state.loto.g3[0] !== ""?(
                                        <Fragment>
                                            <Text style={styles.lotoNumberNormal}>{this.state.loto.g3[0].slice(0,-2)}</Text>
                                            <Text style={styles.lotoNumberHighlight}>{this.state.loto.g3[0].slice(-2)}</Text>
                                        </Fragment>
                                    ):<IconLoading color={Colors.tintColor}/>}
                                </View>
                                <View style={styles.lotoNumberCol}>
                                    {this.state.loto.g3 !== undefined && this.state.loto.g3.length > 1 && this.state.loto.g3[1] !== ""?(
                                        <Fragment>
                                            <Text style={styles.lotoNumberNormal}>{this.state.loto.g3[1].slice(0,-2)}</Text>
                                            <Text style={styles.lotoNumberHighlight}>{this.state.loto.g3[1].slice(-2)}</Text>
                                        </Fragment>
                                    ):<IconLoading color={Colors.tintColor}/>}
                                </View>
                            </Fragment>)}
                        </View>
                        <View style={styles.lotoRow}>
                            <View style={styles.lotoLabel}>
                                <Text style={styles.lotoLabelText}>G4</Text>
                            </View>
                            {this.state.area === "bac" && (<Fragment>
                                <View style={styles.lotoNumber}>
                                    <View style={styles.lotoNumberCol}>
                                        {this.state.loto.g4 !== undefined && this.state.loto.g4.length > 0 && this.state.loto.g4[0] !== ""?(
                                            <Fragment>
                                                <Text style={styles.lotoNumberNormal}>{this.state.loto.g4[0].slice(0,-2)}</Text>
                                                <Text style={styles.lotoNumberHighlight}>{this.state.loto.g4[0].slice(-2)}</Text>
                                            </Fragment>
                                        ):<IconLoading color={Colors.tintColor}/>}
                                    </View>
                                    <View style={styles.lotoNumberCol}>
                                        {this.state.loto.g4 !== undefined && this.state.loto.g4.length > 1 && this.state.loto.g4[1] !== ""?(
                                            <Fragment>
                                                <Text style={styles.lotoNumberNormal}>{this.state.loto.g4[1].slice(0,-2)}</Text>
                                                <Text style={styles.lotoNumberHighlight}>{this.state.loto.g4[1].slice(-2)}</Text>
                                            </Fragment>
                                        ):<IconLoading color={Colors.tintColor}/>}
                                    </View>
                                    <View style={styles.lotoNumberCol}>
                                        {this.state.loto.g4 !== undefined && this.state.loto.g4.length > 2 && this.state.loto.g4[2] !== ""?(
                                            <Fragment>
                                                <Text style={styles.lotoNumberNormal}>{this.state.loto.g4[2].slice(0,-2)}</Text>
                                                <Text style={styles.lotoNumberHighlight}>{this.state.loto.g4[2].slice(-2)}</Text>
                                            </Fragment>
                                        ):<IconLoading color={Colors.tintColor}/>}
                                    </View>
                                    <View style={styles.lotoNumberCol}>
                                        {this.state.loto.g4 !== undefined && this.state.loto.g4.length > 3 && this.state.loto.g4[3] !== ""?(
                                            <Fragment>
                                                <Text style={styles.lotoNumberNormal}>{this.state.loto.g4[3].slice(0,-2)}</Text>
                                                <Text style={styles.lotoNumberHighlight}>{this.state.loto.g4[3].slice(-2)}</Text>
                                            </Fragment>
                                        ):<IconLoading color={Colors.tintColor}/>}
                                    </View>
                                </View>
                            </Fragment>)}
                            {this.state.area !== "bac" && (<Fragment>
                                <View style={styles.lotoNumberGroup}>
                                    <View style={styles.lotoNumber}>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g4 !== undefined && this.state.loto.g4.length > 0 && this.state.loto.g4[0] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g4[0].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g4[0].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g4 !== undefined && this.state.loto.g4.length > 1 && this.state.loto.g4[1] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g4[1].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g4[1].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g4 !== undefined && this.state.loto.g4.length > 2 && this.state.loto.g4[2] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g4[2].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g4[2].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g4 !== undefined && this.state.loto.g4.length > 3 && this.state.loto.g4[3] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g4[3].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g4[3].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                    </View>
                                    <View style={styles.lotoNumberBottom}>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g4 !== undefined && this.state.loto.g4.length > 4 && this.state.loto.g4[4] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g4[4].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g4[4].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g4 !== undefined && this.state.loto.g4.length > 5 && this.state.loto.g4[5] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g4[5].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g4[5].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g4 !== undefined && this.state.loto.g4.length > 6 && this.state.loto.g4[6] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g4[6].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g4[6].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                    </View>
                                </View>
                            </Fragment>)}
                        </View>
                        <View style={styles.lotoRow}>
                            <View style={styles.lotoLabel}>
                                <Text style={styles.lotoLabelText}>G5</Text>
                            </View>
                            {this.state.area === "bac" && (<Fragment>
                                <View style={styles.lotoNumberGroup}>
                                    <View style={styles.lotoNumber}>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g5 !== undefined && this.state.loto.g5.length > 0 && this.state.loto.g5[0] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g5[0].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g5[0].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g5 !== undefined && this.state.loto.g5.length > 1 && this.state.loto.g5[1] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g5[1].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g5[1].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g5 !== undefined && this.state.loto.g5.length > 2 && this.state.loto.g5[2] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g5[2].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g5[2].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                    </View>
                                    <View style={styles.lotoNumberBottom}>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g5 !== undefined && this.state.loto.g5.length > 3 && this.state.loto.g5[3] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g5[3].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g5[3].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g5 !== undefined && this.state.loto.g5.length > 4 && this.state.loto.g5[4] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g5[4].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g5[4].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                        <View style={styles.lotoNumberCol}>
                                            {this.state.loto.g5 !== undefined && this.state.loto.g5.length > 5 && this.state.loto.g5[5] !== ""?(
                                                <Fragment>
                                                    <Text style={styles.lotoNumberNormal}>{this.state.loto.g5[5].slice(0,-2)}</Text>
                                                    <Text style={styles.lotoNumberHighlight}>{this.state.loto.g5[5].slice(-2)}</Text>
                                                </Fragment>
                                            ):<IconLoading color={Colors.tintColor}/>}
                                        </View>
                                    </View>
                                </View>
                            </Fragment>)}
                            {this.state.area !== "bac" && (<Fragment>
                                <View style={styles.lotoNumber}>
                                    <View style={styles.lotoNumberCol}>
                                        {this.state.loto.g5 !== undefined && this.state.loto.g5.length > 0 && this.state.loto.g5[0] !== ""?(
                                            <Fragment>
                                                <Text style={styles.lotoNumberNormal}>{this.state.loto.g5[0].slice(0,-2)}</Text>
                                                <Text style={styles.lotoNumberHighlight}>{this.state.loto.g5[0].slice(-2)}</Text>
                                            </Fragment>
                                        ):<IconLoading color={Colors.tintColor}/>}
                                    </View>
                                </View>
                            </Fragment>)}
                        </View>
                        <View style={styles.lotoRow}>
                            <View style={styles.lotoLabel}>
                                <Text style={styles.lotoLabelText}>G6</Text>
                            </View>
                            <View style={styles.lotoNumber}>
                                <View style={styles.lotoNumberCol}>
                                    {this.state.loto.g6 !== undefined && this.state.loto.g6.length > 0 && this.state.loto.g6[0] !== ""?(
                                        <Fragment>
                                            <Text style={styles.lotoNumberNormal}>{this.state.loto.g6[0].slice(0,-2)}</Text>
                                            <Text style={styles.lotoNumberHighlight}>{this.state.loto.g6[0].slice(-2)}</Text>
                                        </Fragment>
                                    ):<IconLoading color={Colors.tintColor}/>}
                                </View>
                                <View style={styles.lotoNumberCol}>
                                    {this.state.loto.g6 !== undefined && this.state.loto.g6.length > 1 && this.state.loto.g6[1] !== ""?(
                                        <Fragment>
                                            <Text style={styles.lotoNumberNormal}>{this.state.loto.g6[1].slice(0,-2)}</Text>
                                            <Text style={styles.lotoNumberHighlight}>{this.state.loto.g6[1].slice(-2)}</Text>
                                        </Fragment>
                                    ):<IconLoading color={Colors.tintColor}/>}
                                </View>
                                <View style={styles.lotoNumberCol}>
                                    {this.state.loto.g6 !== undefined && this.state.loto.g6.length > 2 && this.state.loto.g6[2] !== ""?(
                                        <Fragment>
                                            <Text style={styles.lotoNumberNormal}>{this.state.loto.g6[2].slice(0,-2)}</Text>
                                            <Text style={styles.lotoNumberHighlight}>{this.state.loto.g6[2].slice(-2)}</Text>
                                        </Fragment>
                                    ):<IconLoading color={Colors.tintColor}/>}
                                </View>
                            </View>
                        </View>
                        <View style={styles.lotoRow}>
                            <View style={styles.lotoLabel}>
                                <Text style={styles.lotoLabelText}>G7</Text>
                            </View>
                            <View style={styles.lotoNumber}>
                                {this.state.area === "bac" && (<Fragment>
                                    <View style={styles.lotoNumberCol}>
                                        {this.state.loto.g7 !== undefined && this.state.loto.g7.length > 0 && this.state.loto.g7[0] !== ""?(
                                            <Text style={styles.lotoNumberHighlight}>{this.state.loto.g7[0]}</Text>
                                        ):<IconLoading color={Colors.tintColor}/>}
                                    </View>
                                    <View style={styles.lotoNumberCol}>
                                        {this.state.loto.g7 !== undefined && this.state.loto.g7.length > 1 && this.state.loto.g7[1] !== ""?(
                                            <Text style={styles.lotoNumberHighlight}>{this.state.loto.g7[1]}</Text>
                                        ):<IconLoading color={Colors.tintColor}/>}
                                    </View>
                                    <View style={styles.lotoNumberCol}>
                                        {this.state.loto.g7 !== undefined && this.state.loto.g7.length > 2 && this.state.loto.g7[2] !== ""?(
                                            <Text style={styles.lotoNumberHighlight}>{this.state.loto.g7[2]}</Text>
                                        ):<IconLoading color={Colors.tintColor}/>}
                                    </View>
                                    <View style={styles.lotoNumberCol}>
                                        {this.state.loto.g7 !== undefined && this.state.loto.g7.length > 3 && this.state.loto.g7[3] !== ""?(
                                            <Text style={styles.lotoNumberHighlight}>{this.state.loto.g7[3]}</Text>
                                        ):<IconLoading color={Colors.tintColor}/>}
                                    </View>
                                </Fragment>)}
                                {this.state.area !== "bac" && (<Fragment>
                                    <View style={styles.lotoNumberCol}>
                                        {this.state.loto.g7 !== undefined && this.state.loto.g7.length > 0 && this.state.loto.g7[0] !== ""?(
                                            <Fragment>
                                                <Text style={styles.lotoNumberNormal}>{this.state.loto.g7[0].slice(0,-2)}</Text>
                                                <Text style={styles.lotoNumberHighlight}>{this.state.loto.g7[0].slice(-2)}</Text>
                                            </Fragment>
                                        ):<IconLoading color={Colors.tintColor}/>}
                                    </View>
                                </Fragment>)}
                            </View>
                        </View>
                        {this.state.area !== "bac" && (
                            <View style={styles.lotoRow}>
                                <View style={styles.lotoLabel}>
                                    <Text style={styles.lotoLabelText}>G8</Text>
                                </View>
                                <View style={styles.lotoNumber}>
                                    <View style={styles.lotoNumberCol}>
                                        {this.state.loto.g8 !== undefined && this.state.loto.g8.length > 0 && this.state.loto.g8[0] !== ""?(
                                            <Text style={styles.lotoNumberHighlight}>{this.state.loto.g8[0]}</Text>
                                        ):<IconLoading color={Colors.tintColor}/>}
                                    </View>
                                </View>
                            </View>
                            )
                        }
                        <View style={styles.lotoSummary}>
                            <View style={styles.lotoSummaryColBegin}>
                                <Text style={styles.lotoSummaryColText}>Đầu</Text>
                            </View>
                            <View style={styles.lotoSummaryCol}>
                                <Text style={styles.lotoSummaryColText}>Đuôi</Text>
                            </View>
                        </View>
                        <View style={styles.lotoSummaryList}>
                            { summary }
                        </View>
                    </ScrollView>
                </Fragment>
                )}
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(Loto);
