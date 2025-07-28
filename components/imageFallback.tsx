"use client";
import Image from "next/image";
import { useState } from "react";

export default function ImageFallback(props: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    className?: string;
}) {
    const [imgSrc, setImgSrc] = useState(props.src);
    if (props.width! > 0) {
        return (
            <Image
                src={imgSrc}
                alt={props.alt}
                width={props.width}
                height={props.height}
                className={props.className}
                onLoadingComplete={(result) => {
                    if (result.naturalWidth == 0) setImgSrc("/noImage.webp");
                }}
                onError={() => setImgSrc("/noImage.webp")}
            />
        );
    }
    return (
        <Image
            src={imgSrc}
            alt={props.alt}
            fill={props.fill}
            className={props.className}
            onLoadingComplete={(result) => {
                if (result.naturalWidth == 0) setImgSrc("/noImage.webp");
            }}
            onError={() => setImgSrc("/noImage.webp")}
        />
    );
}
