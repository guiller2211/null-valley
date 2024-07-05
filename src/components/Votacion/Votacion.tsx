import { FormEvent, useEffect, useState } from 'react';

import { Card, Text, View, Image, RadioGroup, Radio, Icon, TextArea } from 'reshaped';
import { LuchadorData } from '../../types/luchador';
import { getLuchadores } from '../../api/luchadores.data';
import { IconLike } from '../../icon/IconLike';
import { IconDisLike } from '../../icon/IconDisLike';
/* const prohibitedWords = ['manzana', 'coliflor', 'bombilla', 'derecha', 'izquierda', 'rojo', 'azul']; */

export const Votaciones = () => {
    const [luchadores, setLuchadores] = useState<LuchadorData[]>([]);
    const [activeLuchador, setActiveLuchador] = useState<string | null>(null);

    useEffect(() => {
        getLuchadores()
            .then(luchadores => {
                setLuchadores(luchadores);
            })
            .catch(error => {
                console.error("Error getting luchadores: ", error);
            });
    }, []);

    const handleActivateCard = (luchador: LuchadorData) => {
        setActiveLuchador(prevActive => (prevActive === luchador.id ? prevActive : luchador.id!));
    };
    

    const handleVote = (e: FormEvent) => {
        e.preventDefault();
        // Aquí puedes procesar el voto usando addVote y activeLuchador si es necesario
        setActiveLuchador(null); // Limpiar la tarjeta activa después de enviar el voto
    };

    return (
        <View direction='column' gap={5}>
            <Text align='center' variant='featured-2' weight='bold'>Encuesta Null Valley</Text>
            <form onSubmit={handleVote}>
                <View direction='row' gap={5}>
                    {luchadores.map((luchador) => (
                        <Card key={luchador.id} onClick={() => handleActivateCard(luchador)} >
                            <View direction='column' gap={5}>
                                <View direction="row" gap={4}>
                                    <Image src={luchador.image.fullPath} />
                                    <View direction="column" gap={4}>
                                        <Text variant="featured-1" weight="bold">
                                            {luchador.name}
                                        </Text>
                                        <Text variant="featured-3">
                                            {luchador.description || "Default Description"}
                                        </Text>
                                    </View>
                                </View>
                                <RadioGroup name={luchador.name} disabled={!activeLuchador || activeLuchador !== luchador.id}>
                                    <View gap={10} direction='row' justify={'center'}>
                                        <Radio value="like"><Icon svg={IconLike} size={8} /></Radio>
                                        <Radio value="dislike"><Icon svg={IconDisLike} size={8} /></Radio>
                                    </View>
                                </RadioGroup>
                                <TextArea
                                    name="opinion"
                                    placeholder="Máximo 120 caracteres"
                                    disabled={!activeLuchador || activeLuchador !== luchador.id}
                                />
                            </View>
                        </Card>
                    ))}
                </View>
            </form>
        </View>
    );
};


