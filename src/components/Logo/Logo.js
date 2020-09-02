import React from 'react';

import logoImage from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{width: props.width}}>
        <img src={logoImage} alt="" />
    </div>
);

export default logo;