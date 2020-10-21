import React, {Component, Fragment} from 'react';
import {
    TouchableHighlight,
    FlatList,
    RefreshControl,
    Image,
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
import IconLoading from "../../common/components/IconLoading";
import {Colors} from "../../common/common.constants";


class Loto extends Component {

    state = {
        loading: true,
        isRefreshing: false,
        no_more: false,
        fetching: false,
        has_live: false,
        limit: 10,
        novels: []
    };


    async UNSAFE_componentWillMount(){
        await this.getMega();
    }

    getMega = async () => {
        if(this.state.fetching === false){
            await this.setState({fetching: true});
            /*let max_id = 0;
            if(this.state.novels.length > 0){
                max_id = await this.state.novels[this.state.novels.length - 1].id;
            }
            let result = await callAPI('novel/list',{max_id: max_id, limit: this.state.limit});*/
            let result = await callAPI('novel/list')
            if(result.error === 0){
                let listNovels = this.state.novels;
                //let novels = listNovels.concat(result.data.items);
                this.setState({
                    loading: false,
                    fetching: false,
                    isRefreshing: false,
                    novels: result.data.rows,
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
                {this.state.isRefreshing === true && (<IconLoading style={{paddingVertical: 30}} color={Colors.lightBlack} />)}
                {this.state.novels.length > 0 &&
                (<Fragment>
                    <FlatList
                        style={styles.listVietlottMega}
                        data={this.state.novels}
                        keyExtractor={(item, index) => item.id}
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
                    />
                </Fragment>)
                }
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

    _onPressButton = (novel) => {
        this.props.navigation.navigate('Chapter', {"novel": novel});
    }

    _renderVietlottMegaItem = ({item}) => {
        return (<View style={styles.vietlottMegaItem} id={item.id}>
                    <TouchableOpacity onPress={() => this._onPressButton(item)} style={styles.mainTabItem} >
                    <View style={styles.lotoRow}>
                        <View style={styles.lotoLabel}>
                        <Image
                            source={{uri: item.image}}
                            style={{width: 100, height: 100}}
                        />
                        </View>
                        <View style={styles.lotoNumber}>
                            <View style={styles.lotoNumberSpec}>
                                <Text style={styles.lotoNumberSpecText}>{item.name}</Text>
                                <Text style={styles.lotoNumberNormal}>{"Tác giả: " + item.author}</Text>
                                <Text style={styles.lotoNumberNormal}>{"Thể loại: " + item.category_id}</Text>
                                <Text style={styles.lotoNumberNormal}>{"Lượt đọc: " + item.view}</Text>
                            </View>
                        </View>
                    </View>
                    </TouchableOpacity>
                </View>);
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

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(Loto);
