import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';


const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const container = document.querySelector("div");
const searchInput = document.querySelector("input");
const btnLoad = document.querySelector(".btn-load");

function toggleLoader(showLoader) {
    if (showLoader) {
        const loader = document.createElement('span');
        loader.classList.add("loader");
        container.append(loader);
    } else {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.remove();
        }
    }
}



const toggleButton = (shouldShow) => {
    btnLoad.style.display = shouldShow ? "block" : "none";
    
}

 const lightbox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionType: 'attr',
        captionData: 'alt',
        captionPosition: 'bottom',
        fadeSpeed: 150,
        captionSelector: 'img',
        captionDelay: 250
    });

let page = 1;
let per_page = 15;
let query = "";
let totalHits;

form.addEventListener("submit", async (evt) => {
    page = 1;
    toggleLoader(true);
    gallery.innerHTML = "";
    evt.preventDefault();
    try {
        query = searchInput.value;
        const photos = await searchImages();
        renderImages(photos);
        form.reset();
        toggleLoader(false);
        toggleButton(true);
        if (photos.hits.length < 15) {
            toggleButton(false);
        }
        if (photos.hits.length === 0) {
            toggleButton(false);
            iziToast.error({
                message: "Sorry, there are no images matching <br>your search query. Please try again!</br>",
                position: 'center',
                transitionIn: "fadeInLeft",
            });
        }

    } catch (err) {
        iziToast.err({
            title: 'Error',
        });
    }
})


btnLoad.addEventListener("click", async () => {
   toggleLoader(true);
    try {
        page += 1;
        const photos = await searchImages();
        renderImages(photos);
        toggleLoader(false);

        const { height: cardHeight } = document.querySelector('.gallery')
            .firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth"
        });
        if (gallery.children.length >= totalHits || photos.hits.length < per_page) {
            iziToast.warning({
                message: 'We are sorry, but you have reached the end of search results.',
                position: 'bottomCenter',
                transitionIn: 'fadeInDown',
            });
            toggleButton(false);
        }
    } catch (err) {
        iziToast.err({
            title: 'Error'
        })
        toggleLoader(false);
    }
}) 

async function searchImages() {
    try {
        const apiKey = '42291440-1a96f303b7bedbf570d96cd98';
        const params = new URLSearchParams({
            key: apiKey,
            q: query,
            image_type: "photo",
            safesearch: true,
            page: page,
            per_page: per_page
        })
        const response = await axios.get(`https://pixabay.com/api/?${params}`);
        totalHits = response.data.totalHits;

        return response.data;
    } catch (err) {
        iziToast.error({
            title: 'Sorry, I can`t find your images'
        })
    }
};

function renderImages(data) {
    const markup = data.hits.map(data => {
        return `       <li class="gallery-item"><a href="${data.largeImageURL}">
        <img class="gallery-image" src="${data.webformatURL}" alt="${data.tags}"></a>
           <p><b>Likes: </b>${data.likes}</p>
          <p><b>Views: </b>${data.views}</p>
        <p><b>Comments: </b>${data.comments}</p>
        <p><b>Downloads: </b>${data.downloads}</p>
         </li>`;
    }).join("");

    gallery.insertAdjacentHTML("beforeend", markup);
   
    lightbox.on('show.simplelightbox').refresh();
    toggleLoader(false);
};


        
