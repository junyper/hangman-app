(this["webpackJsonphangmain-app"]=this["webpackJsonphangmain-app"]||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),i=n(8),a=n.n(i),s=(n(14),n(4)),o=n(7),u=n.n(o),l=n(9),d=n(5),j=(n(16),n(0));var b=function(){var e=Object(c.useState)([]),t=Object(d.a)(e,2),n=t[0],r=t[1],i=Object(c.useState)([]),a=Object(d.a)(i,2),o=a[0],b=a[1],p=Object(c.useState)(),h=Object(d.a)(p,2),f=h[0],O=h[1],g=function(){var e=Object(l.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return O(void 0),e.prev=1,e.next=4,fetch("https://random-words-api.vercel.app/word");case 4:return t=e.sent,e.next=7,t.json();case 7:n=e.sent,O(n[0]),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),console.error(e.t0);case 14:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(){return e.apply(this,arguments)}}();if(Object(c.useEffect)((function(){g()}),[]),!f)return Object(j.jsx)("div",{children:"Loading game data..."});var v=f.word,x=f.definition,w="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),m=v.split("").map((function(e){return e.toUpperCase()})),C=m.map((function(e){return n.includes(e)||o.length>=5?e:"_"})).join(" "),k=function(e){var t=e.currentTarget.value;5!==o.length&&(m.includes(t)?r([].concat(Object(s.a)(n),[t])):b([].concat(Object(s.a)(o),[t])))},y=function(e){return n.includes(e)?"correct":o.includes(e)?"incorrect":"available"};return Object(j.jsxs)("div",{children:[Object(j.jsxs)("p",{children:["Definition: ",x]}),C.includes("_")&&o.length<5?Object(j.jsxs)("span",{children:["Can you guess the word in ",Object(j.jsx)("b",{children:5-o.length})," guesses?"]}):Object(j.jsx)("span",{children:"The word is:"}),Object(j.jsx)("p",{className:"Word",children:C}),Object(j.jsx)("p",{children:w.map((function(e){return Object(j.jsx)("input",{type:"button",onClick:k,value:e,disabled:n.includes(e)||o.includes(e)||5===o.length,className:y(e)},e)}))}),Object(j.jsx)("button",{type:"button",onClick:function(){r(Object(s.a)(m))},children:"Show the word"}),Object(j.jsx)("button",{type:"button",onClick:function(){b([]),r([]),g()},children:"Try a new word"})]})},p=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),i(e),a(e)}))};a.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(b,{})}),document.getElementById("root")),p()}},[[18,1,2]]]);
//# sourceMappingURL=main.c44f33ed.chunk.js.map