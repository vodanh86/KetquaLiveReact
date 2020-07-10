import React,{Component} from 'react';
import {
    View,
    StyleSheet, Text, ScrollView
} from 'react-native';
import moment from "moment";
import {Colors, window} from "../../common/common.constants";

export default class Standings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            standings: this.props.standings
        };
    }
    render() {
        let standings = this.state.standings;
        let group_count = standings.length;
        return (
            <ScrollView>
                {standings.map((group) => {
                    return (<View key={group.name}>
                        {group_count>1?(<View style={styles.groupHead}><Text style={styles.groupName}>{group.name}</Text></View>):null}
                        <View style={styles.teamItem}>
                            <View style={styles.teamRank}><Text style={styles.teamText}>#</Text></View>
                            <View style={styles.teamName}><Text style={styles.teamLeft}>Đội</Text></View>
                            <View style={styles.teamWin}><Text style={styles.teamTextWin}>T</Text></View>
                            <View style={styles.teamDraw}><Text style={styles.teamTextDraw}>H</Text></View>
                            <View style={styles.teamLose}><Text style={styles.teamTextLose}>B</Text></View>
                            <View style={styles.teamDiff}><Text style={styles.teamText}>+/-</Text></View>
                            <View style={styles.teamPoint}><Text style={styles.teamTextBold}>P</Text></View>
                        </View>
                        {group.teams.map((item) => {
                            return (<View key={item.name +"-"+ item.rank} style={styles.teamItem}>
                                <View style={styles.teamRank}><Text style={styles.teamText}>{item.rank}</Text></View>
                                <View style={styles.teamName}><Text style={styles.teamLeft}>{item.name}</Text></View>
                                <View style={styles.teamWin}><Text style={styles.teamTextWin}>{item.win}</Text></View>
                                <View style={styles.teamDraw}><Text style={styles.teamTextDraw}>{item.draw}</Text></View>
                                <View style={styles.teamLose}><Text style={styles.teamTextLose}>{item.lost}</Text></View>
                                <View style={styles.teamDiff}><Text style={styles.teamText}>{item.offset}</Text></View>
                                <View style={styles.teamPoint}><Text style={styles.teamTextBold}>{item.point}</Text></View>
                            </View>)
                        })}
                    </View>);
                })}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    groupHead: {
        backgroundColor: Colors.lightYellow,
        padding: 15
    },
    groupName: {
        fontSize: 14,
        fontWeight: `bold`
    },
    teamItem: {
        flexDirection: `row`,
        alignItems: `stretch`,
        borderTopWidth: 1,
        borderTopColor: Colors.grayBorder,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayBorder,
    },
    teamLeft: {
        flex: 1,
        textAlign: `left`,
        paddingHorizontal: 15
    },
    teamText: {
        flex: 1,
        textAlign: `center`
    },
    teamTextWin: {
        flex: 1,
        textAlign: `center`,
        color: Colors.green,
        fontWeight: `bold`
    },
    teamTextDraw: {
        flex: 1,
        textAlign: `center`,
        color: Colors.orange
    },
    teamTextLose: {
        flex: 1,
        textAlign: `center`,
        color: Colors.red
    },
    teamTextBold: {
        flex: 1,
        textAlign: `center`,
        fontWeight: `bold`
    },
    teamRank: {
        padding: 15,
        width: 50,
        borderRightWidth: 1,
        borderRightColor: Colors.grayBorder
    },
    teamName: {
        paddingVertical: 15,
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: Colors.grayBorder
    },
    teamWin: {
        paddingVertical: 15,
        width: 30,
        borderRightWidth: 1,
        borderRightColor: Colors.grayBorder
    },
    teamMatch: {
        paddingVertical: 15,
        width: 30,
        borderRightWidth: 1,
        borderRightColor: Colors.grayBorder
    },
    teamDraw: {
        paddingVertical: 15,
        width: 30,
        borderRightWidth: 1,
        borderRightColor: Colors.grayBorder
    },
    teamLose: {
        paddingVertical: 15,
        width: 30,
        borderRightWidth: 1,
        borderRightColor: Colors.grayBorder
    },
    teamDiff: {
        paddingVertical: 15,
        width: 60,
        borderRightWidth: 1,
        borderRightColor: Colors.grayBorder
    },
    teamPoint: {
        paddingVertical: 15,
        width: 50
    },

});