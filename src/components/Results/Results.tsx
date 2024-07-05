import React from 'react';

interface Vote {
  nickname: string;
  comment: string;
  rating: number;
}

export const Results: React.FC<{ votes: Vote[], resetVotes: () => void }> = ({ votes, resetVotes }) => {
  const davidVotes = votes.filter(vote => vote.nickname === 'David');
  const jonathanVotes = votes.filter(vote => vote.nickname === 'Jonathan');
  
  const davidScore = davidVotes.reduce((acc, vote) => acc + vote.rating, 0);
  const jonathanScore = jonathanVotes.reduce((acc, vote) => acc + vote.rating, 0);

  const winner = davidScore > jonathanScore ? 'David Larousse' : jonathanScore > davidScore ? 'Jonathan Lowrie' : 'Empate';

  return (
    <div>
      <h1>Resultados</h1>
      {winner !== 'Empate' ? (
        <div>
          <h2>El ganador es {winner}</h2>
        </div>
      ) : (
        <h2>Es un empate</h2>
      )}
      <button onClick={resetVotes}>Resetear Encuesta</button>
      <div>
        <h2>Comentarios de David Larousse</h2>
        <ul>
          {davidVotes.map((vote, index) => (
            <li key={index}>{vote.comment}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Comentarios de Jonathan Lowrie</h2>
        <ul>
          {jonathanVotes.map((vote, index) => (
            <li key={index}>{vote.comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};


