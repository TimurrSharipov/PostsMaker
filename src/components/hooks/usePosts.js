import {useMemo} from "react";

export const useSortedPost = (posts, sort) =>{

    const sortedPosts = useMemo(() => {
        if(sort){
            console.log('ФУНКЦИЯ СОРТЕДПОСТ ОТРАБОТАЛА')
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts;

    }, [posts, sort])

    return sortedPosts;

}
export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPost(posts, sort);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts])

    return sortedAndSearchedPosts;
}