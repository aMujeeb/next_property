'use client';

//https://www.npmjs.com/package/react-share

import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon
} from "react-share"

interface Props {
    propertyItem: Property
}

export default function SharedButtons({ propertyItem }: Props) {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${propertyItem._id}`;
    return (
        <>
            <h3 className="text-xl font-bold text-center pt-2">Share This Property</h3>
            <div className="flex gap-3 justify-center pb-5">

                <FacebookShareButton url={shareUrl} quote={propertyItem.name} hashtag={`#${propertyItem.type.replace(/\s/g, '')}ForRent`}>
                    <FacebookIcon size={40} round={true} />
                </FacebookShareButton>

                <TwitterShareButton url={shareUrl} title={propertyItem.name} hashtags={[`${propertyItem.type.replace(/\s/g, '')}ForRent`]}>
                    <TwitterIcon size={40} round={true} />
                </TwitterShareButton>

                <WhatsappShareButton url={shareUrl} title={propertyItem.name} separator='::'>
                    <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>

                <EmailShareButton url={shareUrl} subject={propertyItem.name} body={`Check out for this property listing : ${shareUrl}`}>
                    <EmailIcon size={40} round={true} />
                </EmailShareButton>

            </div >
        </>
    )
}