require('./bootstrap');


import moment from 'moment';  
window.Vue = require('vue');

import { Form, HasError, AlertError } from 'vform'

window.Form=Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import Swal from 'sweetalert2'//implementing sweetalert notifications after user creation
window.toast =Swal;
window.Swal=Swal;


import VueRouter from 'vue-router';

Vue.use(VueRouter)


import developer from './components/Developer.vue'

import profile from './components/Profile.vue'
import users from './components/Users.vue'
let routes = [
    { path: '/developer', component: developer },
   
    { path: '/profile', component: profile },
    { path: '/users', component: users }
  ]



const router = new VueRouter({

  mode:'history',
  routes // short for `routes: routes`
}) 

let Fire= new Vue();
window.Fire=Fire;



import VueProgressBar from 'vue-progressbar'// implementing progess bar in Vue user page


Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)', //Importing progress bar in vue js for user/global use
  failedColor: 'red',
  height: '4px'
})

Vue.filter('upText', function(text){ 
  return text.charAt(0).toUpperCase() + text.slice(1)  //use of UpperCase 
 
});
Vue.filter('myDate', function(created){

    return moment(created).format('MMMM Do YYYY, h:mm:ss a');   // use of date and time for created
});
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
     router
});



/*passport use components*/
Vue.component(
  'passport-clients',
  require('./components/passport/Clients.vue').default
);

Vue.component(
  'passport-authorized-clients',
  require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
  'passport-personal-access-tokens',
  require('./components/passport/PersonalAccessTokens.vue').default
);