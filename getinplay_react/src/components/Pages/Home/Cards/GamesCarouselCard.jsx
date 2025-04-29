import { Link } from "react-router-dom";
import PropTypes from "prop-types";

GamesCarouselCard.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
};

function GamesCarouselCard({ src, name, gameId }) {
  return (
    <Link to={`/games/${gameId}`} className='cursor-default'>
      <div className='w-full h-full '>
        <p className='absolute left-1/2 top-2 custom-text-outline -translate-x-1/2 text-white font-bold tracking-wider text-3xl'>
          {name.toUpperCase()}
        </p>
        <img className='object-cover w-full h-full' src={src} />
      </div>
    </Link>
  );
}

export default GamesCarouselCard;
