import {useEffect, useRef} from "react";

export const useObserver = (ref, canLoading, isPostsLoading, callback) => {
    const observer = useRef()
    useEffect(() => {
        if(isPostsLoading) return;

        if(observer.current) observer.current.disconnect();
        var cb = function (entries, observer) {
            if(entries[0].isIntersecting && canLoading){
                callback()
            }


        };

        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current)
    }, [isPostsLoading])
}