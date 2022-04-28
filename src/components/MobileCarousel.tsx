import { useSpringCarousel } from 'react-spring-carousel'
import ItemCarouselCar from "./ItemCarouselCar";
import React, {FC, ReactNode, useState} from "react";
import {Block, Click} from 'vcc-ui'
import jsxCss from 'styled-jsx/css'

import {useFela} from "react-fela";
import {Car} from "../types";

interface Props {
    data:  Array<ReactNode>,
    slidesToShow?: number
}

const mobileButton={
    background:'#b6b6b6',
    display: 'flex',
    width: '8px',
    height: '8px',
    overflow: 'hidden',
    opacity: '1',
    margin : '5px',
    borderRadius: '50%',
    transition: 'background 300ms ease 0s'
}
const DEFAULT_COUNT_MOBILE=1

const SpringCarousel: FC<Props> = ({data,slidesToShow= DEFAULT_COUNT_MOBILE}) => {
    const isShowArrows = (data.length > slidesToShow);
    const {css} = useFela();
    const [itemsPerSlide, setItemsPerSlide] = useState((!isShowArrows)?data.length:slidesToShow);
    const [activeSlide, setActiveSlide] = useState('')
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
        thumbsFragment,
        slideToItem,
        useListenToCustomEvent,
    } = useSpringCarousel({
        withLoop: isShowArrows,
        withThumbs: true,
        itemsPerSlide,
        items: data.map((item: Car, index: number) => {
            const isActive = !activeSlide && index === 0 || activeSlide === item.id;
            return {
                id: item.id,
                renderItem: (
                    <ItemCarouselCar car={item}/>
                ),
                renderThumb: (
                    <Click
                        onClick={() => slideToItem(item.id)}
                        extend={
                            {...mobileButton, ...(isActive && {background:'#000'})}
                        }
                    />
                ),
            }})
    });
    useListenToCustomEvent((event) => {
        if (event.eventName === "onSlideStartChange") {
            setActiveSlide(event.nextItem.id);
        }
    });
    return (
        <Block extend={{paddingBottom: '60px', width:'98%',overflow:'hidden'}}>
            {!isShowArrows? <style jsx>{carouselItemStyle}</style>:''}
            {carouselFragment}
            <Block  className={css({width:'100%',margin:'auto', height:'60px'})}>{thumbsFragment}</Block>
        </Block>
    );
}
export default SpringCarousel
