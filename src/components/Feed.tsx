import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import { API_KEY, valueConverter } from '../data'
import moment from 'moment';

export type VideoItem = {
        id: string;
        snippet: {
            description: string;
            publishedAt: string;
            channelTitle: string;
            title: string;
            categoryId: string;
            thumbnails: {
                medium: {
                    url: string;
                }
            };
            // add other properties as needed
        };
        statistics: {
            viewCount: string;
        };
            // add other properties as needed
        };

function Feed() {

    const {category} = useContext(Context);
    const [data, setData] = useState<VideoItem[]>([]);

    const fetchData = async() => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        const response = await fetch(videoList_url);
        const data = await response.json();
        setData(data.items);
    }

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-4 gap-y-[30px] mt-[15px]'>
            {data.map((item, index) => (
                <Link to={`video/${item.snippet.categoryId}/${item.id}`} key={index} className='card'>
                    <img src={item.snippet.thumbnails.medium.url} alt="thumbnail.png" />
                    <h2>{item.snippet.title}</h2>
                    <h3>{item.snippet.channelTitle}</h3>
                    <p>{valueConverter(Number(item.statistics.viewCount))} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                </Link>
            ))}
        </div>
    )
}

export default Feed