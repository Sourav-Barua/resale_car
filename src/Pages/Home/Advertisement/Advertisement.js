import React from 'react';
import { useQuery } from 'react-query';
import AdvertisementCard from './AdvertisementCard';

const Advertisement = () => {
    const { data: advertisments = [] } = useQuery({
        queryKey: ["advertisment"],
        queryFn: () => fetch("http://localhost:5000/advertisment")
            .then(res => res.json())
    })
    return (
        advertisments.length > 0 && <div>
            <h3 className='text-2xl font-semibold text-center text-secondary p-5'>Advertised items :{advertisments.length}</h3>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1s'>
                {
                    advertisments?.map(advertised => <AdvertisementCard key={advertised._id} advertised={advertised} ></AdvertisementCard>)
                }
            </div>
        </div>
    );
};

export default Advertisement;