import React from 'react';
import { useLocation } from 'react-router-dom';

const MagazineDetails = () => {
    const { state: { data } } = useLocation();

    const renderDescriptionWithLineBreaks = () => {
        // Replace \n with <br> for line breaks
        const lines = data?.description.split('\n');
        const descriptionWithLineBreaks = lines
            .map((line) =>
                line.includes('bold') ? `<strong style="font-size: 1.2em;">${line.replace('bold', '')}</strong>` : line
            )
            .join('<br>');

        return { __html: descriptionWithLineBreaks };
    };

    return (
        <div>
            <div className='max-w-[800px] w-full mx-auto rounded mt-10'>
            <h1 className='p-2  text-4xl font-[600] font-serif text-center pt-10'>{data?.title}</h1>
            <p className='text-lg  px-2 pb-1 text-black text-center'>
                                <span >BY</span> {data?.author}
                            </p>
                <img src={data?.thumbnail} className='w-full rounded-t' alt="" />
                
                <p className='p-2 text-justify font-serif' dangerouslySetInnerHTML={renderDescriptionWithLineBreaks()} />
            </div>
            <div className='ml-14 mr-14'>
            <hr />
            </div>
            <div className='flex justify-content max-w-[1000px] w-full mx-auto mt-14'>
                <div>
                    <img src={data?.profilePicture} alt="" className='w-96 h-44'/>
                </div>
                <div>
                <p className='p-2 text-justify font-serif font-bold text-lg'>{data?.authorName}</p>
                <p className='p-2 text-justify font-serif text-lg'>{data?.authorInfo}</p>


                </div>
            </div>
        </div>
    );
};

export default MagazineDetails;
