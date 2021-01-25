# Build Docker
Pasar a produccion
https://mherman.org/blog/dockerizing-a-vue-app/
```
docker build -t sergiofaya/jobs-vue-app .

docker run -it -p 81:80 --rm sergiofaya/jobs-vue-app:latest

```

# job-browser-vue
Vue based app that is used as the browser of the jobs in a kafka topic

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### Prerequisites
nvm -> node version manager

install node and npm

npm i -g @vue/cli
npm install -g vue-generate-component
## To generate single file components
vgc -s componentname
## Add bootstrap
https://bootstrap-vue.org/docs
vue add bootstrap-vue
* In main.js we add

```{js}
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
```
## Internationalization
vue add i18n

## Error chokify num watches in files
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
and
$ sudo sysctl -p

## Graficos en Vue
npm install vue-chartjs chart.js --save

## Crypto Icons
http://cryptoicons.co/
to reference image in npm package '~'
<img src="~cryptocurrency-icons/svg/color/kmd.svg" />
https://www.npmjs.com/package/vue-cryptocurrency-icons
For plugin directly install

npm install --save vue-cryptocurrency-icons

# Loading Overlay Component
https://www.npmjs.com/package/vue-loading-overlay
npm install vue-loading-overlay

#  eslint plugin
npm i @vue/cli-plugin-eslint
