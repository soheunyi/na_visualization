(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{24:function(t,e,n){},28:function(t,e,n){},33:function(t,e,n){},34:function(t,e,n){"use strict";n.r(e);var i=n(3),o=n(7),a=n.n(o),r=n(13),c=n(0),u=(n(24),n(1));function l(t){var e=Object(c.useRef)(),n=Object(c.useRef)();return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("input",{ref:n,name:t.name,className:"toggle-checkbox",type:"checkbox",defaultChecked:t.value,value:t.value||!1}),Object(u.jsx)("span",{ref:e,onClick:function(){t.onChange&&t.onChange(n.current.checked),e.current.classList.toggle("toggled"),n.current.checked=!n.current.checked,t.onToggle&&t.onToggle(n.current.checked)},className:t.checked?"toggled toggle-switch":"toggle-switch",children:Object(u.jsx)("span",{className:"toggle"})})]})}var s=n(5),f=n.n(s);function h(t){for(var e=[],n=0;n<t.length/2;n++)e.push({x:t[2*n],y:t[2*n+1]});return e}var d=60;n(28);var p=function(t,e,n){var i=n.color,o=void 0===i?"black":i,a=n.width,r=void 0===a?1:a;e.sort((function(t,e){return t.x>e.x?1:t.x<e.x?-1:t.y>e.y?1:t.y<e.y?-1:void 0})),e.length>1&&(t.beginPath(),e.map((function(n,i){if(!(i>=e.length-1)){var o=e[i+1];t.moveTo(n.x,n.y),t.lineTo(o.x,o.y)}})),t.strokeStyle=o,t.lineWidth=r,t.stroke())},v=n(12),b=n.n(v);function j(t){var e=Object(c.useMemo)((function(){return t.point.position}),[]),n=Object(c.useMemo)((function(){return t.animationFrameCount}),[]),o=Object(c.useRef)(),a=Object(c.useRef)(),r=Object(c.useState)({x:0,y:0,deltaX:0,deltaY:0,lastX:0,lastY:0}),l=Object(i.a)(r,2),s=l[0],h=l[1],d=function(t){return f.a.isUndefined(t)?{x:0,y:0}:t},p=function(t,e){return{x:t.x+e.x,y:t.y+e.y}},v=function(){var n=t.point.key,i=d(o.current),r=d(a.current),c={key:n,position:p(p(e,s),p(i,r))};t.handleDrag(c)},j=t.animated,g=t.absoluteAnimation,y=t.relativeAnimation,O=t.animationFrameCount;Object(c.useEffect)((function(){if(j){var t=g();o.current=p(d(o.current),t),a.current=y(O-n),v()}}),[O]);var x=t.pointStyle,m=x.pointSize,k=x.color,S=d(o.current),w=d(a.current),P=p(w,S);return Object(u.jsx)(b.a,{onDrag:function(t,e){h(e),v()},children:Object(u.jsx)("div",{className:"drag-wrapper",style:{position:"absolute",left:e.x+P.x-m,top:e.y+P.y-m,width:2*m,height:2*m,borderRadius:"100%",background:k,opacity:0}})})}var g=n(14);n(33);var y=function(t){var e=Object(c.useRef)(null),n=t.draw,i=t.pathPoints,o=t.points,a=t.pointStyle,r=t.lineStyle,l=t.canvasStyle;return Object(c.useEffect)((function(){var t=e.current.getContext("2d");t.clearRect(0,0,t.canvas.width,t.canvas.height),n(t,i,r),o.map((function(e){!function(t,e,n,i){var o=i.color,a=void 0===o?"#ff2626":o,r=i.pointSize,c=void 0===r?10:r;t.beginPath(),t.fillStyle=a,t.arc(e,n,c,0,2*Math.PI),t.fill(),t.stroke()}(t,e.x,e.y,a)}))}),[o,i]),Object(u.jsx)("canvas",Object(g.a)({ref:e,width:l.width,height:l.height},t))};function O(t){var e=Object(c.useState)(0),n=Object(i.a)(e,2),o=n[0],a=n[1],r=t.animated,l=t.absoluteAnimation,s=void 0===l?function(){return{x:0,y:0}}:l,f=t.relativeAnimation,h=void 0===f?function(t){return{x:0,y:0}}:f,v=t.lineWidth,b=t.style.pointSize;return Object(c.useEffect)((function(){var t=setInterval((function(){r&&a((function(t){return t+1}))}),1e3/d);return function(){clearInterval(t)}}),[r]),Object(u.jsxs)("div",{style:{position:"absolute",height:"100%",width:"100%",background:"skyblue"},onDoubleClick:function(){var e=t.position;t.handleDoubleClick(e)},children:[t.pivotalPoints.map((function(e){return Object(u.jsx)(j,{animated:r,absoluteAnimation:s,relativeAnimation:h,animationFrameCount:o,handleDrag:t.handleDrag,point:e,pointStyle:{pointSize:10,color:"yellow"}})})),Object(u.jsx)(y,{draw:p,pathPoints:t.plotPoints.path,points:t.plotPoints.pivotal,lineStyle:{color:"black",width:v},pointStyle:{color:"red",pointSize:b},canvasStyle:{width:1600,height:1e3}})]})}var x=function(t){for(var e=0,n=0;n<t;n++)e+=Math.random();return(e-t/2)/Math.pow(t/12,2)};var m=[];function k(t){var e=Object(c.useState)(!1),n=Object(i.a)(e,2),o=n[0],a=n[1],s=Object(c.useState)([]),p=Object(i.a)(s,2),v=p[0],b=p[1],j=Object(c.useState)({path:[],pivotal:[]}),g=Object(i.a)(j,2),y=g[0],k=g[1];Object(c.useEffect)((function(){var t=setInterval((function(){b([].concat(m));var t=S.getAttribute("plotPosition"),e=null==t?{path:[],pivotal:[]}:JSON.parse(t);e.path=h(e.path),e.pivotal=h(e.pivotal),k(e)}),1e3/60);return function(){clearInterval(t)}}),[]);var w=Object(c.useRef)();w.current=function(t){var e=f.a.findIndex(m,(function(e){return e.key===t.key}));m[e]=t};var P,C=Object(c.useRef)();return C.current=function(t){var e=Math.random().toString(36);m.length<100&&m.push({position:t,key:e})},Object(u.jsxs)("div",{children:[t.testString,Object(u.jsx)(l,{onToggle:a}),Object(u.jsx)(r.a,{style:{position:"absolute"},children:Object(u.jsx)(O,{style:{pointSize:10,lineWidth:5},animated:o,absoluteAnimation:(P=5,function(){return{x:P*x(5)/Math.pow(d,.5),y:P*x(5)/Math.pow(d,.5)}}),handleDoubleClick:C.current,handleDrag:w.current,pivotalPoints:v,plotPoints:null===y?[]:y})})]})}var S=document.getElementById("root");setInterval((function(){S.setAttribute("pivotalPosition","".concat("[",m.map((function(t){return JSON.stringify([t.position.x,t.position.y])})).toString(),"]"))}),1e3/60),a.a.render(Object(u.jsx)(k,{}),S)}},[[34,1,2]]]);
//# sourceMappingURL=main.2f2b2410.chunk.js.map