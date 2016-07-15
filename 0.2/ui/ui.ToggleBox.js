/**
    Std UI Kit Library
    http://ui.stdjs.com
	module: ToggleBox
*/
Std.ui.module("ToggleBox",{parent:"widget",events:"change",option:{level:1,defaultClass:"StdUI_ToggleBox",styleType:"default",text:"ON OFF",theme:"green-gray",handleWidth:22,handleHeight:22,handleClass:"",animateDuration:120,state:!1,value:null,valueType:"bool",autoBorder:!1,actionTrigger:"change"},extend:{init_boxSize:function(){this.handleBoxSize=this.DOMMap.handle.boxSize()},render:function(){var e=this,t=e.opts;null==t.valueType?e.state(t.state):e.value(t.value),e.initEvents()},width:function(e){var t=this,a=t.opts,l=a.state,i=t.DOMMap,n=t.styleType(),s=a.handleWidth;"auto"!==e&&i.main.css({width:"100%",height:"100%"}),isNumber(e)||(e=t.width()),"default"===n?(i.places.width(2*e),i.left.width(e),i.right.width(e),i.places.css("left",l?0:-e),i.handle.css({left:l?e-s:0,width:s-t.handleBoxSize.width})):("switch"===n||"toggle"===n)&&(i.places.width(e),i.left.width(e/2),i.right.width(e/2),i.places.css("left",0),i.handle.css({width:e/2-t.handleBoxSize.width,left:l?e/2:0}))},height:function(e){var t=this,a=t.opts,l=t.DOMMap,i=t.styleType();"auto"!==e&&(isNumber(e)||(e=t.height()),e-=t.boxSize.height,"default"===i?(l.handle.css("top",-Math.round((a.handleHeight-e)/2)),l.handle.css({height:a.handleHeight-t.handleBoxSize.height,lineHeight:a.handleHeight-t.handleBoxSize.height-2})):l.handle.css({height:e-t.handleBoxSize.height,lineHeight:e-t.handleBoxSize.height-2}),l.main.lineHeight(e))}},"protected":{initDOMTree:function(){var e=this,t=e.opts,a=e.DOMMap={};return e[0].append([a.main=newDiv("_main").append(a.places=newDiv("_places").append([a.left=newDiv("_place _left"),a.right=newDiv("_place _right")])),a.handle=newDiv("_handle")]),t.handleClass&&a.handle.addClass(t.handleClass),e},initEvents:function(){var e=this,t=e.opts,a=e.DOMMap,l=function(){var l=e.text(),i=t.state=!e.state(),n=e.width()-e.boxSize.width,s=t.handleWidth,h={duration:t.animateDuration,timingFunction:"ease-out"};switch(e.styleType()){case"default":a.handle.animateTo({left:i?n-s:0},h),a.places.animateTo({left:i?0:-n},h);break;case"toggle":a.handle.html(i?l[0]:l[1]);case"switch":a.handle.animateTo({left:i?n/2:0},h)}e.updateStyle(),e.emit("change",i)};return e[0].mouse({unselect:!0,down:function(t){return e.enable()?l(t):void 0}}),e}},"public":{styleType:function(e){var t=this,a=t.opts;return void 0===e?a.styleType:(a.styleType!==e&&(t[0].clear(),t[0].removeClass("_"+a.styleType).addClass("_"+(a.styleType=e)),t.initDOMTree(),t.theme(a.theme),t.state(a.state)),t)},theme:function(e){var t=this,a=t.DOMMap;return t.opt("theme",e,function(){e=e.split("-"),"toggle"===t.styleType()?(a.left.className("_place _left _"+e[1]),a.right.className("_place _right _"+e[1]),a.handle.className("_handle _"+e[0])):(a.left.className("_place _left _"+e[0]),a.right.className("_place _right _"+e[1]))})},state:function(e){var t=this,a=t.opts,l=t.DOMMap;if(void 0===e)return a.state;var i=t.text(),n=t.width()-t.boxSize.width,s=a.handleWidth;switch(t.styleType()){case"default":l.places.css("left",e?0:-n),l.handle.css("left",e?n-s:0);break;case"toggle":l.handle.html(e?i[0]:i[1]);case"switch":l.handle.css("left",e?n/2:0)}return t.updateStyle(),a.state!==e&&(a.state=e,t.rendered&&t.emit("change",e)),t},text:function(e){var t=this,a=t.opts,l=t.DOMMap;return void 0===e?a.text:(l.left.html(""),l.handle.html(""),l.right.html(""),isString(e)&&(e=e.split(" ")),1===e.length&&(e[1]=e[0]),"toggle"===a.styleType?l.handle.html(t.state()?e[0]:e[1]):(l.left.html(e[0]),l.right.html(e[1])),a.text=e,t)},updateStyle:function(){var e=this,t=e.theme().split("-"),a="",l="";return e.state()?(a=t[1],l=t[0]):(a=t[0],l=t[1]),e.opts.autoBorder&&e.removeClass("_"+a).addClass("_"+l),e},value:function(e){var t=this,a=t.opts,l=a.valueType;return void 0===e?null===l?a.value:"bool"===l?t.state():~~t.state():(null===l?a.value=e:t.state(Boolean(a.value=e)),t)}},main:function(e,t,a){a.addClass("_"+t.styleType),e.initDOMTree(),e.text(t.text),e.theme(t.theme)},support:{rule:{content:"value"},html:{create:function(e){var t=e.trimHTML(),a=e.value();null!==a&&(this.opts.value=a),t&&this.text(t.retype())}}}});