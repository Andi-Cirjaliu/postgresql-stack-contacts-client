import {
  GET_CONTACTS,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  CONTACT_ERROR,
  SET_LOADING,
  SET_CURRENT,
  CLEAR_CURRENT,
} from "./types";

export default (state, action) => {
  let newContacts;
  let id;

  switch (action.type) {
    case GET_CONTACTS:
      return { ...state, contacts: action.payload, loading: false };
    case ADD_CONTACT:
      newContacts = [...state.contacts, action.payload];
      return { ...state, contacts: newContacts, loading: false };
    case UPDATE_CONTACT:
      id = action.payload.id;
      newContacts = [...state.contacts].map((contact) =>
        contact.id === id ? action.payload : contact
      );
      return { ...state, contacts: newContacts, loading: false };
    case DELETE_CONTACT:
      id = action.payload;
      newContacts = [...state.contacts].filter((contact) => contact.id !== id);
      return { ...state, contacts: newContacts, loading: false };
    case CONTACT_ERROR:
      return { ...state, loading: false, error: action.payload };
    case SET_LOADING:
      return { ...state, loading: true };
    case SET_CURRENT:
      return { ...state, current: action.payload };
    case CLEAR_CURRENT:
      return { ...state, current: null };
    default:
      return state;
  }
};
