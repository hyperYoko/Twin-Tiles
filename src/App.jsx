import { useState, useEffect } from 'react';
import Card from './Card';
import Header from './Header';

function App() {
  const shuffle = () => {
    const assets = [
      { image: '/assets/css.png' },
      { image: '/assets/html5.png' },
      { image: '/assets/jquery.png'},
      { image: '/assets/js.png' },
      { image: '/assets/next.png' },
      { image: '/assets/node.png' },
      { image: '/assets/react.png'},
      { image: '/assets/ts.png' },
    ];
    return [...assets, ...assets]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
  };
  const [wins, setWins] = useState(0); 
  const [cards, setCards] = useState(shuffle); 
  const [pickOne, setPickOne] = useState(null); 
  const [pickTwo, setPickTwo] = useState(null); 
  const [disabled, setDisabled] = useState(false); 

  const handleClick = (card) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };


  useEffect(() => {
    let pickTimer;

    if (pickOne && pickTwo) {
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        handleTurn();
      } else {
        setDisabled(true);
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo, wins]);


  useEffect(() => {
    const checkWin = cards.filter((card) => !card.matched);

    if (cards.length && checkWin.length < 1) {
      console.log('Win!');
      setWins(wins + 1);
      handleTurn();
      setCards(shuffle);
    }
  }, [cards, wins]);

  return (
    <>
      <Header wins={wins} />
      <div className="grid">
        {cards.map((card) => {
          const { image, matched } = card;

          return (
            <Card
              key={image.id}
              card={card}
              image={image}
              onClick={() => handleClick(card)}
              selected={card === pickOne || card === pickTwo || matched}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
