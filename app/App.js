import React, {Component, useState} from 'react';

import Player from './components/Player';

export const TRACKS = [
  {
    title: 'Stressed Out',
    artist: 'Twenty One Pilots',
    albumArtUrl:
      'http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg',
    audioUrl: './assets/music/bandwurm.mp3',
  },
  {
    title: 'Oligophrenie',
    artist: 'Der Durstige Mann',
    albumArtUrl: '../assets/album_covers/front.jpg',
    audioUrl: './assets/music/02 - Der Durstige Mann - Oligophrenie.mp3',
  },
  {
    title: 'Bier nix gut',
    artist: 'Der Durstige Mann',
    albumArtUrl: '../assets/album_covers/front.jpg',
    audioUrl: './assets/music/03 - Der Durstige Mann - Bier nix gut.mp3',
  },
];

export default function App() {
  return <Player></Player>;
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
};
