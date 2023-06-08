import React, { useEffect, useState } from "react";
import { FetchCheeses } from "../APIManager";
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from "reactstrap";
import "../home/Home.css"

const Home = () => {
    const [cheeses, setCheeses] = useState([])

    const fetchCheeses = async () => {
        const cheesesArray = await FetchCheeses()
        setCheeses(cheesesArray)
    };
    
    useEffect(() => {
        fetchCheeses()
    }, []);    
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === cheeses.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? cheeses.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const items = cheeses

    const slides = items.map((item) => {
        return (
            <CarouselItem className="cheese-img"
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.id}
            >
                <img src={item.imageUrl} alt={item.cheeseName} />
                <CarouselCaption className="cheese-text"
                    captionText={item.description}
                    captionHeader={item.cheeseName}
                />
            </CarouselItem>
        );
    });

    return (
        <>
        <h1 className="home-title">Sweet dreams are made of cheese.</h1>
        <Carousel
            className="cheese-carousel"
            activeIndex={activeIndex}
            dark
            next={next}
            previous={previous}
            {...cheeses}
        >
            <CarouselIndicators 
                items={items}
                activeIndex={activeIndex}
                onClickHandler={goToIndex}
            />
            {slides}
            <CarouselControl 
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
            />
            <CarouselControl 
                direction="next"
                directionText="Next"
                onClickHandler={next}
            />  
        </Carousel>
        </>
    );
};

export default Home;