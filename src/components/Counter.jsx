import React, {useState} from 'react';

const Counter = function (){
    const [count, setLikes] = useState(0);



    function increment() {
        setLikes(count + 1)
    }
    function decrement() {
        setLikes(count - 1)
    }
    this.increment.bind(this)
    this.decrement.bind(this)

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}
export default Counter