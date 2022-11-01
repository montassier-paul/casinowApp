import React, { useState, useEffect } from 'react'
import { Button_DUC } from './buttons'
import "./CasinoImagesComponent.css"
import ImageCard from './ImageCard'
import useMediaQuery from '@mui/material/useMediaQuery';
import { propsCasinoImagesComponent } from '../interfaces';

function CasinoImagesComponent(props : propsCasinoImagesComponent) {

  const [newImage, setNewImage] = useState<File>()
  const [imageSerialized, setImageSerialized] = useState<string>()

  const small_screen = useMediaQuery('(max-width:750px)');
  const [mainClassName, setMainClassName] = useState("casinosImagesComponent")
  const [bodyClassName, setBodyClassName] = useState("casinosImagesComponent_body")

  useEffect(() => {

    if(small_screen){
      setMainClassName("casinosImagesComponent_smallScreen")
      setBodyClassName("casinosImagesComponent_body_smallScreen")
    }
    else{
      setMainClassName("casinosImagesComponent")
      setBodyClassName("casinosImagesComponent_body")
    }

  }, [small_screen])

  const handleFileInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget.files) {
      setNewImage(e.currentTarget.files[0])
      setImageSerialized(URL.createObjectURL(e.currentTarget.files[0]))

    }

  }

  const handleNewImage = () => {
    setNewImage(undefined)
    setImageSerialized(undefined)
  }


  const handleAddImage = () => {

    if(newImage){

      props.functions.handleAddImage(newImage)
      setNewImage(undefined)
      setImageSerialized(undefined)

      

    }
   

  }

  const handleRemoveImage = (imageToRemove : File | string) => {

    props.functions.handleRemoveImage(imageToRemove)
  }







  return (
    <div className={mainClassName}>
      <h2>Casino's Images</h2>
      <div className={bodyClassName}>
        <div className='casinosImagesComponent_newImage'>

          {newImage
            ? <div className='newImageCard'>
              <img src={imageSerialized} />
              <div>
                <Button_DUC data={{ context: "new" }} functions={{handleOnClick : handleNewImage}} />
                <Button_DUC data={{ context: "add" }} functions={{handleOnClick : handleAddImage}} />   
              </div>

            </div>
            : <label className='newImage_dragAndDrop'>
              SELECT A IMAGE
              <input type="file" accept="image/png, image/jpeg" onChange={(e) => handleFileInput(e)} />
            </label>
          }

        </div>
        <div className='casinosImagesComponent_imagesList'>

          {props.data.images?.map((image, key) => {
          return <ImageCard data={{imageUrl : image}} functions={{handleRemoveImage : handleRemoveImage}} key={key}/>
         })}

         {props.data.newImages.map((image, key) => {
          return <ImageCard data={{imageFile : image}} functions={{handleRemoveImage : handleRemoveImage}} key={key}/>
         })
         }
          
        </div>
      </div>
    </div>
  )
}

export default CasinoImagesComponent