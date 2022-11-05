from fastapi import APIRouter
from fastapi import File, UploadFile, Response, Request, HTTPException
from fastapi.responses import HTMLResponse
from selenium import webdriver
from fastapi.responses import StreamingResponse
from io import BytesIO
from app.apifunctions import search__url, screenshot__page, text__fromViz, instagram__scraping, images__analysis, instagram__connexion, scrap__facebookImage
from pydantic import BaseModel
import json
from fastapi.templating import Jinja2Templates
import os




class JackpotRequestBody(BaseModel):

    model : str  
    url : str 
    yTop : float 
    xTop : float
    yLow : float 
    xLow : float 

class ListJackpotRequestBody(BaseModel):
    
    data : list[JackpotRequestBody]

router = APIRouter()

script_dir = os.path.dirname(__file__)
template_abs_file_path = os.path.join(script_dir, "templates/")
templates = Jinja2Templates(directory=template_abs_file_path)





parent__path = os.path.dirname(script_dir)
driver__path= os.path.join(parent__path, "utils/chromedriver/chromedriver.exe")
options = webdriver.ChromeOptions()
options.add_argument("--disable-popup-blocking")
options.add_argument("--disable-notifications")
options.add_argument('headless')
options.add_argument('--ignore-ssl-errors=yes')
options.add_argument('--ignore-certificate-errors')
# driver = webdriver.Chrome(driver__path,options=options)

# driver = webdriver.Remote("https://standalone-chrome-tnsbggprqa-od.a.run.app:4444", options=options)

# driver = webdriver.Remote(
# command_executor='http://localhost:4444/wd/hub',
# options=options
# )

@router.get("/screenshot")
async def get__screenshot(url):
    """return full page screenshot from url"""
    try :
        # driver = webdriver.Chrome(driver__path,options=options)
        driver = webdriver.Remote(
        command_executor='http://selenium-hub:4444/wd/hub',
        options=options
        )
        # driver = webdriver.Remote("https://standalone-chrome-tnsbggprqa-od.a.run.app:4444/wd/hub", options=options)
        search__url(driver, url)
        screenshot = screenshot__page(driver)
        req__image = BytesIO()
        screenshot.save(req__image, "JPEG") 
        req__image.seek(0)


    except :

        raise HTTPException(status_code=404)  

    else : 

        return  StreamingResponse(req__image, media_type="image/jpeg")

    finally : 
        try :
            driver.close()
            driver.quit()

        except : 
            pass

@router.get("/facebookproxy/{image__url:path}")
async def get__facebookImage(request: Request, image__url : str):
    try :

        image = scrap__facebookImage(image__url=image__url + "?" + str(request.query_params))
        
    except :

        raise HTTPException(status_code=404)  

    else : 

        return  StreamingResponse(image, media_type="image/jpeg")

@router.post("/img2text")
async def post__textFromViz(model: str = "easyOcr", img : UploadFile = File(...)):
    """return text from image"""

    try : 
        image = img.file.read()
        result = text__fromViz(image, model)


    except : 

        raise HTTPException(status_code=404)  

    else : 
    
        return Response(content=result, media_type="application/json")

@router.post("/jackpot")
async def post__jackpot(body : JackpotRequestBody):
    """return jackpot from url and coords jackpot box"""
    print("Jackpot from url process : ",)
    try : 
  
        # driver = webdriver.Chrome(driver__path,options=options)
        driver = webdriver.Remote(
        command_executor='http://selenium-hub:4444/wd/hub',
        options=options
        )
        # driver = webdriver.Remote("https://standalone-chrome-tnsbggprqa-od.a.run.app:4444/wd/hub", options=options)

        print("   - Open driver : finished")


        search__url(driver, body.url)
        print("   - Search Page : finished")
        screenshot = screenshot__page(driver)   
        print("   - ScreenShot : finished")
        screenshot__cropped = screenshot.crop((body.xLow, body.yLow, body.xTop, body.yTop))
        print("   - ScreenShot cropping : finished")
        req__image = BytesIO()
        image = BytesIO()
        screenshot__cropped.save(req__image, "JPEG")
        screenshot__cropped.save(image, "JPEG")
        req__image.seek(0)
        image.seek(0)
        print("   - Image to Bytes: finished")

        image = image.read()
        result = text__fromViz(image, body.model)
        print("   - Text Extraction: finished")

    
    except :
    
        raise HTTPException(status_code=404)  

    else : 


        return  StreamingResponse(req__image, media_type="image/jpeg", headers = {"result" : result})



    finally : 

        try :
            driver.close()
            driver.quit()

        except : 
            pass

@router.post("/autojackpot")
async def post__autojackpot(body: ListJackpotRequestBody):
    """return jackpot from url and coords jackpot box"""

    print("Get jackpot from multiple website : ")

    try : 

        # print(data)
  
        # driver = webdriver.Chrome(driver__path,options=options)
        driver = webdriver.Remote(
        command_executor='http://selenium-hub:4444/wd/hub',
        options=options
        )
        # driver = webdriver.Remote("https://standalone-chrome-tnsbggprqa-od.a.run.app:4444/wd/hub", options=options)

        print("   - Open driver : finished")

        res = {}

        for element in body.data: 
            # print(element)

            try : 
                print("   - url : {}".format(element.url))
                search__url(driver, element.url)
                print("   - Search Page : finished")
                screenshot = screenshot__page(driver)   
                print("   - ScreenShot : finished")
                screenshot__cropped = screenshot.crop((element.xLow, element.yLow, element.xTop, element.yTop))
                print("   - ScreenShot cropping : finished")
                req__image = BytesIO()
                image = BytesIO()
                screenshot__cropped.save(req__image, "JPEG")
                screenshot__cropped.save(image, "JPEG")
                req__image.seek(0)
                image.seek(0)
                print("   - Image to Bytes: finished")

                image = image.read()
                result = text__fromViz(image, element.model)
                res[element.url] = json.loads(result)
                print("   - Text Extraction: finished")
            
            except : 
                pass

    
    except :
    
        raise HTTPException(status_code=404)  

    else : 


        res = json.dumps(res)
        return Response(content=res, media_type="application/json")



    finally : 

        try :
            driver.close()
            driver.quit()

        except : 
            pass

@router.get("/instajackpot")
async def get__instaJackpot(feedName):
    """return intagram feed jackpot image"""
    try :
        # driver = webdriver.Chrome(driver__path,options=options)
        driver = webdriver.Remote(
        command_executor='http://selenium-hub:4444/wd/hub',
        options=options
        )
        # driver = webdriver.Remote("https://standalone-chrome-tnsbggprqa-od.a.run.app:4444/wd/hub", options=options)


        instagram__connexion(driver)
        links = instagram__scraping(driver, feedName)
        jackpot_linksandBoxes = images__analysis(links, feedName,text__fromViz)

        # with open('json_data.json', 'w') as outfile:
        #     json.dump(jackpot__links, outfile)


        # f = open('json_data.json')
        # data = json.load(f)
        
        

    except :

        raise HTTPException(status_code=404)  

    else : 

        # return  jackpot__links
        return jackpot_linksandBoxes


    finally : 

        try :
            driver.close()
            driver.quit()

        except : 
            pass

@router.get("/home",  response_class=HTMLResponse)
async def root(request : Request):
    return templates.TemplateResponse("home.html", {"request": request })

@router.get("/url2image",  response_class=HTMLResponse)
async def root(request : Request):
    return templates.TemplateResponse("url2image.html", {"request": request })

@router.get("/roiEditor",  response_class=HTMLResponse)
async def root(request : Request):
    return templates.TemplateResponse("roiEditor.html", {"request": request })

@router.get("/img2text",  response_class=HTMLResponse)
async def root(request : Request):
    return templates.TemplateResponse("img2text.html", {"request": request })

@router.get("/url2jackpot",  response_class=HTMLResponse)
async def root(request : Request):
    return templates.TemplateResponse("url2jackpot.html", {"request": request })

@router.get("/insta",  response_class=HTMLResponse)
async def root(request : Request):
    return templates.TemplateResponse("instaManager.html", {"request": request })




    