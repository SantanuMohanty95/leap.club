import Card from "./Card";
import React, { useEffect, useState } from "react";
function MemoryGame({ options, setOptions, Score, setScore }) {
  const [game, setGame] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);

  const colors = ["A", "B", "C", "D", "E", "F", "G", "H"];

  useEffect(() => {
    const newGame = [];
    for (let i = 0; i < options / 2; i++) {
      const firstOption = {
        id: 2 * i,
        colorId: i,
        color: colors[i],
        flipped: false,
      };
      const secondOption = {
        id: 2 * i + 1,
        colorId: i,
        color: colors[i],
        flipped: false,
      };

      newGame.push(firstOption);
      newGame.push(secondOption);
    }

    const shuffledGame = newGame.sort(() => Math.random() - 0.5);
    setGame(shuffledGame);
  }, []);

  useEffect(() => {
    const finished = !game.some((card) => !card.flipped);
    if (finished && game.length > 0) {
      setTimeout(() => {
        const bestPossible = game.length;
        let multiplier;

        if (options === 16) {
          multiplier = 5;
        }

        const pointsLost = multiplier * (0.66 * flippedCount - bestPossible);

        let score;
        if (pointsLost < 100) {
          score = 100 - pointsLost;
        } else {
          score = 0;
        }

        if (score > Score) {
          setScore(score);
          const json = JSON.stringify(score);
          localStorage.setItem("memorygamescore", json);
        }

        const newGame = () => {
          // confirm("You Win!, SCORE: " + score + " New Game?");
        };
        if (newGame) {
          const gameLength = game.length;
          setOptions(null);
          setTimeout(() => {
            setOptions(gameLength);
          }, 5);
        } else {
          setOptions(null);
        }
      }, 500);
    }
  }, [game]);

  if (flippedIndexes.length === 2) {
    const match =
      game[flippedIndexes[0]].colorId === game[flippedIndexes[1]].colorId;

    if (match) {
      const newGame = [...game];
      newGame[flippedIndexes[0]].flipped = true;
      newGame[flippedIndexes[1]].flipped = true;
      setGame(newGame);
      setScore(Score + 1);

      const newIndexes = [...flippedIndexes];
      newIndexes.push(false);
      setFlippedIndexes(newIndexes);
    } else {
      const newIndexes = [...flippedIndexes];
      newIndexes.push(true);
      setFlippedIndexes(newIndexes);
    }
  }

  if (game.length === 0) return <div>loading...</div>;
  else {
    return (
      <div class="container" id="cards">
        {game.map((card, index) => (
          <div class="row" className="card" key={index}>
            <div class="col-3">
              <Card
                id={index}
                game={game}
                color={card.color}
                flippedCount={flippedCount}
                setFlippedCount={setFlippedCount}
                flippedIndexes={flippedIndexes}
                setFlippedIndexes={setFlippedIndexes}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default MemoryGame;
