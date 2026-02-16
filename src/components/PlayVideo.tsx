import like from '../assets/like.png'
import jack from '../assets/jack.png'
import dislike from '../assets/dislike.png'
import share from '../assets/share.png'
import save from '../assets/save.png'
import user_profile from '../assets/user_profile.jpg'
import { useEffect, useState } from 'react'
import { API_KEY, valueConverter } from '../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

type videoItem = {
    snippet: {
        title: string;
        publishedAt: string;
        description: string;
        channelTitle: string;
        channelId: string;
    }
    statistics: {
        viewCount: string;
        likeCount: string;
        commentCount: string;
    }
}

type channelItem = {
    snippet: {
        thumbnails: {
            default: {
                url: string;
            }
        }
    }
    statistics: {
        subscriberCount: string;
    }
}

type commentItem = {
    snippet: {
        topLevelComment: {
            snippet: {
                updatedAt: string
                likeCount: string;
                authorProfileImageUrl: string;
                authorDisplayName: string;
                textDisplay: string;
            }
        }
    }
}

function PlayVideo() {

    const {videoId} = useParams();

    const [apiData, setApiData] = useState<videoItem | null>(null);
    const [channelData, setChannelData] = useState<channelItem | null>(null);
    const [commentData, setCommentData] = useState<commentItem[] | null>([]);

    const fetchVideoData = async () => {
        //fetching videos data
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        const response = await fetch(videoDetails_url);
        const data = await response.json();
        setApiData(data.items && data.items.length > 0 ? data.items[0] : null);
    }

    const fetchChannelData = async () => {
        //fetching channel data
        const channelData_url = ` https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData && apiData.snippet.channelId}&key=${API_KEY}`;
        const response = await fetch(channelData_url);
        const data = await response.json();
        setChannelData(data.items && data.items.length > 0 ? data.items[0] : null);

        //fetching comment data
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
        const commentResponse = await fetch(comment_url);
        const comData = await commentResponse.json();
        setCommentData(comData.items && comData.items.length > 0 ? comData.items : null);
    }

    useEffect(() => {
        fetchVideoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId]);

    useEffect(() => {
        fetchChannelData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiData]);

    return (
    <div className='basis-[69%]'>
        <iframe className='w-full h-[37vw] rounded-[12px] max-lg:h-[50vw]' src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

        <h3 className='mt-[10px] font-semibold text-[22px]'>{apiData?apiData.snippet.title:"Title Here"}</h3>

        <div className='flex items-center justify-between flex-wrap mt-[10px] text-[14px] text-[#5a5a5a]'>
            <p>{apiData && valueConverter(Number(apiData.statistics.viewCount))} views &bull; {moment(apiData && apiData.snippet.publishedAt).fromNow()}</p>

            <div className='flex'>
                <span className='inline-flex items-center ml-[15px]'><img className='w-[20px] mr-[8px]' src={like} alt="like.png" /> {apiData && valueConverter(Number(apiData.statistics.likeCount))}</span>
                <span className='inline-flex items-center ml-[15px]'><img className='w-[20px] mr-[8px]' src={dislike} alt="dislike.png" /></span>
                <span className='inline-flex items-center ml-[15px]'><img className='w-[20px] mr-[8px]' src={share} alt="share.png" /> Share</span>
                <span className='inline-flex items-center ml-[15px]'><img className='w-[20px] mr-[8px]' src={save} alt="save.png" /> Save</span>
            </div>
        </div>

        <hr className='border-0 h-[1px] bg-[#ccc] my-[10px]' />

        <div className='flex items-center mt-[20px]'>
            <img className='w-[40px] rounded-full mr-[15px]' src={channelData?channelData.snippet.thumbnails.default.url:jack} alt="jack.png" />

            <div className='flex-1 leading-[18px]'>
                <p className='text-[#000] font-semibold text-[18px]'>{apiData && apiData.snippet.channelTitle}</p>
                <span className='text-[13px] text-[#5a5a5a]'>{channelData && valueConverter(Number(channelData.statistics.subscriberCount))} subscribers</span>
            </div>

            <button className='border-0 outline-0 bg-red-600 text-white cursor-pointer py-[10px] px-[25px] rounded-[25px]'>Subscribe</button>
        </div>

        <div className='pl-[55px] my-[15px] max-md:pl-0'>
            <h3 className='font-semibold my-2'>Description</h3>
            <div className='mb-[5px] h-[150px] bg-[#cacaca] rounded-[8px] scrollbar relative'>
              <p className='text-[14px] text-[#5a5a5a] p-6'>{apiData && apiData.snippet.description}</p>
              <div className={`pointer-events-none ${apiData&&apiData.snippet.description.length > 710?'sticky':'absolute'} bottom-0 left-0 h-10 w-full bg-gradient-to-t from-[#f1f1f1] to-transparent`}></div>
            </div>

            <hr className='border-0 h-[1px] bg-[#ccc] my-[10px]' />

            <h4 className='text-[15px] text-[#5a5a5a] mt-[15px] font-semibold'>{apiData && apiData.statistics.commentCount} Comments</h4>

            {commentData?.map((comment, index) => (
                <div key={index} className='flex items-start my-[20px]'>
                    <img className='w-[35px] mr-[15px] rounded-full' src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl.trim()} alt="user_profile.png" onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = user_profile;
                    }}
                    />

                    <div>
                        <h3 className='text-[14px] mb-0.5'>{comment.snippet.topLevelComment.snippet.authorDisplayName} <span className='text-[12px] text-[#5a5a5a] ml-[8px] font-medium'>{moment(comment.snippet.topLevelComment.snippet.updatedAt).fromNow()}</span></h3>
                        <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                        <div className='flex items-center my-[8px] text-[14px]'>
                            <img className='w-[20px] rounded-none mr-[3px]' src={like} alt="like.png" />
                            <span className='text-[#5a5a5a] text-[12px]'>{comment.snippet.topLevelComment.snippet.likeCount}</span>
                            <img className='w-[20px] rounded-none ml-[12px]' src={dislike} alt="dislike.png" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
}

export default PlayVideo