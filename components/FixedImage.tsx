import { useState } from 'react'
//import { Image } from '@aws-amplify/ui-react'
import Image from 'next/image'

interface FixedImageProps {
    size: any;
    url: string;
    alt: string;
    type: string;
    modal?: boolean;
}

export default function FixedImage({ size, url, alt, type, modal }:FixedImageProps) {
    const [mu, setMu] = useState(true)
    return(
        type == 'video'
        ?
        (
            modal 
            ?
            <video
                className={'fixed-image'}
                onClick={() => setMu(!mu)}
                autoPlay
                loop
                muted={mu}
                playsInline
                key={url}
                style={{borderRadius:"5px",minWidth:size, width:size, maxWidth:size}}
                >
                <source src={url+`#t=0.001`} type={'video/mp4'}/>
                <source src={url+`#t=0.001`} type={'video/mov'}/>
                <source src={url+`#t=0.001`} type={'video/webm'}/>
                <p>Your browser doesn't support our video format.</p>
            </video>
            :
            <video
                className={'fixed-image'}
                playsInline
                key={url}
                style={{borderRadius:"5px",minWidth:size, width:size, maxWidth:size, minHeight:size, height:size, maxHeight:size, objectFit:'cover'}}
            >
                <source src={url+`#t=0.001`} type={'video/mp4'}/>
                <source src={url+`#t=0.001`} type={'video/mov'}/>
                <source src={url+`#t=0.001`} type={'video/webm'}/>
                <p>Your browser doesn't support our video format.</p>
            </video>
        )
        :
        (
            modal
            ?
            <Image
                className={'fixed-image'}
                height={1500}
                width={1500}
                src={url}
                alt={alt}
                sizes={size}
                style={{
                    borderRadius: `.5vw`,
                    minWidth: size,
                    width: size, 
                    maxWidth: size,
                    minHeight: size,
                    height: size,
                    maxHeight: size,
                }}
                role={'button'}
            />
            :
            <Image
                className={'fixed-image'}
                height={1500}
                width={1500}
                src={url}
                alt={alt}
                sizes={size}
                style={{
                    borderRadius: `.5vw`,
                    minWidth: size,
                    width: size, 
                    maxWidth: size,
                    minHeight: size,
                    height: size,
                    maxHeight: size,
                }}
                role={'button'}
            />
        )
    )
}