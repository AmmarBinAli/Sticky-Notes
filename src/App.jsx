import { useEffect, useState } from 'react';
import AddNoteForm from './components/AddNoteForm';
import NotesGrid from './components/NotesGrid';
import useDarkMode from './hooks/DarkMode';

function App() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('notes'));
    if (saved) setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const colors = [
      'bg-yellow-200', 'bg-green-200', 'bg-blue-200',
      'bg-pink-200', 'bg-purple-200', 'bg-white'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setNotes([...notes, { id: Date.now(), text, color: randomColor }]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className={`min-h-screen px-4 py-6 transition-colors duration-500 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-4xl font-bold font-[cursive] tracking-wide text-center w-full">
          🧠 StickyMind – Notes That Stick
        </h1>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gray-800 dark:bg-white dark:text-black transition  font-[cursive]"
        >
          {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <AddNoteForm onAdd={addNote} />
      <NotesGrid notes={notes} onDelete={deleteNote} />
    </div>
  );
}

export default App;
