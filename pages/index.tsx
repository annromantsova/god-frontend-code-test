import React, {FC, ReactNode, useState} from 'react'
import {GetStaticProps, InferGetStaticPropsType} from 'next'
import carsData from '../public/api/cars.json'

import {BodyType, Car} from '../src/types'
import SpringCarousel from "../src/components/SpringCarousel";


const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({cars}) => {
    const [bodyTypeFilter, setBodyTypeFilter] = useState<'' | BodyType>('')

    const dataFiltered = cars.reduce((acc: Array<ReactNode>, car: Car) => {
        if (!bodyTypeFilter || car.bodyType === bodyTypeFilter) acc.push(car)
        return acc
    }, [])
    return (
        <>
            <SpringCarousel data={dataFiltered} key={`spring-${bodyTypeFilter}`} ></SpringCarousel>
        </>
    )
}

export const getStaticProps: GetStaticProps = async() => {
    return {
        props: {
            cars: carsData as Array<Car>
        },
    }
}

export default Home
