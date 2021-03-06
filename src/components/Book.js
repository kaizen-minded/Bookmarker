import React from 'react';
import { Link } from 'react-router-dom';

class Book extends React.Component {

    render() {
        let title;
        if(this.props.title.length > 35){
            title = `${this.props.title.substring(0, 35)}...`
        }
        else{
            title = this.props.title
        }
        const mainContent = (
            <React.Fragment>
                <h2>{title}</h2>
                <img className="book-cover" src={this.props.bookCover} alt={`Book cover for ${this.props.bookCover}`} />
            </React.Fragment>
        )
        let finalContent;
        switch (this.props.parent) {
            case "SearchList":
                finalContent =
                    <React.Fragment>
                        {mainContent}
                        <button className="save-btn" onClick={(e) => this.props.onSubmit(e, this.props.key)}>Save</button>
                    </React.Fragment>
                break;
            case "BookList":
                finalContent =
                    <React.Fragment>
                        {mainContent}
                        <p>Page: {this.props.notes.length > 0 ? this.props.notes[0].currentPage : 0}</p>
                        <p>{this.props.notes.length} Notes</p>

                        <form onSubmit={(e) => this.props.formSubmit(e, this.props.bookId, e.target.bookStatus.value)} role="form">
                            <label>Book Status:</label>
                            <select name="bookStatus" id="user" defaultValue={this.props.status}>
                                <option value="Current">Current</option>
                                <option value="Wishlist">Wishlist</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <input type="submit" value="Update" />
                        </form>
                        <Link to={`/view/book/${this.props.bookId}`}><button className="details-btn">More Details</button></Link>
                        <button className="btn delete-btn" onClick={() => this.props.deleteBook(this.props.bookId)}>Delete</button>
                    </React.Fragment>
                break;
            default:
                finalContent = "Nothing Found"
        }
        return (
            <section className="book-display" key={this.props.key} onClick={this.props.handleActive} role="region">
                {finalContent}
            </section>
        )
    }
}

export default Book