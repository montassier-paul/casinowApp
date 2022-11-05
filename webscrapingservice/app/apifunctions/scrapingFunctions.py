
import io
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
from PIL import Image
import requests
import json



def search__url(driver, url):
    
    print("website search : ", end='')
    

    driver.get(url)
    buttons = [*driver.find_elements(By.XPATH, "//*[contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), 'accepter')]"),
                *driver.find_elements(By.XPATH,  "//*[contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), 'autoriser')]")]


    for button in buttons :
        try : 
            button.click()
            # break
        except BaseException as err: 
                pass 
           


    time.sleep(10)
    print("Finished")
    
def screenshot__page(driver):
    
    
        print("website screenshot : ", end='')
        
        try : 
        
            js = 'return Math.max( document.body.scrollHeight, document.body.offsetHeight,  document.documentElement.clientHeight,  document.documentElement.scrollHeight,  document.documentElement.offsetHeight);'
            scrollheight = driver.execute_script(js)
            slices = []
            offset = 0
            while offset < scrollheight:
                driver.execute_script("window.scrollTo(0, %s);" % offset)
                time.sleep(5)
                img = Image.open(io.BytesIO(driver.get_screenshot_as_png()))
                offset += int(img.size[1] * 0.85)
                slices.append(img)   
                
       
               
            diff = (offset - scrollheight)
            screenshot__height = 0
            for img in slices[:-1]:
                screenshot__height += img.size[1]

            screenshot__height += diff   
                
            screenshot = Image.new('RGB', (slices[0].size[0], screenshot__height))
            offset = 0
            for img in slices[:-1]:
                screenshot.paste(img, (0, offset))
                offset += img.size[1] 
            img = slices[-1]
            screenshot.paste(img.crop((0,img.size[1] - diff, img.size[0] , img.size[1])), (0, offset))


            print("Finished")
            return screenshot
            
        except BaseException as err: 

            print('Failed')
            
def instagram__connexion(driver):
    print("instagram account connection : ", end='')     
        
    try :
        driver.get("https://www.instagram.com/?hl=fr")
        time.sleep(2)
        buttons = [*driver.find_elements(By.XPATH, "//*[contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), 'accepter')]"),
                *driver.find_elements(By.XPATH,  "//*[contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'), 'autoriser')]")]


        for button in buttons :
            try : 
                button.click()
                # break
            except BaseException as err: 
                    pass 
                
                
        time.sleep(2)
        username=driver.find_element(By.NAME, 'username')
        password=driver.find_element(By.NAME, 'password')
        username.clear()
        password.clear()
        password.send_keys("7!A8_u6a+dg*bP!")
        username.send_keys("paul.montassier.pro@gmail.com")
        buttons = [*driver.find_elements(By.XPATH, "//*[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz') = 'se connecter']")]
        for button in buttons :
            try : 
                button.click()
                # break
            except BaseException as err: 
                    pass
        time.sleep(5)
        buttons = [*driver.find_elements(By.XPATH, "//*[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz') = 'plus tard']")]
        for button in buttons :
            try : 
                button.click()
                # break
            except BaseException as err: 
                    pass
                
        
    except Exception as e:
        print('Failed')
        raise e


    else : 
        print("finished")
 
def instagram__scraping(driver, feedName) -> list[str]:
    try : 
        instagram__feedSearch(driver, feedName)
        instagram__feedScroll(driver, feedName)
        links = instagram__getLinks(driver, feedName)
    
    except Exception as e:

        raise e

    else : 
        return links

def instagram__feedSearch(driver, feedName): 

    try :

        print("research feed {} : ".format(feedName), end = '')
        time.sleep(10)
        driver.find_element(By.XPATH, "//*[name()='svg' and @aria-label='Recherche']").click()     
        time.sleep(10)
        searchbox = driver.find_element(By.XPATH, "//input[@type='text']")
        searchbox.clear()
        searchbox.send_keys(feedName)
        time.sleep(10)
        searchbox.send_keys(Keys.ENTER)
        time.sleep(10)
        searchbox.send_keys(Keys.ENTER)
        
    except Exception as e:
        print('Failed')
        raise e

    else : 
        print("finished")

def instagram__feedScroll(driver, feedName : str) :    
    try : 

        print("scroll through profile {} : ".format(feedName), end='')
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);var scrolldown=document.body.scrollHeight;return scrolldown;")
        scrollNumber = 0
        
        while(scrollNumber < 5):
            
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);var scrolldown=document.body.scrollHeight;return scrolldown;")
            time.sleep(5)
            scrollNumber = scrollNumber + 1
            
        
    except Exception as e:
        print('Failed')
        raise e

    else : 
        
        print("finished")

def instagram__getLinks(driver, feedName : str) -> list[str] :

    try :     
        print("get images ref from profile {} : ".format(feedName), end='')
        posts = driver.find_elements(By.XPATH, "//a[contains(@href, '/p/')]")   
        images__links = []
        for post in posts:
            if post.find_element(By.CSS_SELECTOR, "img").get_attribute('src'):
                img = post.find_element(By.CSS_SELECTOR, "img").get_attribute('src')
                images__links.append(img)
                
    except Exception as e:
        print('Failed')
        raise e
        
    else : 
        print("finished")
        return images__links
   
def images__analysis(links, feedName, ocrFunction) -> json:

    try : 

    # url = "https://scontent-cdg2-1.cdninstagram.com/v/t51.2885-15/274251387_135214312333679_2455389994544310173_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-cdg2-1.cdninstagram.com&_nc_cat=111&_nc_ohc=YYniuz3yGfQAX_v6a0n&tn=cpxvmHGTNOLAF-uc&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=Mjc3NTcyNzI4NTY5NDg4NDIyNA%3D%3D.2-ccb7-5&oh=00_AT_kdIb55itK1GQ3Y5ypzgMhkapdL7amdqtC_8qZkOOJaA&oe=63587AD1&_nc_sid=6136e7"
    # im = Image.open(requests.get(url, stream=True).raw)
    

        print("Analysis images from profile {} : ".format(feedName), end='')
        jackpot_linksandBoxes = []
        for link in links:	

            try : 

                im = Image.open(requests.get(link, stream=True).raw)
                image = io.BytesIO()
                im.save(image, "JPEG")
                image.seek(0)
                image = image.read()

                result = ocrFunction(image)

                if (len(json.loads(result)) > 0):
                    for textbox in json.loads(result) : 
                        if textbox[2] > 0.6 : 
                            jackpot_linksandBoxes.append([link, json.loads(result)])
                            break

            except : 

                pass

    except Exception as e:
        print('Failed')
        raise e

    else : 
        
        print("finished")
        return json.dumps(jackpot_linksandBoxes)

def scrap__facebookImage(image__url : str) -> io.BytesIO:
    
    # print(image__url)

    im = Image.open(requests.get(image__url, stream=True).raw)

    req__image = io.BytesIO()
    im.save(req__image, "JPEG")
    req__image.seek(0)

    return req__image













      
        
        
        
        
     


