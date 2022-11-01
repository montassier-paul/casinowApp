import easyocr
import json 
import numpy as np
import pytesseract
import os
from pytesseract import Output
from enum import Enum
from PIL import Image
import io
from imutils.object_detection import non_max_suppression
import cv2

script_dir = os.path.dirname(__file__)
parent__path = os.path.dirname(script_dir)
pytesseract__path= os.path.join(parent__path, "utils/tesseract/tesseract.exe")
east__path = os.path.join(parent__path, "utils/east/frozen__east.pb")

# pytesseract.pytesseract.tesseract_cmd = pytesseract__path

model__easyocr = easyocr.Reader(['fr', "en"])

# east__modelPath = '{}/app/utils/east/frozen__east.pb'.format(os.getcwdb().decode("utf-8"))

class Model(Enum):
    EASYOCR = "easyOcr"
    PYTESSERACT = "pytesseract" 
    EAST = "east"


def convertResult(result) : 
    convertedResult = []
    n_boxes = len(result['text'])
    for i in range(n_boxes):
        if int(result['conf'][i]) >= 0 and len(result["text"][i]) > 0:
            (ll, lh, rh, rl) = ([result['left'][i], result['top'][i] + result['height'][i]], 
            [result['left'][i] + result['width'][i], result['top'][i] + result['height'][i]],
            [result['left'][i] + result['width'][i] , result['top'][i]], 
            [ result['left'][i], result['top'][i]])
            convertedResult.append(([ll, lh, rh, rl], result["text"][i],result['conf'][i] / 100))
    
    return convertedResult

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)

def boxes__processing(scores, geometry): 
    (numRows, numCols) = scores.shape[2:4]
    rects = []
    confidences = []
    for y in range(0, numRows):
        scoresData = scores[0, 0, y]
        xData0 = geometry[0, 0, y]
        xData1 = geometry[0, 1, y]
        xData2 = geometry[0, 2, y]
        xData3 = geometry[0, 3, y]
        anglesData = geometry[0, 4, y]

        for x in range(0, numCols):
            # if our score does not have sufficient probability, ignore it
            if scoresData[x] < 0.3:
                continue

            # compute the offset factor as our resulting feature maps will
            # be 4x smaller than the input image
            (offsetX, offsetY) = (x * 4.0, y * 4.0)

            # extract the rotation angle for the prediction and then
            # compute the sin and cosine
            angle = anglesData[x]
            cos = np.cos(angle)
            sin = np.sin(angle)

            # use the geometry volume to derive the width and height of
            # the bounding box
            h = xData0[x] + xData2[x]
            w = xData1[x] + xData3[x]

            # compute both the starting and ending (x, y)-coordinates for
            # the text prediction bounding box
            endX = int(offsetX + (cos * xData1[x]) + (sin * xData2[x]))
            endY = int(offsetY - (sin * xData1[x]) + (cos * xData2[x]))
            startX = int(endX - w)
            startY = int(endY - h)

            # add the bounding box coordinates and probability score to
            # our respective l
            rects.append((startX, startY, endX, endY))
            confidences.append(scoresData[x])
 
    if (len(rects) > 0) : 
        boxes = np.insert(non_max_suppression(np.array(rects), probs=confidences), 4,0, axis=1).astype(float)
    else : 
        boxes = np.array([])

    for k in range(boxes.shape[0]) : 
        for i in range(len(boxes)):
            if(tuple(boxes[k][:-1]) == boxes[i]):
                boxes[k,4] = confidences[i]
                break

    return boxes

def text__fromViz(img : bytes, model=Model.EASYOCR.value) -> json:
    match model:
        case Model.EASYOCR.value:
            result = model__easyocr.readtext(img)
            result = json.dumps(result, cls=NpEncoder)
            return result
        
        case Model.PYTESSERACT.value:
            #configuration setting to convert image to data. 
            custom_config = r' -l eng+fra --oem 3 --psm 4'
            result = pytesseract.image_to_data(Image.open(io.BytesIO(img)), config=custom_config, output_type=Output.DICT)
            #convert to managable data format 
            result = convertResult(result)
            result = json.dumps(result, cls=NpEncoder)
            return result

        case Model.EAST.value:
            #2 steps : 1- detect text position  2- Text recognizion
            
            img = np.array(Image.open(io.BytesIO(img)).convert('RGB'))
            # print(test.size)
            # print(test.mode)
            # print(img.shape)

            # if (len(img.shape) == 2):
            #     img = np.tile(img[:,:, None],(1,1,3))

            # elif(img.shape[2] > 3) : 
            #     img = img[:,:,:3]


            # image height and width should be multiple of 32
            imgWidth=max(img.shape[1] //32  * 32, 320)
            imgHeight=max(img.shape[0] //32  * 32, 320)


            orig = img.copy()
            (H, W) = img.shape[:2]
            (newW, newH) = (imgWidth, imgHeight)

            rW = W / float(newW)
            rH = H / float(newH)
            img = cv2.resize(img, (newH, newW))

            (H, W) = img.shape[:2]

            # Image.fromarray(img).save("image.jpg")

            #load model
            net = cv2.dnn.readNet(east__path)
            
            blob = cv2.dnn.blobFromImage(img, 1.0, (H,W),
                             (123.68, 116.78, 103.94), swapRB=True, crop=False)

            outputLayers = ["feature_fusion/Conv_7/Sigmoid","feature_fusion/concat_3"]
            net.setInput(blob)
            (scores, geometry) = net.forward(outputLayers)
            
            
            boxes = boxes__processing(scores, geometry)

            result = []
            # loop over the bounding boxes to find the coordinate of bounding boxes
            for (startX, startY, endX, endY, prob) in boxes:
                # scale the coordinates based on the respective ratios in order to reflect bounding box on the original image
                startX = max(int(startX * rW), 0)
                startY = max(int(startY * rH), 0)
                endX = min(int(endX * rW), orig.shape[1])
                endY = min(int(endY * rH), orig.shape[0])
                
 
                # extract the region of interest
                r = orig[startY:endY,startX:endX, :]
                
                # Image.fromarray(r).save("{}.jpg".format(np.random.randint(100)))
            
                #configuration setting to convert image to string.  
                configuration = ('-l eng+fra --oem 3 --psm 8')
                ##This will recognize the text from the image of bounding box
                text = pytesseract.image_to_string(r, config=configuration)
                if len(text) >= 0 : 
                # append bbox coordinate and associated text to the list of results 
                    position = [[startX, startY],[endX, startY],[endX, endY],[startX, endY]]
                    result.append((position, text, prob))


            result = json.dumps(result, cls=NpEncoder)
            return result

        case _ : 
            result = model__easyocr.readtext(img)
            result = json.dumps(result, cls=NpEncoder)
            return result


    
