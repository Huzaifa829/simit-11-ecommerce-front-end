import React, { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const Section1Slides = () => {
  const autoplayRef = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const slides = [
    { id: 1, image: '/path/to/image1.jpg', alt: 'Slide 1' },
    { id: 2, image: '/path/to/image2.jpg', alt: 'Slide 2' },
    { id: 3, image: '/path/to/image3.jpg', alt: 'Slide 3' },
    { id: 4, image: '/path/to/image4.jpg', alt: 'Slide 4' },
    { id: 5, image: '/path/to/image5.jpg', alt: 'Slide 5' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-6">
      <Carousel
        plugins={[autoplayRef.current]}
        className="relative overflow-hidden"
        onMouseEnter={autoplayRef.current.stop}
        onMouseLeave={autoplayRef.current.reset}
      >
        <CarouselContent className="flex gap-4">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="flex-shrink-0 w-full">
              <div className="relative w-full h-64 md:h-80 lg:h-96">
                <Card className="h-full">
                  <CardContent className="p-0">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows */}
        <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200">
          <span className="material-icons">chevron_left</span>
        </CarouselPrevious>
        <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200">
          <span className="material-icons">chevron_right</span>
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default Section1Slides;
