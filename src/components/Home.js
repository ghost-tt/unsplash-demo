import React, { Component, Fragment } from 'react';
import axios from 'axios';
import '../App.css';
import Pagination from './Pagination';
import List from './List';
import _ from 'lodash'
import { Link } from 'react-router-dom';

const LOAD_STATE = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    LOADING: 'LOADING'
};

class Home extends Component {
    constructor() {
        super();
        this.state = {
            term: 'cars',
            photos: [],
            totalPhotos: 0,
            perPage: 9,
            currentPage: 1,
            loadState: LOAD_STATE.LOADING
        }
        this.input = React.createRef();
        this.debounceSearch = _.debounce(this.debounce, 1000)
    }

    componentDidCatch(error, errorInfo) {
        console.log('Error --> ', error)
    }

    componentDidMount() {
        this.fetchPhotos(this.state.term, this.state.currentPage);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.photos.length === 0 || nextState.loadState === 'LOADING') {
            return false;
        }
        return true
    }

    fetchPhotos(search, page) {
        var self = this;
        const { perPage } = this.state;
        const appId = "22b7b54287910389edfae878f576488bbc5b540a46daa0d2833ba858ce03b143"
        const baseUrl = 'https://api.unsplash.com/search/photos'
        const options = {
            params: {
                client_id: appId,
                query: search,
                page: page,
                per_page: perPage
            }
        };

        this.setState({ loadState: LOAD_STATE.LOADING });
        axios.get(baseUrl, options)
            .then((response) => {
                self.setState({
                    photos: response.data,
                    totalPhotos: parseInt(response.headers['x-total']),
                    currentPage: page,
                    loadState: LOAD_STATE.SUCCESS
                });
            })
            .catch((err) => {
                console.log('errror -->', err)
                this.setState({ loadState: LOAD_STATE.ERROR });
            });
    }


    debounce() {
        this.debounceSearch.cancel()
        this.setState({ term: this.input.current.value })
        this.fetchPhotos(this.input.current.value, this.state.currentPage)
    }

    onChange = (event) => {
        event.persist()
        this.debounceSearch(event)
    }

    renderHeader() {
        return (
            <div className="header">
                {/* <a href="/" className="logo">Unsplash</a> */}
                <Link to="/" className="Logo">Unsplash</Link>
                <div className="header-right">
                    <form>
                        <input
                            type="text"
                            placeholder="Search"
                            ref={this.input}
                            onChange={this.onChange}
                        />
                    </form>
                </div>
            </div>
        )
    }

    renderPagination = () => {
        return (
            <Pagination
                searchTerm={this.state.term}
                current={this.state.currentPage}
                total={this.state.totalPhotos}
                perPage={this.state.perPage}
                onPageChanged={this.fetchPhotos.bind(this)}
            />
        )
    }

    renderLoader = () => {
        return (
            this.state.loadState === LOAD_STATE.LOADING
                ? <div className="loader"></div>
                : <List data={this.state.photos} />

        )
    }


    renderError = () => {
        return (
            <div>
                <h2>Something went wrong</h2>
                <details style={{ whiteSpace: 'pre-wrap' }}>
                    Error
                </details>
            </div>
        );
        
    }

    render() {
        return (
            <Fragment>
                <div className="app">
                    {this.renderHeader()}
                    <div className="container">
                        {this.renderPagination()}
                        {this.renderLoader()}
                    </div>
                </div>
            </Fragment>

        )
    }
}

export default Home;