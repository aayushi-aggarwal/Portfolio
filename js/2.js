class PhotoGallery{
    constructor(){
      this.API_KEY = '563492ad6f91700001000001260e3843232e4f50830344107b42ec54';
      this.galleryDIv = document.querySelector('.gallery');
      this.loadMore = document.querySelector('.load-more');
      this.logo = document.querySelector('.logo')
      this.pageIndex = 1;
      this.searchValueGlobal = '';
      this.eventHandle();
    }
    eventHandle(){
      document.addEventListener('DOMContentLoaded',()=>{
        this.getImg(1);
      });
      this.loadMore.addEventListener('click', (e)=>{
        this.loadMoreImages(e);
      })
      this.logo.addEventListener('click',()=>{
        this.pageIndex = 1;
        this.galleryDIv.innerHTML = '';
        this.getImg(this.pageIndex);
      })
    }
    async getImg(index){
      this.loadMore.setAttribute('data-img', 'curated');
      const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=9`;
      const data = await this.fetchImages(baseURL);
      this.GenerateHTML(data.photos)
      console.log(data)
    }
    async fetchImages(baseURL){
      const response = await fetch(baseURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: this.API_KEY
        }
      });
      const data = await response.json();
      return data;
    }
    GenerateHTML(photos){
      photos.forEach(photo=>{
        const item= document.createElement('div');
        item.classList.add('item');
        item.innerHTML = `
        <a href='${photo.src.original}' target="_blank">
          <img src="${photo.src.medium}">
          <h3>${photo.photographer}</h3>
        </a>
        `;
        this.galleryDIv.appendChild(item)
      })
    }
    loadMoreImages(e){
      let index = ++this.pageIndex;
      const loadMoreData = e.target.getAttribute('data-img');
      if(loadMoreData === 'curated'){
        try {
            this.getImg(index) 
        } catch (error) {
            console.log(error)
        }
        
      }
    }
  }
  
  const gallery = new PhotoGallery;