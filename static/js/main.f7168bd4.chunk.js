(this["webpackJsonpweather-dashboard"]=this["webpackJsonpweather-dashboard"]||[]).push([[0],[,,function(e,t,a){e.exports={TextInput:"Forecast_TextInput__1mRzh",Radio:"Forecast_Radio__4BFsK",Button:"Forecast_Button__35RyU"}},function(e,t,a){e.exports={Wrapper:"Conditions_Wrapper__34GbD",Small:"Conditions_Small__tYJ3z",Loader:"Conditions_Loader__1fykx",spin:"Conditions_spin__3r2Z4"}},,,function(e,t,a){e.exports=a(13)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(5),c=a.n(o),l=(a(11),a(12),a(1)),i=a(3),s=a.n(i),u=function(e){return r.a.createElement("div",{className:s.a.Wrapper},e.error&&r.a.createElement("small",{className:s.a.Small},"Please enter a valid city."),e.loading&&r.a.createElement("div",{className:s.a.Loader}),200===e.responseObj.cod?r.a.createElement("div",null,r.a.createElement("p",null,r.a.createElement("strong",null,e.responseObj.name)),r.a.createElement("p",null,"It is currently ",Math.round(e.responseObj.main.temp)," degrees out with ",e.responseObj.weather[0].description,".")):null)},m=a(2),p=a.n(m),d=function(){var e=Object(n.useState)({}),t=Object(l.a)(e,2),a=t[0],o=t[1],c=Object(n.useState)(""),i=Object(l.a)(c,2),s=i[0],m=i[1],d=Object(n.useState)("imperial"),h=Object(l.a)(d,2),E=h[0],b=h[1],f=Object(n.useState)(!1),v=Object(l.a)(f,2),_=v[0],g=v[1],w=Object(n.useState)(!1),j=Object(l.a)(w,2),y=j[0],O=j[1];return r.a.createElement("div",null,r.a.createElement("h2",null,"Find Current Weather Conditions"),r.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),0===s.length)return g(!0);g(!1),o({}),O(!0);var t=encodeURIComponent(s);fetch("https://community-open-weather-map.p.rapidapi.com/weather?units=".concat(E,"&q=").concat(t),{method:"GET",headers:{"x-rapidapi-host":"community-open-weather-map.p.rapidapi.com","x-rapidapi-key":"0f45cc0e98mshf7dc6b8a599cd15p128fe8jsn03ecb66563dd"}}).then((function(e){return e.json()})).then((function(e){if(200!==e.cod)throw new Error;o(e),O(!1)})).catch((function(e){g(!0),O(!1),console.log(e.message)}))}},r.a.createElement("input",{type:"text",placeholder:"Enter City",maxLength:"50",className:p.a.textInput,value:s,onChange:function(e){return m(e.target.value)}}),r.a.createElement("label",{className:p.a.Radio},r.a.createElement("input",{type:"radio",name:"units",checked:"imperial"===E,value:"imperial",onChange:function(e){return b(e.target.value)}}),"Fahrenheit"),r.a.createElement("label",{className:p.a.Radio},r.a.createElement("input",{type:"radio",name:"units",checked:"metric"===E,value:"metric",onChange:function(e){return b(e.target.value)}}),"Celcius"),r.a.createElement("button",{className:p.a.Button,type:"submit"},"Get Forecast")),r.a.createElement(u,{responseObj:a,error:_,loading:y}))};var h=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("h1",null," React Weather App "),r.a.createElement("main",null,r.a.createElement(d,null))),r.a.createElement("footer",null,"Page created by waveshocker."))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(h,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[6,1,2]]]);
//# sourceMappingURL=main.f7168bd4.chunk.js.map