import React, {useState, useContext, useEffect} from 'react'
import "./LearnPageManagement.css"
import { EditorState,  convertToRaw, ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button_DUC } from '../components/buttons';
import ApiContext from '../context/ApiContext';
import htmlToDraft from 'html-to-draftjs';

interface propsEditorComponent {

  data : {
    titre : string, 
    key : number, 
    contenu : string, 
  }

  functions : {
    handleChangeTitle : (newTitle : string, k : number) => void, 
    handleChangeText : (newText : string, k : number)  => void
  }

}

const EditorComponent = (props : propsEditorComponent) => {

  const  [convertedContent, setConvertedContent] = useState<string>('');
  const { loadImage } = useContext(ApiContext)
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  useEffect(() => {



    if(props.data.contenu){


      setConvertedContent(props.data.contenu)
      setEditorState(htmlToDraftBlocks(props.data.contenu))

    }

    


  }, [props.data.key])

  const handleChangeTitle = (event : React.ChangeEvent<HTMLInputElement>  |  React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    props.functions.handleChangeTitle(event.target.value, props.data.key)

  }

  


  const htmlToDraftBlocks = (html : string) => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
 }



  const handleEditorChange = (state: React.SetStateAction<EditorState>) => {
    setEditorState(state);
    convertContentToHTML();
  }

  const convertContentToHTML = () => {

    let currentContentAsHTML = draftToHtml( convertToRaw(editorState.getCurrentContent()))
    props.functions.handleChangeText(currentContentAsHTML, props.data.key)
    setConvertedContent(currentContentAsHTML);
  }
  const createMarkup = (html: string | Node) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  const uploadImageCallBack = (file : File) => {

    return new Promise((resolve, reject) => {


      loadImage(file).then((res) => resolve ( { data: { link: res}}) ).catch((err) => reject(err))
      

    }) 
      
    
  }

  return (

    <div className='learnEditor'>

    <h2>Edit Game rules</h2>

    <label htmlFor='game_titre'>Entrez le nom du jeu :
    <input id='game__titre' placeholder={"Nom du jeu"} value={props.data.titre} onChange={handleChangeTitle}/>
    </label>

    <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>

    <Editor editorState={editorState}
      onEditorStateChange={handleEditorChange}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
      toolbar={{
        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'history'],
        embedded: {
          defaultSize: {
            height: '300',
            width: '300',
          },

        },
        image: {
            urlEnabled: true,
            uploadEnabled: true,
           alignmentEnabled: true,
            previewImage: true,
           uploadCallback: uploadImageCallBack, 
           defaultSize: {
            height: '300',
            width: '300',
          },
           },
      }}
      />

  </div>

  )
}

function LearnPageManagement() {


  const [content, setContent] = useState<{titre : string, contenu : string}[]>([])
  const {websiteData, getWebsiteData, updateWebSiteData} = useContext(ApiContext)
  const [key, setKey] = useState(0)

  useEffect(() => {   
  

    getWebsiteData()
  
    if(websiteData?.learnGames?.length){

      setContent(websiteData?.learnGames)

    }
    
  
  }, [websiteData])



  const handleSelectGame = (key : number) => {

    setKey(key)


  }

  const handleNewGameClick = () => {

    setKey(content.length)
    setContent(prev => [...prev, {titre : 'Titre', contenu : 'Décrivez votre jeu'}])

  }

  const handleCancelOnClick = () => {

    if(websiteData?.learnGames?.length){
      setContent(websiteData?.learnGames)

    }

    setKey(0)

  }

  const handleChangeTitle = (newTitle : string, k : number) => {

    setContent(prev => prev.map((data, key) => {
      if(key === k){
        return {...data, titre : newTitle}
      }
      return data
    }))

  }

  const handleChangeText = (newText : string, k : number) => {

    setContent(prev => prev.map((data, key) => {
      if(key === k){
        return {...data, contenu : newText}
      }
      return data
    }))

  }

  const handleUpdate= () => {

    updateWebSiteData({...websiteData, learnGames : content})

  }

  return (
    <div className='learnPageManagement'>

      <div className='casinoPage_buttons'>
        <Button_DUC data={{ context: "update" }} functions={{ handleOnClick:handleUpdate }} />
        <Button_DUC data={{ context: "cancel" }} functions={{ handleOnClick: handleCancelOnClick }} />
      </div>

      <h2>Learn Game editor</h2>

      <div className='learnSelectBar'>
       {content.map((game, key) => {
        return <div onClick={(e) => handleSelectGame(key)} key={key}>{game.titre}</div>
       })}

        <div onClick={handleNewGameClick}>New Game</div>
      </div>
          {content[key]?.contenu &&
          <EditorComponent data={{...content[key], ...{key : key}}} functions={{handleChangeTitle : handleChangeTitle, handleChangeText : handleChangeText}}/>
          }
    </div>  
  )
}

export default LearnPageManagement