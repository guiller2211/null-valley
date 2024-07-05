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
                            <Avatar initials={`${index}`} src={comment.image?.fullPath}/>
                            <View.Item >
                                <View
                                    backgroundColor="neutral-faded"
                                    borderColor="neutral-faded"
                                    borderRadius="small"
                                    padding={3}
                                    attributes={{ style: { maxWidth: '100%', overflowWrap: 'anywhere' } }}
                                >
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