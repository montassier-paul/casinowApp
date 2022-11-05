let url2img__form = document.getElementsByClassName('url2img__form')[0];
let url2img__url = document.getElementsByClassName('url2img__url')[0]
let url2img__loader = document.getElementsByClassName('url2img__loader')[0]
let url2img__img = document.getElementsByClassName('url2img__img')[0]
let url2img__failed = document.getElementsByClassName('url2img__failed')[0]
let url2img__save = document.getElementsByClassName('url2img__save')[0]
let url = ''

console.log("script file is mounted !")


url2img__form.addEventListener('submit', async(event) => {
    event.preventDefault() 
    url = event.target.url2img__url.value

    url2img__loader.style.display = "block"
    url2img__img.style.display = "none"
    url2img__failed.style.display = "none"



    let res = await axios({
        method: 'get',
        // url: 'http://127.0.0.1:8080/screenshot?url=' + url,
        url: 'https://casinow--scraper.com/screenshot?url=' + url,    
        responseType : 'blob', 

    }).then((res) => {

        if(res.status >= 200 && res.status < 300){

            console.log(res.data.result)

            var url = URL.createObjectURL(res.data)
            url2img__img.src = url;
            


            url2img__loader.style.display = "none"
            url2img__failed.style.display = "none"
            url2img__img.style.display = "block"
    
    
        }
    
        else {
            url2img__loader.style.display = "none"
            url2img__img.style.display = "none"
            url2img__failed.style.display = "block"
            
           
        }
    

    })
    .catch((err) => { 

        url2img__loader.style.display = "none"
        url2img__img.style.display = "none"
        url2img__failed.style.display = "block"
    })



});

url2img__save.addEventListener('click', function(e) {



    if(url2img__img.src){

        const link = document.createElement('a');
        link.download = `${url}.png`;
        link.href = url2img__img.src;
        link.click();
        link.delete;

    }

  });