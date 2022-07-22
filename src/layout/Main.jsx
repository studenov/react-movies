import { Component } from "react";
import {Movies} from '../components/Movies';
import {Search} from '../components/Search';
import {Preloader} from '../components/Preloader';

const ID_KEY = process.env.REACT_APP_ID_KEY;
const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends Component {
    state = {
        movies: [],
        loading: true,
    }

    componentDidMount() {
        fetch(`http://www.omdbapi.com/?i=${ID_KEY}&apikey=${API_KEY}&s=speed`)
        .then(response => response.json())
        .then(data => this.setState({
            movies: data.Search,
            loading: false,
        }))
        .catch((err) => {
            console.error(err);
            this.setState({ loading: false });
        });
    }

    searchMovies = (search = 'Yellowstone', type = 'all') => {
        this.setState({ loading: true });
        fetch(
            `https://www.omdbapi.com/?i=${ID_KEY}&apikey=${API_KEY}&s=${search}${
                type !== 'all' ? `&type=${type}` : ''
            }`
        )
        .then(response => response.json())
        .then(data => this.setState({
            movies: data.Search,
            loading: false,
        }))
        .catch((err) => {
            console.error(err);
            this.setState({ loading: false });
        });
    }

    render () {
        const {movies, loading} = this.state;

        return (
            <main className='container content'>
                <Search searchMovies={this.searchMovies} />
                {loading ? <Preloader /> : <Movies movies={movies} />}
            </main>
        )
    }
}

export { Main };
