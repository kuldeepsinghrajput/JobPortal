import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';
const categories = [
  "Backend Developer",
  "Data Science",
  "DevOps Engineer",
  "Full Stack Developer",
  "Frontend Developer",
  "Machine Learning Engineer",
  "Mobile App Developer"
];

export const CategoryCarousel = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const serachJobHandler=(query)=>
  {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  }
  return (
    <Carousel className="w-full max-w-xl mx-auto my-20">
      <CarouselContent >
        {categories.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
            <Button onClick={()=>serachJobHandler(item)} varient="outline" className="rounded-full">{item}</Button>
         
        
        
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious 
          />
      <CarouselNext 
         />
    </Carousel>
  );
};
