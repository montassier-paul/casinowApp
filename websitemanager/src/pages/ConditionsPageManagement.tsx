import React, { useState, useContext, useEffect } from 'react';
import { EditorState,  convertToRaw, ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './ConditionsPageManagement.css';
import { Button_DUC } from '../components/buttons';
import draftToHtml from 'draftjs-to-html';
import ApiContext from '../context/ApiContext';
import htmlToDraft from 'html-to-draftjs';



function Conditions() {

  const {loadImage} = useContext(ApiContext)
  const {websiteData, getWebsiteData, updateWebSiteData} = useContext(ApiContext)

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const  [convertedContent, setConvertedContent] = useState<string>('');

  const htmlToDraftBlocks = (html : string) => {
      const blocksFromHtml = htmlToDraft(html);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      return editorState;
   }

  useEffect(() => {    

    getWebsiteData()
  
    if(websiteData?.conditions){
      setConvertedContent(websiteData.conditions)
      setEditorState(htmlToDraftBlocks(websiteData.conditions))


    }
    
  
  }, [websiteData])




  const uploadImageCallBack = (file : File) => {

    return new Promise((resolve, reject) => {


      loadImage(file).then((res) => resolve ( { data: { link: res}}) ).catch((err) => reject(err))
      

    }) 
      
    
  }
 
  const handleEditorChange = (state: React.SetStateAction<EditorState>) => {
    setEditorState(state);
    convertContentToHTML();
  }

  const convertContentToHTML = () => {
    let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    setConvertedContent(currentContentAsHTML);
  }
  const createMarkup = (html: string | Node) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  const handleSave = () => {

    updateWebSiteData({...websiteData, conditions : convertedContent})

  }

  
    return ( 

      <div className='conditionsPageManagement'>

        <div className='conditionsPageManagement__button'>
          <Button_DUC data={{context : "save"}}  functions={{handleOnClick : handleSave}}/>
        </div>
        <h2>Edit user conditions</h2>



        <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
    
        <Editor  editorState={editorState}
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

export default Conditions
