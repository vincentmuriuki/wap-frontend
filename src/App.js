import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import Chat from './Components/Chat';
import Sidebar from './Components/Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';
import { Router } from '@reach/router';
import SignUp from './Components/Auth/Signup'
import Login from './Components/Auth/Login'
import UserProvider, { UserContext } from './UserProvider';

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get('/messages/sync').then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    // once
    var pusher = new Pusher('741a060e76c7a69b09c9', {
      cluster: 'ap2',
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  console.log(messages);

  const user = useContext(UserContext);
  return (
    <UserProvider>
      user ?
      <div className='app'>
        <div className='app__body'>
          <Sidebar />
          <Chat messages={messages} />
        </div>
      </div>
      :
      <Router>
        <SignUp path='signUp' />
        <Login path='/' />
        {/* <PasswordReset path='passwordReset' /> */}
      </Router>
    </UserProvider>
  );
}

export default App;
