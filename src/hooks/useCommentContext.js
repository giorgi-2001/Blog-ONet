import { useContext } from "react";
import { CommentContext } from "../context/commentContext";

export const useCommentContext = () => {

    const context = useContext(CommentContext)

    if(!context) {
        throw Error('Unable to use comment context')
    }

    return context
}