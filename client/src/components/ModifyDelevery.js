import React from 'react';

function ModifyDelevery({ socke }) {
  const navigate = useNavigate();
  const [Delevery, setDelevery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // localStorage.setItem('userName', userName);
    socket.emit('newUser', { userName, socketID: socket.id });
    navigate('/chat');
  };
  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={Delevery}
        onChange={(e) => setDelevery(e.target.value)}
      />
      <button className="home__cta">Edit Delevery</button>
    </form>
  );
}

export default ModifyDelevery;
