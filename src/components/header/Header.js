import React from 'react';
import Img from '../imagem/Img'
import './header.css'
import logo from '../../assets/logo.png'

const Header = (props) => (
	<header className={props.class}>
		<Img src={logo} alt='logo' class='logo-login'/>
	</header>
);

export default Header;