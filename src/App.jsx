import { useState, useEffect } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddBook from './AddBook';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';


function App() {
	const [books, setBooks] = useState([]) 

	const columnDefs = [
	{ field: 'title', sortable: true, filter: true },
	{ field: 'author', sortable: true, filter: true},
	{ field: 'year', sortable: true, filter: true},
	{ field: 'isbn', sortable: true, filter: true},
	{ field: 'price', sortable: true, filter: true},
	{
		headerName: '',
		field: 'id',
		width: 50,
		cellRenderer: params =>
		<IconButton onClick={() => deleteBook(params.value)} size="small" color="error">
			<DeleteIcon></DeleteIcon>
		</IconButton>
	}
]

	useEffect(() => {
		fetchBooks()
	}, [])

	const fetchBooks = () => {
		fetch('https://bookstore-5d039-default-rtdb.europe-west1.firebasedatabase.app/books/.json')
		.then(response => response.json())
		.then(data => addKeys(data))
		.catch(err => console.error(err))
	}
	const addKeys = (data) => {
		const keys = Object.keys(data)
		const valueKeys = Object.values(data).map((item, index) =>
		Object.defineProperty(item, "id", {value: keys[index]}))
		setBooks(valueKeys)
	}
	const addBook = (newBook) => {
		fetch('https://bookstore-5d039-default-rtdb.europe-west1.firebasedatabase.app/books/.json',
		{
			method: 'POST',
			body: JSON.stringify(newBook)
		})
		.then(res => fetchBooks())
		.catch(err => console.error(err))
		}

	const deleteBook = (id) => {
		fetch(`https://bookstore-5d039-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
		{
			method: 'DELETE',
		})
		.then(res => fetchBooks())
		.catch(err => console.error(err))
	}


	return (
		<>
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h5" noWrap>Bookstore</Typography>
			</Toolbar>
		</AppBar>
		<AddBook addBook={addBook}></AddBook>
		<div className='ag-theme-material' style={{height:600, width:1080}}>
			<AgGridReact
				rowData={books}
				columnDefs={columnDefs}>
			</AgGridReact>
		</div>
		</>
	)
}

export default App