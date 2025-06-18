import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchItems, completeItem } from '../apis/to-do.api';

function* fetchTodosSaga(action: any): Generator<any, void, any> {
    try {
        yield put({ type: 'SET_LOADING', payload: true });
        const res = yield call(fetchItems, { page: action.payload.page, filter: action.payload.filter });
        yield put({ type: 'FETCH_TODOS_SUCCESS', payload: res.data });
    } catch (error: any) {
        console.error("Error fetching todos:", error);
        yield put({ type: 'FETCH_TODOS_FAILURE', payload: error.message });
    } finally {
        yield put({ type: 'SET_LOADING', payload: false });
    }
}

function* addTodoSaga(action: any): Generator<any, void, any> {
    try {
        yield put({ type: 'SET_LOADING', payload: true });
        const newItem = { title: action.payload.name, completed: action.payload.completed };
        const res = yield call(fetchItems, newItem);
        yield put({ type: 'ADD_TODO_SUCCESS', payload: res.data });
    } catch (error: any) {
        console.error("Error adding todo:", error);
        yield put({ type: 'ADD_TODO_FAILURE', payload: error.message });
    } finally {
        yield put({ type: 'SET_LOADING', payload: false });
    }
}

function* toggleTodoSaga(action: any): Generator<any, void, any> {
    try {
        yield put({ type: 'SET_LOADING', payload: true });
        yield call(completeItem, action.payload.id);
        yield put({ type: 'TOGGLE_TODO_SUCCESS', payload: action.payload.id });
    } catch (error: any) {
        console.error("Error toggling todo:", error);
        yield put({ type: 'TOGGLE_TODO_FAILURE', payload: error.message });
    } finally {
        yield put({ type: 'SET_LOADING', payload: false });
    }
}

function* clearCompletedSaga(): Generator<any, void, any> {
    try {
        yield put({ type: 'SET_LOADING', payload: true });
        yield call(fetchItems, { action: 'clear' });
        yield put({ type: 'CLEAR_COMPLETED_SUCCESS' });
    } catch (error: any) {
        console.error("Error clearing completed todos:", error);
        yield put({ type: 'CLEAR_COMPLETED_FAILURE', payload: error.message });
    } finally {
        yield put({ type: 'SET_LOADING', payload: false });
    }
}

function* todoSaga() {
    yield takeLatest('FETCH_TODOS_REQUEST', fetchTodosSaga);
    yield takeLatest('ADD_TODO_REQUEST', addTodoSaga);
    yield takeLatest('TOGGLE_TODO_REQUEST', toggleTodoSaga);
    yield takeLatest('CLEAR_COMPLETED_REQUEST', clearCompletedSaga);
}

export default todoSaga;
