import { Carousel } from 'react-carousel-minimal';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Loader from '../../Loader/Loader';

function Banner() {

    const { data, isLoading } = useQuery({
        queryKey: ["banner"],
        queryFn: () => fetch("http://localhost:5000/banner")
            .then(res => res.json())


    })


    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }
    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <div style={{
                    padding: "0 20px"

                }}>
                    <Carousel
                        data={data}
                        time={5000}
                        width="100%"
                        height="500px"
                        captionStyle={{ color: "white", fontWeight: "bold", fontSize: "40px", width: "100%", height: "100%", backgroundColor: "black", opacity: "0.5", display: "flex", justifyContent: "center", alignItems: "center" }}
                        radius="10px"
                        slideNumber={true}
                        slideNumberStyle={slideNumberStyle}
                        automatic={true}
                        dots={true}
                        pauseIconColor="white"
                        pauseIconSize="40px"
                        slideBackgroundColor="darkgrey"
                        slideImageFit="cover"
                        // thumbnails={true}
                        // thumbnailWidth="100px"
                        style={{
                            textAlign: "center",
                            maxWidth: "100%",
                            maxHeight: "500px",
                            margin: "40px auto",
                        }}
                    />
                </div>
            </div >
        </div >
    );
}

export default Banner;