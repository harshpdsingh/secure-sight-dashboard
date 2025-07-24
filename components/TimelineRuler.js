"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, RotateCw, Volume2, Settings } from 'lucide-react';

const SecurityCameraTimeline = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(3 * 60 + 12 + 37/60); // 03:12:37 in minutes
  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef(null);

  // Convert minutes to time string
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    const secs = Math.floor((minutes % 1) * 60);
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate hour markers
  const generateHourMarkers = () => {
    const markers = [];
    for (let i = 0; i <= 24; i++) {
      const position = (i / 24) * 100;
      markers.push(
        <div key={i} className="absolute flex flex-col items-center" style={{ left: `${position}%` }}>
          <div className="w-px h-3 bg-gray-400"></div>
          <span className="text-xs text-gray-400 mt-1">{i.toString().padStart(2, '0')}:00</span>
        </div>
      );
    }
    return markers;
  };

  // Camera events data - positioned exactly based on the screenshot
  const events = [
    // Camera 1 events (based on exact positions in image)
    { camera: 1, type: 'unauthorised', time: 3.0, color: 'bg-orange-500' }, // Just before current time at 03:12
    { camera: 1, type: 'face', time: 14.75, color: 'bg-blue-500', label: '14:45' }, // Face Recognised at 14:45
    { camera: 1, type: 'multiple', time: 16.0, color: 'bg-yellow-500', label: '4 Multiple Events' }, // Multiple Events at 16:00
    { camera: 1, type: 'unauthorised', time: 20.2, color: 'bg-orange-500' }, // Unauthorised Access around 20:12
    { camera: 1, type: 'gun', time: 21.3, color: 'bg-red-600' }, // Gun Threat around 21:18
    
    // Camera 2 events (based on exact positions in image)
    { camera: 2, type: 'unauthorised', time: 6.2, color: 'bg-orange-500' }, // Around 06:12
    { camera: 2, type: 'face', time: 15.5, color: 'bg-blue-500' }, // Face Recognised around 15:30
    
    // Camera 3 events (based on exact positions in image)
    { camera: 3, type: 'traffic', time: 9.0, color: 'bg-teal-500' }, // Traffic congestion at 09:00
    { camera: 3, type: 'unauthorised', time: 19.0, color: 'bg-orange-500' }, // Unauthorised Access at 19:00
  ];

  const handleTimelineClick = (e) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * 24 * 60; // Convert to minutes
      setCurrentTime(Math.max(0, Math.min(24 * 60, newTime)));
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleTimelineClick(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleTimelineClick(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const currentTimePercentage = (currentTime / (24 * 60)) * 100;

  return (
    <div className="bg-gray-900 text-white w-[96%] mx-auto m-8">
      {/* Video Player Header */}
      <div className="bg-grey rounded-t-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SkipBack className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
          <RotateCcw className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <RotateCw className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
          <SkipForward className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
        </div>
        
        <div className="text-white font-mono">
          {formatTime(currentTime)} (15-Jun-2025)
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-white">1x</span>
          <Volume2 className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
          <Settings className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-gray-800 rounded-b-lg p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-4">Camera List</h3>
          
          {/* Timeline Header with Hour Markers */}
          <div className="relative m-6">
            <div className="relative h-8 mb-2 mr-5">
              {generateHourMarkers()}
            </div>
            
            {/* Main Timeline */}
            <div 
              ref={timelineRef}
              className="relative h-16 bg-gray-700 rounded cursor-pointer w-full"
              onMouseDown={handleMouseDown}
            >
              {/* Current Time Indicator */}
              <div 
                className="absolute top-0 w-0.5 h-full bg-yellow-400 z-20"
                style={{ left: `${currentTimePercentage}%` }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-mono">
                  {formatTime(currentTime)}
                </div>
              </div>
              
              {/* Timeline Grid */}
              {Array.from({ length: 24 }, (_, i) => (
                <div 
                  key={i}
                  className="absolute top-0 w-px h-full bg-gray-600"
                  style={{ left: `${(i / 24) * 100}%` }}
                />
              ))}
            </div>
          </div>

          {/* Camera Rows */}
          <div className="space-y-3">
            {[1, 2, 3].map((cameraNum) => (
              <div key={cameraNum} className="flex items-center">
                <div className="w-24 flex items-center space-x-2">
                  <span className="text-sm">Camera - {cameraNum.toString().padStart(2, '0')}</span>
                </div>
                
                {/* Event Timeline for Each Camera */}
                <div className="flex-1 relative h-12 bg-gray-700 rounded ml-4">
                  {events
                    .filter(event => event.camera === cameraNum)
                    .map((event, index) => {
                      const position = (event.time / 24) * 100;
                      return (
                        <div key={index} className="absolute top-1/2 transform -translate-y-1/2">
                          <div 
                            className={`${event.color} px-3 py-1 rounded text-xs text-white whitespace-nowrap flex items-center space-x-1`}
                            style={{ left: `${position}%` }}
                          >
                            {event.type === 'unauthorised' && (
                              <>
                                <span className="text-orange-200">🔒</span>
                                <span>Unauthorised Access</span>
                              </>
                            )}
                            {event.type === 'face' && (
                              <>
                                <span className="text-blue-200">👤</span>
                                <span>Face Recognised</span>
                                {event.label && <span className="ml-2">{event.label}</span>}
                              </>
                            )}
                            {event.type === 'multiple' && (
                              <>
                                <span className="text-yellow-200">⚠</span>
                                <span>{event.label}</span>
                              </>
                            )}
                            {event.type === 'traffic' && (
                              <>
                                <span className="text-teal-200">🚦</span>
                                <span>Traffic congestion</span>
                              </>
                            )}
                            {event.type === 'gun' && (
                              <>
                                <span className="text-red-200">🔫</span>
                                <span>Gun Threat</span>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  
                  {/* Timeline Grid for Each Camera */}
                  {Array.from({ length: 24 }, (_, i) => (
                    <div 
                      key={i}
                      className="absolute top-0 w-px h-full bg-gray-600 opacity-30"
                      style={{ left: `${(i / 24) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityCameraTimeline;