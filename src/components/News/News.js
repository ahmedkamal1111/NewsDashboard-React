import React ,{Component} from 'react';
import classes from './Photo.css';
import media from './7.1 Grid.css';
import axios from "axios";
import { NavLink } from 'react-router-dom';


class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
          news:[],
        };
      }
      componentDidMount() {
        axios
        .get('http://localhost:5000/news')
        .then(response => {
            this.setState({news:response.data})
          });
        }
 
        
    render () {
      console.log(this.state.news);
      return (
       <div className={classes.add}>
          {this.state.news.map(response=>{
              return (
                          <section className={`${media.col} ${media.row} $ `}>
                          <NavLink to={'/home/'+response.id}style={{textDecoration:'none' }} >
                          <div className={classes.Menu} >
                            <header style={{marginTop:'6%',width:'100%' }} >{<svg xmlns="http://www.w3.org/2000/svg" id="color" enable-background="new 0 0 24 24" height="15px" viewBox="0 0 24 24" width="15px" class=""><g transform="matrix(1 0 0 1 0 0)"><path d="m23.363 8.584-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357 0l-3.306 7.044-7.378 1.127c-.606.093-.848.83-.423 1.265l5.36 5.494-1.267 7.767c-.101.617.558 1.08 1.103.777l6.59-3.642 6.59 3.643c.54.3 1.205-.154 1.103-.777l-1.267-7.767 5.36-5.494c.425-.436.182-1.173-.423-1.266z" fill="#FFBF00" data-original="#FFC107" class="active-path" data-old_color="#ffc107" /></g> </svg>} 
                               &nbsp;Title :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                               {response.titel} </header>
                               <div className={classes.img}><div style={{marginTop:'8%'}} >News</div></div>
                          <footer style={{marginTop:'6%',width:'100%' }} >{<svg xmlns="http://www.w3.org/2000/svg" id="color" enable-background="new 0 0 24 24" height="15px" viewBox="0 0 24 24" width="15px" class=""><g transform="matrix(1 0 0 1 0 0)"><path d="m23.363 8.584-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357 0l-3.306 7.044-7.378 1.127c-.606.093-.848.83-.423 1.265l5.36 5.494-1.267 7.767c-.101.617.558 1.08 1.103.777l6.59-3.642 6.59 3.643c.54.3 1.205-.154 1.103-.777l-1.267-7.767 5.36-5.494c.425-.436.182-1.173-.423-1.266z" fill="#FFBF00" data-original="#FFC107" class="active-path" data-old_color="#ffc107" /></g> </svg>} 
                               &nbsp;Category :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                               {response.cat} </footer>
                          </div>
                          </NavLink>

                          <br/>
                      </section>
                       )
                    })} 
      </div> 
      );
      }
    }
export default Articles;