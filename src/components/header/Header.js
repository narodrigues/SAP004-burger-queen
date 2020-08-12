import React from 'react';
import Img from '../imagem/Img';
import './header.css';
import logo from '../../assets/logo-final.png';

const Header = props => (
	<header className={props.className}>
		<Img src={logo} alt='logo' className='logo' />
	</header>
);

export default Header;