import React, {Fragment} from 'react';
import {
    ScrollView,
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity, RefreshControl, SectionList, Image, ImageBackground
} from 'react-native';
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/FootballStyle';
import MenuLeftButton from '../../../modules/common/components/MenuLeftButton';
import MenuNotifyButton from '../../../modules/common/components/MenuNotifyButton';
import {callAPI} from "../../common/api/callAPI";
import IconLoading from "../../common/components/IconLoading";
import {Colors, window} from "../../common/common.constants";
import moment from "moment";
import IconItem from "../../common/components/IconItem";
import Fixture from "../components/Fixture";

class FootballScreen extends React.Component {

    state = {
        selectedIndex: 7,
        loading: true,
        fetching: false,
        isRefreshing: false,
        date: moment().toDate(),
        date_formatted: moment().format('DD/MM/YYYY'),
        fixtures: []
    };

    intervalObj = false;

    static navigationOptions = {
        title: 'Bóng đá',
        headerLeft: <MenuLeftButton />,
        headerRight: <MenuNotifyButton />,
    };

    async UNSAFE_componentWillMount() {
        await this.getData();
        setInterval(() => {
            if(moment().format('DD/MM/YYYY') === moment(this.state.date).format('DD/MM/YYYY')){
                this.getData();
            }else{
                console.log(moment().format('DD/MM/YYYY')," <> ",moment(this.state.date).format('DD/MM/YYYY'));
            }
        }, 5000);
        if(this.state.loading === false && this.dayTab !== undefined){
            setTimeout(() => {
                this.selectIndex(this.state.selectedIndex);
            }, 1);
        }
    }

    getData = async () => {
        let result = await callAPI('football/matchDay',{date: this.state.date_formatted, leagueIds: []});
        if(result.error === 0){
            let formatted_data = await Object.keys(result.data).map((key) => {
                return {
                    data: result.data[key].fixtures,
                    ...result.data[key].league
                }
            });
            await this.setState({
                loading: false,
                fetching: false,
                isRefreshing: false,
                fixtures: formatted_data
            });
        }else{
            this.setState({
                loading: false,
                fetching: false,
                isRefreshing: false
            });
        }
    };

    changeDate = (date, index) => {
        this.selectIndex(index);
        this.setState({
            selectedIndex: index,
            fetching: true,
            date: date.toDate(),
            date_formatted: date.format('DD/MM/YYYY')
        }, async () => {
            await this.getData();
        });
    };

    selectIndex = (index) => {
        let scrollX = Math.max(index*80 - (window.width - 80)/2, 0);
        let scrollY = 0;
        this.dayTab.scrollTo({x: scrollX, y: scrollY, animated: true});
    };

    render() {
        if(this.state.loading === true){
            return (<IconLoading color={Colors.lightBlack} style={{paddingTop: 30}} />);
        }
        return (
            <View style={styles.container}>
                {this.state.fetching === false && this.state.fixtures.length === 0?(<Text style={styles.noTextContent}>Chưa có dữ liệu bóng đá ngày {this.state.date_formatted}</Text>):this.renderFixtures()}
            </View>
        );
    }

    renderFixtures = () => {
        let date_list = [];
        let dow_label = {
            0: 'CN',
            1: 'T2',
            2: 'T3',
            3: 'T4',
            4: 'T5',
            5: 'T6',
            6: 'T7'
        };
        for(let i = 0; i < 14; i++){
            let date_print = moment().add(i-7, 'days');
            let date_formatted = date_print.format('DD/MM/YYYY');
            let date_short_formatted = date_print.format('DD/MM');
            date_list.push(<TouchableOpacity key={i} onPress={() => this.changeDate(date_print, i)}>
                <View style={this.state.date_formatted===date_formatted?styles.dateActive:styles.dateItem}>
                    <Text style={this.state.date_formatted===date_formatted?styles.dateActiveText:styles.dateItemText}>{dow_label[date_print.format('e')]}</Text>
                    <Text style={this.state.date_formatted===date_formatted?styles.dateActiveText:styles.dateItemText}>{date_short_formatted}</Text>
                </View>
            </TouchableOpacity>)
        }
        return (
            <View style={styles.container}>
                <View>
                    <ScrollView style={styles.dateList} horizontal={true} showsHorizontalScrollIndicator={false} snapToAlignment={'center'} snapToInterval={80} ref={ref => this.dayTab = ref}>
                        {date_list}
                    </ScrollView>
                </View>
                {this.state.fetching === true?(<IconLoading color={Colors.lightBlack} style={{paddingTop: 30}}/>):(<SectionList
                    style={styles.listFixtures}
                    sections={this.state.fixtures}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this._renderLeague}
                    initialNumToRender={10}
                    extraData={this.state}
                    renderSectionHeader={this._renderSectionHeader}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                />)}
            </View>
        );
    };

    goToFixture = (id) => {
        this.props.goToRoute(this.props.navigation, 'Fixture', {id: id});
    };

    goToLeague = (id) => {
        this.props.goToRoute(this.props.navigation, 'League', {id: id});
    };

    _renderSectionHeader = (item) => {
        return (<View><TouchableWithoutFeedback>
            <View style={styles.leagueHead}>
                <View style={styles.leagueIconWrap}>{item.section.icon !==""?<Image source={{uri: item.section.icon}} style={styles.leagueIcon} />:<IconItem name={`football`} style={styles.leagueIcon} color={Colors.lightBlack} size={26} />}</View>
                <TouchableOpacity onPress={() => this.goToLeague(item.section.id)} style={styles.leagueName}><Text style={styles.leagueNameText}>{item.section.title}</Text><IconItem name={`arrow-dropright-circle`} style={styles.moreIcon} color={Colors.tintColor} size={21} /></TouchableOpacity>
            </View>
        </TouchableWithoutFeedback></View>);
    };

    _renderLeague = (fixture) => {
        return (<View style={styles.leagueItem} key={fixture.item.id}>
            <Fixture fixture={fixture.item} showDate={true} onPress={() => this.goToFixture(fixture.item.id)} key={fixture.item.id}/>
             </View>)
    };

    _onRefresh = () => {
        this.setState({fetching: true, loading: false, isRefreshing: true, fixtures: []}, async () => {
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

export default connect(mapStateToProps, mapDispatchToProps)(FootballScreen);
