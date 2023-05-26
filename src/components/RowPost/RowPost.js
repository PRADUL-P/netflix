import React, { useEffect, useState ,useRef } from 'react';
import './RowPost.css';
import axios from '../../axios';
import { imageUrl, API_KEY } from '../../constants/constants';
import Youtube from 'react-youtube';
import Modal from 'react-modal';

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const rowRef = useRef(null);
  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch((err) => {
        alert('Network Error');
      });
  }, []);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]);
          setShowModal(true);
        } else {
          console.log(response.data);
          alert('Video not available');
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Error fetching video');
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleScroll = (direction) => {
    const row = rowRef.current;
    if (row) {
      if (direction === 'left') {
        row.scrollLeft -= row.offsetWidth;
      } else if (direction === 'right') {
        row.scrollLeft += row.offsetWidth;
      }
    }
  };
  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="scrollButton left" onClick={() => handleScroll('left')}>
        <i className="fa fa-chevron-left"></i>
      </div> 
      <div className="posters" ref={rowRef}>
        {movies.map((obj) => (
          <img
            key={obj.id}
            onClick={() => handleMovie(obj.id)}
            className={props.isSmall ? 'smallPoster' : 'poster'}
            alt="poster"
            src={`${imageUrl + obj.backdrop_path}`}
          />
        ))}
      </div>
      <div className="scrollButton right" onClick={() => handleScroll('right')}>
        <i className="fa fa-chevron-right"></i>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        className="modal"
        overlayClassName="overlay"
      >
        {urlId && <Youtube videoId={urlId.key} opts={opts} />}
        <button className="closeButton" onClick={handleCloseModal}>
          Close
        </button>
      </Modal>
    </div>
  );
}

export default RowPost;
