let instaManager__form = document.getElementsByClassName('instaManager__form')[0];
let instaManager__loader = document.getElementsByClassName('instaManager__loader')[0]
let instaManager__failed = document.getElementsByClassName('instaManager__failed')[0]
let container__right = document.getElementsByClassName('container__right')[0]
let instaManager__resetButton = document.getElementsByClassName('instaManager__resetButton')[0]


instaManager__form.addEventListener('submit', async(event) => {

    event.preventDefault()

    const children = container__right.children

    var toContinue = children[children.length - 1].tagName === "CANVAS"

    while (toContinue) {

        container__right.removeChild(children[children.length - 1])

        var toContinue = children[children.length - 1].tagName === "CANVAS"


    } 

    instaManager__loader.style.display = "block"
    instaManager__failed.style.display = "none"


    await axios({
        method: 'get',
        url: `https://webscrapping--service-tnsbggprqa-od.a.run.app/instajackpot?feedName=${event.target.instaManager__url.value}`,
        // url: `http://127.0.0.1:8080/instajackpot?feedName=${event.target.instaManager__url.value}`,
    }).then((res) => {

        // console.log(res)

        if(res.status >= 200 && res.status < 300){


            JSON.parse(res.data).forEach( function(element, index) {

                // var img = new Image();
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d')
                
                canvas.renderImage("http://127.0.0.1:8000/facebookproxy/" + element[0], canvas, ctx, element[1])


                container__right.appendChild(canvas);
            
        });
             

            instaManager__loader.style.display = "none"
            instaManager__failed.style.display = "none"
    
        }
    
        else {

            instaManager__loader.style.display = "none"
            instaManager__failed.style.display = "block"    
           
        }
    

    })
    .catch((err) => { 

        instaManager__loader.style.display = "none"
        instaManager__failed.style.display = "block"  

    })

});

HTMLCanvasElement.prototype.renderImage = function(url, canvas, ctx, boxes){


    var image = new Image();
  
    image.onload = function(){
  
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0)

      boxes.forEach(function (item, index) {
     
    
        let x = item[0][0][0]
        let y = item[0][0][1]

        let width = item[0][1][0] - item[0][0][0]
        let height = item[0][2][1] - item[0][0][1]

        // console.log(x, y, width, height)


        ctx.beginPath();

        ctx.font = "10px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(item[1].toUpperCase(), x + width + 5, y + height / 2);

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.rect(x, y, width, height);
        ctx.stroke();

    })

    }
  
    image.src = url;
  
    
  };

