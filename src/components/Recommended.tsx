import { useEffect, useState } from 'react'
import type { VideoItem } from './Feed'
import { API_KEY, valueConverter } from '../data'
import { Link } from 'react-router-dom';

type RecommendedProps = {
    categoryId: string | undefined;
}

function Recommended({categoryId}: RecommendedProps) {

    const [apiData, setApiData] = useState<VideoItem[]>([]);

    const fetchData = async () => {
        const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
        const response = await fetch(relatedVideo_url);
        const data = await response.json();
        setApiData(data.items);
    }

    useEffect(() => {
            fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    
    return (
        <div className='basis-[30%] space-y-[8px]'>
            {apiData.map((item, index) => (
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className='flex justify-between'>
                    <img className='basis-[49%] w-[50%] rounded-[12px]' src={item.snippet.thumbnails.medium.url} alt="thumbnail1.png" />

                    <div className='basis-[49%]'>
                        <h4 className='text-[1rem] mb-[5px] font-semibold'>{item.snippet.title}</h4>
                        <p className='text-[#5a5a5a] text-[13px] font-semibold'>{item.snippet.channelTitle}</p>
                        <p className='text-[#5a5a5a] text-[13px] font-semibold'>{valueConverter(Number(item.statistics.viewCount))} views</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Recommended