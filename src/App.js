import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import News from './components/News/News';
import NewsDetails from './components/NewsDetails/NewsDetails';
import Layout from './hoc/Layout/Layout';
import AddCategory from './components/AddCategory/AddACategory';
import AddANews from './components/AddANews/AddANews';
import AddUser from './components/AddUser/AddUser';
import ShowUsers from './components/ShowUsers/ShowUsers';
import showCategories from './components/ShowCategories/showCategories';
import EditNews from './components/EditNews/EditNews';
class App extends Component {
  render () {
    return (
      <div>
        <Layout >
          <Switch>
           <Route path="/home/:newsId"component={NewsDetails}/>
           <Route path="/addnews"component={AddANews}/>
           <Route path="/editNews"component={EditNews}/>
           <Route path="/addcategory"component={AddCategory}/>
           <Route path="/showcategory"component={showCategories}/>
           <Route path="/adduser"component={AddUser}/>
           <Route path="/ShowUsers"component={ShowUsers}/>
           <Route path="/home"  exact component={News} />
           <Route path="/"  exact component={News} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
