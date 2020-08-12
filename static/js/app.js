const Vue = window.Vue = require('vue');
const VueRouter = require('vue-router');
const fs = require('fs');


// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files
const Foo = {template: '<div>foo</div>'};
const Bar = {template: '<div>bar</div>'};

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  {path: '/foo', component: Foo},
  {path: '/bar', component: Bar},
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes, // short for `routes: routes`
});

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router,
}).$mount('#app');


//
// const Home = {
//     template: fs.readFileSync('static/html/home-content.html', 'utf8'),
//     mounted() {
//         var htmlDivCss = ' #rev_slider_15_1_wrapper rs-loader.spinner2{ background-color: #FFFFFF !important; } '
//         var htmlDiv = document.getElementById('rs-plugin-settings-inline-css');
//         if (htmlDiv) {
//             htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;
//         } else {
//             var htmlDiv = document.createElement('div');
//             htmlDiv.innerHTML = '<style>' + htmlDivCss + '</style>';
//             document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[0]);
//         }
//
//
//     }
// };
// const Cpg = {
//     template: fs.readFileSync('static/html/cpg-content.html', 'utf8')
// };
//
// const router = new VueRouter({
//     routes: [
//         {
//             path: '/',
//             component: {
//                 template: '<router-view></router-view>'
//             },
//             mounted() {
//                 setREVStartSize({
//                     c: 'rev_slider_15_1',
//                     rl: [1240, 1240, 1240, 480],
//                     el: [700, 700, 700, 720],
//                     gw: [1400, 1400, 1400, 480],
//                     gh: [700, 700, 700, 720],
//                     type: 'hero',
//                     justify: '',
//                     layout: 'fullwidth',
//                     mh: "0"
//                 });
//                 var revapi15,
//                     tpj;
//                 jQuery(function () {
//                     tpj = jQuery;
//                     if (tpj("#rev_slider_15_1").revolution == undefined) {
//                         revslider_showDoubleJqueryError("#rev_slider_15_1");
//                     } else {
//                         revapi15 = tpj("#rev_slider_15_1").show().revolution({
//                             sliderType: "hero",
//                             jsFileLocation: "/wp-content/plugins/revslider/public/assets/js/",
//                             visibilityLevels: "1240,1240,1240,480",
//                             gridwidth: "1400,1400,1400,480",
//                             gridheight: "700,700,700,720",
//                             spinner: "spinner2",
//                             forceOverflow: true,
//                             editorheight: "700,700,439,720",
//                             responsiveLevels: "1240,1240,1240,480",
//                             disableProgressBar: "on",
//                             navigation: {
//                                 onHoverStop: false
//                             },
//                             parallax: {
//                                 levels: [1, 2, 3, 20, 25, 30, 35, 40, 45, 50, 47, 48, 49, 50, 51, 30],
//                                 type: "mousescroll",
//                                 origo: "slidercenter",
//                                 speed: 2000,
//                                 disable_onmobile: true
//                             },
//                             fallbacks: {
//                                 ignoreHeightChanges: "",
//                                 allowHTML5AutoPlayOnAndroid: true
//                             },
//                         });
//                     }
//
//                 });
//             },
//             children: [
//                 {path: '/', component: Home},
//                 {path: '/cpg', component: Cpg}
//             ],
//         }
//     ]
// });
//
//
// const app = new Vue({
//     router
// }).$mount('#app');
//
// console.log(app);
