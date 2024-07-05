import { View, Text, Card, Image, Button } from 'reshaped';
import { ResultsProps } from './Results.types';
import { Comments } from '../Comments/Comments';


export const Results = (props: ResultsProps) => {
  const { winner, onReset, isLoading } = props;

  return (
    <View direction='column' gap={5}>
      <Text align='center' variant='featured-2' weight='bold'>Resultados</Text>

      <Text align='center' variant='featured-2' weight='bold'>
        {winner.length > 1 ? 'Empate' : `Ganador ${winner[0].name}`}
      </Text>

      <View direction='row' gap={5}>
        {
          winner.map((_w, index) => (
            <Card key={index}>
              <View direction='column' gap={5} width={100}>
                <View direction="row" gap={4} justify={{ s: 'center', l: 'start' }}>
                  <Image src={_w.image.fullPath} />
                  <View direction="column" gap={4}>
                    <Text variant="featured-1" weight="bold">
                      {_w.name}
                    </Text>
                    <Text variant="featured-3">
                      {_w.description || "Default Description"}
                    </Text>
                  </View>
                </View>
                <Comments comments={_w.votes} />

              </View>
            </Card>
          ))
        }
      </View>

      <Button loading={isLoading} onClick={onReset} size='xlarge' color='primary' fullWidth>
        Reiniciar encuesta
      </Button>
    </View>
  );
};


