import{S as L,i as a,a as w}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))d(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();const p=document.querySelector(".form"),l=document.querySelector(".gallery"),S=document.querySelector("div"),q=document.querySelector("input"),f=document.querySelector(".btn-load");function s(t){if(t){const e=document.createElement("span");e.classList.add("loader"),S.append(e)}else{const e=document.querySelector(".loader");e&&e.remove()}}const i=t=>{f.style.display=t?"block":"none"},v=new L(".gallery a",{captions:!0,captionType:"attr",captionData:"alt",captionPosition:"bottom",fadeSpeed:150,captionSelector:"img",captionDelay:250});let u=1,m=15,g="",y;p.addEventListener("submit",async t=>{u=1,s(!0),l.innerHTML="",t.preventDefault();try{g=q.value;const e=await h();b(e),p.reset(),s(!1),i(!0),e.hits.length<15&&i(!1),e.hits.length===0&&(i(!1),a.error({message:"Sorry, there are no images matching <br>your search query. Please try again!</br>",position:"center",transitionIn:"fadeInLeft"}))}catch{a.err({title:"Error"})}});f.addEventListener("click",async()=>{s(!0);try{u+=1;const t=await h();b(t),s(!1);const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"}),(l.children.length>=y||t.hits.length<m)&&(a.warning({message:"We are sorry, but you have reached the end of search results.",position:"bottomCenter",transitionIn:"fadeInDown"}),i(!1))}catch{a.err({title:"Error"}),s(!1)}});async function h(){try{const t="42291440-1a96f303b7bedbf570d96cd98",e=new URLSearchParams({key:t,q:g,image_type:"photo",safesearch:!0,page:u,per_page:m}),o=await w.get(`https://pixabay.com/api/?${e}`);return y=o.data.totalHits,o.data}catch{a.error({title:"Sorry, I can`t find your images"})}}function b(t){const e=t.hits.map(o=>`       <li class="gallery-item"><a href="${o.largeImageURL}">
        <img class="gallery-image" src="${o.webformatURL}" alt="${o.tags}"></a>
           <p><b>Likes: </b>${o.likes}</p>
          <p><b>Views: </b>${o.views}</p>
        <p><b>Comments: </b>${o.comments}</p>
        <p><b>Downloads: </b>${o.downloads}</p>
         </li>`).join("");l.insertAdjacentHTML("beforeend",e),v.on("show.simplelightbox").refresh(),s(!1)}
//# sourceMappingURL=commonHelpers.js.map
