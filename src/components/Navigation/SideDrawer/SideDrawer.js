import React from 'react';
import classes from './SideDrawer.css';
import arrow from '../../../assets/icons/icons8-chevron-left-50.png';
import home from '../../../assets/icons/icons8-home-24.png';
import adduser from '../../../assets/icons/icons8-add-user-group-man-man-50.png';
import addnews from '../../../assets/icons/icons8-news-50.png';
import showcategory from '../../../assets/icons/icons8-news-feed-64.png';
import showusers from '../../../assets/icons/icons8-users-settings-32.png';
import { NavLink } from 'react-router-dom';


const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <div>
            <div className={attachedClasses.join(' ')} >
                <nav >
                <div >
                <h2 style={{color:'white'}} >ADMIN</h2> 
                <img src={arrow} className={classes.arrow} onClick={props.closed}alt="arrow"/>         
                </div>
                <hr className={classes.hr}/>
                <ul className={classes.NavigationItems}>
                    
                      <li className={classes.NavigationItem}>
                      <img src={home}className={classes.icon}alt="home"/>
                        <NavLink to="/"exact>home</NavLink>
                     </li>
                     <li className={classes.NavigationItem}>
                      <img src={adduser}className={classes.icon}alt="adduser"/>
                     <NavLink to="/adduser">Add User</NavLink>
                     </li>
                     <li className={classes.NavigationItem}>
                      <img src={showusers}className={classes.icon}alt="shownews"/>
                          <NavLink to="/ShowUsers">Show Users</NavLink>
                     </li>
                     <li className={classes.NavigationItem}>
                      <img src={showcategory}className={classes.icon}alt="addnews"/>
                          <NavLink to="/addcategory">Add Category</NavLink>
                     </li>
                     <li className={classes.NavigationItem}>
                      <img src={showcategory}className={classes.icon}alt="addnews"/>
                          <NavLink to="/showcategory">Show Categories</NavLink>
                     </li>
                     <li className={classes.NavigationItem}>
                      <img src={addnews}className={classes.icon}alt="addnews"/>
                          <NavLink to="/addnews">AddNews</NavLink>
                     </li>
                     <li className={classes.NavigationItem}>
                      <img src={addnews}className={classes.icon}alt="addnews"/>
                          <NavLink to="/editNews">Edit News</NavLink>
                     </li>




                     
                </ul>
                </nav>
            </div>
        </div>
    );

};

export default sideDrawer;