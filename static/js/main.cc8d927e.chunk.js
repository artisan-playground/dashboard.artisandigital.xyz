(this["webpackJsonpartisan-dashboard-web"]=this["webpackJsonpartisan-dashboard-web"]||[]).push([[0],{136:function(e,t,a){e.exports=a(204)},142:function(e,t,a){},199:function(e,t,a){e.exports=a.p+"static/media/logo3.74ac3a04.png"},204:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(8),c=a.n(l),o=(a(141),a(41)),m=a(42),s=a(22),i=(a(142),a(133)),u=a(43),E=a.n(u),d=a(51),p={user:null,set:Object(o.b)((function(e,t){e.user=t})),logIn:Object(o.f)(function(){var e=Object(d.a)(E.a.mark((function e(t,a){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.set(a);case 1:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),logOut:Object(o.f)(function(){var e=Object(d.a)(E.a.mark((function e(t){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.set(null);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},f=Object(o.e)({userState:p},{storage:"localStorage",whitelist:[]}),b=Object(o.d)(),h=b.useStoreActions,w=(b.useStoreDispatch,b.useStoreState),v=Object(o.c)(f,{name:"artisan-dashboard"}),g=function(e){var t=e.component,a=Object(i.a)(e,["component"]),n=w((function(e){return e.userState.user}));return r.a.createElement(s.b,Object.assign({},a,{render:function(e){return n?r.a.createElement(t,e):r.a.createElement(s.a,{to:"/login"})}}))},y=a(63),x=a(45),N=a(206),k=a(205),j=k.a.Content;var I=function(e){e.className;var t=e.children;return r.a.createElement(r.a.Fragment,null,r.a.createElement(B,null),r.a.createElement(U,null,r.a.createElement(k.a,{className:"pt-8 pb-24 px-8 w-full "},r.a.createElement(j,{className:"bg-white p-8 w-full"},t))))},C=a(219),O=a(212),S=a(207),P=a(210),z=a(208),_=a(211),D=a(209),J=(a(74),k.a.Header),M=S.a.Text,A=S.a.Link;var B=function(){var e=Object(s.g)(),t=h((function(e){return e.userState.logOut}));function n(){return(n=Object(d.a)(E.a.mark((function a(){return E.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t();case 2:e.push("/login");case 3:case"end":return a.stop()}}),a)})))).apply(this,arguments)}var l=r.a.createElement(P.a,null,r.a.createElement(P.a.Item,null,r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"/"},"1st notification item")),r.a.createElement(P.a.Item,null,r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"/"},"2nd notification item")),r.a.createElement(P.a.Item,null,r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"/"},"3rd notification item"))),c=r.a.createElement(P.a,null,r.a.createElement(P.a.Item,null,r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"/profile"},"Profile")),r.a.createElement(P.a.Item,null,r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"/edit-profile"},"Edit Profile")),r.a.createElement(P.a.Item,null,r.a.createElement(A,{onClick:function(){return n.apply(this,arguments)}},"Log out")));return r.a.createElement(r.a.Fragment,null,r.a.createElement(J,{className:"header bg-white h-18 min-w-full shadow-lg"},r.a.createElement("div",{className:"flex flex-row justify-between items-center "},r.a.createElement("img",{className:"w-44 h-12 mt-1 -ml-8",src:a(199),alt:"logo"}),r.a.createElement(P.a,{theme:"light",mode:"horizontal",selectable:!1},r.a.createElement(P.a.Item,{key:"1",className:"mx-8 w-16"},r.a.createElement(z.a,{className:"px-0 py-0 h-full w-full",overlay:l,placement:"bottomCenter",arrow:!0},r.a.createElement("div",null,r.a.createElement(C.a,{className:"ml-4",style:{fontSize:24}}),r.a.createElement(_.a,{count:5,className:"mx-4 -ml-4 -mt-4"})))),r.a.createElement(P.a.Item,{key:"2"},r.a.createElement(M,{strong:!0},"John Doe")),r.a.createElement(P.a.Item,{key:"3"},r.a.createElement(D.a,{src:"https://source.unsplash.com/600x600/?people",className:"border-2",alt:"user",size:"large"})),r.a.createElement(P.a.Item,{key:"4",className:""},r.a.createElement(z.a,{className:"px-4 py-4 h-full",overlay:c,placement:"bottomCenter",arrow:!0},r.a.createElement(O.a,{style:{fontSize:20}})))))))},F=a(87),H=a(220),K=a(218),L=a(217),T=a(216),W=a(215),R=a(214),$=a(213),q=S.a.Text,G=P.a.SubMenu,Q=k.a.Sider;var U=function(e){var t=e.children,a=Object(n.useState)(!1),l=Object(F.a)(a,2),c=l[0],o=l[1];return r.a.createElement(k.a,{className:"flex flex-row justify-center"},r.a.createElement("div",{className:""},r.a.createElement(Q,{collapsed:c,className:"min-h-screen shadow-lg bg-white"},r.a.createElement(P.a,{mode:"inline",defaultSelectedKeys:["1"],defaultOpenKeys:["sub1"]},r.a.createElement(P.a.Item,{key:"1",icon:r.a.createElement(H.a,null)},r.a.createElement(m.b,{to:"/"},"Dashboard")),r.a.createElement(G,{key:"sub2",icon:r.a.createElement(K.a,null),title:"Project"},r.a.createElement(P.a.Item,{key:"5"},r.a.createElement(m.b,{to:"/project-list"},"All")),r.a.createElement(P.a.Item,{key:"6"},r.a.createElement(m.b,{to:"/project-list"},"New")),r.a.createElement(P.a.Item,{key:"7"},"In Progress"),r.a.createElement(P.a.Item,{key:"8"},"Closed")),r.a.createElement(P.a.Item,{key:"2",icon:r.a.createElement(L.a,null)},r.a.createElement(m.b,{to:"/news"},"News")),r.a.createElement(P.a.Item,{key:"3",icon:r.a.createElement(T.a,null)},r.a.createElement(m.b,{to:"/member"},"Members")),r.a.createElement(P.a.Item,{key:"4",icon:r.a.createElement(W.a,null)},r.a.createElement(m.b,{to:"/profile"},"Profile")),r.a.createElement(P.a.Item,{key:"9",icon:c?r.a.createElement(R.a,null):r.a.createElement($.a,null),onClick:function(){o(!c)}},r.a.createElement(q,null,"Hide"))))),r.a.createElement("div",{className:"min-h-screen w-full"},t))};var V=function(){return r.a.createElement(I,null,r.a.createElement("div",null,r.a.createElement("div",{className:"font-bold text-2xl"},"Dashboard"),r.a.createElement("div",{className:"site-card-wrapper"},r.a.createElement(y.a,{gutter:16},r.a.createElement(x.a,{span:8},r.a.createElement(N.a,{title:"Card title",bordered:!1,style:{width:300}},r.a.createElement("p",null,"Card content"),r.a.createElement("p",null,"Card content"),r.a.createElement("p",null,"Card content"))),r.a.createElement(x.a,{span:8},r.a.createElement(N.a,{title:"Card title",bordered:!1,style:{width:300}},r.a.createElement("p",null,"Card content"),r.a.createElement("p",null,"Card content"),r.a.createElement("p",null,"Card content"))),r.a.createElement(x.a,{span:8},r.a.createElement(N.a,{title:"Card title",bordered:!1,style:{width:300}},r.a.createElement("p",null,"Card content"),r.a.createElement("p",null,"Card content"),r.a.createElement("p",null,"Card content"))))),r.a.createElement("button",null,r.a.createElement("a",{href:"/project-list"},"to project"))))};var X=function(){var e=Object(s.g)(),t=Object(n.useState)(""),a=Object(F.a)(t,2),l=a[0],c=a[1],o=w((function(e){return e.userState.user})),m=h((function(e){return e.userState.logIn})),i={id:"0",email:"test@mail.com"};function u(){return(u=Object(d.a)(E.a.mark((function t(){return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,m(i);case 2:o&&e.push("/"),console.log("user",o);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return r.a.createElement("div",{className:"flex items-center justify-center h-screen"},r.a.createElement("div",{className:"w-full max-w-xs"},r.a.createElement("div",{className:"md:flex md:items-center mb-6"},r.a.createElement("form",{className:"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"},r.a.createElement("div",{className:"md:flex md:items-center mb-6"},r.a.createElement("img",{className:"w-full",src:"https://trello-attachments.s3.amazonaws.com/5f27b385aa8a2d7fbf5a4f9b/200x200/6f55481bbaee73e7b81824ca1cff7d50/0.png",alt:"Sunset in the mountains"})),r.a.createElement("div",{className:"md:flex md:items-center mb-6"},r.a.createElement("div",{className:"md:w-3/3"},r.a.createElement("input",{className:"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500",type:"email",value:l,placeholder:"Email",onChange:function(e){return c(e.target.value)}}))),r.a.createElement("div",{className:"md:flex md:items-center"},r.a.createElement("div",{className:"md:w-1/4"}),r.a.createElement("div",{className:"md:w-2/3"},r.a.createElement("button",{className:"shadow bg-blue-600 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded",type:"button",onClick:function(){return u.apply(this,arguments)}},"Continue")))))))};var Y=function(){return r.a.createElement(I,null,r.a.createElement("div",null,"Member"))};var Z=function(){return r.a.createElement(I,null,r.a.createElement("div",null,"News"))};var ee=function(){return r.a.createElement(I,null,r.a.createElement("div",null,"Profile"))};var te=function(){return r.a.createElement(I,null,r.a.createElement("div",null,"Editor"))};var ae=function(){return r.a.createElement(I,null,r.a.createElement("div",null,"detail"))};var ne=function(){return r.a.createElement(I,null,r.a.createElement("div",null,"Project list"))};var re=function(){return r.a.createElement("div",null,"Register")};var le=function(){return r.a.createElement(o.a,{store:v},r.a.createElement(m.a,null,r.a.createElement(s.d,null,r.a.createElement(s.b,{path:"/login",exact:!0,component:X}),r.a.createElement(s.b,{path:"/register",exact:!0,component:re}),r.a.createElement(g,{path:"/",exact:!0,component:V}),r.a.createElement(g,{path:"/project-list",component:ne}),r.a.createElement(g,{path:"/project",component:ae}),r.a.createElement(g,{path:"/profile",component:ee}),r.a.createElement(g,{path:"/profile/edit",component:te}),r.a.createElement(g,{path:"/news",component:Z}),r.a.createElement(g,{path:"/member",component:Y}),r.a.createElement(s.a,{to:"/"}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(le,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},74:function(e,t,a){}},[[136,1,2]]]);