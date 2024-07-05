import { useState } from 'react';
import { View } from 'reshaped';
import { Results } from './components/Results/Results';
import { Votaciones } from './components/Votacion/Votacion';
import { LuchadorData } from "./types/luchador";
import { useLuchador } from "./context/LuchadoresContext";

export function App() {
  const [luchadores, setLuchadores] = useState<LuchadorData[]>([]);
  const { resetVotaciones, getLuchadores } = useLuchador();
  const [showResults, setShowResults] = useState(false);
  const [winners, setWinners] = useState<LuchadorData[]>([]);
  const [isLoading, setIsloading] = useState(false);


  const showResult = async (total: number) => {
    if (total > 9) {
      await getLuchadores()
        .then(luchadores => determinarGanador(luchadores))
        .catch(error => console.error("Error obteniendo luchadores:", error));
    }
  };

  const determinarGanador = (luchadores: LuchadorData[]) => {
    let maxScore = -Infinity;
    let currentWinners: LuchadorData[] = [];

    luchadores.forEach(luchador => {
      if (luchador.votes && luchador.votes.length > 0) {
        const totalLikes = luchador.votes.filter(vote => vote.like).length;
        const totalDislikes = luchador.votes.length - totalLikes;
        const score = totalLikes - totalDislikes;

        if (score > maxScore) {
          maxScore = score;
          currentWinners = [luchador];
        } else if (score === maxScore) {
          currentWinners.push(luchador);
        }
      }
    });

    if (currentWinners.length === 1) {
      setWinners([currentWinners[0]]);
    } else {
      setWinners(currentWinners);
    }

    setShowResults(true);
  };

  const resetEncuesta = async () => {
    setIsloading(true);
    await resetVotaciones();
    const fetchedLuchadores = await getLuchadores();
    setLuchadores(fetchedLuchadores);
    setShowResults(false);
    setWinners([]);
    setLuchadores([]);
    setIsloading(false);
  };


  return (

    <View align='center' padding={{ s: 12, l: 25 }}>
      {!showResults ? (
        <View direction='column' gap={10}>
          <Votaciones total={showResult} luchadoresData={luchadores} />
        </View>
      ) : (
        <Results
          winner={winners}
          onReset={resetEncuesta}
          isLoading={isLoading} />
      )}
    </View>

  );
}
