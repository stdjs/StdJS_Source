/**
    Std UI Kit Library
    http://ui.stdjs.com
	module: SwitchBox
*/
Std.ui.module("SwitchBox",{parent:"widget",events:"change",option:{level:1,defaultClass:"StdUI_SwitchBox",value:null,items:null,theme:"blue",width:"auto"},"private":{selected:null},initialize:{initEvents:function(){var e=this,t=e.opts;e[0].unselect(!0).delegate("click","._item",function(){if(e.enable()){var i=e._items.items(this.index("._item"));i!==e._selected&&(e._selected=i,e.emit("change",t.value=i.value)),e.initHandle()[1].html(i.dom.html()).animateTo({width:i.dom.width()-2,left:i.dom.offsetLeft()},100)}})}},extend:{render:function(){var e=this;e.call_opts(["value"]),e.updateLayout()},width:function(){{var e=this;e.opts}e.rendered&&e.updateLayout()},height:function(e){var t=this;"auto"!==e&&(isNumber(e)||(e=t.height()),t[0].lineHeight(e-=t.boxSize.height),t[1]&&t[1].height(e-2).lineHeight(e-2))}},"protected":{length:0,initHandle:function(){var e=this;if(void 0==e[1]){var t=e.height()-e.boxSize.height-2;e[1]=newDiv("_handle").appendTo(e[0]),e[1].height(t).lineHeight(t)}return e},updateLayout:function(){var e=this,t=e.opts.width,i=e.boxSize.width;return"auto"===t?e:(isNumber(t)||(t=e.width()),e._items.items(function(n,u){u.dom.width(t/e.length-i+(0!==n?1:0))}),e.refresh())}},"public":{items:function(e,t){return this._items.items(e,t)},refresh:function(){var e=this,t=e.opts.width,i=e._selected;return null===i?e:(e[1]||e.initHandle(),t=isNumber(t)?t/e.length-e.boxSize.width:i.dom.outerWidth(),e[1].dom.innerHTML=i.dom.html(),e[1].css({left:i.dom.offsetLeft(),width:t-2}),e)},value:function(e){var t=this;return t.opt("value",e,function(){t._items.items(function(i,n){return n.value===e?(t._selected=n,!0):void 0}),t.rendered&&(t.refresh(),t.emit("change",e))})},insert:function(e,t,i,n){var u=this,d=newDiv("_item");return isObject(e)&&(t=e.value,e=e.text),isString(e)&&d.append(newDiv("_name").html(e)),u.length++>0&&u[0].append(newDiv("_sep")),u[0].insert(Std.dom.get(d),i),u._items.insert({text:e,value:t,dom:d},i),n!==!1&&u.rendered&&u.updateLayout(),u},append:function(e,t,i){var n=this;return isArray(e)?Std.each(e,function(e,t){n.insert(t,null,null,!1)}):n.insert(e,t,null,!1),i!==!1&&n.rendered&&n.updateLayout(),n}},main:function(e,t){e._items=Std.items(),e.initEvents(),t.items&&e.append(t.items)},support:{rule:{content:"value",children:function(e){this.append(e)}},html:{create:function(e){this.append(e.children(function(e,t){return{value:t.value(),text:t.html()}}))}}}});