if (self.CavalryLogger) { CavalryLogger.start_js(["iiCad"]); }

__d("IndeterminateNotificationCounter",["cx","DocumentTitle"],(function(a,b,c,d,e,f,g){"use strict";var h="(*) ",i={init:function(a){a>0&&i.addBadge()},addBadge:function(){var a=b("DocumentTitle").get(),c=document.getElementById("NotifIndeterminateBadge"),d=c&&c.getAttribute("class");if(d!=null&&d.includes("_76t_")){c=c&&c.textContent;c!=null&&b("DocumentTitle").set("("+c+") "+a,!0);return}else if(d!=null&&d.includes("_79ig")){b("DocumentTitle").set("(99+) "+a,!0);return}b("DocumentTitle").set(h+a,!0)},removeBadge:function(){var a=b("DocumentTitle").get();b("DocumentTitle").set(a,!0)}};e.exports=i}),null);
__d("NotificationCounter",["Arbiter","CrossWindowEventEmitter","DocumentTitle","MessengerEnvironment"],(function(a,b,c,d,e,f){var g=new(b("CrossWindowEventEmitter"))("JewelBase"),h={messages:0,notifications:0,requests:0};a={init:function(){var a=this;b("Arbiter").subscribe("update_title",this._handleUpdate.bind(this));b("Arbiter").subscribe("jewel/count-updated",this._handleCountUpdate.bind(this));g.addListener("count-updated",function(b){a._handleCountUpdate("",b)})},getCount:function(){var a=0;for(var b in h){var c=Number(h[b]);if(typeof h[b]==="string"&&isNaN(c))return h[b];if(isNaN(c)||c<0)continue;a+=c}return a},updateTitle:function(){if(b("MessengerEnvironment").messengerui)return;var a=this.getCount();b("DocumentTitle").badge(a)},_handleCountUpdate:function(a,b){h[b.jewel]=b.count,this.updateTitle()},_handleUpdate:function(a,b){this.updateTitle()}};e.exports=a}),null);
__d("XWorkHubController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/notifications/hub/{?tab}/{?alert_id}/",{ref:{type:"String"},tab:{type:"String"},selected_key:{type:"String",defaultValue:"app_401904056828201"},alert_id:{type:"String"},mini:{type:"Bool",defaultValue:!1}})}),null);
__d("NotificationJewelController",["AdsApplicationUtils","Arbiter","Bootloader","Event","FunnelLogger","IndeterminateNotificationCounter","NotificationConstants","NotificationCounter","NotificationJewelFunnelLoggingConstants","NotificationSeenState","NotificationStore","NotificationUpdates","XWorkHubController","clearTimeout","createObjectFrom","curry","gkx","requireWeak","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){var g=b("NotificationConstants").PayloadSourceType,h=b("NotificationJewelFunnelLoggingConstants").FUNNEL_LOGGING_EVENT,i=b("NotificationJewelFunnelLoggingConstants").FUNNEL_LOGGING_NAME,j=0,k=!1;function l(a){var c=b("NotificationSeenState").getUnseenCount();b("Arbiter").inform("jewel/count-updated",{jewel:a,count:c,animation:"none"},"state")}c=function(){"use strict";function c(c,d){var e=this,f=d.badgeAnimationData,k=d.classification,m=d.endPoint,n=d.isBizsite,o=d.list;d=d.unseenNotifs;m&&b("NotificationStore").registerEndpoint({endpointControllerName:m,classification:k});n?b("IndeterminateNotificationCounter").init(d.length):b("NotificationCounter").init();var p=b("Event").listen(c.getRoot(),"mouseover",function(){b("FunnelLogger").startFunnel(i),p&&p.remove(),p=null,b("FunnelLogger").appendAction(i,h.MOUSE_OVER_ON_JEWEL),e.eagerRender(o)}),q=null;b("Event").listen(c.getRoot(),"mouseover",function(){q=b("setTimeoutAcrossTransitions")(function(){b("Bootloader").loadModules(["QE2Logger"],function(a){a.logExposureForUser("www_jewel_tooltip_experiment")},"NotificationJewelController"),q=null},500)});b("Event").listen(c.getRoot(),"mouseout",function(){q&&b("clearTimeout")(q)});b("gkx")("678265")&&b("Event").listen(c.getButton(),"click",function(a){if(a.metaKey||a.ctrlKey){a=b("XWorkHubController").getURIBuilder().setString("ref","jewel").setString("tab","all").getURI();window.open(a,"notification_hub_tab_identifier")}});var r=c.subscribe("opened",function(){r&&r.unsubscribe(),r=null,o.open()}),s=o.pause.bind(o);c.subscribe("opened",function(){window.setTimeout(s,0),l(c.name),b("Bootloader").loadModules(["NotificationVPVs"],function(a){return a.clearImpressions()},"NotificationJewelController"),b("Arbiter").inform("notificationJewel/opened")});c.subscribe("closed",function(){o.unpause(),l(c.name),b("Arbiter").inform("notificationJewel/closed"),o.setFlyoutOpenState(!1)});c.subscribe("user-open",function(c,d){b("AdsApplicationUtils").isPowerEditor()&&b("requireWeak")("AdsMgmtPerfScenarioController",function(b){a=b,a.startScenario({name:"am:global_nav_bar:notification_init_load"},"outside_flux",null)}),o.setFlyoutOpenState(!0)});c.isOpen()&&o.setFlyoutOpenState(!0);b("NotificationUpdates").subscribe("seen-state-updated",b("curry")(l,c.name));f&&(f.logWithQEUniverse&&b("Bootloader").loadModules(["QE2Logger"],function(a){return a.logExposureForUser(f.logWithQEUniverse)},"NotificationJewelController"),f.injectWithAnimation&&b("Bootloader").loadModules(["RelationshipDelightsBadge"],function(a){return a.inject(c,f.injectWithAnimation)},"NotificationJewelController"));b("NotificationUpdates").handleUpdate(g.INITIAL_LOAD,{seenState:b("createObjectFrom")(d,j)});l(c.name);b("Arbiter").inform("jewel_mounted")}var d=c.prototype;d.eagerRender=function(a){k||(k=!0,a.open())};return c}();e.exports=c}),null);