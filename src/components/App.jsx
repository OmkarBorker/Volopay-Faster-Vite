import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./Common/Header";
import SubHeader from "./Common/SubHeader";
import Cards from "./Cards";

const BASE_URL = "https://obvious-healthy-larkspur.glitch.me";
const YOUR_OWNER_ID = "62b5b1ddfd3af019c6f80511";

const App = () => {
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  let page = 1;

  const handleTabClick = (tab) => {
	if (tab === 'your') {
	  const filteredCards = cards.filter((card) => card.owner_id === YOUR_OWNER_ID);
	  setCards(filteredCards);
	} 
	if(tab === 'blocked'){
		const blockedCards = cards.filter((card) => card.status === 'blocked');
		setCards(blockedCards);
	}
	else
	{
	  setCards([]); 
	  fetchCards()
	}
  };
  

  const fetchCards = async () => {
    try {
      const url = filter
        ? `${BASE_URL}/cards?card_type=${filter}&_page=${page}`
        : `${BASE_URL}/cards?q=${searchTerm}&_page=${page}`;
      const { data } = await axios.get(url);
      const newCards = data;

      setCards((oldCards) => [...oldCards, ...newCards]);
      page += 1;
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = (e) => {
    const windowEvent = e.target.documentElement;
    if (
      windowEvent.scrollTop + window.innerHeight + 10 >=
      windowEvent.scrollHeight
    ) {
      fetchCards();
    }
  };

  useEffect(() => {
    fetchCards();
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full h-screen p-12">
      <div className="w-9/12 mx-auto">
        <Header />
        <SubHeader onTabClick={handleTabClick} />
        <Cards
          cards={cards}
          setCards={setCards}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filter={filter}
          setFilter={setFilter}
          fetchCards={fetchCards}
        />
      </div>
    </div>
  );
};

export default App;
