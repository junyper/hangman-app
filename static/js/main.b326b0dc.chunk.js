(this["webpackJsonphangmain-app"]=this["webpackJsonphangmain-app"]||[]).push([[0],[,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var c=n(1),i=n.n(c),s=n(8),r=n.n(s),a=(n(13),n(4)),o="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),d=n(6),l=n(2),u=n.n(l),j=(n(14),n(0));function b(e){return Object(j.jsx)("div",{className:"Status","aria-hidden":"true",children:Object(j.jsx)("div",{className:"Gallows",children:Object(j.jsxs)("div",{className:"Man",children:[Object(j.jsx)("div",{className:u()({head:!0,hidden:e.incorrect<1})}),Object(j.jsx)("div",{className:u()({torso:!0,hidden:e.incorrect<2})}),Object(j.jsx)("div",{className:u()({arm:!0,left:!0,hidden:e.incorrect<3})}),Object(j.jsx)("div",{className:u()({arm:!0,right:!0,hidden:e.incorrect<4})}),Object(j.jsx)("div",{className:u()({leg:!0,left:!0,hidden:e.incorrect<5})}),Object(j.jsx)("div",{className:u()({foot:!0,left:!0,hidden:e.incorrect<6})}),Object(j.jsx)("div",{className:u()({leg:!0,right:!0,hidden:e.incorrect<7})}),Object(j.jsx)("div",{className:u()({foot:!0,right:!0,hidden:e.incorrect<8})})]})})})}n(16);function h(e){var t=e.data,n=e.reloadGame,i=Object(c.useState)([]),s=Object(a.a)(i,2),r=s[0],l=s[1],h=Object(c.useState)([]),O=Object(a.a)(h,2),f=O[0],p=O[1],m=Object(c.useMemo)((function(){return t?t.word.split("").map((function(e){return e.toUpperCase()})):[]}),[t]),v=Object(c.useCallback)((function(e){8!==f.length&&o.includes(e)&&(m.includes(e)&&!r.includes(e)?l([].concat(Object(d.a)(r),[e])):f.includes(e)||p([].concat(Object(d.a)(f),[e])))}),[l,p,f,r,m]),x=Object(c.useCallback)((function(){p([]),l([]),n()}),[p,l,n]),g=Object(c.useCallback)((function(){l(Object(d.a)(m))}),[l,m]);Object(c.useEffect)((function(){var e=function(e){"Escape"===e.key&&x(),v(e.key.toUpperCase())};return window.addEventListener("keyup",e),function(){return window.removeEventListener("keyup",e)}}),[v,x,g]);var w=m.map((function(e){return r.includes(e)||f.length>=8?e:"_"})).join(" "),N=function(e){v(e.currentTarget.value)},C=f.length>=8,k=w.includes("_")&&!C;return Object(j.jsxs)("div",{className:"Game",children:[Object(j.jsx)(b,{incorrect:f.length}),Object(j.jsxs)("p",{className:"Definition",children:["Definition: ",t.definition]}),k?Object(j.jsx)("span",{children:"Can you guess the word?"}):Object(j.jsxs)("span",{children:[C?Object(j.jsx)("b",{style:{color:"red"},children:"Oops! "}):Object(j.jsx)("b",{style:{color:"green"},children:"Yay! "}),"The word is:"]}),Object(j.jsx)("p",{className:"Word",children:w}),Object(j.jsx)("p",{children:o.map((function(e){return Object(j.jsx)("input",{type:"button",onClick:N,value:e,disabled:r.includes(e)||f.includes(e)||C,className:u()({Letter:!0,correct:r.includes(e),incorrect:f.includes(e)})},e)}))}),Object(j.jsx)("button",{type:"button",onClick:g,children:"Show the word"}),Object(j.jsx)("button",{type:"button",onClick:x,children:"Try a new word  (ESC key)"})]})}n(17);var O=function(){var e=Object(c.useState)(),t=Object(a.a)(e,2),n=t[0],i=t[1],s=Object(c.useCallback)((function(){i(void 0),fetch("https://random-words-api.vercel.app/word").then((function(e){return e.json()})).then((function(e){return i(e[0])})).catch((function(e){return console.error(e)}))}),[i]);return Object(c.useEffect)((function(){s()}),[s]),n?Object(j.jsx)(h,{data:n,reloadGame:s}):Object(j.jsx)("div",{children:"Loading game data..."})},f=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),c(e),i(e),s(e),r(e)}))};r.a.render(Object(j.jsx)(i.a.StrictMode,{children:Object(j.jsx)(O,{})}),document.getElementById("root")),f()}],[[18,1,2]]]);
//# sourceMappingURL=main.b326b0dc.chunk.js.map