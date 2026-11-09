import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatTime,
  upgradeArtworkResolution,
  parseDuration,
  getNextTrackIndex,
  getPreviousTrackIndex,
  shuffleQueue,
  filterTracks,
} from './audioUtils';
import { Track } from '../types/music';

test('formatTime formats seconds properly into mm:ss', () => {
  assert.equal(formatTime(0), '0:00');
  assert.equal(formatTime(84), '1:24');
  assert.equal(formatTime(246), '4:06');
  assert.equal(formatTime(59), '0:59');
  assert.equal(formatTime(3605), '1:00:05');
  assert.equal(formatTime(NaN), '0:00');
  assert.equal(formatTime(-10), '0:00');
});

test('upgradeArtworkResolution replaces low-res dimensions with high-res 600x600', () => {
  const itunesLowRes = 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/0f/50/20/0f502078-43d8-5544-4cb6-0e1f7d540203/886443834164.jpg/100x100bb.jpg';
  const expectedHighRes = 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/0f/50/20/0f502078-43d8-5544-4cb6-0e1f7d540203/886443834164.jpg/600x600bb.jpg';
  assert.equal(upgradeArtworkResolution(itunesLowRes, 600), expectedHighRes);
  assert.equal(upgradeArtworkResolution(''), '');
});

test('parseDuration converts milliseconds to seconds', () => {
  assert.equal(parseDuration(246000), 246);
  assert.equal(parseDuration(0), 0);
  assert.equal(parseDuration(1500), 2);
});

test('getNextTrackIndex handles repeat modes accurately', () => {
  // repeat off
  assert.equal(getNextTrackIndex(0, 3, 'off'), 1);
  assert.equal(getNextTrackIndex(2, 3, 'off'), null);

  // repeat all
  assert.equal(getNextTrackIndex(2, 3, 'all'), 0);

  // repeat one
  assert.equal(getNextTrackIndex(1, 3, 'one'), 1);

  // empty queue
  assert.equal(getNextTrackIndex(0, 0, 'all'), null);
});

test('getPreviousTrackIndex loops around accurately', () => {
  assert.equal(getPreviousTrackIndex(2, 3), 1);
  assert.equal(getPreviousTrackIndex(0, 3), 2);
  assert.equal(getPreviousTrackIndex(0, 0), 0);
});

test('shuffleQueue retains current item at index 0 and maintains all items', () => {
  const items = ['track1', 'track2', 'track3', 'track4'];
  const shuffled = shuffleQueue(items, 1); // 'track2' is current

  assert.equal(shuffled[0], 'track2');
  assert.equal(shuffled.length, 4);
  assert.ok(shuffled.includes('track1'));
  assert.ok(shuffled.includes('track3'));
  assert.ok(shuffled.includes('track4'));
});

test('filterTracks filters by text search and genre', () => {
  const dummyTracks: Track[] = [
    { id: '1', title: 'Another Love', artist: 'Tom Odell', duration: 246, audioUrl: 'a', coverUrl: 'c', genre: 'Indie' },
    { id: '2', title: 'Midnight City', artist: 'M83', duration: 240, audioUrl: 'b', coverUrl: 'd', genre: 'Electronic' },
    { id: '3', title: 'Neon Skies', artist: 'Lunar', duration: 180, audioUrl: 'c', coverUrl: 'e', genre: 'Chill' },
  ];

  const searchTom = filterTracks(dummyTracks, 'tom');
  assert.equal(searchTom.length, 1);
  assert.equal(searchTom[0].id, '1');

  const filterChill = filterTracks(dummyTracks, '', 'chill');
  assert.equal(filterChill.length, 1);
  assert.equal(filterChill[0].id, '3');

  const filterAll = filterTracks(dummyTracks, '', 'all');
  assert.equal(filterAll.length, 3);
});
