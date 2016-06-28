/**
    Std UI Kit Library
    http://ui.stdjs.com
	module: ColorPicker
	
	fixme:
	A: input change
*/
Std.ui.module("ColorPicker",{b:"widget",c:"change",e:{level:3,defaultClass:"StdUI_ColorPicker",fixedWidth:!0,fixedHeight:!0,minWidth:100,minHeight:100,paletteSize:150,value:"#000",palette:!0,colors:!0,colorBar:!0,attributes:!0},h:{rollY:0,alphaY:0,paletteX:0,paletteY:0},g:{render:function(){var e=this,t=e.opts;e.value(t.value)},enable:function(e){var t=this;e?t[0].styleBack("opacity"):t[0].styleTo("opacity",.6)}},i:{initAttributes:function(){var e=this,t=e.DOMMap;return t.values.append(newDiv("_fields _rgb").append(Std.each("R G B A",function(e,o){return newDiv("_field").append([newDom("span","_label").html(o),t[o]=newDom("input","_"+o)])},!0))),t.values.append(newDiv("_fields").append(Std.each("H S V",function(e,o){return newDiv("_field").append([newDom("span","_label").html(o),t[o]=newDom("input","_"+o)])},!0))),t.values.append(t.HEX=newDom("input","_HEX")),t.values.appendTo(e).delegate("focusout","input",function(){var o=Std.dom(this),n=o.className().substr(1);switch(n){case"R":case"G":case"B":e.rgb(t.R.value(),t.G.value(),t.B.value());break;case"H":case"S":case"V":e.hsv(t.H.value(),t.S.value(),t.V.value());break;case"HEX":e.hex(t.HEX.value())}}),e},initColors:function(){var e=this,t=e.opts,o=e.DOMMap,n=null,a=null,r=Std.dom.fragment(),l=document.createElement("div");if(l.className="_color",t.colors===!0?n=Std.convert.colors:isObject(t.colors)?n=t.colors:isString(t.colors)&&(n=t.colors.split(",")),isArray(n))for(var i=0,s=n.length;s>i;i++){var p=Std.dom.clone(l);p.style.backgroundColor=n[i],r.appendChild(p)}else if(isObject(n))for(var u in n){var p=Std.dom.clone(l);p.style.backgroundColor=n[u],r.appendChild(p)}return t.palette&&o.colors.marginLeft(4),o.colors.append(r).appendTo(e).delegate("click","._color",function(){e.enable()&&(null!==a&&a.removeClass("selected"),e.hex(Std.convert.rgb2hex(Std.convert.color((a=Std.dom(this).addClass("selected")).css("background-color")))))}),e},initPalette:function(){var e=this,t=e.DOMMap,o=null,n=Std.dom(e[0].document()),a=function(t){e.move1(t.pageX-o.x,t.pageY-o.y).updateUI()};return t.palettes.append([t.palette.append(t.position1.append(newDiv("inner"))),t.roll.append(t.position2),t.alpha.append(t.position3)]).appendTo(e),t.palette.mouse({unselect:!0,down:function(r){e.enable()&&(o=t.palette.offset(),t.position1.css("visibility","hidden"),e.move1(r.pageX-o.x,r.pageY-o.y).updateUI(),n.on("mousemove",a))},up:function(){n.off({mousemove:a}),t.position1.removeStyle("visibility")}}),e.initRoll()},initRoll:function(){var e=this,t=e.DOMMap,o=null,n=Std.dom(e[0].document()),a=function(t){e.move2(t.pageY-o).updateUI()},r=function(t){e.move3(t.pageY-o).updateUI()},l=function(){n.off({mouseup:l,mousemove:a})},i=function(){n.off({mouseup:i,mousemove:r})};return t.alpha.on("mousedown",function(t){return e.enable()?(o=this.offset().y,n.on({mouseup:i,mousemove:r}).once("selectstart",function(){return!1}),e.move3(t.pageY-o).updateUI(),!1):void 0}),t.roll.on("mousedown",function(t){return e.enable()?(o=this.offset().y,n.on({mouseup:l,mousemove:a}).once("selectstart",function(){return!1}),e.move2(t.pageY-o).updateUI(),!1):void 0}),e},initColorBar:function(){var e=this,t=e.DOMMap;return e[0].append(t.colorBar=newDiv("_colorBar").append(t.color=newDiv("_color"))),e},move1:function(e,t){var o=this,n=o.opts.paletteSize;return 0>e?e=0:e>n&&(e=n),0>t?t=0:t>n&&(t=n),o.DOMMap.position1.css({left:(o._paletteX=e)-7,top:(o._paletteY=t)-7}),o},move2:function(e){var t=this,o=t.opts.paletteSize;return 0>e?e=0:e>o&&(e=o),t.DOMMap.position2.css("top",(t._rollY=e)-4),t},move3:function(e){var t=this,o=t.DOMMap,n=t.opts.paletteSize;if(0>e?e=0:e>n&&(e=n),o.position3.css("top",(t._alphaY=e)-4),o.color){var a=(1-Std.convert.percent(t._alphaY,t.opts.paletteSize)/100)["float"](2);o.color.opacity(a),o.A&&o.A.value(a)}return t},updateUI:function(){var e=this,t=e.hsv(),o=Std.convert.hsv2rgb(t.h,t.s,t.v),n=Std.convert.rgb2hex(o.r,o.g,o.b),a=(1-Std.convert.percent(e._alphaY,e.opts.paletteSize)/100)["float"](2),r=e.DOMMap;return e.opts.attributes&&(r.R.value(o.r),r.G.value(o.g),r.B.value(o.b),r.A.value(a),r.H.value(t.h),r.S.value(t.s),r.V.value(t.v),r.HEX.value(n)),r.alpha&&r.alpha.css("background-color",n),r.colorBar&&r.color.css("background-color",n),r.palette&&r.palette.css("background-color",Std.convert.rgb2hex(Std.convert.color("hsv("+t.h+",100,100)"))),e.emit("change",n)}},j:{value:function(e){var t=this;return void 0===e?t.hex():(Std.is.color(e)&&isString(e)&&(e=Std.convert.color(e),t.rgb(e.r,e.g,e.b)),t)},rgb:function(e,t,o){var n=this;if(void 0===e)return Std.convert.hsv2rgb(n.hsv());var a=Std.convert.rgb2hsv(e,t,o);return n.hsv(a.h,a.s,a.v)},hex:function(e){var t=this;if(void 0===e)return Std.convert.rgb2hex(t.rgb());var o=Std.convert.hex2rgb(e);return t.rgb(o.r,o.g,o.b)},hsv:function(e,t,o){var n=this,a=n.opts.paletteSize;return void 0===e?{h:int((a-n._rollY)*(360/a)),s:int(n._paletteX*(100/a)),v:int((a-n._paletteY)*(100/a))}:(n.move1(n._paletteX=t/(100/a),n._paletteY=a-o/(100/a)),n.move2(n._rollY=a-e/(360/a)),n.updateUI())}},k:function(e,t){var o=e.DOMMap={};Std.each("client palettes palette roll alpha position1 position2 position3 values colors",function(e,t){o[t]=newDiv("_"+t)}),t.palette&&e.initPalette(),t.colors&&e.initColors(),t.attributes&&e.initAttributes(),t.colorBar&&e.initColorBar()},m:{rule:{content:"value"},html:{nodeName:["DIV"],create:function(e){this.value(e.html().trim())}}}});