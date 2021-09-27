// setting up React App
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.querySelector('#root'));

// note - by importing 'mount' function, our Container App - Host
// can import this function & make use of it whenever it wants too.
// Now the Container decides when to show our Remote - Sub Apps into the screen
// note - we could only decide to show the Sub App - host when user is at some particular URL
// or may be when User clicks on a button or any other Scenarios

// refactoring the entry point to load asynchronously
// import files that we need from the remote
// importing a module that begins with a word 'products' inside of 'remotes' object in webpack integration plugin
// 'products' is in our Host - Container App's integration plugin's project lists
// 'productsIndex' is the Aliases filename in Remote - Product App
// import { mount as productsMount } from 'products/ProductsIndex';

// cart app
// import { mount as cartMount } from 'cart/CartShow';

// console.log('Container App!');

// we are going to immediately call 'mount' & pass a reference to some html element - div
// that exists inside of our Container
// productsMount(document.querySelector('#host-products'));
// cartMount(document.querySelector('#host-cart'));
// NOTE - THIS ABOVE ID's NAME SHOULD NOT BE AS SAME AS IN MODULE FEDERATION PLUGIN's name's value - name: 'cart'
// #host-cart !== cart - BIG BUG
