import NoteCard from './NoteCard';

function NotesGrid({ notes, onDelete }) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default NotesGrid;
