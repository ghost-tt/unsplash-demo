import React, { Fragment, useState, useRef, useEffect } from 'react';
import '../App.css';
import List from './List';
import _ from 'lodash'
import unsplash from './api/unsplash';
import { IoMdSearch } from 'react-icons/io'
import Swal from 'sweetalert2'



const LOAD_STATE = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    LOADING: 'LOADING'
};

const Home = () => {
    const [count, setCount] = useState(2);
    const [search, setSearch] = useState({
        term: '',
        photos: [],
        totalPhotos: 0,
        perPage: 9,
        currentPage: 1,
        loadState: LOAD_STATE.LOADING,
        errorInfo: undefined
    });

    const input = useRef();

    const debounce = (e) => {
        debounceSearch.cancel();
        setSearch({ ...search, term: e.target.value });
        fetchPhotos(e.target.value, search.currentPage);
    }

    const debounceSearch = _.debounce(debounce, 600)

    useEffect(() => {
        fetchPhotos('cars', search.currentPage);
    }, []);


    const fetchPhotos = async (searchTerm, page) => {
        setSearch({ ...search, loadState: LOAD_STATE.LOADING });
        const response = unsplash.get('/search/photos', {
            params: {
                query: searchTerm,
                page: page,
                per_page: search.perPage
            }
        });
        response
            .then((res) => {
                setSearch({
                    ...search,
                    term: searchTerm,
                    photos: res.data,
                    loadState: LOAD_STATE.SUCCESS
                });
            })
            .catch(err => {
                console.log('Error -> ', err)
                setSearch({ ...search, loadState: LOAD_STATE.ERROR, errorInfo: err });
            })
    }



    const onChange = (event) => {
        event.persist()
        debounceSearch(event)
    }

    const renderHeader = () => {
        return (
            <div>
                <div className="search__box__container">
                    <div className="field textbox__card">
                        <input
                            type="text"
                            placeholder="Search"
                            ref={input}
                            onChange={onChange}
                            className="textbox"
                        />
                        <IoMdSearch style={{ display: 'flex', justifyContent: 'center' }} />
                    </div>
                </div>
            </div>
        )
    }

    const RenderError = () => {
        return (
            <div>
                <h2>Something went wrong</h2>
                <details style={{ whiteSpace: 'pre-wrap' }}>
                    {search.errorInfo.toString()}
                </details>
            </div>
        );

    }


    const renderLoader = () => {
        if (search.loadState == 'ERROR') {
            return <RenderError />
        }
        return (
            search.loadState === LOAD_STATE.LOADING
                ? <div className="loader"></div>
                : <List data={search.photos} />
        )
    }

    const loadMore = () => {
        console.log(search)
        if(!search.term) {
            Swal.fire('Oops...', 'Search Field is empty!', 'info')
        } else if(search.photos.results.length == 0) {
            Swal.fire('Oops...', ' We are unable to find anymore items for you.', 'error')
        } else {
            setCount(count + 1)
            fetchPhotos(search.term, count)
        }
    }



    return (
        <Fragment>
            <div className="app">
                {renderHeader()}
                <div className="container">
                    {renderLoader()}
                </div>
            </div>
            <div className="search__box__btn__box">
                <a href="#" className="load__more__btn" onClick={loadMore}>Load more</a>
            </div>
        </Fragment>

    )

}
export default Home;