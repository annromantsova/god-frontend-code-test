import React, {FC, ReactNode, useState} from 'react'
import {GetStaticProps, InferGetStaticPropsType} from 'next'
import carsData from '../public/api/cars.json'

import Filter from '../src/components/Filter'
import {BodyType, Car} from '../src/types'
import SpringCarousel from "../src/components/SpringCarousel";
import {Grid,Row, Col} from "vcc-ui";


const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({cars}) => {
    const [bodyTypeFilter, setBodyTypeFilter] = useState<'' | BodyType>('')

    const dataFiltered = cars.reduce((acc: Array<ReactNode>, car: Car) => {
        if (!bodyTypeFilter || car.bodyType === bodyTypeFilter) acc.push(car)
        return acc
    }, [])
    return (
        <>
            <Grid>
                <Row align="center">
                    <Col size={10}>
                        <Filter value={bodyTypeFilter} setValue={setBodyTypeFilter} />
                    </Col>
                </Row >
                <Row align="center">
                    <Col size={10}>
                        <SpringCarousel data={dataFiltered} key={`spring-${bodyTypeFilter}`} ></SpringCarousel>
                    </Col>
                </Row>
            </Grid>
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
