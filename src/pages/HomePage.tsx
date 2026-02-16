import { useContext } from 'react'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import { Context } from '../context/Context';

function HomePage() {

  const {sidebar} = useContext(Context);

  return (
    <>
      <Sidebar />
      <div className={`bg-[#f9f9f9] ${sidebar ? "pl-[17%]" : "pl-[9%]"} pr-[2%] py-[20px] max-md:pl-[12%] max-sm:pl-[2%]`}>
        <Feed />
      </div>
    </>
  )
}

export default HomePage