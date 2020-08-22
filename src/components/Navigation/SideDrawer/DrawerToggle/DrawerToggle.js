import React from 'react';

import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
<img src="https://img.icons8.com/fluent/48/000000/menu--v1.png"alt="menuicon"className={classes.icon} />   
 </div>
);

export default drawerToggle;