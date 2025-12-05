import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    
    return `${mm}:${ss}`;
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const player = document.querySelector<ReactPlayer>('.react-player');
    if (player) {
      player.seekTo(parseFloat(target.value));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    setMuted(parseFloat(e.target.value) === 0);
  };

  const handleToggleMute = () => {
    setMuted(!muted);
  };

  const handleSkipBackward = () => {
    const player = document.querySelector<ReactPlayer>('.react-player');
    if (player) {
      player.seekTo(Math.max(0, player.getCurrentTime() - 10));
    }
  };

  const handleSkipForward = () => {
    const player = document.querySelector<ReactPlayer>('.react-player');
    if (player) {
      player.seekTo(Math.min(duration, player.getCurrentTime() + 10));
    }
  };

  return (
    <div className="video-player">
      {title && (
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
      )}
      
      <div className="video-container rounded-lg overflow-hidden bg-black">
        <ReactPlayer
          url={url}
          className="react-player"
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onDuration={setDuration}
          onProgress={({ played }) => setPlayed(played)}
          controls
        />
      </div>
      
      {/* Custom controls - basic example, can be expanded */}
      <div className="mt-4 flex flex-col space-y-2">
        {/* Progress bar */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{formatTime(played * duration)}</span>
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
            className="flex-1 h-2 appearance-none bg-gray-200 rounded-full outline-none"
            style={{
              background: `linear-gradient(to right, #1E3A8A 0%, #1E3A8A ${played * 100}%, #e5e7eb ${played * 100}%, #e5e7eb 100%)`
            }}
          />
          <span className="text-sm text-gray-500">{formatTime(duration)}</span>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              className="focus:outline-none text-gray-700 hover:text-primary-700"
              onClick={handleSkipBackward}
              title="Назад 10 секунд"
            >
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              className="focus:outline-none text-gray-700 hover:text-primary-700"
              onClick={handleSkipForward}
              title="Вперед 10 секунд"
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              className="focus:outline-none text-gray-700 hover:text-primary-700"
              onClick={handleToggleMute}
              title={muted ? "Включить звук" : "Выключить звук"}
            >
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-2 appearance-none bg-gray-200 rounded-full outline-none"
              style={{
                background: `linear-gradient(to right, #1E3A8A 0%, #1E3A8A ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;