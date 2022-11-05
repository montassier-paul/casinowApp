let img2text__form = document.getElementsByClassName('img2text__form')[0];
let img2text__input = document.getElementsByClassName('img2text__input')[0]
let img2text__loader = document.getElementsByClassName('img2text__loader')[0]
let img2text__img = document.getElementsByClassName('img2text__img')[0]
let img2text__failed = document.getElementsByClassName('img2text__failed')[0]
let ClearButton = document.getElementsByClassName('img2text__clear')[0]
let modelSelector = document.getElementById('model-select'); 
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d')
var img = undefined

console.log("script file is mounted !")


img2text__form.addEventListener('submit', async(event) => {


    event.preventDefault() 
    // var image = event.target.img2text__input.files[0]
  
    img2text__loader.style.display = "block"
    img2text__failed.style.display = "none"



    await axios({
        method: 'post',
        url: `https://casinow--scraper.com/img2text?model=${modelSelector.selectedOptions[0].value}`,
        // url: `http://127.0.0.1:8080/img2text?model=${modelSelector.selectedOptions[0].value}`,
        headers: {
            'Content-Type': 'multipart/form-data'
       },
        data : {
            img     
        }

    }).then((res) => {

        if(res.status >= 200 && res.status < 300){

            
            res.data.forEach(function (item, index) {


                let x = item[0][0][0]
                let y = item[0][0][1]

                let width = item[0][1][0] - item[0][0][0]
                let height =  item[0][2][1] - item[0][0][1]


                ctx.beginPath();

                ctx.font = "10px Comic Sans MS";
                ctx.fillStyle = "red";
                ctx.textAlign = "center";
                ctx.fillText(item[1].toUpperCase(), x + width + 5, y + height/2 );

                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.rect(x, y, width, height);
                ctx.stroke();
                                   
              });

            img2text__loader.style.display = "none"
            img2text__failed.style.display = "none"
    
        }
    
        else {

            img2text__loader.style.display = "none"
            img2text__failed.style.display = "block"         
           
        }
    

    })
    .catch((err) => { 

        img2text__loader.style.display = "none"
        img2text__failed.style.display = "block"

    })

});


img2text__input.addEventListener("input", (event) => {

    event.preventDefault() 

    img = event.target.files[0]
    

    canvas.renderImage(img);

})

ClearButton.addEventListener("click", (event) =>  {

    event.preventDefault()

    if(img){

        ctx.clearRect(0, 0, canvas.height, canvas.width);
        canvas.renderImage(img);

    }   
})

HTMLCanvasElement.prototype.renderImage = function(blob){
  

  var image = new Image();

  image.onload = function(){

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0)
  }

  image.src = URL.createObjectURL(blob);

  
};
