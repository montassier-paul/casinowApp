import React, { useState, useContext, useEffect } from 'react'
import { Button_DUC } from '../components/buttons'
import "./HomePageManagement.css"
import DeleteIcon from '@mui/icons-material/Delete';
import ApiContext from '../context/ApiContext';


interface propsHomePageBand {

  data : {
  image : string, 
  texte : string, 
  position : 'left' | 'center' | 'right', 
  key: number,


  }

  functions : {
    handleChangeText : (k : number, newText : string) => void, 
    handleChangeSelect : (k : number, newPosition : 'left' | 'center' | 'right') => void,
    handleChangeImage : (k : number, image : string) => void, 
    handleDeleteBand : (k : number) => void, 
  }

}


const HomePageBand = (props : propsHomePageBand) => {

  console.log("ici")


  const [imageSerialized, setImageSerialized] = useState<string | undefined>()
  const { loadImage } = useContext(ApiContext)

  const handleFileInput = (e: React.FormEvent<HTMLInputElement>) => {

    if (e.currentTarget.files) {
      loadImage(e.currentTarget.files[0]).then((res) => {
        setImageSerialized(res)
        props.functions.handleChangeImage(props.data.key, res)
    })    
    }

  }

  const handleChangeText = (event : React.ChangeEvent<HTMLInputElement>  |  React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    props.functions.handleChangeText(props.data.key, event.target.value)

  }

  const handleChangeSelect = (event : React.ChangeEvent<HTMLSelectElement>) => {

    if(event.target.value === "left" || event.target.value === "right" || event.target.value === "center"){

      props.functions.handleChangeSelect(props.data.key, event.target.value)
      
    }
    
    
  }

  const handleDeleteClick = () => {
    props.functions.handleDeleteBand(props.data.key)
  }

  useEffect(() => {

    if(props.data.image){
      setImageSerialized(props.data.image)
    }

    
  
  }, [])



  const handleNewImage = () => {
    setImageSerialized(undefined)
    props.functions.handleChangeImage(props.data.key, '')
  }
 
  return (
    <div className='homePageBand'>

      <div className="homePageBand__delete" onClick={handleDeleteClick}>
        <DeleteIcon />
      </div>
      <div className='homePageBand_newImage'>

        {imageSerialized
          ? <div className='newImageCard'>
            <img src={imageSerialized} />
            <div>
              <Button_DUC data={{ context: "new" }} functions={{ handleOnClick: handleNewImage }} />
            </div>

          </div>
          : <label className='newImage_dragAndDrop'>
            SELECT A IMAGE
            <input type="file" accept="image/png, image/jpeg" onChange={(e) => handleFileInput(e)} />
          </label>
        }

      </div>



      <textarea placeholder="texte d'acceuil" value={props.data.texte} onChange={handleChangeText}/>

      <label htmlFor="position">Choose a text position:</label>
      <select name="position" id="position" value={props.data.position} onChange={handleChangeSelect}>
        <option value="center">center</option>
        <option value="left">left</option>
        <option value="right">right</option>
      </select>

    </div>
  )
}


function HomePageManagement() {

  const [content, setContent] = useState<{image : string , texte : string, position : 'left' | 'center' | 'right'}[]>([])
  const {websiteData, getWebsiteData, updateWebSiteData} = useContext(ApiContext)

  useEffect(() => {    

    getWebsiteData()
  
    if(websiteData?.homePageBand){
      setContent(websiteData.homePageBand)
    }
    
  
  }, [websiteData])

  
  const handleChangeText = (k : number, newText : string) => {

    setContent(prev => prev.map((data, key) => {
      if(key === k){
        return {...data, texte : newText}
      }
      return data
    }))
    }

  const handleChangeSelect = (k : number, newPosition : 'left' | 'center' | 'right') => {

    setContent(prev => prev.map((data, key) => {
      if(key === k){
        return {...data, position : newPosition}
      }
      return data
    }))

    }

  const handleChangeImage = (k : number, newImage : string) => {

    setContent(prev => prev.map((data, key) => {
      if(key === k){
        return {...data, image : newImage}
      }
      return data
    }))

  }

  const handleDeleteBand = (k : number) => {

    setContent(prev => prev.filter((data, key) => {
      return key !== k

    }))

  } 

  const handleUpdateClick = () => {

    updateWebSiteData({...websiteData, homePageBand : content})

  }

  const handleCancelButton = () => {

    

    if(websiteData?.homePageBand){
      setContent(websiteData.homePageBand)
    }
    else {
      setContent([])
    }

  }

  const handleNewOnClick = () => {
    setContent(prev => [...prev, { image: '', texte: '', position: 'center'}])

  }



  return (
    <div className='homePageManagement'>

      <div className='casinoPage_buttons'>
        <Button_DUC data={{ context: "update" }} functions={{ handleOnClick: handleUpdateClick}} />
        <Button_DUC data={{ context: "cancel" }} functions={{ handleOnClick : handleCancelButton}} />
      </div>

      <h2>Manage Home Page</h2>

      {content.map((data , key) => {

        return <HomePageBand key={key}  data={{...data, ...{key : key}}} functions = {{handleChangeText : handleChangeText, handleChangeSelect : handleChangeSelect, handleChangeImage : handleChangeImage, handleDeleteBand : handleDeleteBand}}/>

      })}


      <Button_DUC data={{ context: 'add' }} functions={{ handleOnClick: handleNewOnClick  }} />

    </div>
  )
}

export default HomePageManagement