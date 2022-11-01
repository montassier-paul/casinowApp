import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./WebsiteManagementComponent.css"


function WebsiteMangementComponent() {

  const navigate = useNavigate()

  const openInNewTab = (url : string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };


  return (
    <div className='websiteManagementComponent'>
      <h2>Manage the website</h2>

      <div className='websiteManagementComponent_body'>

        <div onClick={() => navigate("../websiteManagement/home")}>
          <h4>Manage HomePage</h4>
        </div>

        <div onClick={() => navigate("../websiteManagement/conditions")}>
          <h4>Manage Conditions d'utilisation</h4>
        </div>


        <div onClick={() => navigate("../websiteManagement/learn")}>
          <h4>Manage LearnPage</h4>
        </div>

        <div onClick={() => openInNewTab('http://localhost:8002/home')}>
          <h4>Visit Website</h4>
        </div>


      </div>
    </div>
  )
}

export default WebsiteMangementComponent