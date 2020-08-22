import React ,{Component} from 'react';
import classes from './Toolbar.css';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import { NavLink } from 'react-router-dom';

class toolbar extends Component {


    render(){
        return(
            <header className={classes.Toolbar}>
            <DrawerToggle clicked={this.props.drawerToggleClicked} />
            <li className={classes.NavigationItem}>
                        <NavLink to="/"exact >Home</NavLink>
            </li>
            <h1 className={classes.toolbarFork} >Test</h1>

            </header>
        )

    }
}



export default toolbar;