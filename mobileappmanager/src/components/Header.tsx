import { propsHeaderComponent } from '../interfaces/interfaces'
import "./Header.css"
import { IoExitOutline } from 'react-icons/io5';
import { HandleLogout } from '../firebase/authentification';

const Header = ({ data }: propsHeaderComponent) => {



    const handleQuit = () => {

        const res = HandleLogout()
    }

    return (
        <div className="header-main">
            <div className='header-titles-container'>
                <div>
                    <h1 className='casino-name'>{data.casinoName}</h1>
                </div>
                <div>
                    <p className='casino-adresse'>{data.casinoAdresse}</p>
                </div>
            </div>
            <button onClick={handleQuit} className='button-disconnect-header'>
                <IoExitOutline fontSize={24}/>
            </button>
        </div>
    )
}

export default Header