import React ,{Component} from 'react';
import axios from "axios";
import classes from './NewsDetails.css';

class NewsDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedPost: '',
        };
      }
      componentDidMount(){
        if ( this.props.match.params.newsId ) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.newsId !== +this.props.match.params.newsId) ) {
                axios.get(`http://localhost:5000/news/`+this.props.match.params.newsId)
                .then( response => {
                    this.setState( { loadedPost: response.data } );
                } );
        
    }
}
    }

      render () {
        console.log(this.props.match.params.newsId);
          let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
          if ( this.props.match.params.id ) {
              post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
          }
          if ( this.state.loadedPost ) {
              post = (
                  <div style={{position:'relative'}}>

                  <div className={classes.ArticlesDetails}>

                          <div className={classes.details} >
                          &nbsp;User ID :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           {this.state.loadedPost.userId} </div>                     
                           <div className={classes.details} >
                          &nbsp;Title :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           {this.state.loadedPost.titel} </div>                     
                           <div className={classes.details} >
                          &nbsp;Description :&nbsp;&nbsp;&nbsp;
                           {this.state.loadedPost.description} </div> 
                           <div className={classes.details} >
                          &nbsp;ActiveDateFrom :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           {this.state.loadedPost.activeDateFrom} </div> 
                           <div className={classes.details}>
                          &nbsp;Category :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           {this.state.loadedPost.cat} </div> 
                    
                     <br/>
                     </div>
                     <br/>
                     <br/>
                  </div>
  
              );
          }

          return (
         <div className={classes.add} >
          {post} 
          </div>     
          )
          
      }
      
    }
    export default NewsDetails;