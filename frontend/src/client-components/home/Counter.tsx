import type { RootState } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '@/features/counter/counterSlice';

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
      </div>
    </div>
  );
}
export default Counter;
