import React from 'react';
import {
    DatePickerAndroid,
    Platform,
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import IconLoading from "../../common/components/IconLoading";
import {getAppPropMap, getAppStateMap} from "../../common/common.map";
import {connect} from 'react-redux';
import styles from '../styles/PlayerStyle';
import { Ionicons } from '@expo/vector-icons'
import { Audio } from 'expo-av'
import {Colors} from "../../common/common.constants";

const audioBookPlaylist = [
	{
		title: '',
		author: '',
		source: '',
		uri: '',
		imageSource: ''
	}
]
class PlayerScreen extends React.Component {
	static navigationOptions = {
        title: 'Đọc truyện'
    };
	state = {
        isPlaying: false,
        loading: true,
		playbackInstance: null,
		currentIndex: 0,
		volume: 1.0,
		isBuffering: true
	}

    async UNSAFE_componentWillMount(){
        audioBookPlaylist[0] = {
            title: this.props.navigation.state.params.item.name,
            author: this.props.navigation.state.params.novel.name,
            source: "Ketqualive",
            uri:this.props.navigation.state.params.item.link,
            imageSource: this.props.navigation.state.params.novel.image,
        }
    }

	async componentDidMount() {
		try {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				playsInSilentModeIOS: true,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
				shouldDuckAndroid: true,
				staysActiveInBackground: true,
				playThroughEarpieceAndroid: true
			})

			this.loadAudio()
		} catch (e) {
			console.log(e)
		}
	}

    async componentWillUnmount(){
        const { isPlaying, playbackInstance } = this.state
		await playbackInstance.pauseAsync();

    }

	async loadAudio() {
		const { currentIndex, isPlaying, volume } = this.state

		try {
			const playbackInstance = new Audio.Sound()
			const source = {
				uri: audioBookPlaylist[currentIndex].uri
			}

			const status = {
				shouldPlay: isPlaying,
				volume: volume
			}

			playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
			await playbackInstance.loadAsync(source, status, false)
			this.setState({
                playbackInstance: playbackInstance,
                loading: false
			})
		} catch (e) {
			console.log(e)
		}
	}

	onPlaybackStatusUpdate = status => {
		this.setState({
			isBuffering: status.isBuffering
		})
	}

	handlePlayPause = async () => {
		const { isPlaying, playbackInstance } = this.state
		isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

		this.setState({
			isPlaying: !isPlaying
		})
	}

	handlePreviousTrack = async () => {
		/*
		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			this.setState({
				currentIndex : (currentIndex === 0 ? audioBookPlaylist.length -1 : currentIndex-1)
			});
			this.loadAudio()
		}*/
	}

	handleNextTrack = async () => {
		/*
		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			this.setState({
				currentIndex: (currentIndex+1 > audioBookPlaylist.length - 1 ? 0 : currentIndex+1)
			});
			this.loadAudio()
		}*/
	}

	renderFileInfo() {
		const { playbackInstance, currentIndex } = this.state
		return playbackInstance ? (
			<View style={styles.trackInfo}>
				<Text style={[styles.trackInfoText, styles.largeText]}>
					{audioBookPlaylist[currentIndex].title}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{audioBookPlaylist[currentIndex].author}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{"Nguồn: " + audioBookPlaylist[currentIndex].source}
				</Text>
			</View>
		) : null
	}

	render() {
        if(this.state.loading === true){
            return (<IconLoading style={{paddingVertical: 30}} color={Colors.lightBlack} />);
        }
		return (
			<View style={styles.container}>
				<Image
					style={styles.albumCover}
					source={{ uri: this.props.navigation.state.params.novel.image}}
				/>
				<View style={styles.controls}>
					<TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
						<Ionicons name='ios-skip-backward' size={48} color='#444' />
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
						{this.state.isPlaying ? (
							<Ionicons name='ios-pause' size={48} color='#444' />
						) : (
							<Ionicons name='ios-play-circle' size={48} color='#444' />
						)}
					</TouchableOpacity>
					<TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
						<Ionicons name='ios-skip-forward' size={48} color='#444' />
					</TouchableOpacity>
				</View>
				{this.renderFileInfo()}
			</View>
		)
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayerScreen);
