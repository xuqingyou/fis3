(function(){__wpo.util.param=function(d){var a=[],c="";for(var b in d){c=(typeof d[b]=="undefined"?"":d[b]);a.push(b+"="+c)}return a.join("&")};__wpo.util.uaMatch=function(b){b=b.toLowerCase();var a=/(chrome)[ \/]([\w.]+)/.exec(b)||/(webkit)[ \/]([\w.]+)/.exec(b)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b)||/(msie) ([\w.]+)/.exec(b)||b.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b)||[];return{browser:a[1]||"",version:a[2]||"0"}};__wpo.pda={_opt:{},setOpt:function(a){__wpo.util.extend(this._opt,a)},_metrics:{},_addMetric:function(a,b){if(typeof a==="object"){__wpo.util.extend(this._metrics,a)}else{this._metrics[a]=b}},_metadata:{},_render_start:0,_measureEnvInfo:function(){var a=__wpo.util.uaMatch(window.navigator.userAgent);var b=a.browser;if(b==="msie"){b+=a.version}var c={"msie9.0":19,"msie10.0":110,chrome:20,mozilla:30,safari:40,opera:50};this._addMetric("browser",(c[b]||0));if(window.screen){this._addMetric("_screen",window.screen.width+"*"+window.screen.height+"|"+window.screen.availWidth+"*"+window.screen.availHeight)}},_measurePerformanceTiming:function(){function g(){var i;if(window.performance&&performance.timing&&performance.timing.msFirstPaint){i=performance.timing.msFirstPaint}else{if(window.chrome&&chrome.loadTimes){i=parseInt(chrome.loadTimes().firstPaintTime*1000)}}return i}var b={},c={},e=performance.timing;var h=e.fetchStart;if(e.domainLookupStart>e.connectStart){b.dns=e.domainLookupEnd}b.ct=e.connectEnd;b.st=e.responseStart;b.tt=e.responseEnd;this._measureTime(h,b);var d={c_dnslookup:e.domainLookupEnd-e.domainLookupStart,c_connecting:e.connectEnd-e.connectStart,c_waiting:e.responseStart-e.requestStart,c_receiving:e.responseEnd-e.responseStart};this._addMetric(d);var a=e.navigationStart;c.drt=e.domContentLoadedEventStart;c.drt_end=e.domContentLoadedEventEnd;c.lt=e.loadEventStart;var f=g();if(f){c.c_nfpt=f}this._measureTime(a,c)},_measureLoadTiming:function(){this._addMetric("wt",1);var c=this._metadata.timing,a=this._metadata.render_start;this._measureTime(a,this._metadata.timing);var b=c.ht-this._metadata.time_to_title;this._addMetric("c_head_time",b)},_measureTime:function(d,b){var c=0;for(var a in b){c=b[a]-d;if(c>=0){this._addMetric(a,c)}}},_measureHtmlContent:function(d,c){var h=[],b={},j=null;var a=0;h=document.getElementsByTagName("img");for(var g=0,e=h.length;g<e;g++){j=h[g];if(j.src&&!(j.src in b)){a++;b[j.src]=true}}this._addMetric("c_img_num",a);var f=document.getElementsByTagName("*").length;this._addMetric("c_dom_num",f)},run:function(a){this._metadata=a;this._measurePerformanceTiming();this._measureLoadTiming();this._measureEnvInfo();this._addMetric(a.env);__wpo.log.push(this._metrics);__wpo.log.send()},getMetrics:function(){return this._metrics}};__wpo.log={_opt:{log_path:""},_data:{},setOpt:function(a){__wpo.util.extend(this._opt,a)},push:function(a){__wpo.util.extend(this._data,a)},send:function(){var a=document.createElement("img");a.src=this._opt.log_path+"?"+__wpo.util.param(this._data);window["___pms_img_"+new Date()*1]=a;this._data={}}}})();