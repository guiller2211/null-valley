import "reshaped/themes/reshaped/theme.css";
import { useState } from 'react';
import { View, Reshaped, Container } from 'reshaped';
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

  const showResult = async (total: number) => {
    if (total >= 10) {
      await getLuchadores()
        .then(luchadores => determinarGanador(luchadores))
        .catch(error => console.error("Error obteniendo luchadores:", error));
    }
  };

  return (
    <Reshaped theme="reshaped">
      <Container width="100%">
        <View align='center'>
          {!showResults ? (
            <Votaciones total={showResult} luchadoresData={luchadores} />
          ) : (
            <Results 
            winner={winners} 
            onReset={resetEncuesta} 
            isLoading={isLoading}/>
          )}
        </View>
      </Container>
    </Reshaped>
  );
}
