"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Play, Pause } from "lucide-react"

interface AudioPlayerProps {
  title: string
  audioUrl: string
}

export function AudioPlayer({ title, audioUrl }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-secondary/50 rounded-lg p-6">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={togglePlay}
          className="flex-shrink-0 bg-primary text-primary-foreground p-3 rounded-full hover:opacity-90 transition"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground/70">{title}</p>
          <p className="text-xs text-foreground/50 mt-1">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>
      </div>

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleProgressChange}
        className="w-full h-2 bg-foreground/20 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, hsl(var(--color-primary)) 0%, hsl(var(--color-primary)) ${
            (currentTime / duration) * 100
          }%, hsl(var(--color-foreground)/0.2) ${(currentTime / duration) * 100}%, hsl(var(--color-foreground)/0.2) 100%)`,
        }}
      />
    </div>
  )
}
