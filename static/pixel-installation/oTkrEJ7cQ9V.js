if (self.CavalryLogger) { CavalryLogger.start_js(["ewttZ"]); }

__d("StickyArea.react",["cx","React","ReactDOM","StickyArea","joinClasses"],(function(a,b,c,d,e,f,g){var h=b("React");a=function(a){"use strict";babelHelpers.inheritsLoose(c,a);function c(){return a.apply(this,arguments)||this}var d=c.prototype;d.componentDidMount=function(){this.$1=new(b("StickyArea"))(b("ReactDOM").findDOMNode(this),!0,this.props.offset||0,{boundToContainer:this.props.boundToContainer,stickTo:this.props.stickTo,zIndexOverride:this.props.zIndexOverride})};d.componentDidUpdate=function(a){this.props.offset!==a.offset&&this.$1.setOffset(this.props.offset),b("StickyArea").reflow()};d.componentWillUnmount=function(){this.$1.destroy(),this.$1=null};d.setOffset=function(a){this.$1.setOffset(a)};d.render=function(){return h.jsx("div",babelHelpers["extends"]({},this.props,{className:b("joinClasses")(this.props.className,"_k _77by"),ref:"root",children:this.props.children}))};return c}(h.Component);a.stickTo=b("StickyArea").stickTo;a.defaultProps={boundToContainer:!0,stickTo:b("StickyArea").stickTo.WINDOW};e.exports=a}),null);
__d("DevsiteReferenceTable",["csx","CSS","DOMQuery","Event","Parent"],(function(a,b,c,d,e,f,g){"use strict";a=function(){function a(a){var c=this;b("Event").listen(a,"click",function(d){d=b("Parent").byTag(d.getTarget(),"tr");if(d==null)return;if(!b("CSS").matchesSelector(d,"._5m27"))return;c.$1(a,d,a.rows)})}var c=a.prototype;c.$1=function(a,c,d){var e=this.$2(c),f=b("CSS").hasClass(c,"open"),g=[].indexOf.call(d,c)+1;for(var g=g;g<d.length;g++){var h=d[g],i=this.$2(h);if(!this.$3(e,i))break;if(f)b("CSS").hide(h);else if(this.$4(e,i))b("CSS").show(h);else{i=this.$5(a,i);i&&b("CSS").hasClass(i,"open")&&b("CSS").show(h)}}b("CSS").toggleClass(c,"open")};c.$2=function(a){a=/row_((\d+-?)+)/.exec(a.className);return a==null?null:a[1]};c.$5=function(a,c){if(c==null)return;c=c.split("-");c.pop();return b("DOMQuery").find(a,"tr.row_"+c.join("-"))};c.$3=function(a,b){if(a==null||b==null)return;return b.substring(0,a.length+1)===a+"-"};c.$4=function(a,b){if(a==null||b==null)return;b=b.substr(a.length+1);return b.indexOf("-")<0};return a}();e.exports=a}),null);
__d("DevsiteURLFragmentHandler",["Arbiter","HistoryManager","URI"],(function(a,b,c,d,e,f){var g;a={registerTransitionHandler:function(){b("Arbiter").subscribe("page_fragment_transition",function(a,c){a=(g||(g=b("URI"))).getRequestURI().setFragment(c.fragment);c=b("HistoryManager").lastURI&&a.toString()===b("HistoryManager").lastURI.toString();b("HistoryManager").go(a.toString(),!1,c)})}};e.exports=a}),null);
__d("ScriptPathState",["Arbiter"],(function(a,b,c,d,e,f){var g,h,i,j,k=100,l={setIsUIPageletRequest:function(a){i=a},setUserURISampleRate:function(a){j=a},reset:function(){g=null,h=!1,i=!1},_shouldUpdateScriptPath:function(){return h&&!i},_shouldSendURI:function(){return Math.random()<j},getParams:function(){var a={};l._shouldUpdateScriptPath()?l._shouldSendURI()&&g!==null&&(a.user_uri=g.substring(0,k)):a.no_script_path=1;return a}};b("Arbiter").subscribe("pre_page_transition",function(a,b){h=!0,g=b.to.getUnqualifiedURI().toString()});e.exports=a.ScriptPathState=l}),null);
__d("AjaxPipeRequest",["invariant","Arbiter","AsyncRequest","AsyncRequestConfig","BigPipe","ContextualComponent","CSS","DOM","Env","PageEvents","PageletGK","PageletSet","ScriptPathState","URI","containsNode","ge","goOrReplace","performance","performanceAbsoluteNow"],(function(a,b,c,d,e,f,g){var h,i,j,k,l=b("PageletGK").destroyDomAfterEventHandler,m,n=0;function o(a,c){var d=b("ge")(a);if(!d)return;c||(d.style.minHeight="100px");c=b("PageletSet").getPageletIDs();for(var e=0;e<c.length;e++){var f=c[e];if(b("PageletSet").hasPagelet(f)){var g=b("PageletSet").getPagelet(f);b("containsNode")(d,g.getRoot())&&b("PageletSet").removePagelet(f)}}b("Arbiter").inform(b("PageEvents").AJAXPIPE_ONBEFORECLEARCANVAS,{canvasID:a});function h(a){var c=b("ContextualComponent").forNode(a);c&&c.unmount();b("DOM").empty(a)}l?(b("Arbiter").inform("pagelet/destroy",{id:null,root:d}),h(d)):(h(d),b("Arbiter").inform("pagelet/destroy",{id:null,root:d}))}function p(a,c){a=b("ge")(a);a&&!c&&(a.style.minHeight="100px")}c=function(){"use strict";function c(a,c,d){this._allowIrrelevantRequests=!1;this._canvas_id=a;this._uri=c;this._query_data=d;a=new(b("AsyncRequest"))();a.disableInteractionServerTracing();a.setReplaceTransportMarkers(!1);this._request=a;this._allow_cross_page_transition=!0;this._arbiter=new(b("Arbiter"))();this._requestID=n++}var d=c.prototype;d.getArbiter=function(){return this._arbiter};d.setData=function(a){this._query_data=a;return this};d.getData=function(){return this._query_data};d.setAllowCrossPageTransition=function(a){this._allow_cross_page_transition=a;return this};d.setAppend=function(a){this._append=a;return this};d._getAsyncRequestType=function(){return b("AsyncRequestConfig").useFetchStreamAjaxPipeTransport?"useFetchWithIframeFallback":"useIframeTransport"};d.send=function(){this._arbiter.inform(b("PageEvents").AJAXPIPE_SEND,{rid:this._requestID,quickling:!!this._isQuickling,ts:(h||(h=b("performanceAbsoluteNow")))()},"persistent");var a={ajaxpipe:1,ajaxpipe_token:(i||(i=b("Env"))).ajaxpipe_token};Object.assign(a,b("ScriptPathState").getParams());b("ScriptPathState").reset();var c=this._request;if(c==null)return this;c.setOption(this._getAsyncRequestType(),!0).delayPreDisplayJS().setURI(this._uri).setData(Object.assign(a,this._query_data)).setPreBootloadHandler(this._preBootloadHandler.bind(this)).setInitialHandler(this._onInitialResponse.bind(this)).setHandler(this._onResponse.bind(this)).setMethod("GET").setReadOnly(!0).setAllowCrossPageTransition(this._allow_cross_page_transition).setAllowIrrelevantRequests(this._allowIrrelevantRequests);this._automatic?this._relevantRequest=m:m=this._request;if(this._isQuickling){a=(j||(j=b("performance"))).clearResourceTimings||(j||(j=b("performance"))).webkitClearResourceTimings;a&&a.call(j||(j=b("performance")))}c.send();return this};d._preBootloadFirstResponse=function(a){return!1};d._fireDomContentCallback=function(){var a=this._request;a&&a.cavalry&&a.cavalry.setTimeStamp("t_domcontent");this._arbiter.inform(b("PageEvents").AJAXPIPE_DOMREADY,!0,"state")};d._fireOnloadCallback=function(){window.console&&console.timeStamp&&console.timeStamp('perf_trace {"name": "e2e", "parent": "PageEvents.AJAXPIPE_ONLOAD"}');var a=this._request;a!=null&&a.cavalry&&(a.cavalry.setTimeStamp("t_hooks"),a.cavalry.setTimeStamp("t_layout"),a.cavalry.setTimeStamp("t_onload"));this._arbiter.inform(b("PageEvents").AJAXPIPE_ONLOAD,{lid:this.pipe.lid,rid:this._requestID,ts:(h||(h=b("performanceAbsoluteNow")))()},"state")};d._isRelevant=function(a){return this._request===m||this._automatic&&this._relevantRequest===m||this._jsNonBlock||m!=null&&m.getAllowIrrelevantRequests()};d._preBootloadHandler=function(a){var c=this._request,d=a.getPayload();if(!d||d.redirect||!this._isRelevant(a))return!1;var e=!1;a.is_first&&(!this._append&&!this._displayCallback&&!d.isCometResponse&&o(this._canvas_id,this._constHeight),e=this._preBootloadFirstResponse(a),c!=null||g(0,36),this.pipe=new(b("BigPipe"))({config:d.bigPipeConfig,arbiter:this._arbiter,rootNodeID:this._canvas_id,lid:c.lid,rid:this._requestID,isAjax:!0,domContentCallback:this._fireDomContentCallback.bind(this),onloadCallback:this._fireOnloadCallback.bind(this),domContentEvt:b("PageEvents").AJAXPIPE_DOMREADY,onloadEvt:b("PageEvents").AJAXPIPE_ONLOAD,jsNonBlock:this._jsNonBlock,automatic:this._automatic,displayCallback:this._displayCallback,allowIrrelevantRequests:this._allowIrrelevantRequests}),this.pipe.setPageID(c.lid));return e};d._redirect=function(c){if(c.redirect){if(c.force||!this.isPageActive(c.redirect)){var d=["ajaxpipe","ajaxpipe_token"].concat(this.getSanitizedParameters());b("goOrReplace")(window.location,new(k||(k=b("URI")))(c.redirect).removeQueryData(d),!0)}else{d=a.PageTransitions;d.go(c.redirect,!0)}return!0}else return!1};d.isPageActive=function(a){return!0};d.getSanitizedParameters=function(){return[]};d._versionCheck=function(a){return!0};d._onInitialResponse=function(a){var b=a.getPayload();if(!this._isRelevant(a))return!1;if(!b)return!0;return this._redirect(b)||!this._versionCheck(b)?!1:!0};d._processFirstResponse=function(a){this._arbiter.inform(b("PageEvents").AJAXPIPE_FIRST_RESPONSE,{lid:this.pipe.lid,quickling:!!this._isQuickling});a=a.getPayload();var c=b("ge")(this._canvas_id);a=a.canvas_class;c!=null&&a!=null&&b("CSS").setClass(c,a)};d.setFirstResponseCallback=function(a){this._firstResponseCallback=a;return this};d.setFirstResponseHandler=function(a){this._processFirstResponse=a;return this};d._onResponse=function(a){var c=a.payload;if(!this._isRelevant(a))return b("AsyncRequest").suppressOnloadToken;a.is_first&&(this._processFirstResponse(a),this._firstResponseCallback&&this._firstResponseCallback(),c.provides=c.provides||[],c.provides.push("uipage_onload"));if(c){if("content"in c.content){this._append&&(c.append=this._canvas_id);var d=c.content.content;delete c.content.content;c.content[this._canvas_id]=d}this.pipe.onPageletArrive(c)}a.is_last&&p(this._canvas_id,this._constHeight);return b("AsyncRequest").suppressOnloadToken};d.setNectarModuleDataSafe=function(a){this._request!=null&&this._request.setNectarModuleDataSafe(a);return this};d.setFinallyHandler=function(a){this._request!=null&&this._request.setFinallyHandler(a);return this};d.setErrorHandler=function(a){this._request!=null&&this._request.setErrorHandler(a);return this};d.setTransportErrorHandler=function(a){this._request!=null&&this._request.setTransportErrorHandler(a);return this};d.setResetHandler=function(a){this._resetHandler=a;return this};d.abort=function(){this._request!=null&&this._request.abort();this._reset();return this};d.abandon=function(){this._request!=null&&this._request.abandon();this._reset();return this};d._reset=function(){m==this._request&&(m=null),this._request=null,this._resetHandler&&this._resetHandler()};d.setJSNonBlock=function(a){this._jsNonBlock=a;return this};d.setAutomatic=function(a){this._automatic=a;return this};d.setDisplayCallback=function(a){this._displayCallback=a;return this};d.setConstHeight=function(a){this._constHeight=a;return this};d.setAllowIrrelevantRequests=function(a){this._allowIrrelevantRequests=a;return this};d.getAsyncRequest=function(){return this._request};c.getCurrentRequest=function(){return m};c.setCurrentRequest=function(a){m=a};return c}();c.clearCanvas=o;e.exports=c}),null);
__d("UIPageletContentCache",[],(function(a,b,c,d,e,f){a={cache:{},getContent:function(a){return a in this.cache?this.cache[a]:null},setContent:function(a,b){this.cache[a]=b}};e.exports=a}),null);
__d("UIPagelet",["ActorURI","AjaxPipeRequest","AsyncRequest","DOM","HTML","ScriptPathState","UIPageletContentCache","URI","emptyFunction","ge","isElementNode"],(function(a,b,c,d,e,f){var g;a=function(){"use strict";function a(a,c,d){var e=a&&b("isElementNode")(a)?a.id:a;this._id=e||null;this._element=b("ge")(a||b("DOM").create("div"));this._src=c||null;this._context_data=d||{};this._data={};this._handler=b("emptyFunction");this._request=null;this._use_ajaxpipe=!1;this._use_post_request=!1;this._is_bundle=!0;this._allow_cross_page_transition=!1;this._append=!1;this._cache_content=!1;this._content_cache_key="";this._is_content_cached=null;this._constHeight=!1}var c=a.prototype;c.getElement=function(){return this._element};c.setHandler=function(a){this._handler=a;return this};c.go=function(a,b){arguments.length>=2||typeof a==="string"?(this._src=a,this._data=b||{}):arguments.length==1&&(this._data=a);this.refresh();return this};c.setAllowCrossPageTransition=function(a){this._allow_cross_page_transition=a;return this};c.setBundleOption=function(a){this._is_bundle=a;return this};c.setErrorHandler=function(a){this._errorHandler=a;return this};c.setTransportErrorHandler=function(a){this.transportErrorHandler=a;return this};c.refresh=function(){if(this._use_ajaxpipe)b("ScriptPathState").setIsUIPageletRequest(!0),this._request=new(b("AjaxPipeRequest"))(this._id,this._src),this._request.setAppend(this._append).setConstHeight(this._constHeight).setJSNonBlock(this._jsNonblock).setAutomatic(this._automatic).setDisplayCallback(this._displayCallback).setFinallyHandler(this._finallyHandler),this._errorHandler&&this._request.setErrorHandler(this._errorHandler),this.transportErrorHandler&&this._request.setTransportErrorHandler(this.transportErrorHandler),this._allowIrrelevantRequests!=null&&this._request.setAllowIrrelevantRequests(this._allowIrrelevantRequests);else{if(this._cache_content){var a=b("UIPageletContentCache").getContent(this._content_cache_key);if(a!==null){this.handleContent(a,!0);return this}}var c=function(a){this._request=null;a=b("HTML")(a.getPayload());this.handleContent(a);var c=a.getContent().contains("<iframe");!c&&this._cache_content&&b("UIPageletContentCache").setContent(this._content_cache_key,a)}.bind(this),d=this._displayCallback,e=this._finallyHandler;this._request=new(b("AsyncRequest"))(this._src).setMethod("GET").setReadOnly(!0).setOption("bundle",this._is_bundle).setHandler(function(a){d?d(c.bind(null,a),a):c(a),e&&e(a)});this._errorHandler&&this._request.setErrorHandler(this._errorHandler);this.transportErrorHandler&&this._request.setTransportErrorHandler(this.transportErrorHandler);this._use_post_request&&this._request.setMethod("POST")}a=babelHelpers["extends"]({},this._context_data,this._data);this._actorID&&(a[b("ActorURI").PARAMETER_ACTOR]=this._actorID);this._request.setAllowCrossPageTransition(this._allow_cross_page_transition).setData({data:JSON.stringify(a)}).send();return this};c.handleContent=function(a,c){this._append?b("DOM").appendContent(this._element,a):b("DOM").setContent(this._element,a),c?(this._is_content_cached=!0,this._displayCallback(b("emptyFunction"))):this._is_content_cached=!1,this._handler!=null&&this._handler()};c.cancel=function(){this._request&&this._request.abort()};c.abandon=function(){this._request&&this._request.abandon()};c.setUseAjaxPipe=function(a){this._use_ajaxpipe=!!a;return this};c.setUsePostRequest=function(a){this._use_post_request=!!a;return this};c.setAppend=function(a){this._append=!!a;return this};c.setJSNonBlock=function(a){this._jsNonblock=!!a;return this};c.setAutomatic=function(a){this._automatic=!!a;return this};c.setDisplayCallback=function(a){this._displayCallback=a;return this};c.setConstHeight=function(a){this._constHeight=!!a;return this};c.setFinallyHandler=function(a){this._finallyHandler=a;return this};c.setAllowIrrelevantRequests=function(a){this._allowIrrelevantRequests=a;return this};c.setActorID=function(a){this._actorID=a;return this};c.setCacheContent=function(a){this._cache_content=a;return this};c.setContentCacheKey=function(a){this._content_cache_key=a;return this};c.isContentCached=function(){return this._is_content_cached};a.appendToInline=function(a,c){a=b("ge")(a);c=b("ge")(c);if(a&&c){while(c.firstChild)b("DOM").appendContent(a,c.firstChild);b("DOM").remove(c)}};a.loadFromEndpoint=function(c,d,e,f){f=f||{};var h="/ajax/pagelet/generic.php/"+c;f.intern&&(h="/intern"+h);f.query&&(h=h+"?"+f.query);h=new(g||(g=b("URI")))(h.replace(/\/+/g,"/"));f.subdomain&&h.setSubdomain(f.subdomain);var i=!1,j="";f.contentCacheKey&&(i=!0,j=c+","+String(f.contentCacheKey));c=new a(d,h,e).setUseAjaxPipe(f.usePipe).setBundleOption(f.bundle!==!1).setAppend(f.append).setJSNonBlock(f.jsNonblock).setAutomatic(f.automatic).setDisplayCallback(f.displayCallback).setConstHeight(f.constHeight).setAllowCrossPageTransition(f.crossPage).setFinallyHandler(f.finallyHandler||b("emptyFunction")).setErrorHandler(f.errorHandler).setTransportErrorHandler(f.transportErrorHandler).setAllowIrrelevantRequests(f.allowIrrelevantRequests).setActorID(f.actorID).setCacheContent(i).setContentCacheKey(j).setUsePostRequest(f.usePostRequest);f.handler&&c.setHandler(f.handler);c.go();return c};a.loadFromEndpointBatched=function(c,d,e){var f=c.slice(0,e),g=c.slice(e);if(g.length>0){c=f[f.length-1];var h=b("emptyFunction");c.options&&c.options.finallyHandler&&(h=c.options.finallyHandler);c.options=babelHelpers["extends"]({},c.options,{finallyHandler:function(){h(),window.setTimeout(function(){a.loadFromEndpointBatched(g,d,e)},1)}})}f.forEach(function(b){a.loadFromEndpoint(b.controller,b.target_element,b.data,babelHelpers["extends"]({},b.options,d,{bundle:!0}))})};return a}();e.exports=a}),null);
__d("DeveloperSiteDocumentationX",["Arbiter","DOMQuery","DOMScroll","PageTransitions","Scroll","UIPagelet","ge","immutable"],(function(a,b,c,d,e,f){"use strict";var g=b("immutable").Set(["/docs/reference/iossdk/","/docs/reference/androidsdk"]);a=function(){function a(){this.$1=null,this.scrollDocsNav(),b("Arbiter").subscribe("MarkdownWikiPageToolbar/edit",this.initializeLivePreview.bind(this))}var c=a.prototype;c.handleTransition=function(a,c){if(this.$1===null)return!1;if(c.getFragment())return!1;if(c.getQueryData().locale||c.getQueryData().locale_debug)return!1;var d=c.getPath(),e=g.find(function(a){return d.indexOf(a)!==-1});if(e)return!1;if(d.indexOf(a)!==-1&&d!==a){this.redrawBody(c);this.redrawNav(c);this.redrawDevsiteDock(c);this.redrawBreadcrumbs(c);b("PageTransitions").transitionComplete();b("Arbiter").inform("DeveloperSiteDocumentationX/newPageView",c);return!0}return!1};c.initializeLivePreview=function(a,b){this.$1=window.setInterval(this.handleLivePreviewUpdate.bind(this).bind(null,b),2e3)};c.handleLivePreviewUpdate=function(a){this.redrawBody(a,!0),this.redrawDevsiteDock(a,!0)};c.redrawNav=function(a){var c=this;a=Object.assign({path:a.getPath()},a.getQueryData());b("UIPagelet").loadFromEndpoint("DeveloperDocumentationPrimaryNavPagelet","documentation_primary_nav_pagelet",a,{subdomain:"developers",bundle:!1,displayCallback:function(a){a(),c.scrollDocsNav()}})};c.redrawBreadcrumbs=function(a){a=Object.assign({path:a.getPath()},a.getQueryData());b("UIPagelet").loadFromEndpoint("DeveloperDocumentationBreadcrumbsPagelet","documentation_breadcrumbs_pagelet",a,{subdomain:"developers",bundle:!1})};c.redrawDevsiteDock=function(a,c){c=Object.assign({path:a.getPath(),preview:c},a.getQueryData());b("UIPagelet").loadFromEndpoint("DevsiteDocumentationDockPagelet","devsite_dock",c,{subdomain:"developers",bundle:!1})};c.redrawBody=function(a,c){a=Object.assign({path:a.getPath(),preview:c},a.getQueryData());b("UIPagelet").loadFromEndpoint("DeveloperDocumentationBodyPagelet","documentation_body_pagelet",a,{bundle:!1,subdomain:"developers",displayCallback:function(a){a(),c!=null&&b("DOMScroll").scrollToTop(!1)}})};c.scrollDocsNav=function(){var a=b("ge")("documentation_primary_nav_pagelet");try{var c=b("DOMQuery").scry(a,"a.primarySelected"),d=b("DOMQuery").scry(a,"a.selected"),e=null;if(c&&c[0])e=c[0];else if(d&&d[0])e=d[0];else return;b("Scroll").setTop(a,e.parentElement.offsetTop)}catch(a){}};return a}();e.exports=a}),null);
__d("DevsiteCardScrollToTopButton.react",["ix","cx","xuiglyph","Animation","Image.react","Link.react","React","joinClasses"],(function(a,b,c,d,e,f,g,h,i){"use strict";var j=b("React");a=function(a){babelHelpers.inheritsLoose(c,a);function c(){return a.apply(this,arguments)||this}var d=c.prototype;d.render=function(){return j.jsx(b("Link.react"),{className:b("joinClasses")(this.props.className,"_2k32"),onClick:function(){return new(b("Animation"))(document.body).to("scrollTop",0).duration(500).go()},children:j.jsx(b("Image.react"),{src:g("88889")})})};return c}(j.PureComponent);e.exports=a}),null);
__d("DevsiteCardScrollToTopButtons",["csx","cx","CSS","DevsiteCardScrollToTopButton.react","DOM","DOMQuery","React","ReactDOM"],(function(a,b,c,d,e,f,g,h){"use strict";var i=b("React");a={init:function(a,c){a=b("DOMQuery").scry(a,"._57mb");var d=a.length;for(var e=1;e<d;e++){var f=a[e],g=b("DOMQuery").scry(f,"._588p");if(g.length===0)continue;b("CSS").addClass(f,"_3la3");f=b("DOM").create("div");f.setAttribute("data-click-area",c);b("ReactDOM").render(i.jsx(b("DevsiteCardScrollToTopButton.react"),{}),f);b("DOM").appendContent(g[0],f)}}};e.exports=a}),null);
__d("DevsiteOnScrollToSection",["Arbiter","DOMQuery","Event","Run","Style","URI","getElementPosition","throttle"],(function(a,b,c,d,e,f){"use strict";var g;function h(a){return a.toLowerCase().replace(/[^0-9a-z]/g,"-")}function i(a){var c={};return b("DOMQuery").scry(a,"h2").filter(function(a){return b("DOMQuery").scry(a,"^h2").length===0}).map(function(a){return b("DOMQuery").scry(a,"^div")}).filter(function(a){return a.length>0}).map(function(a){return a[0]}).filter(function(a){if(!a.innerText)return!1;a=h(a.innerText.slice(20));if(!c[a]){c[a]=!0;return!0}return!1}).filter(function(a){return b("DOMQuery").scry(a,"h2").length===1})}var j=function(){return"h2 h3"};a={init:function(a,c){var d=this;c===void 0&&(c=j());b("Run").onAfterLoad(function(){return d._initAfterLoad(a,c)})},_initAfterLoad:function(a,c){var d=b("Style").getScrollParent(a);if(!d)return;this._lastScrollToSectionIdx=null;var e=c.split(" ");c=i(a);this._sections=c.map(function(a){var c={};return e.map(function(d){return b("DOMQuery").scry(a,d).filter(function(a){if(!a.textContent)return!1;a=a.id||h(a.textContent);if(!c[a]){c[a]=!0;return!0}return!1})})}).reduce(function(a,b){return a.concat.apply(a,b)},[]);c=b("DOMQuery").scry(a,"h1");c&&c.length>0&&this._sections.unshift(c[0]);var f={};e.forEach(function(a,b){f[a.toUpperCase()]=b});var j={};this._sectionData=this._sections.map(function(a){a.id||(a.id=h(a.textContent));if(!j[a.id])j[a.id]=1;else{j[a.id]+=1;var c="-".concat(j[a.id].toString());a.id=a.id.concat(c)}return{title:a.textContent,uri:new(g||(g=b("URI")))().setFragment(a.id),indent:a.nodeName in f?f[a.nodeName]:0}});if(window.location.hash){a=window.location.hash;window.location.hash="";window.location.hash="#"+encodeURIComponent(a.substring(1))}b("Arbiter").inform("devsiteOnScrollToSection/sectionsReady",this._sectionData,"state");this._onUpdate();b("Event").listen(d,"scroll",b("throttle")(this._onUpdate,10,this));b("Event").listen(d,"resize",b("throttle")(this._onUpdate,10,this))},_onUpdate:function(){var a=null,c=this._sections,d=c.length;for(var e=0;e<d;e++){var f=c[e];if(b("getElementPosition")(f).y<104)a=e;else break}a!==this._lastScrollToSectionIdx&&(this._lastScrollToSectionIdx=a,b("Arbiter").inform("devsiteOnScrollToSection/sectionUpdate",this._sectionData[a]))}};e.exports=a}),null);
__d("DeveloperProductHomeMobileOnThisPage.react",["ix","cx","fbt","Arbiter","Image.react","Link.react","React","ShimButton.react","fbglyph","immutable"],(function(a,b,c,d,e,f,g,h,i){"use strict";var j=b("React"),k=b("immutable").List;a=function(a){babelHelpers.inheritsLoose(c,a);function c(){var b,c;for(var d=arguments.length,e=new Array(d),f=0;f<d;f++)e[f]=arguments[f];return(b=c=a.call.apply(a,[this].concat(e))||this,c.state={allAnchorCrumbs:k(),isCollapsed:!0},c.menuToggle=function(){c.setState({isCollapsed:!c.state.isCollapsed})},b)||babelHelpers.assertThisInitialized(c)}var d=c.prototype;d.componentDidMount=function(){var a=this;b("Arbiter").subscribe("devsiteOnScrollToSection/sectionsReady",function(b,c){return a.setState({allAnchorCrumbs:k(c)})})};d.render=function(){var a=this;return this.state.allAnchorCrumbs.count()===0?null:j.jsxs("div",{className:"_33zv _3e1u",children:[j.jsxs(b("ShimButton.react"),{className:"_33zw",onClick:this.menuToggle,children:[i._("On This Page"),j.jsxs("div",{children:[j.jsx(b("Image.react"),{className:this.state.isCollapsed?"":"hidden_elem",src:g("114092")}),j.jsx(b("Image.react"),{className:this.state.isCollapsed?"hidden_elem":"",src:g("114104")})]})]}),this.state.allAnchorCrumbs.map(function(c,d){return j.jsx("div",{className:"_5-24"+(a.state.isCollapsed?" hidden_elem":""),children:j.jsx(b("Link.react"),{href:c.uri,children:c.title})},d)})]})};return c}(j.PureComponent);e.exports=a}),null);
__d("DeveloperProductHomeOnThisPage.react",["cx","fbt","Arbiter","Link.react","React","StickyArea.react","immutable"],(function(a,b,c,d,e,f,g,h){"use strict";var i=b("React"),j=b("immutable").List;a=function(a){babelHelpers.inheritsLoose(c,a);function c(){var b,c;for(var d=arguments.length,e=new Array(d),f=0;f<d;f++)e[f]=arguments[f];return(b=c=a.call.apply(a,[this].concat(e))||this,c.state={allAnchorCrumbs:j()},b)||babelHelpers.assertThisInitialized(c)}var d=c.prototype;d.componentDidMount=function(){var a=this;b("Arbiter").subscribe("devsiteOnScrollToSection/sectionsReady",function(b,c){return a.setState({allAnchorCrumbs:j(c)})})};d.render=function(){return this.state.allAnchorCrumbs.count()===0?null:i.jsx(b("StickyArea.react"),{className:"_397q",offset:60,stickTo:"WINDOW",children:i.jsxs("div",{className:"_2pjw",children:[i.jsx("div",{children:h._("On This Page")}),this.state.allAnchorCrumbs.map(function(a,c){return typeof a.indent==="number"&&a.indent>0?i.jsxs("div",{className:"_8agj",children:[i.jsx("div",{style:{minWidth:10*a.indent}}),i.jsx("div",{className:"_8agx",children:i.jsx(b("Link.react"),{href:a.uri,children:a.title})})]},c):i.jsx("div",{className:"_5-24",children:i.jsx(b("Link.react"),{href:a.uri,children:a.title})},c)})]})})};return c}(i.PureComponent);e.exports=a}),null);
__d("HighchartsServerCallable",["Highcharts"],(function(a,b,c,d,e,f){"use strict";a={fromJSON:function(a){new(b("Highcharts").Chart)(a)},setOptions:function(a){b("Highcharts").setOptions(a)}};e.exports=a}),null);
__d("OnVisible",["Arbiter","DOM","Event","Parent","Run","SubscriptionsHandler","Vector","ViewportBounds","coalesce","killswitch","queryThenMutateDOM"],(function(a,b,c,d,e,f){"use strict";var g=[],h=0,i=[],j,k=null,l,m;function n(){g.forEach(function(a){a.remove()}),k&&(k.release(),k=null),h=0,g.length=0}function o(){if(!g.length){n();return}i.length=0;j=b("Vector").getScrollPosition().y;l=b("Vector").getViewportDimensions().y;m=b("ViewportBounds").getTop();var a=g.length;for(var c=0;c<a;++c){var d=g[c];isNaN(d.elementHeight)&&i.push(c);d.elementHeight=b("Vector").getElementDimensions(d.element).y;d.elementPos=b("Vector").getElementPosition(d.element);d.hidden=b("Parent").byClass(d.element,"hidden_elem");d.scrollArea&&(d.scrollAreaHeight=b("Vector").getElementDimensions(d.scrollArea).y,d.scrollAreaY=b("Vector").getElementPosition(d.scrollArea).y)}h=a}function p(){for(var a=Math.min(g.length,h)-1;a>=0;--a){var b=g[a];if(!b.elementPos||b.removed){g.splice(a,1);continue}if(b.hidden)continue;var c=b.buffer,d=!1,e=j+l+c,f=b.elementPos.y;if(e>f){var k=j+m-c,n=f+b.elementHeight;d=!b.strict||k<f&&e>n;if(d&&b.scrollArea){k=b.scrollAreaY+b.scrollAreaHeight+c;d=f>=b.scrollAreaY-c&&f<k}}(b.inverse?!d:d)&&(b.remove(),b.handler(i.indexOf(a)!==-1))}}function q(){r();if(g.length)return;k==null&&(k=new(b("SubscriptionsHandler"))(),k.addSubscriptions(b("Event").listen(window,"scroll",r),b("Event").listen(window,"resize",r),b("Arbiter").subscribe("dom-scroll",r)))}function r(){b("queryThenMutateDOM")(o,p,"OnVisible/positionCheck")}a=function(){function a(a,c,d,e,f,h){this.element=a,this.handler=c,this.strict=d,this.buffer=b("coalesce")(e,300),this.inverse=b("coalesce")(f,!1),this.scrollArea=h||null,this.scrollArea&&(this.scrollAreaListener=this.$1()),g.length===0&&(b("killswitch")("ON_VISIBLE_COMPONENT_CLEANUP")?b("Run").onLeave(n):b("Run").onCleanupOrLeave(a,n)),q(),g.push(this)}var c=a.prototype;c.remove=function(){if(this.removed)return;this.removed=!0;this.scrollAreaListener&&this.scrollAreaListener.remove()};c.reset=function(){this.elementHeight=null,this.removed=!1,this.scrollArea&&(this.scrollAreaListener=this.$1()),g.indexOf(this)===-1&&g.push(this),q()};c.setBuffer=function(a){this.buffer=a,r()};c.checkBuffer=function(){r()};c.getElement=function(){return this.element};c.$1=function(){return b("Event").listen(b("DOM").find(this.scrollArea,".uiScrollableAreaWrap"),"scroll",this.checkBuffer)};return a}();Object.assign(a,{checkBuffer:r});e.exports=a}),null);
__d("ScrollingPager",["Arbiter","CSS","DOM","Event","OnVisible","UIPagelet","ge","tidyEvent"],(function(a,b,c,d,e,f){var g={};a=function(){"use strict";function a(c,d,e,f,h){var i=this;this.$9=c;this.$7=d;this.$2=e;this.$5=f||{};this.$1=!1;this.$5.target_id?(this.$10=this.$5.target_id,this.$5.append=!0):this.$10=c;h&&b("tidyEvent")(b("Event").listen(h,"click",function(){i.getHandler()(!1);return!1}));this.$8=this.$5.scroll_area_id;this.$3=null;this.$5.fireOnScroll&&this.register();g[this.$9]=this;b("Arbiter").inform(a.CONSTRUCTED,{id:this.$9})}var c=a.prototype;c.setBuffer=function(a){this.$5.buffer=a,this.$4&&this.$4.setBuffer(a)};c.getBuffer=function(){return this.$5.buffer};c.getElement=function(){return b("ge")(this.$9)};c.register=function(){var a=this;if(this.$1)return;var c=this.getElement();if(!c)return;this.$4=new(b("OnVisible"))(c,function(b){a.getHandler()(b)},!1,this.$5.buffer,!1,b("ge")(this.$8));this.$1=!0};c.getInstance=function(a){return g[a]};c.getHandler=function(){if(this.$3)return this.$3;function a(c){var d=this,e=b("ge")(this.$9);if(!e){this.$4.remove();return}b("CSS").addClass(e.firstChild,"async_saving");var f=this.$5.handler,g=this.$5.force_remove_pager&&this.$9!==this.$10,a=function(){for(var a=arguments.length,c=new Array(a),h=0;h<a;h++)c[h]=arguments[h];f&&f.apply(null,c);g&&b("DOM").remove(e);d.$6=null};this.$5.usePipe?this.$5.finallyHandler=a:this.$5.handler=a;c&&(this.$2.pager_fired_on_init=!0);this.$6=b("UIPagelet").loadFromEndpoint(this.$7,this.$10,this.$2,this.$5)}return a.bind(this)};c.setHandler=function(a){this.$3=a};c.removeOnVisible=function(){this.$4.remove()};c.checkBuffer=function(){this.$4&&this.$4.checkBuffer()};c.setOption=function(a,b){this.$5[a]=b};c.cancelPagelet=function(){this.$6&&(this.$6.cancel(),this.$6=null)};a.getInstance=function(a){return g[a]};return a}();a.CONSTRUCTED="ScrollingPager/constructed";e.exports=a}),null);
__d("submitForm",["DOM"],(function(a,b,c,d,e,f){"use strict";a=function(a){var c=a.querySelector('input[type="submit"]');c!=null?c.click():(c=b("DOM").create("input",{type:"submit",className:"hidden_elem"}),b("DOM").appendContent(a,c),c.click(),b("DOM").remove(c))};e.exports=a}),null);
__d("FormSubmitOnChange",["Event","submitForm"],(function(a,b,c,d,e,f){a=function(){"use strict";function a(a){this._form=a}var c=a.prototype;c.enable=function(){this._listener=b("Event").listen(this._form.getRoot(),"change",this._submit.bind(this))};c.disable=function(){this._listener.remove(),this._listener=null};c._submit=function(){b("submitForm")(this._form.getRoot())};return a}();Object.assign(a.prototype,{_listener:null});e.exports=a}),null);