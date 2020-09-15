import React from 'react';

import './App.css';

import ContactsState from './context/ContactsState';
import Contacts from './components/Contacts';
import AddContactForm from './components/AddContactForm';

function App() {
  return (
    <ContactsState>
      <AddContactForm />
      <div className="App">
        <Contacts />
      </div>
    </ContactsState>
  );
}

export default App;
