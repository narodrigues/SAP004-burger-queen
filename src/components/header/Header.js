import React from 'react';
import Img from '../imagem/Img'
import './header.css'
<<<<<<< HEAD
import logo from '../../assets/logo-final.png'
=======
import logo from '../../assets/logo-sem-coelho-final.png'
>>>>>>> 5460f8459273070979fec3edd1d7d145062dc2d0

const Header = (props) => (
	<header className={props.class}>
		<Img src={logo} alt='logo' class='logo-login' />
	</header>
);

export default Header;