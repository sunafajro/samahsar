# Samahsar
VueJS фронтенд к ресурсу samahsar.cv-haval.org.

### Зависимости:
  * Vue Router
  * Vue Resources
  * Vue Cookies

### Для тех кто хочет помочь в разработке:
    0. Скачать и установить NodeJS и NPM
	1.  Устанавливаем vue-cli (могут потребоваться права root в linux)
		$ npm install --global vue-cli

		Создаем пустой проект
		$ vue init webpack samahsar

		Переходим в каталог проекта
		$ cd samahsar

		Запускаем установку зависимостей
		$ npm install
		$ npm install vue-resources
		$ npm install vue-cookies

	2.  Клонируем гит репозиторий в проект
        git clone https://github.com/sunafajro/samahsar.git

    3.  Запуск веб сервера
        npm run dev

    4. Компиляция исходников в готовый проект (помещается в папку dist)
        npm run build