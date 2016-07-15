/**
    Std UI Kit Library
    http://ui.stdjs.com
	module: Tree
*/
Std.ui.module("Tree",function(){var e=Std.module({e:{tree:null,type:null,icon:null,text:"",href:"",target:"",className:"",value:null,items:null,parent:null,action:null,selected:!1,editable:!0,checked:!1,expanded:!1,checkable:!1,deferRender:!0,plugins:null},h:{loaded:!1},i:{createLines:function(){var e=this.DOMMap;return this[0].append([e.HLine=newDom("i","_line _horizontal"),e.VLine=newDom("i","_line _vertical")]),this},createCheckBox:function(){var e=this,t=e.DOMMap,n=t.checkbox=newDom("i","_checkbox").prependTo(t.anchor);return e.checked()&&n.addClass("checked"),e},createNodeIcon:function(){var e=this,t=e.opts,n=t.icon,i=e.DOMMap;if(!isEmpty(n)&&!i.icon){var r=i.icon=newDom("i","_icon");i.text?r.insertBefore(i.text):r.appendTo(i.anchor),Std.icon.update(r,n,{width:null,height:null})}return e},createChildNode:function(t){var n=this,i=n.opts,r=n.tree(),o=t.type;return!t||"checkable"in t||(t.checkable=r.checkable()),o&&o in r._types&&(t=r.makeNodeOption(o,t)),t.parent=n,t.checked=i.checked,t.checkable=i.checkable,t.expanded=r.opts.expanded,t.deferRender=i.deferRender,new e(r,t)},createChildNodes:function(e,t){var n=this,i=n.opts.items,r=n.DOMMap,o=function(e){n.append(e),n.tree().emit("itemDataLoad",[n,e],!0),r.hand.removeClass("_loading"),t&&t.call(n,e)};return n._loaded||(r.ul=newDom("ul","_container_ul").appendTo(n[0]),n._loaded=!0,e!==!0&&r.ul.hide(),isArray(i)?(n.append(i),t&&t.call(n,i)):isFunction(i)?(r.hand.addClass("_loading"),i.call(n,o)):(isString(i)||isObject(i))&&(r.hand.addClass("_loading"),Std.ajax.json(i).success(o)),n.opts.items=null),n}},j:{type:function(e){return this.opt("type",e)},value:function(e){return this.opt("value",e)},parent:function(e){return this.opt("parent",e)},checkable:function(e){return this.opt("checkable",e)},editable:function(e){return this.opt("editable",e)},index:function(){return this.parent().indexOf(this)},expanded:function(e,t){return this.opt("expanded",e,function(){this.expand(e,t||!1)})},expandAll:function(){var e=this.expanded(!0,!1);return e._items.items(function(e,t){t.expandAll()}),e},collapseAll:function(){var e=this.expanded(!1,!1);return e._items.items(function(e,t){t.collapseAll()}),e},parentOf:function(e){for(;e=e.parent();)if(e===this)return!0;return!1},text:function(e){return this.opt("text",e,function(){this.DOMMap.text.text(e)})},icon:function(e){var t=this,n=t.DOMMap;return t.opt("icon",e,function(){n.icon?Std.icon.update(n.icon,e,{width:null,height:null}):t.createNodeIcon()})},target:function(e){return this.opt("target",e,function(){this.DOMMap.anchor.attr("target",e)})},href:function(e){return this.opt("href",e,function(){isEmpty(e)?this[0].removeAttr("href"):this.DOMMap.anchor.attr("href",e)})},count:function(){var e=this,t=e.opts;return e._loaded?e._items.length:isArray(t.items)?t.items.length:0},indexOf:function(e,t){var n=this,i=n.opts;return!n._loaded&&i.items&&n.createChildNodes(),n._items.indexOf(e,t)},items:function(e,t){var n=this,i=n.opts;return!n._loaded&&i.items&&n.createChildNodes(),n._items.items(e,t)},path:function(t){var n=this,i=[];do n instanceof e&&i.push("text"===t?n.text():n.index());while(n=n.parent());return i.reverse().join("/")},plugin:Std.func(function(e,t){var n=this,i=n[0];return void 0===t?i.plugin(e):void i.plugin(e,t)},{each:[isObject]}),removePlugin:Std.func(function(e){var t=this;return t[0].removePlugin(e),t}),tree:function(e){var t=this;return t.opt("tree",e,function(){e.opts.lines?t.DOMMap.VLine||t.createLines():t.DOMMap.VLine&&(t.DOMMap.VLine.remove(),t.DOMMap.HLine.remove()),t._items.items(function(t,n){n.tree(e)})})},update:function(){var e=this,t=e.opts,n="_container_li "+t.className;return 0===e._items.length&&isEmpty(t.items)?n+=" _empty":t.expanded&&(e._loaded||e.createChildNodes(),n+=" _expanded"),e[0].className(n),e},selected:function(e){var t=this,n=t.opts,i=t.tree();return t.opt("selected",e,function(){var r=i.wholeRow()?t.DOMMap.node:t.DOMMap.anchor;if(r.toggleClass("selected",e),e===!0?i._selectedItems.push(t):i.clearSelected(t),e===!0&&n.action){var o=Std.action(n.action);o&&o.call(t)}i.emit("itemSelected",[t,e],!0)})},checked:function(e){var t=this,n=t.opts,i=t.tree();return t.opt("checked",e,function(){!t._loaded&&isArray(n.items)&&t.createChildNodes(),"checkedItems"===i.selectionMode()&&t.selected(e),e===!0?i._checkedItems.push(t):i.clearChecked(t),t.DOMMap.checkbox&&t.DOMMap.checkbox.toggleClass("checked",e),t._items.items(function(t,n){n.checked(e)}),i.emit("itemChecked",e)})},insertTo:function(e,t){var n=this,i=n.opts,r=n.tree().selectionMode();return(i.selected||i.checked&&"checkedItems"===r)&&n.selected(!0),void 0===t||-1===t?e.append(n[0]):isNumber(t)&&e.insert(n[0],t),n.update()},insertBefore:function(e,t){var n=this,i=-1;return void 0===t?e.parent().insertBefore(n,e):-1!==(i=n.indexOf(t))&&n.insert(e,i),n},insertAfter:function(e,t){var n=this,i=-1;return void 0===t?e.parent().insertAfter(n,e):-1!==(i=n.indexOf(t))&&n.insert(e,i+1),n},insert:function(t,n){var i=this,r=i.opts,o=i.DOMMap;if((isString(t)||isNumber(t))&&(t={text:t}),i._loaded){if(t instanceof e)if(t.parent()===i){var a=t.index();i._items.remove(a),isNumber(n)&&n>a&&n--}else t.opts.tree!==r.tree&&t.tree(r.tree),t.parent()._items.remove(t.index()),t.parent().update(),t.parent(i);else t=i.createChildNode(t);t.opts.name?i._items.insert(t.opts.name,t,n):i._items.insert(t,n),t.insertTo(o.ul,n)}else null===r.items&&(r.items=[]),isArray(r.items)&&r.items.insert(t,n);return i.update()},append:function(t){var n=this,i=n.opts,r=n.DOMMap,o=function(o){return n._loaded?((isString(t)||isNumber(t))&&(t={text:t}),o instanceof e?(t.opts.tree!==i.tree&&t.tree(i.tree),o.parent()._items.remove(o.index()),o.parent().update(),o.parent(n)):o=n.createChildNode(o),o.opts.name?n._items.append(o.opts.name,o):n._items.push(o),void o.insertTo(r.ul)):(null===i.items&&(i.items=[]),void(isArray(i.items)&&i.items.push(t)))};if(isString(t)||isNumber(t))o({text:t});else if(isArray(t))for(var a=0,s=t.length;s>a;a++)o(t[a]);else t&&o(t);return n.update()},expand:function(e,t){var n=this,i=n.opts,r=n.tree(),o=n.DOMMap;if(e===!0&&!n._loaded)return n.createChildNodes(null,function(){n.expand(e,t)});if(0===n._items.length)return n;if(n[0].toggleClass("_expanded",i.expanded=e),t===!1)return o.ul.visible(e),n;var a=o.ul.show().offsetHeight(),s=o.ul.css("overflow","hidden").width(),c=r.height()-n[0].position().y,d=0;return c>a&&(c=a),(d=c/3)<80&&(d=100),e===!0?o.ul.height(0).width(s).animateTo({height:c},{duration:d,timingFunction:"ease-out"},function(){o.ul.height(a).removeStyle("overflow width height")}):o.ul.width(o.ul.width()).height(c).animateTo({height:0},{duration:d,timingFunction:"ease-in"},function(){o.ul.removeStyle("overflow width height").hide()}),n},destroy:function(){var e=this,t=e.opts;return t.selected&&t.tree.clearSelected(e),t.checked&&t.tree.clearChecked(e),e._items.length>0&&(e._items.items(function(e,t){t.destroy()}),e._items.clear()),e[0].remove(),e},remove:function(e){var t=this,n=t.opts,i=null;return void 0===e?t.destroy():isNumber(e)?(!t._loaded&&isArray(n.items)?n.items.remove(e):e<t._items.length&&(i=t._items._list[e],t._items.remove(e)),t.update()):isString(e)&&(!t._loaded&&isArray(n.items)?Std.each(n.items,function(t,i){return i.name===e?n.items.remove(t):void 0}):(i=t._items.items(e))&&t._items.remove(e),t.update()),null!==i&&(n.tree.rendered&&n.tree.emit("itemRemove",i),i.destroy()),t}},k:function(e,t){{var n=this,i=n.init_opts(t),r=n.DOMMap={};r.node=newDiv("_node").append([r.hand=newDom("i","_hand"),r.anchor=newDom("a","_anchor")]).appendTo(n[0]=newDom("li","_container_li "+i.className+(isEmpty(i.items)?" _empty":"")).data("node",n))}if(i.action){var o=Std.action(i.action);o&&o.bind(this)}i.tree=e,i.checkable&&n.createCheckBox(),n.createNodeIcon(),i.color&&r.anchor.color(i.color),i.href&&n.href(i.href),i.target&&n.target(i.target),i.text&&r.anchor.append(r.text=newDom("span").html(i.text)),n._items=Std.items(),e.opts.lines&&n.createLines(),!i.items||i.deferRender&&!i.expanded||n.createChildNodes(i.expanded),i.plugins&&n.plugin(i.plugins)}});return{b:"widget",c:"clear selectionModeChange itemDrop dataSourceMessage itemClick itemDblClick itemRename itemRemove itemChecked itemSelected itemDataLoad",e:{defaultClass:"StdUI_Tree",level:4,items:null,lines:!1,iconWidth:"auto",iconHeight:"auto",expanded:!1,checkable:!1,editable:!1,droppable:!1,deferRender:!0,wholeRow:!1,theme:"default",itemHeight:24,itemCursor:"default",itemEditMode:"dblclick",dataSource:null,itemContextMenu:null,selectionMode:"items"},n:{initItemContextMenu:function(){var e=this,t=e.opts,n=t.itemContextMenu,i={handle:t.wholeRow?"li._container_li > ._node":"li._container_li > ._node > a._anchor"};isArray(n)?i.items=n:isObject(n)&&Std.extend(i,n),e[0].plugin("contextMenu",i)},initKeyboardEvents:function(){var e=this;e[0].on("keydown",function(t){if(113===t.keyCode&&e.editable()){var n=e._selectedItems;!isEmpty(n)}})},initCheckboxEvents:function(){var e=this;e[0].on("mouseenter","._container_li > ._node > a._anchor > i._checkbox",e._checkboxEvents=function(t){var n=this.parent("li"),i=n.data("node");e.enable()&&this.mouse({auto:!1,click:function(){i.checked(!i.checked())},dblclick:function(e){e.stopPropagation()}},t)})},initDataSource:function(){var e=this,t=e.opts,n=e.dataSource=Std.dataSource(t.dataSource);n.on("message",function(t){e.emit("dataSourceMessage",t)}).call("items",{value:t.value},function(t,n){e.append(n)}),e.on({itemRename:function(e,t){n.call("itemRename",{item:e,text:t,value:e.value()})},itemRemove:function(e){n.call("itemRemove",{item:e,value:e.value()})},itemDrop:function(e){n.call("itemDrop",{item:e,index:e.index(),value:e.value()})}})},initEvents:function(){var e=this,t=e.opts,n=function(n,i,r){e.enable()&&n.mouse({auto:!1,click:function(n){e.editable()&&i.editable()&&t.itemEditMode.split(" ").has("click")&&e.editNode(i),e.emit("itemClick",[i,n],!0)},dblclick:function(n){e.editable()&&i.editable()&&t.itemEditMode.split(" ").has("dblclick")?e.editNode(i):i.expand(!i.expanded()),e.emit("itemDblClick",[i,n],!0)},down:function(t){var n=e.selectionMode(),r=i.selected();"item"==n?e._selectedItems[0]!==i&&(e.clearSelected(),i.selected(!0)):"items"==n&&(t.ctrlKey?i.selected(!r):r&&1===e._selectedItems.length&&e._selectedItems[0]===i||(e.clearSelected(),i.selected(!r)))}},r)};e[0].unselect(!0).on("dragstart",Std.func(!1)).on("mouseenter","i._hand",function(t){var n=this.parent("li"),i=n.data("node");e.enable()&&this.mouse({auto:!1,down:function(e){e.stopPropagation()},click:function(){i.expand(!i.expanded())}},t)}).on("mouseenter","li._container_li > ._node",function(e){t.wholeRow&&n(this,this.parent("li").data("node"),e)}).on("mouseenter","li._container_li > ._node > a._anchor",function(e){t.wholeRow||n(this,this.parent("li").data("node"),e)})}},g:{render:function(){var e=this,t=e.opts;t.checkable&&e.initCheckboxEvents(),t.droppable&&e.initDropEvents(),e.updateStyle(),e.initEvents(),e.initKeyboardEvents(),t.dataSource&&e.initDataSource()},destroy:function(){this._items.clear(),this._CSSStyle.remove(),this._checkedItems.clear(),this._selectedItems.clear()},remove:function(e){var t=this,n=null;void 0!==e&&(n=t._items.items(e))&&(t._items.remove(e),t.rendered&&t.emit("itemRemove",n),n.destroy())}},i:{update:function(){},wholeRow:function(e){return this.opt("wholeRow",e)},editNode:function(e){var t=this;return t.rendered&&e.DOMMap.text.editText({changeText:!1,apply:function(n,i){n!==i&&(e.text(n),t.emit("itemRename",[e,n,i],!0))}}),t},makeNodeOption:function(e,t){var n=this,i=n._types[e];for(var r in i)r in t||(t[r]=i[r]);return t},createChildNode:function(t){var n=this,i=n.opts,r=t.type;return r&&r in n._types&&(t=n.makeNodeOption(r,t)),t.parent=n,t.expanded=i.expanded,t.checkable=i.checkable,t.deferRender=i.deferRender,new e(n,t)},updateStyle:function(){var e=this,t=e.opts,n={},i=e.itemHeight()-2,r="auto"===t.iconWidth?i:t.iconWidth,o="auto"===t.iconHeight?i:t.iconHeight,a={"ul > li._container_li":{marginLeft:0},"ul > li._container_li:first-child":{">":{"i._line._vertical":{top:(i+2)/2+"px"}}},"ul > li._container_li:last-child":{">":{"i._line._vertical":{height:(i+2)/2+"px"}}," ":{"li._container_li:last-child > i._line._vertical":{height:(i+2)/2+"px"}}}},s={"input._input":{height:i+"px",lineHeight:i+"px"},"i._line._horizontal":{top:(i+2)/2-1+"px",left:(i+2)/2+"px",width:(i+2)/2+1+"px"},"i._line._vertical":{top:0,left:(i+2)/2-1+"px",height:"100%"},"i._checkbox":{margin:(i-16)/2+"px"},"i._hand":{margin:(i-12)/2+"px"},"i._icon":{width:r+"px",height:r+"px",marginTop:(i-o)/2+"px"},"li._container_li":{marginLeft:i+"px"},"a._anchor":{cursor:t.itemCursor,height:i+"px",lineHeight:i+"px"}};return n["."+e._identifier]={">":a," ":s},e._CSSStyle.clear().append(n),e},initDropEvents:function(){var e=this,t=null,n=null,i=!1,r=null,o=null,a=null,s=!1,c=0,d=null,l=function(e,t){d.css("top","before"===t?e.offset().y-1:e.offset().y+(c-3))},u=function(e,t){e.className("StdUI_Tree_Helper _"+((n=t)?" _"+t:""))},h=function(e){var i="",r=e.pageY-t;"in"!==n&&r>.35*c&&.65*c>r||s?i="in":"before"!==n&&.35*c>r?l(e.containment,i="before"):"after"!==n&&r>.65*c&&l(e.containment,i="after"),""!==i&&n!==i&&("in"!==i?(a[0].removeClass("_dropin"),d.css({left:e.containment.offset().x+a.DOMMap.anchor.position().x,width:a.DOMMap.anchor.width()}).show()):(d.hide(),a[0].addClass("_dropin")),u(e.helper,i))};return e[0].plugin("drop",{items:"li._container_li > ._node > ._anchor",opacity:.9,forceHelperSize:!1,check:function(){return e.enable()}}).helper("rect").helperClass("StdUI_Tree_Helper").accept(".StdUI_Tree,.StdUI_Tree li._container_li").on({move:function(e){i===!0&&r.dom!==e.containment.dom&&h(e)},start:function(t){c=e.itemHeight()+2,d=newDiv("StdUI_Tree_PositionTips").appendTo("body"),t.helper.html((o=(r=t.self.parent("li")).data("node")).text())},leave:function(e){d.visible(i=!1),a[0].removeClass("_dropin"),a=null,u(e.helper)},stop:function(){i=!1,d.remove(),a&&a[0].removeClass("_dropin")},enter:function(e){if(t=e.containment.offset().y,s=e.containment.not("._container_li"))a=e.containment.ui();else if(o.parentOf(a=e.containment.data("node")))return;(!r||r.not(e.containment))&&(i=!0,r&&h(e))},drop:function(t){i!==!1&&a&&(i&&o.tree()!==(s?a:a.tree())&&e.clearSelected(o).clearChecked(o),"in"===n||s?(a._loaded||s||a.createChildNodes(!1),a.append(o).update()):"before"==n?o.insertBefore(a):"after"===n&&o.insertAfter(a),e.emit("itemDrop",[o,t],!0))}}),e}},j:{count:function(){return this._items.length},selectedItem:function(){return this._selectedItems[0]||null},selectedItems:function(){return Array.from(this._selectedItems)},checkedItem:function(){return this._checkedItems[0]||null},checkedItems:function(){return Array.from(this._checkedItems)},selectionMode:function(e){return this.opt("selectionMode",e,function(){this.emit("selectionModeChange",e)})},editable:function(e){return this.opt("editable",e)},itemEditMode:function(e){return this.opt("itemEditMode",e)},itemHeight:function(e){return this.opt("itemHeight",e,function(){this.rendered&&this.update()})},itemContextMenu:function(e){return this.opt("itemContextMenu",e,function(){this.initItemContextMenu()})},indexOf:function(e,t){return this._items.indexOf(e,t)},items:function(e,t){var n=this;return n._items.items(e,t)},checkable:function(e){return this.opt("checkable",e,function(){e===!0&&this.initCheckboxEvents()})},expandAll:function(){return this.items(function(e,t){t.expandAll()}),this},collapseAll:function(){return this.items(function(e,t){t.collapseAll()}),this},parentOf:function(e){for(;e=e.parent();)if(e===this)return!0;return!1},types:Std.func(function(e,t){var n=this,i=n._types;return isString(e)&&void 0===t?i[e]:void(i[e]=Std.extend({},t))},{each:[isArray,isObject]}),insertBefore:function(e,t){var n=this,i=n.indexOf(t);return-1!==i&&n.insert(e,i),n},insertAfter:function(e,t){var n=this,i=n.indexOf(t);return-1!==i&&n.insert(e,i+1),n},insert:function(t,n){var i=this;if((isString(t)||isNumber(t))&&(t={text:t}),t instanceof e)if(t.parent()===i){var r=t.index();i._items.remove(r),isNumber(n)&&n>r&&n--}else t.opts.tree!==i&&t.tree(i),t.parent()._items.remove(t.index()),t.parent().update(),t.parent(i);else t=i.createChildNode(t);return t.opts.name?i._items.insert(t.opts.name,t,n):i._items.insert(t,n),t.insertTo(i[1],n),i},append:Std.func(function(t){var n=this;(isString(t)||isNumber(t))&&(t={text:t}),t&&(t instanceof e?(t.opts.tree!==n&&t.tree(n),t.parent()._items.remove(t.index()),t.parent().update(),t.parent(n)):t=n.createChildNode(t),t.opts.name?n._items.append(t.opts.name,t):n._items.push(t),t.insertTo(n[1]))},{each:[isArray]}),clearSelected:function(t){var n=this,i=n.opts,r=function(e){e.opts.selected=!1,e.DOMMap[i.wholeRow?"node":"anchor"].removeClass("selected")};return void 0===t?(Std.each(n._selectedItems,function(e,t){r(t)}),n._selectedItems.clear()):t instanceof e&&(r(t),n._selectedItems.remove(n._selectedItems.indexOf(t))),n},clearChecked:function(t){var n=this,i=function(e){e.opts.checked&&(e.opts.checked=!1,e.DOMMap.checkbox.removeClass("checked"))};return void 0===t?(Std.each(n._checkedItems,function(e,t){i(t)}),n._checkedItems.clear()):t instanceof e&&(i(t),n._checkedItems.remove(n._checkedItems.indexOf(t))),n},reload:function(){var e=this,t=e.opts,n=t.dataSource;return n&&n.read("items",{value:t.value},function(t,n){e.clear(),e.append(n)}),e},find:function(e){var t=function(n){var i=e.type,r=n.opts;return"name"!==i&&"value"!==i&&"text"!==i&&"href"!==i||r[i]!==e.data?n.items(function(e,n){return t(n)})||void 0:n},n=function(t,i){return t.items(function(t,r){return r.opts.text===e[i]?i+1===e.length?r:n(r,i+1):void 0})||void 0};return isString(e)?(e=e.split("/"),n(this,0)||null):this.items(function(e,n){return t(n)})||null},clear:function(){var e=this;return e[1].clear(),e._items.clear(),e._checkedItems.clear(),e._selectedItems.clear(),e.emit("clear")}},k:function(e,t){e[0].addClass(e._identifier=t.defaultClass+Date.now()).append(e[1]=newDom("ul","_container_ul")),e._items=Std.items(),e._CSSStyle=new Std.css,e._types={},e._checkedItems=[],e._selectedItems=[],t.types&&e.types(t.types),t.lines&&e.addClass("_hasLine"),t.items&&e.append(t.items),t.itemContextMenu&&e.initItemContextMenu()},m:{rule:{children:"append"},html:{nodeName:["DIV"],create:function(e){var t=function(e){var n=e.attr("std-icon"),i={text:e.attr("title"),type:e.attr("std-type"),name:e.attr("std-name"),action:e.attr("std-action"),items:e.children(function(e,n){return t(n)})};if(isEmpty(n)||(i.icon=n),"A"===e.nodeName()){var r=e.attr("target"),o=e.attr("href");isString(r)&&(i.target=r),isString(o)&&(i.href=o)}return Std.extend(i,Std.options.get(e),3)};this.append(e.children(function(e,n){return t(n)}))}}}}});