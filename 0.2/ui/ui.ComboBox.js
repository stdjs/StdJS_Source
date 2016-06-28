/**
    Std UI Kit Library
    http://ui.stdjs.com
	module: ComboBox
*/
Std.ui.module("ComboBoxItem",{b:"Item",e:{defaultClass:"StdUI_ComboBoxItem"}}),Std.ui.module("ComboBox",{b:"widget",e:{level:3,defaultClass:"StdUI_ComboBox",minWidth:40,minHeight:26,maxHeight:26,listMaxHeight:300,listAnimation:!0,items:null,value:null,template:null,editable:!1,valueType:"text",textField:"text",valueField:"value",dataSource:null,suggest:!1},c:"open close select input change focus blur dataSourceMessage",h:{listVisible:!1,currentMode:"",currentFilterItems:null,currentItem:null,selectedItem:null},n:{initHandle:function(){var t=this,e=t.DOMMap;void 0==e.handle&&(e.handle=newDiv("_handle").appendTo(t[0]))},initDataSource:function(){var t=this,e=t.opts;t.dataSource=Std.dataSource(e.dataSource),t.dataSource.on("message",function(e){t.emit("dataSourceMessage",e)}).call("items",{value:e.value},function(e,i){t.append(i),t.call_opts("value",!0)})},initKeyboard:function(){var t=this;t.on("keydown",function(e){var i=t._items,n=i.indexOf(t._currentItem),s=e.which,l=e.keyCode;27===s?t.close():32===s&&!t.editable()&&t.open(),-1!=n&&(38===l?(t.value(--n<0?i._list[i.length-1]:i._list[n]),t.focus()):40===l&&(t.value(++n>=i.length?i._list[0]:i._list[n]),t.focus()))})},initEvents:function(){var t=this,e=!1;t[0].on({mousedown:function(e){1===e.which&&"INPUT"!==e.target.nodeName&&t.toggleList()},focusin:function(i){t.addClass("focused").emit("focus",i),e===!1&&(t.initKeyboard(),t.on("focusout",function(e){t.emit("blur",e)[0].removeClass("focused")}),t.DOMMap.input&&t.DOMMap.input.focus().on("change",function(){t.emit("change",t.value())}),e=!0)}}).mouse({unselect:!0})},initList:function(){var t=this,e=t.DOMMap;void 0===e.list&&(e.list=newDiv("StdUI StdUI_ComboBoxList").appendTo("body").on("mousedown",function(){return!1}).delegate("mouseenter",".StdUI_ComboBoxItem,.StdUI_TemplateItem",function(e){t.itemMouseEnter(this,e)}),t._items.items(function(t,i){i.renderTo(e.list)}))}},g:{render:function(){var t=this,e=t.opts;t.initEvents(),t.call_opts({value:null},!0),e.dataSource&&t.initDataSource()},enable:function(t){var e=this,i=e.DOMMap.input,n="disabled";t===!1?i&&i.attr(n,n):i&&i.removeAttr(n)},height:function(t){var e=this,i=e.DOMMap;t=e.height()-e.boxSize.height-e.boxSize.extraHeight,i.input&&i.input.css({height:t,lineHeight:t}),i.content&&i.content.css({height:t,lineHeight:t})},width:function(t){var e=this,i=e.DOMMap;t=e.width()-e.boxSize.width-e.boxSize.extraWidth,i.input&&i.input.css({width:t-24}),i.content&&i.content.css({width:t-24})},destroy:function(){var t=this;t._currentFilterItems&&(t._currentFilterItems=null),t.clear(),t.DOMMap.list&&t.DOMMap.list.remove(),t.delDocumentEvents()},remove:function(t){var e=this,i=null;(isString(t)||isNumber(t))&&(i=e._items.items(t))&&(i.remove(),e._items.remove(t))}},i:{createItem:function(t){var e=this,i=e.opts,n=null;return isString(t)?n=Std.ui("ComboBoxItem",{text:t,parent:e}):isWidget(t)?n=t.parent(e):isObject(t)&&(n=i.template?Std.ui("TemplateItem",{template:e.template(),data:t,parent:e,textField:i.textField,valueField:i.valueField}):Std.ui(t.ui||"ComboBoxItem",t).parent(e)),n},toggleList:function(){var t=this,e=t.DOMMap;return t.enable()?(1==t._listVisible?t.close():(t.opts.suggest&&e.input&&t.filterList(e.input.value()),t.open()),t):void 0},itemMouseEnter:function(t,e){var i=this,n=t.index(),s=null;return s=isEmpty(i._currentFilterItems)?i._items._list[n]:i._currentFilterItems[n],t.mouse({auto:!1,classStatus:!1,enter:function(){i._selectedItem&&i._selectedItem.removeClass("selected"),i._selectedItem=s.addClass("selected")},click:function(){i.value(s),i.toggleList(),i.focus()}},e),i},addDocumentEvents:function(){var t=this,e=t.DOMMap;return t._documentEvents&&Std.dom(document).off("mousedown",t._documentEvents),Std.dom(document).on("mousedown",t._documentEvents=function(i){e.list&&e.list.contains(i.target)||t.delDocumentEvents().close()}),t},delDocumentEvents:function(){var t=this;return t._documentEvents&&Std.dom(document).off("mousedown",t._documentEvents),t},initInput:function(){var t=this,e=t.opts,i="",n=t.DOMMap;return n.input.on("input keyup",function(){var n=this.value();e.suggest&&n!==i&&(""===n||isEmpty(t.filterList(n))?t.close():t.open()),t.emit("input",i=n)}).on("dblclick",function(){!e.suggest||t._listVisible||isEmpty(t.filterList(this.value()))||t.open(!1)}),t}},j:{textField:function(t){return this.opt("textField",t)},valueField:function(t){return this.opt("valueField",t)},items:function(t,e){var i=this;return i._items.items(t,e)},text:function(t){var e=this,i=e.DOMMap;return void 0===t?i.content.text():(i.content.text(t),e)},select:function(t){var e=this;return(isNumber(t)||isString(t))&&(t=e._items.items(t)),isWidget(t)&&e._currentItem!==t&&(e._currentItem&&e._currentItem.removeClass("selected"),e._currentItem=e._selectedItem=t.addClass("selected"),e.emit("select change",t)),e},template:function(t){var e=this,i=e.opts;return void 0===t?i.template:(isString(t)&&(t=Std.template(t)),t instanceof Std.template&&(i.template=t),e)},value:function(t){var e=this,i=e[e.opts.valueType+"Value"];return e.DOMMap.list||e.initList(),isFunction(i)?i.call(e,t):void 0===t?null:e},reload:function(){var t=this,e=t.opts,i=t.dataSource;return i&&i.call("items",{value:e.value},function(e){t.clear(),t.append(e),t.call_opts("value",!0)}),t},editable:function(t){var e=this,i=e.DOMMap;return e.opt("editable",t,function(){i.input&&i.input.remove(),i.content&&i.content.remove(),""!==e._currentMode&&e.removeClass("_"+e._currentMode),t===!0?(i.input=newDom(e._currentMode="input","_input").appendTo(e[0]),e.initInput()):(e._currentMode="none",i.content=newDiv("_content").appendTo(e[0])),e.addClass("_"+e._currentMode)})},textValue:function(t){var e=this,i=t,n=e.DOMMap,s=e.editable();if(s===!0){if(void 0===t)return n.input.value();isWidget(t)&&(i=t.text()),n.input&&n.input.value(i)}else{if(void 0===t)return e.text();isWidget(t)&&(i="TemplateItem"===t.ui?t.text():t[0].clone().className(t.opts.defaultClass)),n.content&&n.content.html(i)}return e.select(t)},indexValue:function(t){var e=this,i=null,n=t,s=e.DOMMap,l=e.editable();if(void 0===t)return e._currentItem?e._items.indexOf(e._currentItem):null;if(isWidget(t)){if(-1===(n=e._items.indexOf(t)))return e}else isString(n)&&(n=int(n));return(i=e._items._list[n])?(l===!0?s.input&&s.input.value(i.text()):s.content&&s.content.html("TemplateItem"===i.ui?i.text():i[0].clone().className(i.opts.defaultClass)),e.select(n)):e},itemValue:function(t){var e=this,i=null,n=-1,s=e.DOMMap,l=e.editable();if(void 0===t)return e._currentItem?e._currentItem.value():null;if(isWidget(t)){if(-1===(n=e._items.indexOf(t)))return e;i=t}return-1==n&&e._items.items(function(e,s){return s.value()==t?(i=s,n=e,!1):void 0}),null===i?e.select(n):(l===!0?s.input&&s.input.value(i.text()):s.content&&s.content.html("TemplateItem"===i.ui?i.text():i[0].clone().className(i.opts.defaultClass)),e.select(n))},filterList:function(t){var e=this,i=!1,n=[],s=e.DOMMap.dataList;return s||e.initList(),e._items.items(function(s,l){if(Std.dom(l).detach(),"text"in l){var o=l.text();o.has(t)&&(i=!0,n.push(l),e.DOMMap.list.append(l))}}),e._currentFilterItems=n,n},open:function(t){var e=this,i=e.opts,n=e.DOMMap,s=e[0].offset();n.list||e.initList(),n.handle.addClass("_open"),n.list.removeStyle("height").show();var l=n.list.outerHeight(),o=!1,a=0,u=a=s.y+e.height(),r=n.list.boxSize().height;l>i.listMaxHeight&&(l=i.listMaxHeight),s.y+1+e.height()+l>Std.dom(window).height()&&(o=!0,a=s.y,u=a-l,n.list.addClass("_top")),n.list.css({top:a,left:s.x,zIndex:++Std.ui.status.zIndex,outerWidth:e.width()});var c={top:u,height:l-r,opacity:1,transform:"scaleY(1) translateY(0px)"};return t===!1||e._listVisible||i.listAnimation===!1?n.list.css(c):n.list.css({overflow:"hidden",height:0,opacity:0,transform:"scaleY(0) translateY("+(o?"":"-")+(l-r)/2+"px)"}).animateTo(c,{duration:150,timingFunction:"ease-out"},function(){n.list.removeStyle("overflow")}),e._listVisible||(e.emit("open"),e._listVisible=!0),setTimeout(function(){e.addDocumentEvents()},1),e},close:function(t){var e=this,i=e.opts,n=e.DOMMap;if(!n.list||!e._listVisible)return e;var s=n.list.hasClass("_top"),l=n.list.boxSize().height,o=n.list.outerHeight(),a=e[0].offset().y;return n.handle.removeClass("_open"),t===!1||i.listAnimation===!1?(n.list.height(0),n.list.hide()):n.list.css({overflow:"hidden",height:o-l}).animateTo({opacity:0,height:0,top:s?a:a+e.height(),transform:"scaleY(0) translateY("+(s?"":"-")+(o-l)/2+"px)"},{duration:150,timingFunction:"ease-in"},function(){n.list.removeClass("_top").hide()}),null!==e._selectedItem&&e._selectedItem.removeClass("selected"),null!==e._currentItem&&(e._selectedItem=e._currentItem.addClass("selected")),e.delDocumentEvents(),e._listVisible=!1,e.emit("close")},insert:function(t,e){var i=this,n=i.createItem(t),s=i._items,l=i.DOMMap.list;return isWidget(n)&&(l&&(e<s.length?l.insertBefore(n,s._list[e]):l.append(n),n.render()),s.insert(n.parent(i),e)),i},append:Std.func(function(t){var e=this,i=e.createItem(t);isWidget(i)&&(e.DOMMap.list&&i.renderTo(e.DOMMap.list),e._items.push(i.parent(e)))},{each:[isArray]}),clear:function(){var t=this,e=t._items;return e.items(function(t,e){e.remove()}),e.clear(),t}},k:function(t,e){t._items=Std.items(),t.DOMMap={},t.initHandle(),t.editable(e.editable),null!==e.items&&t.append(e.items),null!==e.template&&t.template(e.template)},m:{rule:{children:"append"},html:{nodeName:["DIV"],create:function(t){this.append(t.children(function(t,e){var i={},n=e.attr("std-icon"),s=e.html();return isString(s)&&(i.text=s.trim()),isString(n)&&(i.icon=n),Std.extend(i,Std.options.get(e),3)}))}}}});