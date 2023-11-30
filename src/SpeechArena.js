import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import MicIcon from '@mui/icons-material/Mic';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import MicOffIcon from '@mui/icons-material/MicOff';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

const SpeechArena = () => {
  const [text, setText] = useState('');
  const [isCopied, setCopied] = useState(false);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleCopy = () => {
    setText(transcript);
    setCopied(true);
  };

  const handleReset = () => {
    resetTranscript();
    setCopied(false); 
  };

  return (
    <div className='flex flex-col font-sans text-sky-950 justify-center content-center'>

      <div className='flex w-screen justify-center items-center content-center self-center p-10'>
        
        <p className='text-zinc-300 text-lg p-2'> Microphone : {listening ? <ToggleOnIcon style={{color: 'red', fontSize:'2.5em'}}/> : <ToggleOffIcon style={{color: 'white',fontSize:'2.5em'}}/>  }</p>
      </div>


      <div className='flex w-screen justify-center items-center content-center self-center'>
        <p onClick={() => setText(transcript)} className='p-5 h-auto w-1/2 m-0 mb-10 mt-10 text-zinc-300 text-md border border-double rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'>
        {transcript}
      </p>
      </div>

      <div className='flex flex-col md:flex-row w-screen justify-center items-center content-center self-center p-10'>
        <CopyToClipboard text={text} onCopy={handleCopy}>
          <button
          className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
        >
          <ContentCopyIcon/>
          {isCopied ? 'Copied!' : 'Copy to clipboard'}
          </button>
        </CopyToClipboard>

      <button
        onClick={startListening}
        className='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
      >
        <GraphicEqIcon/>
        Start Recording
      </button>

      <button
        onClick={SpeechRecognition.stopListening}
        className='text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
      >
        <MicOffIcon/>
        Stop Recording
      </button>

      <button
        onClick={handleReset}
        className='text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
      >
        <RestartAltIcon/>
        Reset
      </button>
      </div>
    </div>
  );
};

export default SpeechArena;
