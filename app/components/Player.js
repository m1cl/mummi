import React, {useRef, useState} from 'react';
import Header from './Header';
import SeekBar from './SeekBar';
import AlbumArt from './AlbumArt';
import Controls from './Controls';
import TrackDetails from './TrackDetails';
import {
  AsyncStorage,
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CD from '../cd.svg';

import Video from 'react-native-video';

export default function Player() {
  const [totalLength, setTotalLength] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [email, setEmail] = useState('Email');
  const [password, setPassword] = useState('Passwort');
  const [jwt, setJwt] = useState('');
  const [isAuthenticated, authenticate] = useState(false);
  const [selectedTrack] = useState(0);
  const [paused, setPause] = useState(false);

  let audioElement = useRef(null);

  function setDuration(data) {
    setTotalLength(Math.floor(data.duration));
  }
  function setTime(data) {
    setCurrentPosition(Math.floor(data.currentTime));
  }
  function authenticateUser() {
    const url = 'http://localhost:8000/api/me';
    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    let body = {
      email,
      password,
    };
    fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .then((res) => {
        authenticate(true);
        alert(res);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }
  function onEmailChange(email) {
    setEmail(email);
  }
  function onPasswordChange(password) {
    setPassword(password);
  }

  function seek(time) {
    time = Math.floor(time);
    if (audioElement && typeof audioElement.seek == 'function') {
      audioElement.seek(time);
    }
    setCurrentPosition(time);
    setPause(false);
  }

  // let track = tracks[selectedTrack];
  let track = [];

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
  if (isAuthenticated) {
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
  return (
    <View style={styles.container}>
      <CD style={styles.svg}></CD>
      <View style={styles.container}>
        <TextInput
          name="email"
          style={styles.emailInput}
          onChangeText={(text) => onEmailChange(text)}
          value={email}
        />
        <TextInput
          autoCompleteType="password"
          type="password"
          secureTextEntry={true}
          name="password"
          style={styles.passwordInput}
          onChangeText={(text) => onPasswordChange(text)}
          value={password}
        />
        <View style={styles.fixToText}>
          <TouchableOpacity onPress={authenticateUser} style={styles.button}>
            <Text style={styles.buttonText}>start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
  inputs: {
    flexDirection: 'row',
  },
  audioElement: {
    height: 0,
    width: 0,
  },
  emailInput: {
    marginTop: 100,
    borderRadius: 60,
    marginRight: 30,
    marginLeft: 30,
    padding: 10,
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
  },
  passwordInput: {
    marginTop: 30,
    borderRadius: 60,
    marginRight: 30,
    marginLeft: 30,
    padding: 10,
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
  },
  startBtn: {
    marginTop: 300,
    height: 50,
    width: 10,
    marginRight: 30,
    marginLeft: 30,
  },
  button: {
    marginTop: 30,
    borderRadius: 60,
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
  svg: {
    marginTop: 80,
    marginBottom: 0,
    marginLeft: 130,
    marginRight: 130,
  },
};
