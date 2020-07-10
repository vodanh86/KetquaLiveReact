import React, {Fragment} from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity, RefreshControl, FlatList, Image, ImageBackground
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/LeagueStyle';
import {callAPI} from "../../common/api/callAPI";
import IconLoading from "../../common/components/IconLoading";
import {Colors, window} from "../../common/common.constants";
import Fixture from "../components/Fixture";
import Standings from "../components/Standings";
import IconItem from "../../common/components/IconItem";
import ModalExtra from "../../common/components/ModalExtra";
import RoundListModal from "../components/RoundList";

class LeagueScreen extends React.Component {

    state = {
        title: "",
        tab: 'schedule',
        league: false,
        rounds: [],
        loading: true,
        fetching: false,
        isRefreshing: false,
        round_id: 0,
        standings: [],
        offset: 0,
        fixtures: []
    };

    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
            title: state.params.title||"Loading..."
        }
    };

    async componentWillMount() {
        await this.getData();
    }

    getData = async () => {
        let id = this.props.navigation.getParam('id');
        if(id){
            const {setParams} = this.props.navigation;
            let result = await callAPI('football/league',{league_id: id, round_id: this.state.round_id});
            if(result.error === 0){
                setParams({
                    title: result.data.league.title
                });
                this.setState({
                    loading: false,
                    fetching: false,
                    isRefreshing: false,
                    league: result.data.league,
                    rounds: result.data.rounds,
                    fixtures: result.data.fixtures
                });
            }else{
                this.setState({
                    loading: false,
                    fetching: false,
                    isRefreshing: false
                });
            }
        }else{
            alert("Không có dữ liệu giải bóng này");
            this.props.goToRoute(this.props.navigation, 'Football');
        }
    };

    changeTab = (tab) => {
        this.setState({tab: tab});
    };

    onRoundChange = async (round) => {
        this.roundModal.close();
        await this.setState({round_id: round.id, fetching: true});
        await this.getData();
    };

    render() {
        if(this.state.loading === true){
            return (<IconLoading color={Colors.lightBlack} style={{paddingTop: 30}} />);
        }
        return (
            <View style={styles.container}>
                <View style={styles.mainTab}>
                    <TouchableOpacity
                        onPress={() => {this.changeTab('schedule')}}
                        style={styles.mainTabItem}
                    >
                        <View style={styles.mainTabItemView}>
                            <Text style={this.state.tab==='schedule'?styles.mainTabItemTextActive:styles.mainTabItemText}>Lịch thi đấu</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {this.changeTab('standings')}}
                        style={styles.mainTabItem}
                    >
                        <View style={styles.mainTabItemView}>
                            <Text style={this.state.tab==='standings'?styles.mainTabItemTextActive:styles.mainTabItemText}>Bảng xếp hạng</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {this.state.tab === 'schedule' && this._renderRounds()}
                {this.state.tab === 'standings' && (<Standings standings={this.state.league.standings}/>)}
                <ModalExtra ref={modal => this.roundModal = modal} title={"Chọn vòng"}>
                    <RoundListModal onChange={this.onRoundChange} data={this.state.rounds} />
                </ModalExtra>
            </View>
        );
    }

    goToFixture = (id) => {
        this.props.goToRoute(this.props.navigation, 'Fixture', {id: id});
    };

    _renderRounds = () => {
        if(this.state.fetching === true){
            return <IconLoading color={Colors.lightBlack} style={{paddingTop: 30}} />
        }
        return (<View style={styles.container}>
            <TouchableOpacity style={styles.dropdownInput} onPress={() => this.roundModal.open()}>
                <Text style={styles.dropdownInputValue}>{this.state.league.current_round.title}</Text>
                <IconItem name={`arrow-down`} />
            </TouchableOpacity>
            {this.state.fixtures.length === 0?(<Text style={styles.noRoundNotice}>Chưa có dữ liệu vòng này</Text>):null}
            <FlatList
            style={styles.listFixtures}
            data={this.state.fixtures}
            keyExtractor={(item, index) => item.id}
            renderItem={this._renderFixture}
            initialNumToRender={10}
            extraData={this.state}
            refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onRefresh}
                />
            }
        /></View>)
    };

    _renderFixture = (fixture) => {
        return (<Fixture key={fixture.item.id} fixture={fixture.item} showDate={true} onPress={() => this.goToFixture(fixture.item.id)}/>)
    };

    _onRefresh = () => {
        this.setState({fetching: true, loading: false, isRefreshing: true, fixtures: [], standings: []}, async () => {
            await this.getData();
        })
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

export default connect(mapStateToProps, mapDispatchToProps)(LeagueScreen);
