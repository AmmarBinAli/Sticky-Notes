import { useState } from 'react';

function NoteCard({ note, onDelete }) {
  const [removing, setRemoving] = useState(false);

  const handleDelete = () => {
    setRemoving(true);
    setTimeout(() => onDelete(note.id), 300);
  };

  return (
    <div
      className={`mb-4 p-4 rounded-xl break-inside-avoid shadow-md hover:shadow-lg transition-all  font-[cursive] duration-300 ${note.color} ${
        removing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <p className="text-gray-800">{note.text}</p>
      <div className="flex justify-end mt-3">
        <button
          onClick={handleDelete}
          className="text-sm text-red-500 hover:underline"
          title="Delete"
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
