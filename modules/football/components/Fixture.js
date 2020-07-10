import React, {Component, Fragment} from 'react';
import {
    View,
    StyleSheet, Text, TouchableOpacity
} from 'react-native';
import {Colors} from "../../common/common.constants";
import RedCard from "./RedCard";
import YellowCard from "./YellowCard";

export default class Fixture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fixture: this.props.fixture
        };
    }
    render() {
        let fixture = this.state.fixture;
        return (
            <View style={styles.fixtureItem}>
                <View style={styles.fixtureStatus}>
                    <Text style={styles.fixtureStatusText}>{fixture.time}</Text>
                </View>
                <TouchableOpacity onPress={() => this.props.onPress(fixture.id)} style={styles.fixtureSummaryWrap}>
                    <View style={styles.tipsWrap}>{fixture.has_tips==1?(<Fragment>
                        <Text style={styles.tipHome}>{fixture.tips.asia.home}</Text>
                        <Text style={styles.tipTotal}>{fixture.tips.asia.total}</Text>
                        <Text style={styles.tipAway}>{fixture.tips.asia.away}</Text>
                        </Fragment>):null}</View>
                    <View style={styles.fixtureSummary}>
                        <View style={styles.fixtureHomeSection}>
                            <Text style={styles.fixtureHomeName}>{fixture.home.name}</Text>
                        </View>
                        <View style={styles.fixtureMidSection}>
                            {
                                fixture.has_goal===1?
                                <Text style={styles.fixtureMidStarted}>{fixture.home.goal} - {fixture.away.goal}</Text>:
                                <Text style={styles.fixtureMidNotStarted}>vs</Text>
                            }
                        </View>
                        <View style={styles.fixtureAwaySection}>
                            <Text style={styles.fixtureAwayName}>{fixture.away.name}</Text>
                        </View>
                    </View>
                    <View style={styles.subInfo}>
                        {fixture.has_goal===1?(<Fragment>
                            <View style={styles.homeCard}>
                                {fixture.home.yellowcard>0?<YellowCard num={fixture.home.yellowcard}/>:null}
                                {fixture.home.redcard2>0?<RedCard num={fixture.home.redcard2}/>:null}
                                {fixture.home.redcard>0?<RedCard num={fixture.home.redcard}/>:null}
                            </View>
                            <Text style={styles.subInfoInner}>{fixture.h1!=""?"("+ fixture.h1 +")":""}</Text>
                            <View style={styles.awayCard}>
                                {fixture.away.redcard>0?<RedCard num={fixture.away.redcard}/>:null}
                                {fixture.away.redcard2>0?<RedCard num={fixture.away.redcard2}/>:null}
                                {fixture.away.yellowcard>0?<YellowCard num={fixture.away.yellowcard}/>:null}
                            </View>
                        </Fragment>):null}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textHighlight: {
        color: Colors.tintColor
    },
    fixtureItem: {
        borderBottomWidth: 1,
        borderColor: Colors.grayBorder,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `flex-start`
    },
    fixtureStatus: {
        width: 60,
        padding: 10,
        alignItems: `center`,
        justifyContent: `center`
    },
    fixtureStatusText: {
        fontSize: 11,
        textAlign: `center`
    },
    fixtureTip: {
        width: 40,
        paddingVertical: 10,
        alignItems: `center`,
        justifyContent: `center`
    },
    winText: {
        fontSize: 13,
        color: Colors.tintColor
    },
    loseText: {
        fontSize: 13,
        color: Colors.gray
    },
    fixtureSummaryWrap: {
        flex: 1,
        paddingVertical: 17,
        alignItems: `stretch`,
        justifyContent: `center`,
        borderLeftWidth: 1,
        borderColor: Colors.grayBorder,
    },
    fixtureSummary: {
        flex: 1,
        flexDirection: `row`,
        alignItems: `stretch`,
        justifyContent: `center`,
        marginVertical: 5
    },
    tipsWrap: {
        flex: 1,
        flexDirection: `row`,
        alignItems: `stretch`,
        justifyContent: `center`
    },
    tipHome: {
        flex: 1,
        fontSize: 11,
        flexDirection: `row`,
        justifyContent: `flex-end`,
        textAlign: `right`,
        paddingHorizontal: 10,
        color: Colors.gray
    },
    tipTotal: {
        width: 60,
        fontSize: 11,
        textAlign: `center`,
        color: Colors.gray
    },
    tipAway: {
        flex: 1,
        fontSize: 11,
        flexDirection: `row`,
        justifyContent: `flex-start`,
        textAlign: `left`,
        paddingHorizontal: 10,
        color: Colors.gray
    },
    subInfo: {
        flex: 1,
        flexDirection: `row`,
        alignItems: `stretch`,
        justifyContent: `center`,
        textAlign: `center`
    },
    homeCard: {
        flex: 1,
        flexDirection: `row`,
        justifyContent: `flex-end`,
        textAlign: `right`,
        paddingHorizontal: 10
    },
    awayCard: {
        flex: 1,
        flexDirection: `row`,
        justifyContent: `flex-start`,
        textAlign: `left`,
        paddingHorizontal: 10
    },
    subInfoInner: {
        width: 60,
        textAlign: `center`,
        color: Colors.tintColor
    },
    fixtureHomeSection: {
        flex: 1,
        alignItems: `flex-end`,
        justifyContent: `flex-end`,
        paddingHorizontal: 10,
    },
    fixtureHomeName: {
        flex: 1,
        textAlign: `right`,
        justifyContent: `center`,
        alignItems: `center`
    },
    fixtureAwaySection: {
        flex: 1,
        flexDirection: `column`,
        alignItems: `flex-start`,
        justifyContent: `flex-start`,
        paddingHorizontal: 10,
    },
    fixtureAwayName: {
        flex: 1,
        textAlign: `left`
    },
    fixtureMidSection: {
        width: 60
    },
    fixtureMidNotStarted: {
        fontSize: 14,
        color: Colors.gray,
        textAlign: `center`
    },
    fixtureMidStarted: {
        fontSize: 14,
        fontWeight: `bold`,
        color: Colors.tintColor,
        textAlign: `center`
    },
    fixtureDate: {
        color: Colors.lightBlack,
        fontSize: 12
    }
});