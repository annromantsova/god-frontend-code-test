import { useSpringCarousel } from 'react-spring-carousel'
import ItemCarouselCar from "./ItemCarouselCar";
import React, {FC, ReactNode, useState} from "react";
import {Block, Click} from 'vcc-ui'
import jsxCss from 'styled-jsx/css'

import ArrowIcon from '../../docs/chevron-circled.svg'
import {useFela} from "react-fela";
import {Car} from "../types";

interface Props {
    data:  Array<ReactNode>,
    slidesToShow?: number
}
const arrowStyle = {
    height: '37px',
    width: '37px',
    position: 'absolute',
    bottom: '-10px',
    overflow:'hidden',
    right: '12px',
    transition: 'opacity 0.5s'
}

const DEFAULT_COUNT=4

const DesktopCarousel: FC<Props> = ({data,slidesToShow=DEFAULT_COUNT}) => {
    const isShowArrows = (data.length > slidesToShow);

    const {css} = useFela();
    const itemsPerSlide = (!isShowArrows)?data.length:slidesToShow;
    const carouselItemStyle =  jsxCss.global`
          .use-spring-carousel-item{
             flex: none !important;
          }
          .use-spring-carousel-track-wrapper{
            justify-content: center;
          }
        `;

    const {
        carouselFragment,
        slideToPrevItem,
        slideToNextItem,
    } = useSpringCarousel({
        withLoop: isShowArrows,
        withThumbs: false,
        itemsPerSlide,
        items: data.map((item: Car) => {
            return {
                id: item.id,
                renderItem: (
                    <ItemCarouselCar car={item}/>
                ),
            }})
    });
    return (
        <Block extend={{paddingBottom: '60px', width:'98%',overflow:'hidden'}}>
            {carouselFragment}
            {isShowArrows
                ?<Block extend={{width:'100%', margin:'auto', height:'60px', position: 'relative'}}>
                    <Click onClick={slideToPrevItem} className={css({...arrowStyle, right: '60px', transform: 'rotate(180deg)'})}>
                        <ArrowIcon />
                    </Click>
                    <Click onClick={slideToNextItem} className={css({...arrowStyle })}>
                        <ArrowIcon />
                    </Click>
                </Block>
                :<style jsx>{carouselItemStyle}</style>
            }
        </Block>
    );
}
export default DesktopCarousel
