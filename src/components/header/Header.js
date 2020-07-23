import React from 'react';
import Img from '../imagem/Img'
import './header.css'
<<<<<<< HEAD
import logo from '../../assets/logo-final.png'
=======
import logo from '../../assets/logo-sem-coelho-final.png'
>>>>>>> 2b5508e323ca2da26162a8f802cb2074ae99161d

const Header = (props) => (
	<header className={props.class}>
		<Img src={logo} alt='logo' class='logo-login' />
	</header>
);

export default Header;