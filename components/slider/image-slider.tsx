
'use client'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Link from "next/link";
import { styled } from "@mui/material";
const ImageSlider = () => {
    const StyledP = styled('p')(({ theme }) => ({
        [theme.breakpoints.up('xs')]: {
            bottom: '15px !important',
        },
        [theme.breakpoints.up('sm')]: {
            bottom: '50px !important',
        },
        [theme.breakpoints.up('lg')]: {
            bottom: '100px !important',
        },
    }));
    return (
        <Carousel infiniteLoop={true} autoPlay={true} showStatus={false} dynamicHeight={false} showThumbs={false}  swipeable={true} interval={3000} stopOnHover={true} onClickItem={() => { }}>
            <Link href={'/sant'}><div>
                <img src="/assets/banner/home-1.svg" alt="अभंगवाणी वर आपलं स्वागत आहे !" />
                <StyledP className="legend">अभंगवाणी वर आपलं स्वागत आहे !</StyledP>
            </div>
            </Link>
            <Link href={'/sant/dnyaneshwar'}>
                <div>

                    <img src="/assets/banner/home-2.svg" alt="संत ज्ञानेश्वर" />
                    <p style={{bottom: '15px'}} className="legend">संत ज्ञानेश्वर</p>

                </div>
            </Link>
            <Link href={'/articals/kadambari'}>
                <div>
                    <img src="/assets/banner/home-3.svg" alt="नवनवीन कादंबरी " />
                    <p  style={{bottom: '15px'}} className="legend">नवनवीन कादंबरी </p>

                </div>
            </Link>
            <Link href={'/articals/grnth'}>
                <div>
                    <img src="/assets/banner/home-4.svg" alt="मराठी ग्रंथ " />
                    <p  style={{bottom: '15px'}} className="legend">मराठी ग्रंथ </p>

                </div>
            </Link>
            <Link href={'/'}>
                <div>
                    <img src="/assets/banner/home-5.svg" alt="गुरुपौर्णिमा" />
                    <p  style={{bottom: '15px'}}className="legend">गुरुपौर्णिमा</p>

                </div>
            </Link> 
        </Carousel>
    );
}

 
export default ImageSlider;