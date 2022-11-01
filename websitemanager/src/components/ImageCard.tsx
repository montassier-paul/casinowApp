import './ImageCard.css'
import { propsImageCard } from '../interfaces'
import DeleteIcon from '@mui/icons-material/Delete';

function ImageCard(props: propsImageCard) {

  const handleOnClick = () => {

    

    if (props.data.imageFile) {
      props.functions.handleRemoveImage(props.data.imageFile)
    }
    else if (props.data.imageUrl) {
      props.functions.handleRemoveImage(props.data.imageUrl)
    }


  }


  const image: string | undefined = props.data.imageFile ? URL.createObjectURL(props.data.imageFile) : props.data.imageUrl ? props.data.imageUrl : undefined




  return (
    <div className='imageCard'>
      <img src={image} />
      <div className='deleteButton' onClick={handleOnClick}>
        <DeleteIcon />
      </div>
      <br />

    </div>
  )
}

export default ImageCard