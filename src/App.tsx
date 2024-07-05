import "reshaped/themes/reshaped/theme.css";
import { useState } from 'react';
import { View, Reshaped, Container } from 'reshaped';
import { Results } from './components/Results/Results'; 
import { Votaciones } from './components/Votacion/Votacion'; 
import { Vote } from './types/votos'

function App() {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [showResults, setShowResults] = useState(false);

 

  const resetVotes = () => {
    setVotes([]);
    setShowResults(false);
  };



  return (
    <Reshaped theme="reshaped">
      <Container width="100%">
        <View align='center'>
          {!showResults ? (
            <Votaciones  />
          ) : (
            <Results votes={votes} resetVotes={resetVotes} />
          )}
        </View>
      </Container>
    </Reshaped>
  );
}

export default App;