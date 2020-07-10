import React, { Fragment } from 'react';
import {
    ScrollView,
    Text,
    View,
    TextInput,
    TouchableOpacity, Platform, DatePickerAndroid, FlatList,
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from "../styles/SoiCauDetailStyle";
import IconLoading from "../../common/components/IconLoading";
import {Colors} from "../../common/common.constants";
import moment from 'moment';

class SoiCauDetailScreen extends React.Component {
    static navigationOptions = {
        title: 'Chi tiết cầu'
    };

    state = {
        area: this.props.navigation.getParam('area'),
        item: this.props.navigation.getParam('item'),
        date: this.props.navigation.getParam('date'),
        date_formatted: moment(this.props.navigation.getParam('date')).format('DD/MM/YYYY')
    };

    renderNumber = (num) => {
        if(typeof num === 'object'){
            return (<Fragment>{num.map(item => {
                if(Array.isArray(item)){
                    return (<Fragment>{item.map(i => {
                        return (<Text style={i.type==='h'?styles.lotoNumberItalic:styles.lotoNumberNormal} key={Math.random()}>{i.text}</Text>)
                    })}</Fragment>);
                }else{
                    return (<Text style={item.type==='h'?styles.lotoNumberItalic:styles.lotoNumberNormal} key={Math.random()}>{item.text}</Text>);
                }
            })}</Fragment>);
        }else{
            return (<Text style={styles.lotoNumberNormal}>{num}</Text>);
        }
    };

    render() {
        return (<View style={styles.container}>
            <View style={styles.topText}>
                <View style={styles.textRow}>
                    <Text style={styles.textNormal}>Cầu lô tô{" "}</Text>
                    <Text style={styles.textHighlight}>{this.state.item.count} ngày{" "}</Text>
                    <Text style={styles.textNormal}>tại vị trí{" "}</Text>
                    <Text style={styles.textHighlight}>{this.state.item.position}</Text>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.textNormal}>Dự đoán ngày {this.state.date_formatted} sẽ về{" "}</Text>
                    <Text style={styles.textHighlight}>{this.state.item.number}</Text>
                    {this.state.item.number.slice(0,1) !== this.state.item.number.slice(-1) && (<Fragment>
                        <Text style={styles.textNormal}>{" "}hoặc{" "}</Text>
                        <Text style={styles.textHighlight}>{this.state.item.number.slice(-1)}{this.state.item.number.slice(0,1)}</Text>
                    </Fragment>)}
                </View>
            </View>
            <FlatList
                style={styles.lotoTableList}
                data={this.state.item.result}
                keyExtractor={(item, index) => item.date_formatted}
                initialNumToRender={1}
                renderItem={this._renderTable}
            />
        </View>);
    }

    _renderTable = ({item}) => {
        return (<View key={item.date} style={styles.lotoTableItem}>
            <Text style={styles.lotoDate}>Ngày {item.date_formatted}</Text>
            <View style={styles.lotoTable}>
                <View style={styles.lotoRow}>
                    <View style={styles.lotoLabel}>
                        <Text style={styles.lotoLabelText}>ĐB</Text>
                    </View>
                    <View style={styles.lotoNumber}>
                        <View style={styles.lotoNumberSpec}>
                            {item.g0 !== undefined && item.g0.length > 0 && item.g0[0] !== ""?<Text style={styles.lotoNumberSpecText}>
                                {this.renderNumber(item.g0[0])}
                            </Text>:<IconLoading color={Colors.tintColor}/>}
                        </View>
                    </View>
                </View>
                <View style={styles.lotoRow}>
                    <View style={styles.lotoLabel}>
                        <Text style={styles.lotoLabelText}>G1</Text>
                    </View>
                    <View style={styles.lotoNumber}>
                        <View style={styles.lotoNumberCol}>
                            {item.g1 !== undefined && item.g1.length > 0 && item.g1[0] !== ""?this.renderNumber(item.g1[0]):<IconLoading color={Colors.tintColor}/>}
                        </View>
                    </View>
                </View>
                <View style={styles.lotoRow}>
                    <View style={styles.lotoLabel}>
                        <Text style={styles.lotoLabelText}>G2</Text>
                    </View>
                    <View style={styles.lotoNumber}>
                        {this.state.area === "mb" && (<Fragment>
                            <View style={styles.lotoNumberCol}>
                                {item.g2 !== undefined && item.g2.length > 0 && item.g2[0] !== ""?this.renderNumber(item.g2[0]):<IconLoading color={Colors.tintColor}/>}
                            </View>
                            <View style={styles.lotoNumberCol}>
                                {item.g2 !== undefined && item.g2.length > 1 && item.g2[1] !== ""?this.renderNumber(item.g2[1]):<IconLoading color={Colors.tintColor}/>}
                            </View>
                        </Fragment>)}
                        {this.state.area !== "mb" && (<Fragment>
                            <View style={styles.lotoNumberCol}>
                                {item.g2 !== undefined && item.g2.length > 0 && item.g2[0] !== ""?this.renderNumber(item.g2[0]):<IconLoading color={Colors.tintColor}/>}
                            </View>
                        </Fragment>)}
                    </View>
                </View>
                <View style={styles.lotoRow}>
                    <View style={styles.lotoLabel}>
                        <Text style={styles.lotoLabelText}>G3</Text>
                    </View>
                    {this.state.area === "mb" && (<Fragment>
                        <View style={styles.lotoNumberGroup}>
                            <View style={styles.lotoNumber}>
                                <View style={styles.lotoNumberCol}>
                                    {item.g3 !== undefined && item.g3.length > 0 && item.g3[0] !== ""?this.renderNumber(item.g3[0]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                                <View style={styles.lotoNumberCol}>
                                    {item.g3 !== undefined && item.g3.length > 1 && item.g3[1] !== ""?this.renderNumber(item.g3[1]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                                <View style={styles.lotoNumberCol}>
                                    {item.g3 !== undefined && item.g3.length > 2 && item.g3[2] !== ""?this.renderNumber(item.g3[2]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                            </View>
                            <View style={styles.lotoNumberBottom}>
                                <View style={styles.lotoNumberCol}>
                                    {item.g3 !== undefined && item.g3.length > 3 && item.g3[3] !== ""?this.renderNumber(item.g3[3]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                                <View style={styles.lotoNumberCol}>
                                    {item.g3 !== undefined && item.g3.length > 4 && item.g3[4] !== ""?this.renderNumber(item.g3[4]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                                <View style={styles.lotoNumberCol}>
                                    {item.g3 !== undefined && item.g3.length > 5 && item.g3[5] !== ""?this.renderNumber(item.g3[5]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                            </View>
                        </View>
                    </Fragment>)}
                    {this.state.area !== "mb" && (<Fragment>
                        <View style={styles.lotoNumberCol}>
                            {item.g3 !== undefined && item.g3.length > 0 && item.g3[0] !== ""?this.renderNumber(item.g3[0]):<IconLoading color={Colors.tintColor}/>}
                        </View>
                        <View style={styles.lotoNumberCol}>
                            {item.g3 !== undefined && item.g3.length > 1 && item.g3[1] !== ""?this.renderNumber(item.g3[1]):<IconLoading color={Colors.tintColor}/>}
                        </View>
                    </Fragment>)}
                </View>
                <View style={styles.lotoRow}>
                    <View style={styles.lotoLabel}>
                        <Text style={styles.lotoLabelText}>G4</Text>
                    </View>
                    {this.state.area === "mb" && (<Fragment>
                        <View style={styles.lotoNumber}>
                            <View style={styles.lotoNumberCol}>
                                {item.g4 !== undefined && item.g4.length > 0 && item.g4[0] !== ""?this.renderNumber(item.g4[0]):<IconLoading color={Colors.tintColor}/>}
                            </View>
                            <View style={styles.lotoNumberCol}>
                                {item.g4 !== undefined && item.g4.length > 1 && item.g4[1] !== ""?this.renderNumber(item.g4[1]):<IconLoading color={Colors.tintColor}/>}
                            </View>
                            <View style={styles.lotoNumberCol}>
                                {item.g4 !== undefined && item.g4.length > 2 && item.g4[2] !== ""?this.renderNumber(item.g4[2]):<IconLoading color={Colors.tintColor}/>}
                            </View>
                            <View style={styles.lotoNumberCol}>
                                {item.g4 !== undefined && item.g4.length > 3 && item.g4[3] !== ""?this.renderNumber(item.g4[3]):<IconLoading color={Colors.tintColor}/>}
                            </View>
                        </View>
                    </Fragment>)}
                    {this.state.area !== "mb" && (<Fragment>
                        <View style={styles.lotoNumberGroup}>
                            <View style={styles.lotoNumber}>
                                <View style={styles.lotoNumberCol}>
                                    {item.g4 !== undefined && item.g4.length > 0 && item.g4[0] !== ""?this.renderNumber(item.g4[0]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                                <View style={styles.lotoNumberCol}>
                                    {item.g4 !== undefined && item.g4.length > 1 && item.g4[1] !== ""?this.renderNumber(item.g4[1]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                                <View style={styles.lotoNumberCol}>
                                    {item.g4 !== undefined && item.g4.length > 2 && item.g4[2] !== ""?this.renderNumber(item.g4[2]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                                <View style={styles.lotoNumberCol}>
                                    {item.g4 !== undefined && item.g4.length > 3 && item.g4[3] !== ""?this.renderNumber(item.g4[3]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                            </View>
                            <View style={styles.lotoNumberBottom}>
                                <View style={styles.lotoNumberCol}>
                                    {item.g4 !== undefined && item.g4.length > 4 && item.g4[4] !== ""?this.renderNumber(item.g4[4]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                                <View style={styles.lotoNumberCol}>
                                    {item.g4 !== undefined && item.g4.length > 5 && item.g4[5] !== ""?this.renderNumber(item.g4[5]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                                <View style={styles.lotoNumberCol}>
                                    {item.g4 !== undefined && item.g4.length > 6 && item.g4[6] !== ""?this.renderNumber(item.g4[6]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                            </View>
                        </View>
                    </Fragment>)}
                </View>
                <View style={styles.lotoRow}>
                    <View style={styles.lotoLabel}>
                        <Text style={styles.lotoLabelText}>G5</Text>
                    </View>
                    {this.state.area === "mb" && (<Fragment>
                        <View style={styles.lotoNumberGroup}>
                            <View style={styles.lotoNumber}>
                                <View style={styles.lotoNumberCol}>
                                    {item.g5 !== undefined && item.g5.length > 0 && item.g5[0] !== ""?this.renderNumber(item.g5[0]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                                <View style={styles.lotoNumberCol}>
                                    {item.g5 !== undefined && item.g5.length > 1 && item.g5[1] !== ""?this.renderNumber(item.g5[1]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                                <View style={styles.lotoNumberCol}>
                                    {item.g5 !== undefined && item.g5.length > 2 && item.g5[2] !== ""?this.renderNumber(item.g5[2]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                            </View>
                            <View style={styles.lotoNumberBottom}>
                                <View style={styles.lotoNumberCol}>
                                    {item.g5 !== undefined && item.g5.length > 3 && item.g5[3] !== ""?this.renderNumber(item.g5[3]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                                <View style={styles.lotoNumberCol}>
                                    {item.g5 !== undefined && item.g5.length > 4 && item.g5[4] !== ""?this.renderNumber(item.g5[4]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                                <View style={styles.lotoNumberCol}>
                                    {item.g5 !== undefined && item.g5.length > 5 && item.g5[5] !== ""?this.renderNumber(item.g5[5]):<IconLoading color={Colors.tintColor}/>}
                                </View>
                            </View>
                        </View>
                    </Fragment>)}
                    {this.state.area !== "mb" && (<Fragment>
                        <View style={styles.lotoNumber}>
                            <View style={styles.lotoNumberCol}>
                                {item.g5 !== undefined && item.g5.length > 0 && item.g5[0] !== ""?this.renderNumber(item.g5[0]):<IconLoading color={Colors.tintColor}/>}
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
                            {item.g6 !== undefined && item.g6.length > 0 && item.g6[0] !== ""?this.renderNumber(item.g6[0]):<IconLoading color={Colors.tintColor}/>}
                        </View>
                        <View style={styles.lotoNumberCol}>
                            {item.g6 !== undefined && item.g6.length > 1 && item.g6[1] !== ""?this.renderNumber(item.g6[1]):<IconLoading color={Colors.tintColor}/>}
                        </View>
                        <View style={styles.lotoNumberCol}>
                            {item.g6 !== undefined && item.g6.length > 2 && item.g6[2] !== ""?this.renderNumber(item.g6[2]):<IconLoading color={Colors.tintColor}/>}
                        </View>
                    </View>
                </View>
                <View style={styles.lotoRow}>
                    <View style={styles.lotoLabel}>
                        <Text style={styles.lotoLabelText}>G7</Text>
                    </View>
                    <View style={styles.lotoNumber}>
                        {this.state.area === "mb" && (<Fragment>
                            <View style={styles.lotoNumberCol}>
                                {item.g7 !== undefined && item.g7.length > 0 && item.g7[0] !== ""?this.renderNumber(item.g7[0]):<IconLoading color={Colors.tintColor}/>}
                            </View>
                            <View style={styles.lotoNumberCol}>
                                {item.g7 !== undefined && item.g7.length > 1 && item.g7[1] !== ""?this.renderNumber(item.g7[1]):<IconLoading color={Colors.tintColor}/>}
                            </View>
                            <View style={styles.lotoNumberCol}>
                                {item.g7 !== undefined && item.g7.length > 2 && item.g7[2] !== ""?this.renderNumber(item.g7[2]):<IconLoading color={Colors.tintColor}/>}
                            </View>
                            <View style={styles.lotoNumberCol}>
                                {item.g7 !== undefined && item.g7.length > 3 && item.g7[3] !== ""?this.renderNumber(item.g7[3]):<IconLoading color={Colors.tintColor}/>}
                            </View>
                        </Fragment>)}
                        {this.state.area !== "mb" && (<Fragment>
                            <View style={styles.lotoNumberCol}>
                                {item.g7 !== undefined && item.g7.length > 0 && item.g7[0] !== ""?this.renderNumber(item.g7[0]):<IconLoading color={Colors.tintColor}/>}
                            </View>
                        </Fragment>)}
                    </View>
                </View>
                {this.state.area !== "mb" && (
                    <View style={styles.lotoRow}>
                        <View style={styles.lotoLabel}>
                            <Text style={styles.lotoLabelText}>G8</Text>
                        </View>
                        <View style={styles.lotoNumber}>
                            <View style={styles.lotoNumberCol}>
                                {item.g8 !== undefined && item.g8.length > 0 && item.g8[0] !== ""?this.renderNumber(item.g8[0]):<IconLoading color={Colors.tintColor}/>}
                            </View>
                        </View>
                    </View>
                    )
                }
            </View></View>);
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

export default connect(mapStateToProps, mapDispatchToProps)(SoiCauDetailScreen);