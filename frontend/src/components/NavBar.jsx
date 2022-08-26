import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// consists of a login button, present on pages where admin is loged in
function NavBar (props) {
  const navigate = useNavigate();

  // calls backend to loguot user and invalidate token
  const logOut = async () => {
    console.log('LOGOUT!')
    const response = await fetch('http://localhost:5005/admin/auth/logout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
    });
    const data = await response.json();
    console.log(response)
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data)
      navigate('/login')
    }
  }

  return <>
    <button onClick={ logOut }>logout</button>
  </>
}

export default NavBar;

NavBar.propTypes = {
  token: PropTypes.string
};
