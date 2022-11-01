let url2jackpot__form = document.getElementsByClassName('url2jackpot__form')[0]
let modelSelector = document.getElementById('model-select');
let url2jackpot__loader = document.getElementsByClassName('url2jackpot__loader')[0]
let url2jackpot__failed = document.getElementsByClassName('url2jackpot__failed')[0]
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d')
console.log("script file is mounted !")


url2jackpot__form.addEventListener('submit', async (event) => {

    event.preventDefault()

    url2jackpot__loader.style.display = "block"
    canvas.style.display = "none"
    url2jackpot__failed.style.display = "none"


    await axios({
        method: 'post',
        // url: `http://127.0.0.1:8080/jackpot`,
        url: `https://webscrapping--service-tnsbggprqa-od.a.run.app/jackpot`,
        data: {
            url: event.target.url2jackpot__url.value,
            model: modelSelector.selectedOptions[0].value,
            yTop: event.target.url2jackpot__yTop.value,
            xTop: event.target.url2jackpot__xTop.value,
            yLow: event.target.url2jackpot__yLow.value,
            xLow: event.target.url2jackpot__xLow.value
        },
        responseType: 'blob',

    }).then((res) => {

        if (res.status >= 200 && res.status < 300) {

            result = JSON.parse(res.headers.result)

            canvas.renderImage(res.data, result);


            url2jackpot__loader.style.display = "none"
            url2jackpot__failed.style.display = "none"
            canvas.style.display = "block"



        }

        else {

            url2jackpot__loader.style.display = "none"
            canvas.style.display = "none"
            url2jackpot__failed.style.display = "block"

        }


    })
        .catch((err) => {


            url2jackpot__loader.style.display = "none"
            url2jackpot__failed.style.display = "block"
            canvas.style.display = "none"

        })

}
)




HTMLCanvasElement.prototype.renderImage = function(blob, boxes){

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
    image.src = URL.createObjectURL(blob);;
  
    
  };
