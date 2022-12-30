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

    const SlickArrLeft = ({ currentSlide, slideCount, ...props }) => (
        <img src={LeftArrow} alt="prevArrow" {...props} />
    );

    const SlickArrRight = ({ currentSlide, slideCount, ...props }) => (
        <img src={RightArrow} className="shadow-lg" alt="nextArrow" {...props} />
    );



    const settings = {
        arrows: true,
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
                    infinite: true,
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
        prevArrow: <SlickArrLeft />,
        nextArrow: <SlickArrRight />

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
        <>
            <h2 className='text-center text-3xl items-center text-bold text-blue-200 mb-5 my-4 my-2 py-4'>My Courses</h2>

            <div id="courses" className="container mt-4 flex-col items-center mx-auto px-1 py-5">


                <Slider {...settings} className="flex">
                    {content}
                </Slider>


            </div>
        </>


    );



}

export default ShowAllCourses











