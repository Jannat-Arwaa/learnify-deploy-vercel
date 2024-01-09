import React, { useEffect, useState } from 'react';
import { publicGet } from '../../utilities/apiCaller';
import { useNavigate } from 'react-router-dom';

const Magazine = () => {
    const [magazines, setMagazines] = useState([]);
    const [visibleRows, setVisibleRows] = useState(9); // Initially, show 7 rows
    const navigate = useNavigate();

    useEffect(() => {
        publicGet('/magazine/get').then(res => {
            if (res?.status === 'success') setMagazines(res?.data);
        });
    }, []);

    const showMoreRows = () => {
        // Increase the number of visible rows by 7
        setVisibleRows(prevVisibleRows => prevVisibleRows + 3);
    };

    return (
        <div className="my-5">
            <div className="max-w-[1280px] mx-auto my-5">
                <div className='grid grid-cols-3 gap-10 w-full'>
                    {magazines?.slice(0, visibleRows).map((m, index) => (
                        <div className='border rounded w-full border-2px-teal shadow-teal-200' key={index}>
                            <img
                                src={m?.thumbnail}
                                className='w-full'
                                alt=""
                                
                            />
                            <h1 className='text-start p-2 text-xl font-[600] font-serif'>{m?.title}</h1>
                            <p className='text-lg text-start px-2 pb-1 text-black font-serif'>
                                <span className='text-gray-500 '>BY</span> {m?.author}
                            </p>
                            
                           <p className='text-lg text-start px-2 pb-8 font-serif text-gray-600'>{m?.description.slice(0,120)}...<span className='text-teal-400 cursor-pointer font-bold hover:underline' onClick={()=>navigate(`/magazine/${m?._id}`, {state: {data: m }})}>read more</span></p>
                         
                                
                               
                               
                        </div>
                       
                    ))}
                </div>
                {visibleRows < magazines.length && (
                    <div className='text-center mt-5'>
                        <button className='bg-teal-500 text-white px-4 py-2 rounded' onClick={showMoreRows}>
                            Show More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Magazine;
