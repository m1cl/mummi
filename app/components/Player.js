import React, {useEffect, Component, useRef, useState, createRef} from 'react';
import Header from './Header';
import SeekBar from './SeekBar';
import AlbumArt from './AlbumArt';
import Controls from './Controls';
import TrackDetails from './TrackDetails';
import {View, StatusBar, Text} from 'react-native';
import Video from 'react-native-video';

// const allPaths = {
//   '1': require('../assets/music/bandwurm.mp3'),
//   '2': require('../assets/music/02 - Der Durstige Mann - Oligophrenie.mp3'),
//   '3': require('http://localhost:8000/bandwurm.mp3'),
// };
//TODO: FETch the data from airsonic
// export const tracks = [
//   {
//     title: 'Bandwurm',
//     artist: 'der Durstige Mann',
//     albumArtUrl: '../assets/album_covers/front.jpg',
//     audioUrl: 'http://localhost:9090/bandwurm.mp3',
//   },
//   {
//     title: 'Oligophrenie',
//     artist: 'Der Durstige Mann',
//     albumArtUrl: '../assets/album_covers/front.jpg',
//     audioUrl: './assets/music/02 - Der Durstige Mann - Oligophrenie.mp3',
//   },
//   {
//     title: 'Bier nix gut',
//     artist: 'Der Durstige Mann',
//     albumArtUrl: '../assets/album_covers/front.jpg',
//     audioUrl: './assets/music/03 - Der Durstige Mann - Bier nix gut.mp3',
//   },
// ];
export const tracks = [
  {
    title: 'Stressed Out',
    artist: 'Twenty One Pilots',
    albumArtUrl:
      'http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg',
    audioUrl:
      'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
  },
  {
    title: 'Love Yourself',
    artist: 'Justin Bieber',
    albumArtUrl:
      'http://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg',
    audioUrl:
      'http://oranslectio.files.wordpress.com/2013/12/39-15-mozart_-adagio-fugue-in-c-minor-k-546.mp3',
  },
  {
    title: 'Hotline Bling',
    artist: 'Drake',
    albumArtUrl:
      'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
    audioUrl:
      'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3',
  },
];

export default function Player(props) {
  const [totalLength, setTotalLength] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [selectedTrack, setTrack] = useState(0);
  const [paused, setPause] = useState(false);

  let audioElement = useRef(null);

  function setDuration(data) {
    setTotalLength(Math.floor(data.duration));
  }
  function setTime(data) {
    setCurrentPosition(Math.floor(data.currentTime));
  }
  function seek(time) {
    time = Math.floor(time);
    if (audioElement && typeof audioElement.seek == 'function') {
      audioElement.seek(time);
    }
    setCurrentPosition(time);
    setPause(false);
  }
  function handleError(message) {
    console.log('ERROR:', message);
  }

  let track = tracks[selectedTrack];

  const video = (
    <Video
      source={{uri: track.audioUrl}} // Can be a URL or a local file.
      ref={audioElement}
      paused={paused} // Pauses playback entirely.
      onLoad={setDuration} // Callback when video loads
      onProgress={setTime} // Callback every ~250ms with currentTime
      style={styles.audioElement}
    />
  );
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Header message="Playing From Charts" />
      <AlbumArt url={track.albumArtUrl} />
      <TrackDetails title={track.title} artist={track.artist} />
      <SeekBar
        onSeek={seek}
        trackLength={totalLength}
        onSlidingStart={() => setPause(true)}
        currentPosition={currentPosition}
      />
      <Controls
        onPressPlay={() => setPause(false)}
        onPressPause={() => setPause(true)}
        paused={paused}
      />
      {video}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
  audioElement: {
    height: 0,
    width: 0,
  },
};
