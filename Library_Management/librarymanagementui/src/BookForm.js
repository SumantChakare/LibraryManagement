import React, { useState } from 'react';
import axios from 'axios';

const BookForm = ({ book, onSuccess }) => {
    const [formData, setFormData] = useState(book || {
        title: '',
        author: '',
        isbn: '',
        publication_date: '',
        is_available: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (book) {
            axios.put(`/api/books/${book.id}/`, formData)
                .then(response => onSuccess(response.data))
                .catch(error => console.error('There was an error updating the book!', error));
        } else {
            axios.post('/api/books/', formData)
                .then(response => onSuccess(response.data))
                .catch(error => console.error('There was an error creating the book!', error));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </div>
            <div>
                <label>Author</label>
                <input type="text" name="author" value={formData.author} onChange={handleChange} />
            </div>
            <div>
                <label>ISBN</label>
                <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} />
            </div>
            <div>
                <label>Publication Date</label>
                <input type="date" name="publication_date" value={formData.publication_date} onChange={handleChange} />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default BookForm;
