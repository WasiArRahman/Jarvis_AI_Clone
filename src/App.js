import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

const App = () => {
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState('');

  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript !== '') {
      handleVoiceCommand(transcript);
      resetTranscript();
    }
  }, [transcript]);

  const handleVoiceCommand = async (cmd) => {
    setCommand(cmd);
    try {
      const res = await axios.post('https://api.example.com/voice', { command: cmd });
      setResponse(res.data.message);
    } catch (error) {
      console.error('Error processing command:', error);
      setResponse('Error processing your command.');
    }
  };

  return (
    <div>
      <h1>Voice Command App</h1>
      <button onClick={useSpeechRecognition.listenContinuously}>Start Listening</button>
      <p>Command: {command}</p>
      <p>Response: {response}</p>
    </div>
  );
};

export default App;