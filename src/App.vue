<template>
  <div id="app">
      <nav class="navbar navbar-default">                
          <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu-block" aria-expanded="false">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>
              <a href="/" class="navbar-brand">
                  <span class="first-part">Н. И. Ашмарин * </span>Словарь чувашского языка
              </a>
          </div>
          <div class="collapse navbar-collapse" id="menu-block">
              <ul class="nav navbar-nav navbar-right">
                  <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Меню</a>
                      <ul class="dropdown-menu">
                          <li><router-link to="/about">О сайте</router-link></li>
                          <li><router-link to="/helpus">Помощникам</router-link></li>
                      </ul>
                  </li>
              </ul>
          </div>
      </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

#app {
  /*
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  text-align: center;
  color: #2c3e50;
  */
  margin-top: 1rem;
}

</style>
