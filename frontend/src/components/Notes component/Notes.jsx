
import { useState, useEffect } from 'react'
import NotesList from './NotesList'
import { nanoid } from 'nanoid';
import Search from './Search';
import NotesHeader from './NotesHeader';
import '../../../styles/note.css'
function Notes() {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'This is my first note!',
			date: '15/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my second note!',
			date: '21/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my third note!',
			date: '28/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my new note!',
			date: '30/04/2021',
		},
	]);

	const [searchText, setSearchText] = useState('');

	const [darkMode, setDarkMode] = useState(false);

	// useEffect(() => {
	// 	const savedNotes = JSON.parse(
	// 		localStorage.getItem('react-notes-app-data')
	// 	);

	// 	if (savedNotes) {
	// 		setNotes(savedNotes);
	// 	}
	// }, []);

	// useEffect(() => {
	// 	localStorage.setItem(
	// 		'react-notes-app-data',
	// 		JSON.stringify(notes)
	// 	);
	// }, [notes]);

	
	useEffect(() => {
		fetch('http://localhost:3000/notes')
			.then(response => response.json())
			.then(data => setNotes(data));
	}, []);

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
		  id: nanoid(),
		  text: text,
		  date: date.toLocaleDateString(),
		};
	  
		setNotes(prevNotes => [...prevNotes, newNote]);
	  
		fetch('http://localhost:3000/notes', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(newNote),
		})
		  .then(response => response.json())
		  .catch(error => {
			// If the server responds with an error, remove the note from the state
			//setNotes(prevNotes => prevNotes.filter(note => note.id !== newNote.id));
			console.error('Error:', error);
		  });
	  };

const deleteNote = (id) => {
	fetch(`http://localhost:3000/notes/${id}`, {
		method: 'DELETE',
	})
		.then(() => setNotes(prevNotes => prevNotes.filter(note => note.id !== id)));
};

console.log(notes);

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<NotesHeader handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
				/>
			</div>
		</div>
	);
}

export default Notes