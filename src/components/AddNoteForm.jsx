import { useState, useRef } from 'react';

function AddNoteForm({ onAdd }) {
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  const handleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("❌ Speech Recognition not supported in this browser. Use Chrome.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition; 

    recognition.lang = 'en-US';

    recognition.onstart = () => setListening(true);
    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    recognition.onerror = (e) => {
      console.error("Mic Error:", e.error);
      alert("❌ Mic Error: " + e.error);
      setListening(false);
    };

    recognition.onresult = (e) => {
      setText(e.results[0][0].transcript);
    };

    recognition.start();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6 relative">
      <input
        type="text"
        placeholder="Take a note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ... bg-white text-black dark:bg-gray-800 dark:text-white ...  font-[cursive]"
      />

      <button
        type="button"
        onClick={handleVoice}
        title="Speak"
        className={`text-white px-4 py-2 rounded-full transition duration-300 ${
          listening ? 'bg-purple-600 animate-pulse' : 'bg-purple-500 hover:bg-purple-600'
        }`}
      >
        🎤
      </button>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        ➕
      </button>

      {listening && (
        <span className="absolute -bottom-5 left-0 text-sm text-purple-600 font-medium animate-pulse">
          🎙️ Listening...
        </span>
      )}
    </form>
  );
}

export default AddNoteForm;
