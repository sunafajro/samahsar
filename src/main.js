// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Lang from 'vuejs-localization'
import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'
import App from './App'
import router from './router'

Lang.requireAll(require.context('./lang', true, /\.js$/));

Vue.use(Lang);
Vue.use(VueResource);
Vue.use(VueCookies);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created () {
  	    this.$lang.setLang('ru');
  	    if(!this.$cookies.isKey('lastterms')) {
            this.$cookies.set('lastterms', '', 60*60*24, '/');
        }
  }
})
