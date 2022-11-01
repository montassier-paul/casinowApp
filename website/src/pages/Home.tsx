import React, { useEffect } from 'react'
import "./Home.css"
import { Parallax } from 'react-parallax';
import { useAppSelector } from '../store';

function Home() {

  const homePageBand = useAppSelector(state => state.webData.websiteData?.homePageBand)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])



  return (
    <div className='home'>

      {homePageBand?.map((band, key) => {
      
        let positionLeft = '50%'
        if(band.position === "left"){
          positionLeft = '20%'
        }
        if(band.position === "right"){
          positionLeft = '80%'
        }
        return <div key={key}>

          <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={band.image}
            bgImageAlt="the dog"
            strength={-200}>

            <div style={{ height: '100vh'}}>
              <div className="parallax__textContainer" style={{left : positionLeft}}>
                {band.texte}
              </div>
            </div>

          </Parallax>

          <h2>| | |</h2>
        </div>
      })}
      {/* <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={'https://images.pexels.com/photos/2945692/pexels-photo-2945692.jpeg?auto=compress&cs=tinysrgb&w=2000'}
        bgImageAlt="the dog"
        strength={-200}>

        <div style={{ height: '100vh' }}>
          <div className="parallaxOne__textContainer">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </Parallax>

      <h2>| | |</h2>

      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={'https://images.pexels.com/photos/3279695/pexels-photo-3279695.jpeg?auto=compress&cs=tinysrgb&w=2000'}
        bgImageAlt="the dog"
        strength={-200}>

        <div style={{ height: '100vh' }}>
          <div className="parallaxTwo__textContainer">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </Parallax>


      <h2>| | |</h2>

      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={'https://images.pexels.com/photos/7594229/pexels-photo-7594229.jpeg?auto=compress&cs=tinysrgb&w=2000'}
        bgImageAlt="the dog"
        strength={-200}>

        <div style={{ height: '100vh' }}>
          <div className="parallaxThree__textContainer">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </Parallax> */}
    </div>
  )
}

export default Home