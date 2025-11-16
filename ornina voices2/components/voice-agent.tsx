'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback, useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import Image from 'next/image';

export default function VoiceAgent() {
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * ElevenLabs SDK Mute Control Approach:
   * The useConversation hook supports controlled mute state via the `micMuted` prop.
   * By passing `micMuted: isMuted` to the hook, the SDK automatically handles
   * muting/unmuting the audio stream at the WebRTC level.
   * 
   * The hook returns the current `micMuted` state which reflects the actual
   * microphone state managed by the SDK.
   */
  const conversation = useConversation({
    micMuted: isMuted, // Control microphone mute state
    onConnect: () => {
      console.log('Connected to agent');
      setIsActive(true);
      setIsMuted(false); // Reset mute state when conversation starts
      setCallDuration(0); // Reset timer when conversation starts
    },
    onDisconnect: () => {
      console.log('Disconnected from agent');
      setIsActive(false);
      setIsMuted(false); // Reset mute state when conversation ends
      setCallDuration(0); // Reset timer when conversation ends
    },
    onError: (error) => {
      console.error('Conversation error:', error);
    },
  });

  // Timer effect to track call duration
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive]);

  // Format duration as MM:SS
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Start the conversation with your agent ID
      await conversation.startSession({
        agentId: 'agent_4401ka16cew2eqca6dbp51vq27zr',
        connectionType: 'webrtc',
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      alert('Failed to start conversation. Please check microphone permissions.');
    }
  }, [conversation]);

  const endConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  /**
   * Toggle microphone mute state during active conversation.
   * The ElevenLabs SDK handles the actual audio stream control via the micMuted prop.
   * Error handling: If the state update fails, React will maintain the previous state.
   * The SDK's micMuted property can be used to verify the actual mute state if needed.
   */
  const toggleMute = useCallback(() => {
    try {
      setIsMuted((prevMuted) => {
        const newMutedState = !prevMuted;
        console.log(`Microphone ${newMutedState ? 'muted' : 'unmuted'}`);
        return newMutedState;
      });
    } catch (error) {
      console.error('Failed to toggle mute state:', error);
      // State will remain unchanged if error occurs during setState
    }
  }, []);

  return (
    <>
      {!isActive ? (
        <button
          onClick={startConversation}
          className="px-12 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full text-white text-lg font-semibold tracking-wider hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
          aria-label="Start voice conversation"
        >
          CALL AGENT
        </button>
      ) : (
        <div className="flex flex-row items-center justify-center gap-4 px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300">
          <Image 
            src="/LOGO.png" 
            alt="Logo" 
            width={56} 
            height={56}
            className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
          />
          
          <div className="text-white text-xl font-mono font-semibold tracking-wider px-2">
            {formatDuration(callDuration)}
          </div>
          
          <div className="flex flex-row items-center gap-2">
            <button
              onClick={endConversation}
              className="px-8 py-2 bg-red-500/30 border-2 border-red-400/60 rounded-full text-red-300 text-base font-semibold tracking-wider hover:bg-red-500/40 hover:border-red-400/80 transition-all duration-300 hover:scale-105 animate-pulse"
              aria-label="End voice conversation"
            >
              END CALL
            </button>
            
            <button
              onClick={toggleMute}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                isMuted
                  ? 'bg-red-500/30 border-red-400/60 text-red-300 animate-pulse'
                  : 'bg-white/20 border-white/40 text-white hover:bg-white/30'
              }`}
              aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
