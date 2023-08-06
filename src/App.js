import React, { useEffect, useReducer, useRef } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//import RouteTest from './components/RouteTest';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'INIT': {
            return action.data;
        }
        case 'CREATE': {
            newState = [action.data, ...state];
            break;
        }
        case 'remove': {
            newState = state.filter((it) => it.id !== action.targetId);
            break;
        }
        case 'EDIT': {
            newState = state.map((it) => (it.id === action.data.id ? { ...action.data } : it));
            break;
        }
        default:
            return state;
    }
    localStorage.setItem('diary', JSON.stringify(newState));
    return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
    useEffect(() => {
        const localData = localStorage.getItem('diary');
        if (localData) {
            const diaryList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));
            dataId.current = parseInt(diaryList[0]) + 1;

            dispatch({ type: 'INIT', data: diaryList });
        }
    }, []);

    const [data, dispatch] = useReducer(reducer, []);

    const dataId = useRef(6);
    //CREATE
    const onCreate = (date, content, emotion) => {
        dispatch({
            type: 'CREATE',
            data: {
                id: dataId.current,
                date: new Date(date).getTime(),
                content,
                emotion,
            },
        });
        dataId.current += 1;
    };

    //REMOVE
    const onRemove = (targetId) => {
        dispatch({ type: 'REMOVE', targetId });
    };

    //EDIT
    const onEdit = (targetId, date, content, emotion) => {
        dispatch({
            type: 'EDIT',
            data: { id: targetId, date: new Date(date).getTime(), content, emotion },
        });
    };

    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
                <BrowserRouter>
                    <div className="App">
                        {/* <MyHeader
                            headText={'App'}
                            leftChild={<MyButton text={'왼쪽 버튼'} onClick={() => alert('왼쪽 클릭')} />}
                            rightChild={<MyButton text={'오른쪽 버튼'} onClick={() => alert('오른쪽 클릭')} />}
                        />
                        <h2>App.js</h2>
                        <MyButton text={'버튼'} onClick={() => alert('버튼 클릭')} type={'positive'} />
                        <MyButton text={'버튼'} onClick={() => alert('버튼 클릭')} type={'negative'} />
                        <MyButton text={'버튼'} onClick={() => alert('버튼 클릭')} /> */}
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/new" element={<New />} />
                            <Route path="/edit/:id" element={<Edit />} />
                            <Route path="/diary/:id" element={<Diary />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;

//<RouteTest />
