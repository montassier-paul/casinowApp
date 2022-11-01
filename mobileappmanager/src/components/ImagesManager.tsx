import "./ImagesManager.css"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { useState } from "react"
import { propsImagesManager } from "../interfaces/interfaces"


const ImagesManager = (props: propsImagesManager) => {

  const { data, functions } = props

  const [image, setImage] = useState<string>()
  const [file, setFile] = useState<File>()


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setImage(URL.createObjectURL(event.currentTarget.files[0]))
      setFile(event.currentTarget.files[0])
    }
  }

  const reset = () => {
    setImage(undefined)
    setFile(undefined)

  }



  return (
    <main className="main-images-manager">
      <div className="images-manager-title">
        <h2>
          Manage casino's images
        </h2>
      </div>

      <div className="images-manager">
        <div className="new-image-form">
          <input type="file" id="my-file" multiple accept="image/*" onChange={handleChange} className="hidden" />
          <div className="add-image">
            {image
              ? <img src={image} className='image-image-manager' />

              :
              <label htmlFor="my-file" className="upload-label">
                <AiOutlinePlusCircle size={30} />
              </label>
            }
          </div>

          {file &&
            <div className="upload-buttons-image-manager-container">
              <button onClick={() => functions.uploadImage(file)} className='new-image-button'>
                Upload
              </button>

              <button onClick={() => reset()} className='new-image-button'>
                Change Image
              </button>
            </div>
          }

        </div>
        <div className="images-gallerie">
          {data.casinoInfo.images?.map((url, key) => {
            return <div className="image-card" key={key}>
              <img src={url} className='image-image-manager' />
              <button onClick={() => functions.deleteImage(url)} className="delete-button-image-manager">
                delete image
              </button>
            </div>
          })
          }
        </div>
      </div>
    </main>
  )
}

export default ImagesManager