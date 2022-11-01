import React, {useEffect, useRef, useState} from "react";
import {usePosts} from "../components/hooks/usePosts";
import {useFetching} from "../components/hooks/useFetching";
import PostService from "../API/PostService";
import {pages} from "../components/utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import Loader from "../components/UI/Loader/loader";
import {useObserver} from "../components/hooks/useObserver";



function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();


    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(pages(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage( page + 1)
    })



    useEffect(() => {
        fetchPosts()
    }, [page])


    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false)
    }


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchPosts(limit, page)
    }


    return (
        <div className="{App}">
            <MyButton onClick={fetchPosts}>
                Get DATA
            </MyButton>
            <MyButton style={{marginTop: 30}} onClick = {() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: '15px'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>

            }
            {isPostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 25}}><Loader/></div>
            }
                <PostList remove={removePost}  posts={sortedAndSearchedPosts} title='Posts list'/>
            <div ref={lastElement} style={{height: 20, background:'red'}}/>

            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>

    );


}

export default Posts;
