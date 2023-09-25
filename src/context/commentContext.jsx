import { createContext, useReducer, useState } from "react";

export const CommentContext = createContext()


const commentReducer = (state, action) => {
    switch(action.type) {
        case 'SET_COMMENTS':
            return {
                comments: action.payload
            }

        case 'ADD_COMMENT':
            return {
                comments: [action.payload, ...state.comments]
            }

        case 'DELETE_COMMENT':
            return {
                comments: state.comments.filter(c => c._id !== action.payload._id)
            }

        case 'UPDATE_COMMENT': 
            return {
                comments: state.comments.map(comment => {
                    if(comment._id === action.payload._id){
                        return { ...comment, ...action.payload}
                    }
                    return comment
                })
            }
        default: return state
    }
}


export const CommentContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(commentReducer, {
        comments: null
    })

    const [deleteModal, setDeleteModal] = useState(false)
    const [commentId, setCommentId] = useState(null)
    const [reply, setReply] = useState(null)
    const [edit, setEdit] = useState(null)

    return (
        <CommentContext.Provider value={{...state,
            dispatch,
            deleteModal,
            setDeleteModal,
            commentId,
            setCommentId,
            reply,
            setReply,
            edit,
            setEdit
        }}>
            {children}
        </CommentContext.Provider>
    )
}