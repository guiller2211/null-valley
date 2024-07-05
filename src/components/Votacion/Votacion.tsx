import { FormEvent, useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    RadioGroup,
    Radio,
    Icon,
    TextArea,
    Tooltip,
    Button,
    Loader,
    FormControl,
    Actionable,
    TextField
} from 'reshaped';
import { CommentsData, LuchadorData } from '../../types/luchador';
import { IconLike } from '../../icon/IconLike';
import { IconDisLike } from '../../icon/IconDisLike';
import { Comments } from '../Comments/Comments';
import { VotacionesProps } from './Votacion.types';
import { ofuscarPalabrasProhibidas, validateNickName } from '../../utils/validation-utils';
import { useLuchador } from '../../context/LuchadoresContext';

export const Votaciones = (props: VotacionesProps) => {
    const { total, luchadoresData } = props;
    const { addComment, getLuchadores } = useLuchador();
    const [luchadores, setLuchadores] = useState<LuchadorData[]>(luchadoresData);
    const [activeLuchador, setActiveLuchador] = useState<string | null>(null);
    const [nickName, setNickName] = useState('');
    const [like, setLike] = useState('');
    const [uidLuchador, setUidLuchador] = useState('');
    const [comment, setComment] = useState<string>('');
    const [votesCount, setVotesCount] = useState(0)
    const [isLoading, setIsloading] = useState(false);
    const [isLoadingLuchadores, setIsloadingLuchadores] = useState(false);
    const [likeHasError, setLikeHasError] = useState(false);
    const [commentHasError, setCommentHasError] = useState(false);
    const [ninckNameHasError, setNickNameHasError] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsloadingLuchadores(true);
            try {
                const fetchedLuchadores = await getLuchadores();
                setLuchadores(fetchedLuchadores);
            } catch (error) {
                console.error("Error obteniendo luchadores:", error);
            } finally {
                setIsloadingLuchadores(false)
            }
        };

        fetchData();
    }, [luchadoresData]);

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const likeValid = like.trim() !== "";
        const commentValid = comment.trim() !== "";
        const nickNameError = validateNickName(nickName);
        const nickNameValid = nickName.trim() !== "" && nickNameError;

        setLikeHasError(!likeValid);
        setCommentHasError(!commentValid);
        setNickNameHasError(!nickNameValid);
        if (!nickNameValid) {
            setError(nickName.trim() === "" ? 'Nickname debe ser minimo de 6 y maximo de 8' : 'Campo obligatorio');
        } else {
            setError('');
        }
        if (!likeValid || !commentValid || !nickNameValid) return;

        setIsloading(true);
        const voto: CommentsData = {
            nickName: nickName,
            comment: comment,
            like: like === 'true'
        };

        try {
            await addComment(uidLuchador, voto);
            await actualizarLuchadores();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsloading(false);
            resetForm();
        }
    };

    const resetForm = () => {
        setLikeHasError(false);
        setCommentHasError(false);
        setNickNameHasError(false);
        setActiveLuchador(null);
    };
    const actualizarLuchadores = async () => {
        try {
            const updatedLuchadores = await getLuchadores();
            let totalVotes = 0;

            updatedLuchadores.forEach(luchador => {
                totalVotes += luchador.votes!.length;
            });
            setVotesCount(totalVotes)
            totalVotes >=3 && total && total(totalVotes);
            setLuchadores(updatedLuchadores);
        } catch (error) {
            console.error("Error updating luchadores after vote:", error);
        }
    };

    const handleActivateCard = (luchador: LuchadorData) => {
        if (activeLuchador !== luchador.id) {
            setLike('');
            setComment('');
            setUidLuchador(luchador.id!);
        }
        setActiveLuchador(prevActive => (prevActive === luchador.id ? prevActive : luchador.id!));
    };

    const handleCaracteres = (value: string) => {
        let newValue = value;
        if (newValue.length > 120) {
            newValue = newValue.slice(0, 120);
            return;
        }

        const textoOfuscado = ofuscarPalabrasProhibidas(newValue);

        setComment(textoOfuscado);
    };
    const handleChange = (e: string) => {
        const value = e;
        const validationError = validateNickName(value);
        if (validationError) {
            setNickName(value);
        } else {
            setNickName('');
            setError('Nickname debe ser minimo de 6 y maximo de 8');
        }
    };
    return (
        <View direction='column' gap={5} >

            <Text align='center' variant='featured-1' weight='bold'>Encuesta Null Valley</Text>
            <Text align='center' variant='featured-2' weight='bold'>Por Favor Seleccione un luchador</Text>
            {
                isLoadingLuchadores
                    ?
                    <Loader size='medium' />
                    :
                    <>

                        <form onSubmit={submitForm}>
                            <View direction='row' gap={5}>
                                {luchadores.map((luchador) => {
                                    const luchadorName = luchador.name.replace(/\s+/g, '_');

                                    return (
                                        <View gap={5} key={luchador.id} borderColor={!activeLuchador || activeLuchador !== luchador.id ? 'neutral' : 'primary'} borderRadius='medium'>
                                            <Actionable onClick={() => handleActivateCard(luchador)} >
                                                <View direction='column' gap={5} padding={5}>
                                                    <View direction="row" gap={4} justify={{ s: 'center', l: 'start' }}>
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
                                                    {
                                                        activeLuchador === luchador.id && isLoading
                                                            ?
                                                            <Loader />
                                                            :
                                                            <>
                                                                {activeLuchador === luchador.id && (
                                                                    <>
                                                                        <FormControl hasError={ninckNameHasError}>
                                                                            <FormControl.Label>Nick Name</FormControl.Label>
                                                                            <TextField
                                                                                name='nickName'
                                                                                onChange={(e) => handleChange(e.value)}

                                                                            />
                                                                            <FormControl.Error>{error}</FormControl.Error>
                                                                        </FormControl>

                                                                        <FormControl hasError={commentHasError}>
                                                                            <TextArea
                                                                                name='comment'
                                                                                placeholder="Máximo 120 caracteres"
                                                                                value={comment}
                                                                                onChange={(e) => handleCaracteres(e.value)}
                                                                                inputAttributes={{
                                                                                    tabIndex: 4,
                                                                                }}
                                                                            />
                                                                            <FormControl.Error>Campo obligatorio</FormControl.Error>
                                                                        </FormControl>
                                                                        <FormControl hasError={likeHasError}>
                                                                            <RadioGroup
                                                                                name={luchadorName + "_like"}
                                                                                onChange={({ value }) => setLike(value)}>
                                                                                <View gap={10} direction='row' justify={'center'}>
                                                                                    <Radio value="true"><Icon svg={IconLike} size={8} /></Radio>
                                                                                    <Radio value="false"><Icon svg={IconDisLike} size={8} /></Radio>
                                                                                </View>
                                                                            </RadioGroup>
                                                                            <FormControl.Error>Campo obligatorio</FormControl.Error>
                                                                        </FormControl>
                                                                        <Comments comments={luchador.votes} />

                                                                    </>
                                                                )}

                                                                {activeLuchador === luchador.id && comment.length >= 120 && (
                                                                    <Tooltip text="Maximo de caracteres permitido" position='bottom' active>
                                                                        {(attributes) => <span {...attributes}>Maximo de caracteres permitido</span>}
                                                                    </Tooltip>
                                                                )}
                                                            </>
                                                    }
                                                </View>
                                            </Actionable>
                                        </View>
                                    )
                                })}
                            </View>
                            <View paddingTop={5}>
                                <Button loading={isLoading} disabled={!activeLuchador} type='submit' size='xlarge' color='primary' fullWidth>Enviar Encuesta</Button>
                            </View>
                        </form>
                        {
                            votesCount === 9
                            &&
                            <Text variant='body-3' weight='bold'>Queda 1 voto para terminar</Text>
                        }

                    </>
            }

        </View>
    );
};
