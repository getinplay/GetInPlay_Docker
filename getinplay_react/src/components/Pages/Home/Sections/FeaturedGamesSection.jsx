import { useEffect, useState } from "react";
import FeaturedGameCard from "../Cards/FeaturedGameCard";
import axios from "axios";
import { Link } from "react-router-dom";

function FeaturedGamesSection() {
  const [games, setGames] = useState([]);
  const [topGames, setTopGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/Api/game_data_user.php`
        );
        setGames(res.data.games);
        setTopGames(res.data.top_games);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Filter games to only include those in top_games
  const featuredGames = games.filter((game) =>
    topGames.some((topGame) => topGame.id === game.id)
  );

  return (
    <div className='flex flex-col items-center'>
      <p className='subtitle'>Featured Games</p>
      <p className='pb-5'>Fan-Favorite Games You Can’t Miss</p>
      <div className='flex w-[90vw] md:w-[80vw] gap-5 max-md:flex-col'>
        {featuredGames.map((game) => (
          <FeaturedGameCard
            key={game.id}
            gameId={game.id}
            src={`${import.meta.env.VITE_API_URL}/admin/${game.card_image}`}>
            {game.name}
          </FeaturedGameCard>
        ))}
      </div>

      <Link
        to={"/games"}
        viewTransition
        className='sm:text-base w-max text-sm duration-200 active:bg-[#4A5BE6] bg-white active:text-white hover:bg-[#4A5BE6] hover:text-white border-1 border-gray-300 my-3 px-3 py-1 rounded-md cursor-pointer'>
        View More
      </Link>
    </div>
  );
}

export default FeaturedGamesSection;
