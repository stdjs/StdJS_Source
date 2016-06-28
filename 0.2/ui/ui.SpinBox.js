/**
    Std UI Kit Library
    http://ui.stdjs.com
	module: SpinBox
*/
Std.ui.module("SpinBox",{b:"LineEdit",e:{type:"number",step:1,value:0,minWidth:32,minHeight:12,defaultClass:"StdUI_SpinBox",validator:"Number","float":2},n:{initKeybordEvents:function(){var e=this;e[0].on("keydown",function(t){var n=t.keyCode;e.enable()&&(38===n?e.value(float(e.value())+e.step()).select():40===n&&e.value(float(e.value())-e.step()).select())})},initHandle:function(){var e=this,t=e.DOMMap,n=function(){e.enable()&&e.value(float(e.value())+e.step()).select()},i=function(){e.enable()&&e.value(float(e.value())-e.step()).select()};e[0].append(t.handles=newDiv("_handles").append([t.add=newDiv("_handle _add").mouse({down:n,longpress:n}),t.subtract=newDiv("_handle _subtract").mouse({down:i,longpress:i})]).on("mousedown",function(e){e.preventDefault()}))}},g:{width:function(e){var t=this;isNumber(e)||(e=t.width())}},j:{step:function(e){return this.opt("step",e)},"float":function(e){return this.opt("float",e)},value:function(e){var t=this,n=t.opts,i=t.DOMMap;return void 0===e?float(i.input.value()):(isNumber(e)||(e=float(e)),"infinite"!==n.min&&e<n.min&&(e=n.min),"infinite"!==n.max&&e>n.max&&(e=n.max),t.placeHolderVisible(""===e),"number"==n.type?i.input.value(float(e).toFixed(n["float"])):"int"==n.type&&i.input.value(int(e)),t)}},k:function(e){e.initHandle(),e.initKeybordEvents()}});