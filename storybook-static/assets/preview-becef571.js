import{_ as a}from"./iframe-8a8808d2.js";import"../sb-preview/runtime.js";const{global:s}=__STORYBOOK_MODULE_GLOBAL__;var _=Object.entries(s.TAGS_OPTIONS??{}).reduce((e,r)=>{let[t,o]=r;return o.excludeFromDocsStories&&(e[t]=!0),e},{}),d={docs:{renderer:async()=>{let{DocsRenderer:e}=await a(()=>import("./DocsRenderer-K4EAMTCU-7e23fb37.js"),["./DocsRenderer-K4EAMTCU-7e23fb37.js","./iframe-8a8808d2.js","./index-453e6029.js","./react-18-2165b203.js","./index-dfd5265f.js","./index-d6fe4bed.js","./index-8c3ac41d.js","./index-110ae0f2.js","./index-356e4a49.js"],import.meta.url);return new e},stories:{filter:e=>{var r;return(e.tags||[]).filter(t=>_[t]).length===0&&!((r=e.parameters.docs)!=null&&r.disable)}}}};export{d as parameters};
