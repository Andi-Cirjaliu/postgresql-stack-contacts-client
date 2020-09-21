import React, {useReducer} from 'react';
import axios from 'axios';

import {GET_CONTACTS, ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT, CONTACT_ERROR, SET_LOADING, SET_CURRENT, CLEAR_CURRENT} from './types';
import contactsReducer from './contactsReducer';
import ContactsContext from './contactsContext';

const SERVER_URL=process.env.REACT_APP_SERVER_URL;

const ContactsState = (props) => {
  const INITIAL_STATE = {
    contacts: [],
    current: null,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(contactsReducer, INITIAL_STATE);

  //fetch contacts
  const getContacts = async () => {
    console.log("Get contacts..");

    setLoading();

    try {
      const res = await axios.get(`${SERVER_URL}`);
      const data = res.data;
      console.log(data);

      dispatch({ type: GET_CONTACTS, payload: data });
    } catch (error) {
      console.error(error.response);
      dispatch({ type: CONTACT_ERROR, payload: error.response.data.msg });
    }
  };

  //add contact
  const addContact = async (contact) => {
    console.log("Add contact ", contact);

    setLoading();

    try {
      const res = await axios.post(`${SERVER_URL}`, contact, {
        headers: { "Content-Type": "application/json" },
      });
      const data = res.data;
      console.log(data);

      dispatch({ type: ADD_CONTACT, payload: data });
    } catch (error) {
      console.error(error.response);
      dispatch({ type: CONTACT_ERROR, payload: error.response.data.msg });
    }
  };

  //update contact
  const updateContact = async (contact) => {
    console.log("Update contact ", contact);

    setLoading();

    try {
      const res = await axios.put(`${SERVER_URL}/${contact.id}`, contact, {
        headers: { "Content-Type": "application/json" },
      });
      const data = res.data;
      console.log(data);

      dispatch({ type: UPDATE_CONTACT, payload: data });
    } catch (error) {
      console.error(error.response);
      dispatch({ type: CONTACT_ERROR, payload: error.response.data.msg });
    }
  };

  //delete contact
  const deleteContact = async (id) => {
    console.log("delete contact ", id);

    setLoading();

    try {
      const res = await axios.delete(`${SERVER_URL}/${id}`);
      const data = res.data;
      console.log(data);

      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      console.error(error.response);
      dispatch({ type: CONTACT_ERROR, payload: error.response.data.msg });
    }
  };

  //set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  //set current
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //clear current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        loading: state.loading,
        error: state.error,
        getContacts,
        addContact,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent,
      }}
    >
      {props.children}
    </ContactsContext.Provider>
  );
};

export default ContactsState;