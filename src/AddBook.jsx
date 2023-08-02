import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

function AddBook(props) {
    const [open, setOpen] = useState(false)
    const [book, setBook] = useState({title: '', author: '', year: '', isbn: '', price: ''})

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const inputChanged = (event) => {
        setBook({...book, [event.target.name]: event.target.value})
    }

    const handleSave = () => {
        props.addBook(book)
        handleClose()
    }
    return(
        <>
        <Button variant="contained" onClick={handleOpen}>Add book</Button>

        <Dialog open={open}>
            <DialogTitle>New book</DialogTitle>

            <DialogContent>
                <TextField
                    name="title"
                    value={book.title}
                    onChange={inputChanged}
                    margin="dense"
                    label="Title"
                    fullWidth>
                </TextField>
                <TextField
                    name="author"
                    value={book.author}
                    onChange={inputChanged}
                    margin="dense"
                    label="Author"
                    fullWidth>
                </TextField>
                <TextField
                    name="year"
                    value={book.year}
                    onChange={inputChanged}
                    margin="dense"
                    label="Year"
                    fullWidth>
                </TextField>
                <TextField
                    name="isbn"
                    value={book.isbn}
                    onChange={inputChanged}
                    margin="dense"
                    label="ISBN"
                    fullWidth>
                </TextField>
                <TextField
                    name="price"
                    value={book.price}
                    onChange={inputChanged}
                    margin="dense"
                    label="Price"
                    fullWidth>
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleClose}>Cancel</Button>
                <Button color="primary" onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}
export default AddBook