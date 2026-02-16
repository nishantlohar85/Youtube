import home from '../assets/home.png'
import game_icon from '../assets/game_icon.png'
import automobiles from '../assets/automobiles.png'
import sports from '../assets/sports.png'
import entertainment from '../assets/entertainment.png'
import tech from '../assets/tech.png'
import music from '../assets/music.png'
import blogs from '../assets/blogs.png'
import news from '../assets/news.png'
import jack from '../assets/jack.png'
import simon from '../assets/simon.png'
import tom from '../assets/tom.png'
import megan from '../assets/megan.png'
import cameron from '../assets/cameron.png'
import { useContext } from 'react'
import { Context } from '../context/Context'

function Sidebar() {

  const {sidebar, category, setCategory} = useContext(Context);

  const handleCategories = (id: number) => {
    setCategory(id);
  }

  return (
    <div className={`h-[100vh] bg-white fixed top-0 ${sidebar ? "px-[2%]" : "pl-[2%] pr-[1%]"} pt-[80px] max-sm:hidden scrollbar`}>
      <div className='shortcutLinks-img'>
        <div className={`side-link ${category === 0 && 'active'}`} onClick={() => handleCategories(0)}>
          <img src={home} alt="home.png" />{sidebar && <p>Home</p>}
        </div>

        <div className={`side-link ${category === 20 && 'active'}`} onClick={() => handleCategories(20)}>
          <img src={game_icon} alt="game_icon.png" />{sidebar && <p>Gaming</p>}
        </div>

        <div className={`side-link ${category === 2 && 'active'}`} onClick={() => handleCategories(2)}>
          <img src={automobiles} alt="automobiles.png" />{sidebar && <p>Automobiles</p>}
        </div>

        <div className={`side-link ${category === 17 && 'active'}`} onClick={() => handleCategories(17)}>
          <img src={sports} alt="sports.png" />{sidebar && <p>Sports</p>}
        </div>

        <div className={`side-link ${category === 24 && 'active'}`} onClick={() => handleCategories(24)}>
          <img src={entertainment} alt="entertainment.png" />{sidebar && <p>Entertainment</p>}
        </div>

        <div className={`side-link ${category === 28 && 'active'}`} onClick={() => handleCategories(28)}>
          <img src={tech} alt="tech.png" />{sidebar && <p>Technology</p>}
        </div>

        <div className={`side-link ${category === 10 && 'active'}`} onClick={() => handleCategories(10)}>
          <img src={music} alt="music.png" />{sidebar && <p>Music</p>}
        </div>

        <div className={`side-link ${category === 22 && 'active'}`} onClick={() => handleCategories(22)}>
          <img src={blogs} alt="blogs.png" />{sidebar && <p>Blogs</p>}
        </div>

        <div className={`side-link ${category === 25 && 'active'}`} onClick={() => handleCategories(25)}>
          <img src={news} alt="news.png" />{sidebar && <p>News</p>}
        </div>

        <hr className={`border-0 w-[85%] ${sidebar ? "" : 'my-[20px]'} bg-[#ccc] h-[1px]`} />

      </div>

      <div className='subscribedList-img'>
        {sidebar && <h3 className='text-[13px] my-[20px] text-[#5a5a5a] font-semibold'>Subscribed</h3>}
        
        <div className='side-link'>
          <img src={jack} alt="jack.png" />{sidebar && <p>PewDiePie</p>}
        </div>

        <div className='side-link'>
          <img src={simon} alt="simon.png" />{sidebar && <p>MrBeast</p>}
        </div>

        <div className='side-link'>
          <img src={tom} alt="tom.png" />{sidebar && <p>Justin Bieber</p>}
        </div>

        <div className='side-link'>
          <img src={megan} alt="megan.png" />{sidebar && <p>5-Minute Crafts</p>}
        </div>

        <div className='side-link'>
          <img src={cameron} alt="cameron.png" />{sidebar && <p>Nas Daily</p>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar