import React, { useEffect } from 'react'
import "./Learn.css"
import ReactPlayer from 'react-player/lazy'
import { propsLearn } from '../interface'
import { useAppSelector } from '../store'



function Learn() {

  const learnGames = useAppSelector(state => state.webData.websiteData?.learnGames)

  const handleOnClickTitle = (title: string) => {

    const el = document.getElementById(title);
    if (el) {
      el.scrollIntoView()
    }

  }

  const createMarkup = (html: string) => {
    return  {
      // __html: DOMPurify.sanitize(html)
      __html: html
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="learnPage">
      <h2>Découvrir les jeux</h2>

      <div className='learnPage__sommaire'>
        {learnGames?.map((jeu, key) => {
          return <div key={key} onClick={(e) => handleOnClickTitle(jeu.titre)}>
            {jeu.titre}
          </div>
        })}
      </div>

      <div className='learnPage_gamesContainer'>
        {learnGames?.map((jeu, key) => {

          return <div className="learnPage_game" key={key} id={jeu.titre}>
            {(jeu.contenu || jeu.titre) &&

              <div className='learnPage_gameLeft'>
                <h3>{jeu.titre}</h3>
                <div  dangerouslySetInnerHTML={createMarkup(jeu.contenu)}></div>
              </div>

            }


          </div>
        })}
      </div>
    </div>
  )
}

export default Learn