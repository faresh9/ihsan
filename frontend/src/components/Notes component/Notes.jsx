import { useState, useEffect } from 'react';
import NotesList from './NotesList';
import { nanoid } from 'nanoid';
import Search from './Search';
import NotesHeader from './NotesHeader';
import '../../../styles/note.css';

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

	const token = localStorage.getItem('token'); // Retrieve the token from localStorage

	useEffect(() => {
		fetch('http://localhost:3000/notes', {
			headers: {
				'Authorization': `Bearer ${token}`, // Include the token in the request headers
			}
		})
			.then(response => response.json())
			.then(data => setNotes(data))
			.catch(error => console.error('Error:', error));
	}, [token]);

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
				'Authorization': `Bearer ${token}`, // Include the token in the request headers
			},
			body: JSON.stringify(newNote),
		})
			.then(response => response.json())
			.catch(error => {
				console.error('Error:', error);
			});
	};

	const deleteNote = (id) => {
		fetch(`http://localhost:3000/notes/${id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${token}`, // Include the token in the request headers
			}
		})
			.then(() => setNotes(prevNotes => prevNotes.filter(note => note.id !== id)))
			.catch(error => console.error('Error:', error));
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

export default Notes;
