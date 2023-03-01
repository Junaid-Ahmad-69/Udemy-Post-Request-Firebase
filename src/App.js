import React, {useState, useEffect, useCallback} from 'react';
import MoviesList from "./Components/MoviesList";
import './App.css';
import AddMovie from "./Components/AddMovie";

const App = () => {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        FetchMoviesHandler();
    }, []);

    const FetchMoviesHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("https://udemy-react-http-post-request-default-rtdb.firebaseio.com/movies.json");
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            const data = await response.json();


            // For Post Request
            const loadedMovies = [];
            for (const key in data) {
                loadedMovies.push({
                    id: key,
                    title: data[key].title,
                    openingText: data[key].openingText,
                    releaseDate: data[key].releaseDate,
                });
            }
            setMovies(loadedMovies);

            // For Get Request
            // const transformMovies = data.map((moviesData) => {
            //     return {
            //         id: moviesData.id,
            //         title: moviesData.title,
            //         openingText: moviesData.opening_crawl,
            //         releasedDate: moviesData.release_date,
            //     };
            // });
            // setMovies(transformMovies);
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false);
    }, []);

    async function addMovieHandler(movie) {
        const response = await fetch("https://udemy-react-http-post-request-default-rtdb.firebaseio.com/movies.json", {
            method: "POST",
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data)
    }

    let content = <p>Found no Movies.</p>

    if (movies.length > 0) {
        content = <MoviesList movies={movies}/>
    }
    if (error) {
        content = <p>{error}</p>
    }
    if (isLoading) {
        content = <p>.....Loading 🍭</p>
    }
    return (
        <>
            <section>
                <AddMovie onAddMovie={addMovieHandler}/>
            </section>

            <section>
                <button onClick={FetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>{content}</section>
        </>
    );
}

export default App;

// Django restfull api
// https://swapi.dev/api/films/


// Django Api to get the  data form restful, api and also connect with firebase realtime database to make set the post request using header crops and handler the
// error using the handling state.