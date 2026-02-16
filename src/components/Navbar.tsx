import menu_icon from '../assets/menu.png'
import logo from '../assets/logo.png'
import search_icon from '../assets/search.png'
import upload_icon from '../assets/upload.png'
import more_icon from '../assets/more.png'
import notification_icon from '../assets/notification.png'
import profile_icon from '../assets/jack.png'
import { useContext } from 'react'
import { Context } from '../context/Context'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {

  const { setSidebar, search, setSearch, setSearchClick } = useContext(Context);
  const navigate = useNavigate();
  const handleSidebar = () => {
    setSidebar(prev => !prev);
  }

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value);
  }

  const handelSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchClick(prev => !prev);
    if (search.length !== 0) {
      navigate('/search');
    } else {
      navigate('/');
    }
  };


  return (
    <nav className='flex items-center py-[0.625rem] px-[2%] justify-between shadow-[0_0_10px_rgba(0,0,0,0.2)] bg-[#fff] sticky top-0 z-10'>
      <div className='flex items-center max-md:mr-2'>
        <img className='w-[22px] mr-[25px] max-sm:hidden' src={menu_icon} onClick={handleSidebar} alt="menu_icon.png" />
        <Link to={'/'}><img className='w-[130px]' src={logo} alt="logo_icon.png" /></Link>
      </div>

      <div className='flex items-center w-[40%] max-md:w-[70%]'>
        <form onSubmit={handelSearchSubmit} className='flex flex-1 items-center border-[1px] border-[#ccc] mr-[15px] py-2 px-3 rounded-[25px]'>
          <input
            className='w-[98%] border-none outline-none bg-transparent'
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder='Search'
          />
          <button type="submit">
            <img className='w-[15px]' src={search_icon} alt="search_icon.png" />
          </button>
        </form>
      </div>

      <div className='flex items-center max-md:hidden'>
        <img className='w-[25px] mr-[25px]' src={upload_icon} alt="upload_icon.png" />
        <img className='w-[25px] mr-[25px]' src={more_icon} alt="more_icon.png" />
        <img className='w-[25px] mr-[25px]' src={notification_icon} alt="notification_icon.png" />
        <img className='w-[35px] mr-[25px] rounded-full' src={profile_icon} alt="profile_icon.png" />
      </div>
    </nav>
  )
}

export default Navbar