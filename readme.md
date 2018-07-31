# IX - React Continued

## Homework

For your final project you will create a version of the recipes list and details pages in React.

Of course, if you wish you can do something entirely original. Just propose it.

## React Project

```bash
cd react-pirates
npm i
npm run start
```

## Authentication

* Firebase:

Enable Github authentication in Firebase under `Authentication > Sign In Method`

* Github:

Sign in, navigate to `Settings` (top left under your account). Find `Developer Settings > OAuth Apps` and register a new OAuth application.

Copy the URL from Firebase and enter the Client ID and Client Secret into Firebase.

* `PirateForm.js`:

```js
renderLogin(){
  return (
    <div>
    <p>Sign in</p>
    <button onClick={ () => this.authenticate('github') } >Log in with Github</button>
    </div>
    )
}
```

and bind it

```js
  constructor() {
    super();
    this.renderPirates = this.renderPirates.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
  }
```

Set an initial value for uid in state:

```js
constructor() {
  super();
  this.renderPirates = this.renderPirates.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.renderLogin = this.renderLogin.bind(this);
  this.state = {
    uid: null
  }
}
```

Add an if statement that shows a button to log in:

<!-- ```js
render(){
  const logout = <button>Log Out</button>;
  if(!this.state.uid) {
    return <div>{this.renderLogin()}</div>
  }

  return (
    <div>
    {logout}
    <h3>Pirate Form Component</h3>
    {Object.keys(this.props.pirates).map(this.renderPirates)}
    <h3>Pirate Form Component</h3>
    <AddPirateForm addPirate={this.props.addPirate} />
    <button onClick={this.props.loadSamples}>Load Sample Pirates</button>`
    </div>
    )
  }
}
``` -->

```js
render(){

  const logout = <button>Log Out</button>;
  if(!this.state.uid) {
    return <div>{this.renderLogin()}</div>
  }

  return (
    <div>
    {logout}
    <h3>Pirate Form Component</h3>
    {Object.keys(this.props.pirates).map(this.renderPirates)}
      <AddPirateForm addPirate={this.props.addPirate} />
      <button onClick={this.props.loadSamples}> Load Sample Pirates </button>
    </div>
    )
}
```

Note the code location here - in the render method but not in the return. Also note the use of the `logout` variable in the return statement.

Create the authenticate method and bind it

```js
  constructor() {
    super();
    this.renderPirates = this.renderPirates.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.state = {
      uid: null
    }
  }

  authenticate(provider){
    console.log(`Trying to log in with ${provider}`)
  }
```

And click on the button to test.

Import base:

```js
import base from '../base';
```

```js
authenticate(provider){
  console.log(`Trying to log in with ${provider}`);
  base.authWithOAuthPopup(provider, this.authHandler);
}

authHandler(err, authData) {
  console.log(authData)
}
```

Test.

Bind the authHandler:

`this.authHandler = this.authHandler.bind(this);`

If no error add uid to state.

```js
authHandler(err, authData) {
  console.log(authData)
  if (err){
    console.log(err);
    return;
  }
  this.setState({
    uid: authData.user.uid
  })
}
```

Test and note any messages in the console. Make changes in Firebase to allow the sign in provider if necessary.

Refresh is a problem. Use a lifecycle hook.

```js
componentDidMount(){
  base.onAuth((user) => {
    if(user) {
      this.authHandler(null, {user});
    }
  })
}
```

Log Out

```js
logout(){
  base.unauth();
  this.setState({uid: null})
}
```

Bind it

`this.logout = this.logout.bind(this);`

Add a call to the method in the button

```js
render(){
  const logout = <button onClick={() => this.logout()}>Log Out</button>;
```

Test by logging in and out. Note the user in Firebase. This can be deleted if you need to re-login.

## Routing

[Quick start](https://reacttraining.com/react-router/web/guides/quick-start)

`npm install react-router-dom --save`

`App.js`:

```js
import { HashRouter as Router, Route } from 'react-router-dom';
```

Create a new PirateDetail component in components:

```js
import React, { Component } from 'react';

class PirateDetail extends Component {
  
  render() {
    return (
      <div className="pirate-detail">
        <h3>Pirate Detail</h3>
      </div>
      )
  }
}

export default PirateDetail;
```

And import it:

```js
import PirateDetail from './components/PirateDetail.js';
```

Create our first route.

`App.js`:

```js
return (
  <Router>
  <div className="App">
    <Header />
    <Route path='/' component={PirateDetail} />
    ...
  </div>
  </Router>
);
```

Note the URL string in the browser. Remove the hash by using BrowserRouter.

`import { BrowserRouter as Router, Route } from 'react-router-dom';`

(Remove out any hashes from the location bar.)

Create a second route:

```js
<Route path='/' component={PirateDetail} />
<Route path='/foo' component={PirateDetail} />
```

Test it by navigating to `/foo`. There should be two instances of the component. This is because both paths match.

We can prevent this by using `exact`:

`<Route path='/' component={PirateDetail} exact />`

But we will use another method - `Switch`:

`import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';`

```js
<Switch>
  <Route path='/' component={PirateDetail} />
  <Route path='/foo' component={PirateDetail} />
</Switch>
```

Create `NavBar.js` in the components folder:

```js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <nav>
        <Link to='/' className="navLink">Home</Link>
        <Link to='/foo' className="navLink">Foo</Link>
      </nav>
      )
  }
}

export default NavBar;
```

Note the `Link` import.

Import it into `App.js`:

`import NavBar from './components/NavBar';`

And insert it into `App.js`:

```js
<NavBar />
<Switch>
  <Route path='/' component={PirateDetail} exact={true} />
  {/* <Route path='/foo' component={PirateDetail} /> */}
</Switch>
```

Style the NavBar in a new file `navbar.css`:

```css
nav {
  background: #007eb6;
  padding: 0.25rem;
}

nav a {
  padding: 0.5rem;
  color: white;
  text-decoration: none;
}
```

Import it into `NavBar.js`:

```js
import './navbar.css';
```

Let use a parameterized path to show the Detail component in `App.js`:

```js
<Switch>
  <Route path='/detail/:id' component={PirateDetail}  />
  {/* exact={true} */}
  {/* <Route path='/foo' component={PirateDetail} /> */}
</Switch>
```

Test with `http://localhost:3000/detail/foo`. 

In `NavBar.js`:

```js
<nav>
  <Link to='/' className="navLink">Home</Link>
  <Link to='detail/foo' className="navLink">Foo</Link>
</nav>
```

### Adding Links to Pirates

Edit the `Pirate` component to use links:

`import { Link } from 'react-router-dom';`

Create a `linkUrl` variable and use it to create a `link` on the name property.

```js
class Pirate extends Component {
  render(){
    const { details } = this.props;
    console.log(details)
    let linkUrl = `/detail/${this.props.index}`;
    console.log(linkUrl)
```

Add the LinkUrl - `<li><Link to={linkUrl}>{details.name}</Link></li>` - to the name in `Pirate.js`:

```js
import React, { Component } from 'react';
import '../assets/css/Pirate.css';
import { Link } from 'react-router-dom';

class Pirate extends Component {
  render(){
    const { details } = this.props;
    console.log(details)
    let linkUrl = `/detail/${this.props.index}`;
    console.log(linkUrl)
    return (
      <div className='pirate'>
      <ul>
      <li><Link to={linkUrl}>{details.name}</Link></li>
      <li>{details.weapon}</li>
      <li>{details.vessel}</li>
      <li>
         <button onClick={() => this.props.removePirate(this.props.index)}>
              X
          </button>
      </li>
      </ul>
      </div>
      )
  }
}
export default Pirate;
```

Style the links:

```css
a {
  text-decoration: none;
}
```

Test the links. Note that the Pirate Detail hides/shows when navigating between the Home and `linkUrls`.

Pass the pirates into the Detail component (See [this article](https://tylermcginnis.com/react-router-pass-props-to-components/) by Tyler McGinnis.)

`App.js`:

```js
<Switch>
  <Route path='/detail/:id'
    render = { () => <PirateDetail pirates={this.state.pirates} />}
  />
</Switch>
```

Inspect using the React developer tool and note that the Pirates are now available to the Detail component as props.

Edit `PirateDetail` to show some data.

Since we will use a method to render the pirates let's create a constructor and use the `Object.keys` technique we used earlier in `App.js` to render the `Pirate` component.

`PirateDetail.js`:

```js
import React, { Component } from 'react';

class PirateDetail extends Component {

  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <div className="pirate-detail">
        <h3>Pirate Detail</h3>

        {Object.keys(this.props.pirates).map(this.renderPirate)}

      </div>
      )
  }
}

export default PirateDetail;
```

Bind the function:

`this.renderPirate = this.renderPirate.bind(this);`

And create a stub for it:

```js
renderPirate(key){
  const pirate = this.props.pirates[key]
  return (
  <div key={key}>
    <p>{key}</p>
  </div>
  )
}
```

The current component:

```js
import React, { Component } from 'react';

class PirateDetail extends Component {

  constructor(props){
    super(props)
    this.renderPirate = this.renderPirate.bind(this);
  }

  render() {
    return (
      <div className="pirate-detail">
        <h2>Pirate Detail</h2>

        {Object.keys(this.props.pirates).map(this.renderPirate)}

      </div>
      )
  }

renderPirate(key){
  const pirate = this.props.pirates[key]
  return (
  <div key={key}>
    <p>{key}</p>
  </div>
  )
}

}

export default PirateDetail;
```

Note the `key={key}` on the iterable. Remove it and read the warning.

### Adding Pirate Details

For images use the [public folder](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#using-the-public-folder). Copy the `reference/assets/img` directory to the public folder.

```js
  return (
  <div key={key}>
    <h3>{pirate.name}</h3>
    <img src={process.env.PUBLIC_URL + '/img/' + pirate.image} alt="pirate" />
    <p>{pirate.desc}</p>
  </div>
  )
```

Examine the code, correct the file name for the svg and add some formatting.

Let's use React's inline styles for a change.

In `PirateDetail`s renderPirate method:

```js
const divStyle = {
  display: 'flex',
  border: '3px solid #bada55',
  padding: '0.5rem'
}
```

and apply `<div style={divStyle} key={key}>` to the div:

```jsx
  <div style={divStyle} key={key}>
    <h3>{pirate.name}</h3>
    <img src={process.env.PUBLIC_URL + '/img/' + pirate.image} alt="pirate" />
    <p>{pirate.desc}</p>
  </div>
```

See [this summary](https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822) of the available methods for styling React components.

### .map vs .filter

Try this in `PirateDetail.js`:

```js
    return (
      <div className="pirate-detail">
        <h2>Pirate Detail</h2>

        {/* {Object.keys(this.props.pirates).map(this.renderPirate)} */}
        {Object.keys(this.props.pirates).filter(this.singlePirate)}

      </div>
      )
```

```js
singlePirate(key) {
  const pirate = this.props.pirates[key]
  console.log(pirate)
}
```

Don't forget to bind

`this.singlePirate = this.singlePirate.bind(this);`

We need a match between the pirate on scope and the single pirate wee want to display.

We could try URL parameters.

`Pirate.js`:

```js
class Pirate extends Component {
  render(){
    const { details } = this.props;
    let linkUrl = `/detail/${this.props.index}?name=${details.name}`;
    return (

      <div className='pirate'>
      <ul>
        <li><Link to={linkUrl} params={{ index: details.index }} >{details.name}</Link></li>
        <li>{details.weapon}</li>
        <li>{details.vessel}</li>
        <li>
         <button onClick={() => this.props.removePirate(this.props.index)}>
              X
          </button>
        </li>

      </ul>
      </div>

      )
  }
}
```

```js
singlePirate(key) {
  const pirate = this.props.pirates[key]
  console.log(pirate)
  // console.log('Pirate name: ' + pirate.name)
  // const uRl = new URLSearchParams(window.location.search.substring(1))
  // var name = uRl.get("name");
  // console.log('Name: ' + name)

  // console.log('Key: ' + this.props.pirates[key].name)
  // return this.props.pirates[key].name === name;
}
```

But `URLSearchParams` has limited support and we don't want to install additional node modules to overcome its limitations.

Examine the `Route` component and not the props related to navigation.

Pass those props into the component.

`App.js`:

```js
<Route path='/detail/:id'
    render={(props) => <PirateDetail {...props} pirates={this.state.pirates}  />}
/>
```

Inspect the component to see the new props. Note match.

`PirateDetail.js`:

```js
  render() {
    const pirates = this.props.pirates;
    console.log('keys: ' + Object.keys(pirates))
    console.log('match id: ' + this.props.match.params.id)

    return (
      <div className="pirate-detail">
        <h2>Pirate Detail</h2>
        {Object.keys(this.props.pirates).filter(
          pirate => {
            return pirate === this.props.match.params.id
          }
        ).map(this.renderPirate)}
      </div>
      )
  }
```

## End

[session-8-ang2-recipes](https://github.com/front-end-intermediate/session-8-ang2-recipes#angular-2---modules-components-and-templates)

* typescript
* Modules Components Template