import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useSound from 'use-sound';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [commandHistory, setCommandHistory] = useState<{ command: string; response: string }[]>([]);
  const [textCommand, setTextCommand] = useState('');

  // Sound effects
  const [playActivate] = useSound('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
  const [playDeactivate] = useSound('https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3');

  const { transcript, resetTranscript } = useSpeechRecognition();

  // Fetch command from backend
  const fetchCommand = async (command: string): Promise<void> => {
    try {
      const response = await fetch('http://127.0.0.1:5000/voice_command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      });

      const data = await response.json();
      setCommandHistory((prev) => [...prev, { command: data.command, response: data.response }]);
    } catch (error) {
      console.error('Error fetching command:', error);
    }
  };

  // Handle text-based command input
  const handleTextCommandSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (textCommand.trim()) {
      fetchCommand(textCommand);
      setTextCommand('');
    }
  };
  

  // Toggle voice listening
  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      playDeactivate();
    } else {
      SpeechRecognition.startListening({ continuous: true });
      playActivate();
      fetchCommand("voice");  // Greeting on activation
    }
    setIsListening(!isListening);
  };

  // Detect spacebar keypress to toggle AI
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        toggleListening();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isListening]);

  // Fetch the latest spoken command when transcript changes
  useEffect(() => {
    if (transcript) {
      fetchCommand(transcript);
      resetTranscript();
    }
  }, [transcript]);

  return (
    <div className="bg-gray-800/30 rounded-lg p-6 shadow-neon backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg text-glow">AI Assistant</h3>
        <button onClick={toggleListening} className={`p-2 rounded-full ${isListening ? 'bg-cyan-500/30' : 'bg-cyan-900/30'}`}>
          {isListening ? <Mic className="w-6 h-6 text-cyan-400" /> : <MicOff className="w-6 h-6 text-cyan-400" />}
        </button>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {commandHistory.map((item, index) => (
          <div key={index} className="bg-gray-900/30 rounded p-2">
            <span className="text-cyan-400">➜ {item.command}</span>
            <div className="text-sm text-cyan-300/80 ml-6">{item.response}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleTextCommandSubmit} className="mt-4 flex">
        <input type="text" className="w-full p-2 bg-gray-900/30 rounded text-white focus:outline-none" placeholder="Type a command..." value={textCommand} onChange={(e) => setTextCommand(e.target.value)} />
        <button type="submit" className="ml-2 p-2 bg-cyan-600 rounded">
          <Send className="w-5 h-5 text-white" />
        </button>
      </form>
    </div>
  );
};

export default VoiceAssistant;
