import axios from "axios";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/scrollbar";
import GamesCard from "./GamesCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";

function GamesPage() {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/Api/game_data.php`
        );
        setGames(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='p-3 sm:p-5 grow lg:p-10'>
      <div className='flex items-center duration-300 focus-within:shadow-[0_3px_8px_rgb(150,150,150)] text-gray-500 px-2 mb-5 border bg-gray-100 border-gray-300 rounded-xl'>
        <FontAwesomeIcon icon={faSearch} />
        <input
          type='text'
          placeholder='Search games...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full p-2 focus:outline-none'
        />
        <button className='cursor-pointer' onClick={() => setSearchQuery("")}>
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 justify-evenly'>
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <GamesCard
              key={game.id}
              half={game.half_hour}
              full={game.hour}
              gameId={game.id}
              src={`${import.meta.env.VITE_API_URL}/admin/${game.card_image}`}>
              {game.name}
            </GamesCard>
          ))
        ) : (
          <>
            <div className='w-[250px]'></div>
            <div></div>
            <div></div>
          </>
        )}
      </div>
      {filteredGames.length <= 0 && (
        <p className='italic text-center w-full text-gray-500'>
          No games found.
        </p>
      )}
    </div>
  );
}

export default GamesPage;
