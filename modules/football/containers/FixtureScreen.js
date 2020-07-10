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
import styles from '../styles/FixtureStyle';
import {callAPI} from "../../common/api/callAPI";
import IconLoading from "../../common/components/IconLoading";
import {Colors, window} from "../../common/common.constants";
import moment from "moment";
import IconItem from "../../common/components/IconItem";
import YellowCard from '../components/YellowCard';
import RedCard from "../components/RedCard";
import RedCard2 from "../components/RedCard2";

class FixtureScreen extends React.Component {

    state = {
        loading: true,
        fixture: false
    };

    intervalObj = false;

    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
            title: state.params.title||"Loading..."
        }
    };

    async componentWillMount() {
        await this.getData();
        this.intervalObj = setInterval(() => {
            this.getData();
        }, 5000);
    }

    async componentWillUnmount() {
        if(this.intervalObj !== false){
            clearInterval(this.intervalObj);
        }
    }

    getData = async () => {
        let result = await callAPI('football/matchDetail',{match_id: this.props.navigation.getParam('id')});
        if(result.error === 0){
            const {setParams} = this.props.navigation;
            setParams({
                title: result.data.home.name +" - "+ result.data.away.name
            });
            this.setState({
                loading: false,
                fetching: false,
                fixture: result.data
            });
        }else{
            this.setState({
                loading: false,
                fetching: false,
                isRefreshing: false
            });
        }
    };

    render() {
        if(this.state.loading === true){
            return (<IconLoading color={Colors.lightBlack} style={{paddingTop: 30}} />);
        }
        return (
            <View style={styles.container}>
                <View style={styles.meta}>
                    <Text style={styles.date}>{this.state.fixture.start_time>0?moment.unix(this.state.fixture.start_time).format('HH:mm DD/MM/YYYY'):this.state.fixture.time}</Text>
                    <Text style={styles.status}>
                        {this.state.fixture.start_time>0 && this.state.fixture.has_goal==1?this.state.fixture.time:null}
                    </Text>
                </View>
                <View style={styles.matchSummary}>
                    <View style={styles.team}>
                        <Image source={{uri: this.state.fixture.home.logo}} style={styles.teamLogo}/>
                        <Text style={styles.teamName}>{this.state.fixture.home.name}</Text>
                    </View>
                    <View style={styles.score}>
                        {this.state.fixture.has_goal===0?<Text style={styles.fullScore}>vs</Text>:(<Fragment>
                            <Text style={styles.fullScore}>{this.state.fixture.home.goal +" - "+ this.state.fixture.away.goal}</Text>
                            <Text style={styles.halfScore}>({this.state.fixture.h1||""})</Text>
                        </Fragment>)}
                    </View>
                    <View style={styles.team}>
                        <Image source={{uri: this.state.fixture.away.logo}} style={styles.teamLogo}/>
                        <Text style={styles.teamName}>{this.state.fixture.away.name}</Text>
                    </View>
                </View>
                <ScrollView style={styles.eventList}>
                    <View style={styles.topDot}/>
                    <View style={styles.botDot}/>
                    {this.state.fixture.events.map((item) => {
                        let suffix_prefix = [];
                        let validEvent = false;
                        if(item.type === 'YELLOWCARD'){
                            suffix_prefix.push(<YellowCard key={item.side +"-"+ item.minute +"-"+ item.type}/>);
                            validEvent = true;
                        }else if(item.type === 'REDCARD' || item.type === 'REDCARD1'){
                            suffix_prefix.push(<RedCard key={item.side +"-"+ item.minute +"-"+ item.type} />);
                            validEvent = true;
                        }else if(item.type === 'REDCARD2'){
                            suffix_prefix.push(<RedCard2 key={item.side +"-"+ item.minute +"-"+ item.type} />);
                            validEvent = true;
                        }else if(item.type === 'GOAL'){
                            suffix_prefix.push(<IconItem name={`football`} size={20} key={item.side +"-"+ item.minute +"-"+ item.type} />);
                            validEvent = true;
                        }else if(item.type === 'OWNERGOAL'){
                            suffix_prefix.push(<IconItem name={`football`} size={20} key={item.side +"-"+ item.minute +"-"+ item.type} />);
                            suffix_prefix.push(<Text style={styles.textDangerSmall} key={item.side +"-"+ item.minute +"-"+ item.type+"-prefix"}>(OWN)</Text>);
                            validEvent = true;
                        }else if(item.type === 'PENGOAL'){
                            suffix_prefix.push(<IconItem name={`football`} size={20} key={item.side +"-"+ item.minute +"-"+ item.type} />);
                            suffix_prefix.push(<Text style={styles.textSuccessSmall} key={item.side +"-"+ item.minute +"-"+ item.type+"-prefix"}>(PEN)</Text>);
                            validEvent = true;
                        }
                        if(validEvent === true){
                            if(item.side === 'home'){
                                return (<View style={styles.homeEvent} key={item.side +"-"+ item.minute +"-"+ item.type}>
                                    <View style={styles.leftCol}><Text style={styles.player}>{item.player}</Text>{suffix_prefix}</View>
                                    <View style={styles.rightCol}><View style={styles.rightDivider} /><Text style={styles.time}>{item.minute}{"'"}</Text></View>
                                </View>)
                            }else{
                                return (<View style={styles.awayEvent} key={item.side +"-"+ item.minute +"-"+ item.type}>
                                    <View style={styles.leftCol}><View style={styles.leftDivider} /><Text style={styles.time}>{item.minute}{"'"}</Text></View>
                                    <View style={styles.rightCol}>{suffix_prefix}<Text style={styles.player}>{item.player}</Text></View>
                                </View>)
                            }
                        }else{
                            return null;
                        }
                    })}
                </ScrollView>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(FixtureScreen);
