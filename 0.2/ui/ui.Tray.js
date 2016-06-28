/**
    Std UI Kit Library
    http://ui.stdjs.com
	module: TrayItem,Tray
*/
Std.ui.module("TrayItem",{b:"widget",e:{tabIndex:null,defaultClass:"StdUI_TrayItem",icon:"",name:"",text:"",popup:null,contextMenu:null},g:{destroy:function(){var t=this,i=t.opts;isWidget(i.contextMenu)&&i.contextMenu.remove()}},j:{name:function(t){return this.opt("title",t,function(){this._tooltipTitle&&this._tooltipTitle.html(t)})},text:function(t){return this.opt("text",t,function(){this._tooltipText&&this._tooltipText.html(t)})},icon:function(t){var i=this;return i.opt("icon",t,function(){i[1].attr("src",t),i._tooltipIcon&&i._tooltipIcon.attr("img",t)})},popup:function(t){var i=this,e=i.opts;return void 0===t?e.popup:(e.popup=!isWidget(t)&&isObject(t)?Std.ui(t.ui||"widget",t):t,i)},contextMenu:function(t){var i=this,e=i.opts;return void 0===t?e.contextMenu:(!isWidget(t)&&isObject(t)&&(t=Std.ui(t.ui||"Menu",t)),isWidget(t)&&t.on("itemPress",function(){t.hide()}),e.contextMenu=t,i)}},k:function(t){t[0].append(t[1]=newDom("img")),t.call_opts({icon:"",name:"",text:"",popup:null,contextMenu:null},!0)},m:{rule:{content:"text"},html:{create:function(t){var i=t.attr("title"),e=t.attr("std-icon"),o=t.trimHTML();isString(i)&&this.text(i),isString(e)&&this.icon(e),isEmpty(o)||this.text(o)}}}}),Std.ui.module("Tray",{b:"widget",c:"itemClick",e:{level:3,spacing:4,iconSize:22,defaultClass:"StdUI_Tray",value:null,tabIndex:null},h:{timer:null,state:!1,iconViewInitialized:!1,iconViewVisibled:!1,contextMenu:null},g:{beforeRender:function(){},height:function(){this.updateHeight()},render:function(){var t=this;t.update(),t.initEvents(),t.initDocEvents()},destroy:function(){var t=this;t._popup&&t._popup.remove(),t._tooltip&&t._tooltip.remove(),t._docEvent&&Std.dom(document).off("mousedown",t._docEvent),t[3]&&t[3].remove(),Std.each(t._items,function(t,i){i.remove()})},remove:function(t){var i=this,e=i._items;if(isNumber(t))t<e.length&&(e[t].remove(),e.remove(t),i.update());else if(isWidget(t)){var o=e.indexOf(t);-1!==o&&(e[o].remove(),e.remove(o),i.update())}}},i:{initDocEvents:function(){var t=this;Std.dom(document).on("mousedown",t._docEvent=function(i){var e=i.target;if(!(t._contextMenu&&t._contextMenu[0].contains(i.target)||(t.hideContextMenu(),t[0].contains(e)||t[3]&&t[3].contains(e)))){if(t._popup){if(t._popup.contains(e))return;t.hidePopup()}if(t._tooltip){if(t._tooltip.contains(e))return;t.hideToolTip()}}})},createPopup:function(){var t=this;return t._popup&&t._popup.remove(),t._popup=newDiv("Tray_Popup").append([t._popupTitle=newDiv("_title"),t._popupMain=newDiv("_main")]).appendTo("body"),t},createToolTip:function(){var t=this,i=t.opts,e=1.5*i.iconSize;return t._tooltip&&t._tooltip.remove(),t._tooltip=newDiv("Tray_ToolTip").append([t._tooltipIcon=newDom("img","_icon").height(e).width(e),newDiv("_main").append([t._tooltipTitle=newDiv("_title"),t._tooltipText=newDiv("_text")])]).appendTo("body"),t},trayItemEvents:function(t,i){var e=this;clearTimeout(e._timer),e._state===!1?(e._state=!0,e._timer=setTimeout(function(){e.showToolTip(t)},800)):e.showToolTip(t),t[0].mouse({auto:!1,leave:function(){clearTimeout(e._timer),e._timer=setTimeout(function(){e.hideToolTip()},100)},down:function(){e._state=!1,clearTimeout(e._timer)},click:function(i){t.opts.popup?e.showPopup(t):e._popup&&e._popup.visible()&&e.hidePopup(),e.emit("itemClick",[i,t],!0)}},i)},initEvents:function(){var t=this;return t[0].on("mouseleave",function(){t._state=!1}).on("contextmenu",function(t){t.preventDefault()}).on("mouseenter",">.StdUI_TrayItem",function(i){return t.trayItemEvents(this.ui(),i)}).on("contextmenu",".StdUI_TrayItem",function(i){t.showContextMenu(this.ui(),i)}),t[2].on("click",function(){t._iconViewVisibled?t.hideIconView():t.showIconView()}),t},initIconView:function(){var t=this;return t._iconViewInitialized||(t[3]=newDiv("StdUI_Tray-iconView").appendTo("body"),t._iconViewInitialized=!0),t[3].on("mouseleave",function(){t._state=!1}).on("contextmenu",function(t){t.preventDefault()}).on("mouseenter",">.StdUI_TrayItem",function(i){return t.trayItemEvents(this.ui(),i)}).on("contextmenu",".StdUI_TrayItem",function(i){t.showContextMenu(this.ui(),i)}),t},updateHeight:function(){var t=this,i=t.height()-t.boxSize.height-t.boxSize.extraHeight;return t[2].marginTop((i-t[2].height())/2),t},update:function(){var t=this,i=t.opts,e=t.width()-t.boxSize.width-t.boxSize.extraWidth,o=t.height()-t.boxSize.height-t.boxSize.extraHeight,n=t.iconSize(),p=Math.floor(o/(n+4)),u=Math.floor(e/(n+4)),r=0;return t._items.length<=u*p?(t[2].hide(),t[1].removeStyle("width")):(t[2].show(),u=Math.floor((e-=t[2].width())/(n+4)),t[1].width(e)),Std.each(t._items,function(e,o){return e>=u*p?(t._iconViewInitialized||t.initIconView(),void o[0].css("marginRight",i.spacing).appendTo(t[3])):(e+1%u===0&&r++,r>0&&p>r&&o[0].css("marginBottom",i.spacing),o[0].show().css("marginRight",i.spacing),o.appendTo(t[1]),void(o.rendered||o.render()))}),t[1].css("marginTop",(o-t[1].height())/2),t.updateIconViewHeight()},updateIconViewHeight:function(){var t=this;if(t[3]&&t[3].visible()){var i=t[0].offset(),e=t[3].removeStyle("height").outerHeight();0==t[3].height()?t.hideIconView():t[3].animate("end").animate({to:{top:i.y-e,outerHeight:e}},100)}}},j:{showPopup:function(t){var i=this,e=i[0].offset(),o=t.popup();i._popup||i.createPopup(),isWidget(o)?(i._popupMain.clear(),i._popupMain.append(o),o.rendered||o.render()):(isString(o)||isNumber(o))&&i._popupMain.html(o),i._popupTitle.html(t.name()),i._popup.show();var n=e.x+(i.width()-i._popup.outerWidth())/2,p=e.y-i._popup.offsetHeight()-5;return 0>n?n=0:n+i._popup.offsetWidth()>Std.dom(window).width()&&(n=Std.dom(window).width()-i._popup.offsetWidth()),i._popup.css({top:p,left:n,zIndex:++Std.ui.status.zIndex}),i.hideToolTip().hideIconView()},hidePopup:function(){var t=this;return t._popup&&t._popup.hide(),t},updateToolTip:function(t,i,e){var o=this;return o._tooltipIcon.attr("src",t),o._tooltipTitle.html(i),o._tooltipText.html(e),o},showToolTip:function(t){var i=this,e=t[0].offset(),o=t.icon(),n=t.name(),p=t.text();i._tooltip?(i.updateToolTip(o,n,p),i._tooltip.show()):(i.createToolTip(),i.updateToolTip(o,n,p),i._tooltip.css({top:e.y-i._tooltip.offsetHeight()-5,left:0,visibility:"hidden"}));var u=e.x-(i._tooltip.offsetWidth()-t.width())/2,r=e.y-i._tooltip.offsetHeight()-5;return 0>u?u=0:u+i._tooltip.offsetWidth()>Std.dom(window).width()&&(u=Std.dom(window).width()-i._tooltip.offsetWidth()),0>r&&(r=e.y+i.height()),"hidden"===i._tooltip.css("visibility")&&i._tooltip.removeStyle("visibility").css("left",u),i._tooltip.css("zIndex",++Std.ui.status.zIndex).animate("end").animate({to:{top:r,left:u}},100),i},hideToolTip:function(){var t=this;return t._tooltip&&t._tooltip.hide(),t},showIconView:function(){var t=this,i=t[0].offset();t._iconViewInitialized||t.initIconView(),Std.each(t._items,function(t,i){!i.rendered&&i.render()}),t[3].removeStyle("height").show().css({outerWidth:t.width(),top:i.y-t[3].boxSize().height,left:i.x});var e=t[3].outerHeight();return t[2].addClass("_visibled"),t[3].height(0).animate("end").animate({to:{top:i.y-e,outerHeight:e}},100),t._iconViewVisibled=!0,t.hidePopup()},hideIconView:function(){var t=this;return t[2]&&t[3]&&(t[2].removeClass("_visibled"),t[3].animate("end").animate({to:{top:t[0].offset().y-t[3].boxSize().height,height:0}},100,function(){t[3].hide()}),t._iconViewVisibled=!1),t},showContextMenu:function(t,i){var e=this,o=t.contextMenu();if(o){o.rendered||(o[0].css("position","absolute"),o.renderTo("body")),o.show();var n=i.pageX,p=i.pageY-o.height();n+o.width()>Std.dom(window).width()&&(n=Std.dom(window).width()-o.width()),0>p&&(p=i.pageY),e._contextMenu=o.move(n,p),e.hideToolTip()}},hideContextMenu:function(){var t=this;return t._contextMenu&&t._contextMenu.hide(),t},iconSize:function(t){var i=this;return i.opt("iconSize",t,function(){Std.each(i._items,function(e,o){i[2].height(t).width(t),o.width(t).height(t)}),i.updateHeight()})},add:function(t){var i=this,e=Std.ui("TrayItem",t),o=i.iconSize();return e.parent(i).width(o).height(o),i._items.push(e),i.rendered&&e.render(),e},append:Std.func(function(t){{var i=this;i.add(t)}i.rendered&&i.update()},{each:[isArray]})},k:function(t,i,e){t._items=[],e.append([t[2]=newDiv("_handle").css({width:i.iconSize,height:i.iconSize}),t[1]=newDiv("_icons")]),i.items&&t.append(i.items)},m:{rule:{children:"append"},html:{create:function(t){this.append(t.children(function(t,i){var e={},o=i.attr("title"),n=i.attr("std-icon"),p=i.html().trim();return isString(o)&&(e.text=o),isString(n)&&(e.icon=o),isEmpty(p)||(e.text=o),Std.extend(e,Std.options.get(i),3)}))}}}});