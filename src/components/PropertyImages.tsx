'use client'

import Image from "next/image"
import { Gallery, Item } from "react-photoswipe-gallery" //https://www.npmjs.com/package/react-photoswipe-gallery

interface Props {
    images: string[]
}

export default function PropertyImages({ images }: Props) {
    return (
        <Gallery>
            <section className="bg-blue-50 p-4">
                <div className="container mx-auto">
                    {
                        images.length === 1 ? (
                            <Item original={images[0]} thumbnail={images[0]} width="1000" height="600" alt=''>
                                {({ ref, open }) => (
                                    <Image src={images[0]} alt='' className='object-cover h-[400px] mx-auto rounded-xl cursor-pointer' width={1800} height={400} priority={true} ref=
                                        {ref} onClick={open} />
                                )}
                            </Item>
                        )
                            : (
                                <div className="grid grid-cols-2 gap-4">
                                    {
                                        images.map((image, index) => (
                                            <div key={index} className="col-span-1">
                                                <Item original={image} thumbnail={image} width="1000" height="600" alt=''>
                                                    {({ ref, open }) => (
                                                        < Image src={image} alt='' className='object-cover h-[400px] mx-auto rounded-xl cursor-pointer' width={1800} height={400} priority={true} ref=
                                                            {ref} onClick={open} />
                                                    )}
                                                </Item>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                    }
                </div>
            </section>
        </Gallery>
    )
}