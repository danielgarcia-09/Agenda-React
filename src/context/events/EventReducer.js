import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT, GET_EVENTS, GET_EVENT_BY_ID } from "../../types";

const EventReducer = (state, action) => {
    switch(action.type) {

        case GET_EVENTS:
            return {
                ...state,
                events : action.payload
            }
        case GET_EVENT_BY_ID:
            return {
                ...state,
                event: action.payload
            }

        case ADD_EVENT:
            return {
                ...state,
                events: [...state.events, action.payload]
            }

        case DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter( e => e.id !== action.payload)
            }
            
        case EDIT_EVENT:
            return {
                ...state,
                events : [action.payload, ...state.events.filter( e => e.id !== action.payload.id)]
            }
        default:
            return state;
    }
}
export default EventReducer;