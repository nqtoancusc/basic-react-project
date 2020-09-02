import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        {!props.isAuthenticated 
            ? <NavigationItem link="/auth">Login</NavigationItem> 
            : <NavigationItem link="/logout">Logout</NavigationItem>}
        {!props.isAuthenticated 
            ? <NavigationItem link="/register">Register</NavigationItem> 
            : <NavigationItem link="/settings">Settings</NavigationItem>}
    </ul>
);

export default navigationItems;