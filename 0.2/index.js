Std.source.response("StdJS",function(){var B='.js',C='.css';function A(f,b,a){return {files:f,basics:b,attr:a}}function D(s){return 'ui/theme/'+s}function E(s){return 'ui/'+s}function F(s){return 'crypto/'+s}function G(s){return 'code/codemirror/lib/'+s}var H='ui.Item';var I='ui.Button';return{"ui.Image":D("ui.Image"+B),"ui.Item":[D("ui.Item"+C),E("ui.Item"+B)],"ui.FieldSet":[D("ui.FieldSet"+C),E("ui.FieldSet"+B)],"ui.ToolTip":[D("ui.ToolTip"+C),E("ui.ToolTip"+B)],"ui.CheckBox":[D("ui.CheckBox"+C),E("ui.CheckBox"+B)],"ui.RadioBox":[D("ui.RadioBox"+C),E("ui.RadioBox"+B)],"ui.SwitchBox":[D("ui.SwitchBox"+C),E("ui.SwitchBox"+B)],"ui.ToggleBox":[D("ui.ToggleBox"+C),E("ui.ToggleBox"+B)],"ui.Button":[D("ui.Button"+C),E("ui.Button"+B)],"ui.SplitButton":[D("ui.SplitButton"+C),E("ui.SplitButton"+B)],"ui.SpinBox":A([D("ui.SpinBox"+C),E("ui.SpinBox"+B)],"ui.Edit"),"ui.DateTimeEdit":A([D("ui.DateTimeEdit"+C),E("ui.DateTimeEdit"+B)],["ui.Edit","ui.DatePicker"]),"ui.DateTimeView":[D("ui.DateTimeView"+C),E("ui.DateTimeView"+B)],"ui.ColorPicker":[D("ui.ColorPicker"+C),E("ui.ColorPicker"+B)],"ui.DatePicker":[D("ui.DatePicker"+C),E("ui.DatePicker"+B)],"ui.List":A([D("ui.List"+C),E("ui.List"+B)],H),"ui.Menu":A([D("ui.Menu"+C),E("ui.Menu"+B)],H),"ui.MenuBar":A([D("ui.MenuBar"+C),E("ui.MenuBar"+B)],"ui.Menu"),"ui.PathBar":[D("ui.PathBar"+C),E("ui.PathBar"+B)],"ui.ComboBox":A([D("ui.ComboBox"+C),E("ui.ComboBox"+B)],H),"ui.ToolBar":A([D("ui.ToolBar"+C),E("ui.ToolBar"+B)],I),"ui.Panel":A([D("ui.Panel"+C),E("ui.Panel"+B)],"ui.ToolBar"),"ui.Window":A([D("ui.Window"+C),E("ui.Window"+B)],["ui.Panel","ui.Menu"]),"ui.MessageBox":[D("ui.MessageBox"+C),E("ui.MessageBox"+B)],"ui.Pagination":A([D("ui.Pagination"+C),E("ui.Pagination"+B)],"ui.ComboBox"),"ui.Progress":[D("ui.Progress"+C),E("ui.Progress"+B)],"ui.Accordion":A([D("ui.Accordion"+C),E("ui.Accordion"+B)],H),"ui.TabPanel":A([D("ui.TabPanel"+C),E("ui.TabPanel"+B)],I),"ui.Slider":A([D("ui.Slider"+C),E("ui.Slider"+B)],"ui.ToolTip"),"ui.Tree":[D("ui.Tree"+C),E("ui.Tree"+B)],"ui.Grid":[D("ui.Grid"+C),E("ui.Grid"+B)],"ui.TaskBar":A([D("ui.TaskBar"+C),E("ui.TaskBar"+B)],H),"ui.Notify":[D("ui.Notify"+C),E("ui.Notify"+B)],"ui.Tray":[D("ui.Tray"+C),E("ui.Tray"+B)],"ui.ImageCutter":A([D("ui.ImageCutter"+C),E("ui.ImageCutter"+B)],["ui.Slider",I]),"crypto.sha1":F("sha1"+B),"crypto.sha256":F("sha256"+B),"crypto.base64":F("base64"+B),"crypto.md5":F("md5"+B),"crypto.md6":F("md6"+B),"crypto.aes":A(F("aes"+B),"crypto.base64"),"plugin.upload":"plugin/upload"+B,"plugin.smoothWheel":"plugin/smoothWheel"+B,"io.websocket":"io/websocket"+B,"ui.Edit":[D("ui.Edit"+C),E("ui.Edit"+B)],"ui.Label":E("ui.Label"+B),"code.SyntaxHighlighter":A(["code/syntaxhighlighter/src/shCore"+B,"code/syntaxhighlighter/styles/shCore"+C],[],{brush:{parallel:false,files:function (v){return "code/syntaxhighlighter/scripts/shBrush" + v.camelCase(true) + ".js"}},theme:{parallel:false,files:function (v){return "code/syntaxhighlighter/styles/shTheme"+v.camelCase(true) + ".css"}}}),"code.CodeMirror":A([G("codemirror"+B),G("ui.CodeMirror"+B),G("codemirror"+C)],[],{mode:{parallel:false,files:function (v){return "code/codemirror/mode/"+v+"/"+v+".js"}},theme:{parallel:false,files:function (v){return "code/codemirror/theme/"+v+".css"}},addonFiles:{parallel:false,files:function (b){return Std.each(b.split(","),function(b,c){return"code/codemirror/addon/"+c},!0)}},hint:{parallel:false,files:function (n){var t="code/codemirror/addon/hint/",h=[t+"show-hint.css",t+"show-hint.js"]
return Std.each(n.split(","),function(n,s){h.push(t+s+"-hint.js")}),h}}})}});