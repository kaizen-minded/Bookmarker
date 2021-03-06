import { API_BASE_URL } from '../config';

export const FETCH_BOOK_REQUEST = 'FETCH_BOOK_REQUEST';
export const fetchBookRequest = () => ({
    type: FETCH_BOOK_REQUEST
})

export const FETCH_BOOK_SUCCESS = 'FETCH_BOOK_SUCCESS';
export const fetchBookSuccess = (books) => ({
    type: FETCH_BOOK_SUCCESS,
    books
})

export const FETCH_BOOK_ERROR = 'FETCH_BOOK_ERROR';
export const fetchBookError = error => ({
    type: FETCH_BOOK_ERROR,
    error
})
export const ADD_BOOK = 'ADD_BOOK';
export const addNewBook = (newBook) => ({
    type: ADD_BOOK,
    newBook
})

export const GET_ALL_BOOKS = "GET_ALL_BOOKS";
export const getAllBooks = (books) => ({
    type: GET_ALL_BOOKS,
    books
})
export const GET_STATUS_BOOKS = "GET_STATUS_BOOKS";
export const getStatusBooks = (books) => ({
    type: GET_STATUS_BOOKS,
    books
})

export const GET_ONE_BOOK = 'GET_ONE_BOOK';
export const getOneBook = (oneBook) => ({
    type: GET_ONE_BOOK,
    oneBook
})

export const UPDATE_STATUS = 'UPDATE_STATUS';
export const updateStatus = (status, bookId) => ({
    type: UPDATE_STATUS,
    status: status,
    bookId: bookId
})
export const DELETE_BOOK = 'DELETE_BOOK';
export const deleteBook = (bookId) => ({
    type: DELETE_BOOK,
    bookId
})
export const ADD_COMMENT = "ADD_COMMENT";
export const addComment = (bookId, comment) => ({
    type: ADD_COMMENT,
    bookId,
    comment
})
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const removeComment = (bookId, comments) => ({
    type: REMOVE_COMMENT,
    bookId,
    comments
})

// fetch(`${API_BASE_URL}/book`)

export const fetchAllBooks = () => dispatch => {
    return fetch(`${API_BASE_URL}/book/allbooks`, {
        headers: {
            "Authorization": `Bearer ${localStorage.authToken}`
        }
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        }).then(book => {
            dispatch(getAllBooks(book));
        }).catch(err => {
            dispatch(fetchBookError(err));
        });
}

const fetchBooksByStatus = (status) => dispatch => {
    dispatch(fetchBookRequest())
    return fetch(`${API_BASE_URL}/book/?status=${status}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.authToken}`
        }
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        }).then(book => {
            dispatch(getStatusBooks(book));
        }).catch(err => {
            dispatch(fetchBookError(err));
        });
};

export const fetchOneBook = (id) => dispatch => {
    return fetch(`${API_BASE_URL}/book/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.authToken}`
        }
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        }).then(book => {
            dispatch(getOneBook(book));
        }).catch(err => {
            dispatch(fetchBookError(err));
        });
}

export const createNewBook = (newbook) => dispatch => {
    const data = {
        method: "POST",
        body: JSON.stringify(newbook),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.authToken}`
        }
    }
    return fetch(`${API_BASE_URL}/book/create`, data)
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json()
        })
        .then(newbook => {
            dispatch(addNewBook(newbook))
        })
}

export const updateBookStatus = (bookId, status) => dispatch => {
    const bookUpdate = {
        id: bookId,
        status: status
    }
    const data = {
        method: "PUT",
        body: JSON.stringify(bookUpdate),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.authToken}`
        }
    }
    return fetch(`${API_BASE_URL}/book/updatebookstatus/${bookId}`, data)
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json()
        })
        .then(newStatus => {
            let { status, bookId } = newStatus.message;
            dispatch(updateStatus(status, bookId))
        })
}

export const removeBook = (bookId) => dispatch => {
    const deleteTargetBook = {
        id: bookId
    }
    const data = {
        method: "DELETE",
        body: JSON.stringify(deleteTargetBook),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.authToken}`
        }
    }
    fetch(`${API_BASE_URL}/book/deletebook/${bookId}`, data)
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json()
        })
        .then(newStatus => {
            let { bookId } = newStatus;
            dispatch(deleteBook(bookId));
        })
}

export const addNoteToBook = (bookId, bookmarkPage, comment) => dispatch => {
    const newComment = {
        id: bookId,
        bookmarkPage: bookmarkPage,
        comment: comment
    }
    const data = {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.authToken}`
        }
    }
    return fetch(`${API_BASE_URL}/book/addcomment/${bookId}`, data)
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json()
        })
        .then(updatedComments => {
            const comment = updatedComments.commentInfo
            dispatch(addComment(bookId, comment))
        })
}

export const removeNoteFromBook = (bookId, commentId) => dispatch => {
    const targetComment = {
        bookId: bookId,
        commentId: commentId
    }
    const data = {
        method: "DELETE",
        body: JSON.stringify(targetComment),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.authToken}`
        }
    }
    return fetch(`${API_BASE_URL}/book/deletecomment/${bookId}`, data)
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json()
        })
        .then(updatedComments => {
            const comment = updatedComments.commentInfo
            dispatch(removeComment(bookId, comment.notes))
        })
}

export default fetchBooksByStatus