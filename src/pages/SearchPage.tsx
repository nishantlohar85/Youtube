import { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Context } from '../context/Context'
import { API_KEY } from '../data';
import moment from 'moment';
import { Link } from 'react-router-dom';

type VideoItem = {
    id: {
        videoId: string;
    };
    snippet: {
            description: string;
            publishedAt: string;
            channelTitle: string;
            title: string;
            thumbnails: {
                medium: {
                    url: string;
                }
            };
        }
}

function SearchPage() {

    const {sidebar, search, searchClick} = useContext(Context);
    const [data, setData] = useState<VideoItem[]>([]);

    const fetchData = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${search}&regionCode=US&key=${API_KEY}`;
        const response = await fetch(videoList_url);
        const data = await response.json();
        setData(data.items);
    }

    useEffect(() => {
            fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [searchClick]);

    return (
        <>
        <Sidebar />
        <div className={`bg-[#f9f9f9] space-y-[14px] ${sidebar ? "pl-[17%]" : "pl-[9%]"} pr-[2%] py-[20px] max-md:pl-[12%] max-sm:pl-[2%]`}>
            {data.map((item, index) => (
                <Link to={`/video/0/${item.id.videoId}`} key={index} className='flex justify-between max-md:flex-col'>
                    <img src={item.snippet.thumbnails.medium.url} className='w-[40%] rounded-[12px] max-md:w-[90%] max-sm:w-full' alt="thumbnail.png" />

                    <div className='w-[59%] max-md:w-[90%]'>
                        <h4 className='text-[20px] mb-[3px] max-sm:text-[16px]'>{item.snippet.title}</h4>
                        <p className='text-[#3d3d3d] text-[16px] my-[6px] font-semibold max-md:inline max-sm:text-[13px]'>{item.snippet.channelTitle}</p>
                        <p className='text-[#5a5a5a] text-[14px] my-1 max-md:inline max-md:mx-2 max-sm:text-[13px]'>&bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                        <p className='text-[#5a5a5a] text-[14px] my-1 max-sm:text-[12px]'>{item.snippet.description}</p>
                    </div>
                </Link>
            ))}
        </div>
        </>
    )
}

export default SearchPage