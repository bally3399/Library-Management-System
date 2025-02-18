import React, { useState } from 'react';

const AddBookPage = () => {
    const [bookTitle, setBookTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [cart, setCart] = useState([]);

    const handleAddBook = () => {
        if (bookTitle && author) {
            setCart([...cart, { title: bookTitle, author }]);
            setBookTitle('');
            setAuthor('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Add Book to Cart</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bookTitle">
                        Book Title
                    </label>
                    <input
                        type="text"
                        id="bookTitle"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                  style={{ background: "#a47a47"}}
                    onClick={handleAddBook}
                    className="bg-yellow-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Add to Cart
                </button>
            </div>
            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Cart</h2>
                <ul className="list-disc pl-5">
                    {cart.map((book, index) => (
                        <li key={index} className="mb-2">
                            <span className="font-semibold">{book.title}</span> by {book.author}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddBookPage;