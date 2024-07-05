import { View, Text, Avatar, Icon } from "reshaped"
import { CommentsProps } from "./Comments.types"
import { IconLike } from "../../icon/IconLike";
import { IconDisLike } from "../../icon/IconDisLike";

export const Comments = (props: CommentsProps) => {
    const { comments } = props;

    return (
        <View direction="column" gap={3} padding={4} borderColor="neutral-faded" borderRadius="medium">
            {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                    <View direction='row' gap={3} align='center'>
                        <View>
                            <Avatar initials={`${index}`} src={comment.image?.fullPath} />
                        </View>
                        <View.Item >
                            <View
                                backgroundColor="neutral-faded"
                                borderColor="neutral-faded"
                                borderRadius="small"
                                padding={3}
                                attributes={{ style: { maxWidth: '100%', overflowWrap: 'anywhere' } }}
                                gap={3}
                            >
                                <View
                                    backgroundColor="neutral-faded"
                                    borderColor="neutral-faded"
                                    borderRadius="small"
                                    padding={1}
                                >

                                    <Text variant='body-2' weight="bold">{comment.nickName}</Text>
                                </View>

                                <Text >{comment.comment}</Text>
                            </View>
                        </View.Item>
                        <View.Item gapBefore='auto'>
                            <Icon svg={comment.like ? IconLike : IconDisLike} size={5} />
                        </View.Item>
                    </View>
                ))
            ) : (
                <Text>No hay comentarios agregados</Text>
            )}
        </View>
    )
}