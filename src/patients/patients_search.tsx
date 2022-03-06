import { FunctionComponent, useReducer } from "react";

type props = {
  updateQuery: (data: {[key:string]:string}) => void;
};

const queryReducer = (state: { queryKey: string, query: string }, action: {type:string, payload: string}) => { 
  const { type, payload } = action;
  switch (type) { 
    case 'queryKey':
      return { ...state, queryKey: payload };
    case 'query':
      return { ...state, query: payload };
    default: { 
      return state
    }
  }
}

export const PatientsSearch: FunctionComponent<props> = ({
  updateQuery
}) => {
  const [state, dispatch] = useReducer(queryReducer, { query: '', queryKey: 'id' })
  
  return (
    <div>
      <select value={state.queryKey} onChange={event => {
        dispatch({ type: 'queryKey', payload: event.target.value });
        updateQuery({ [event.target.value]: state.query });
      }}>
        {['id', 'ehrID', 'name'].map((queryKey) =>
          <option key={queryKey} value={queryKey}>{queryKey}</option>
        )}
      </select>
      <input
        onChange={(e) => {
          dispatch({ type: 'query', payload: e.target.value });
          updateQuery({ [state.queryKey]: e.target.value });
        }}
      />
    </div>
  );
};

