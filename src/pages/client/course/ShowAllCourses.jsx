import React, { useState } from 'react'

// Slider Slick
import Slider from "react-slick";

import LeftArrow from "../../../assets/images/left-arrow.svg";
import RightArrow from "../../../assets/images/right-arrow.svg";
import { useFetchCoursesQuery } from '../../../features/courses/coursesApi';
import CourseCard from '../../../components/CourseCard';


const ShowAllCourses = () => {


    const { data: courses, isLoading, isError, error } = useFetchCoursesQuery() || {};

    const [loading, setLoading] = useState(true);

    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <img src={LeftArrow} alt="prevArrow" {...props} />
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <img src={RightArrow} className="shadow-lg" alt="nextArrow" {...props} />
    );



    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,

    };


    let content;

    if (isLoading) {
        content = <div>Loading</div>;
    } else if (!isLoading && isError) {
        content = <div>Error-{error}</div>;
    } else if (!isLoading && !isError && courses?.length === 0) {
        content = <div>Not Content To show</div>;
    } else {
        content = courses?.map((course) => {
            return <CourseCard course={course} key={course.key} />
        })
    }


    return (
        <div className="container flex-col items-center mx-auto px-1 py-5">


            <Slider {...settings} className="flex-col">
                {content}
            </Slider>


        </div>

    );



}

export default ShowAllCourses











