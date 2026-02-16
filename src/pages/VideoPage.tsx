import { useParams } from "react-router-dom"
import PlayVideo from "../components/PlayVideo"
import Recommended from "../components/Recommended"

function VideoPage() {

  const {categoryId} = useParams();

  return (
    <div className="flex justify-between flex-wrap bg-[#f9f9f9] px-[2%] py-[20px] max-lg:flex-col">
      <PlayVideo />
      <Recommended categoryId={categoryId} />
    </div>
  )
}

export default VideoPage