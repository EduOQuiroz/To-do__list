import { useState, useContext ,createContext, useEffect } from "react";
import { getPostsRequests, createPostRequests, deletePostRequests, getPostRequests, updatePostRequests } from "../api/posts";

const postContext = createContext();

export const usePosts = () => {
    const context = useContext(postContext)
    return context;
}

export const PostProvider = ({children}) => {
    const [posts, setPost] = useState([]);

    const getPosts = async ()=> {
        const resp = await getPostsRequests();
        setPost(resp.data)
    }
    const getPost = async (id) => {
        const resp = await getPostRequests(id);
        return resp.data;
    }
    const createPost = async (post)=>{
        const resp = await createPostRequests(post);
        setPost([...posts,
            resp.data
        ])
    }
    const updatePost = async (id, changes) => {
        const resp = await updatePostRequests(id, changes)
        setPost(posts.filter(post => post._id === id ? resp.data : post))
    }
    const deletePost = async (id) =>{
        await deletePostRequests(id)
        setPost(posts.filter(post => post._id !== id))
    }
    useEffect(()=>{
        getPosts()
    })
    return <postContext.Provider value={{
        posts,
        setPost,
        getPosts,
        createPost,
        deletePost,
        getPost,
        updatePost,
    }}>
    {children}
    </postContext.Provider>
}