/**
    Std UI Kit Library
    http://ui.stdjs.com
	module: Adorn
*/
Std.ui.module("Adorn",{nodeName:"a",b:"widget",e:{level:1,defaultClass:"StdUI_Adorn",text:"adorn",href:"",theme:"blue",target:"_blank",fontSize:null,cursor:null,tabIndex:null},j:{cursor:function(t){return this.opt("cursor",t,function(){this[0].cursor(t)})},target:function(t){return this.opt("target",t,function(){this[0].attr("target",t)})},fontSize:function(t){return this.opt("fontSize",t,function(){this[0].css("font-size",t+"px")})},href:function(t){var n=this;return this.opt("href",t,function(){isEmpty(t)?(n.target(n.opts.target),n[0].attr("href",t)):n[0].removeAttr("href")})}},k:function(t){t.call_opts({cursor:null,fontSize:null},!0)},support:{rule:{content:"text"},html:{nodeName:["A","DIV","SPAN"],create:function(t,n,e){this.html(e)}}}}),Std.plugin.module("Adorn",{e:{},k:function(){}});