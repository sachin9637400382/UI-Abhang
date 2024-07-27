import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface ImageWithLoaderProps {
    alt: string,
    title: string,
    src: string,
    style?: {},
    width?: number,
    height?: number
}
const ImageWithLoader = ({ alt, title, src, style = { borderRadius: '50%' }, width = 80, height = 80 }: ImageWithLoaderProps) => {
    return (
        <>
            <LazyLoadImage
                alt={alt}
                title={title}
                height={height}
                src={src}
                width={width}
                placeholderSrc="/assets/loading.gif"
                style={style}
                effect="blur"
                loading='lazy'
            />

        </>
    )
}

export default ImageWithLoader;