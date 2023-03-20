import Player from '@vimeo/player';
import lodashThrottle from 'lodash.throttle';

const PLAYBACK_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// data is an object containing properties specific to that event
player.on(
  'timeupdate',
  lodashThrottle(({ seconds }) => {
    // save seconds into localstorage
    localStorage.setItem(PLAYBACK_TIME, seconds);
  }, 1000)
);

// ON LOAD PAGE
const playBackTime = Number(localStorage.getItem(PLAYBACK_TIME) ?? 0);

player.setCurrentTime(playBackTime);
