import React from 'react'
// import Counter from './pages/redux/Counter'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './Counter'


const Dispat = () => {
    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()
    // console.log(count);
    return (
        <div>
            <div className='shadow p-2 w-50 container'>
                <h1>Counting</h1>
                <p>{count}</p>
                <button onClick={() => dispatch(increment())}  className='btn btn-primary'>Increase</button>
                <button  onClick={() => dispatch(decrement())} className='btn btn-primary mx-3'>Decrease</button>
            </div> mx-3
            {/* <Counter/> */}
            {/* <Route path='/counter' element={}/> */}

        </div>

    )
}

export default Dispat