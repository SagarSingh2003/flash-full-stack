
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Intro() {
  return (
    <>
    <h2 className="text-center text-[30px] font-bold flex items-center justify-center gap-2">
        <span>Intro to Flash</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <g fill="none" stroke="#F0513C" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                <path d="M7 14a3 3 0 1 0 1 5.83" />
                <path d="M4.264 15.605a4 4 0 0 1-.874-6.636m.03-.081A2.5 2.5 0 0 1 7 5.5m.238.065A2.5 2.5 0 1 1 12 4.5V20m-4 0a2 2 0 1 0 4 0m0-13a3 3 0 0 0 3 3m5.61-1.031A3.99 3.99 0 0 1 22 12c0 .703-.181 1.364-.5 1.938m-.92-5.05A2.5 2.5 0 0 0 17 5.5m-5-1a2.5 2.5 0 1 1 4.762 1.065M14 22a2 2 0 0 1-2-2m6.667-4L17 19h4l-1.667 3" />
            </g>
        </svg>
    </h2>
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        
          <CarouselItem key={1}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-md text-center ">
                    Flash allows users to create <b>flash</b>cards , and it's special algorithm for spaced repition helps students memorize concepts that are hard for them.
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem key={2}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-md text-center ">
                    you can create ,read ,update and delete your flashcards but you need to go through authentication first!

                    <b>(some flashcards are added by default so you can check them out without signing in )</b>
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem key={3}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-md text-center ">
                    you can share your own cards and import other people's cards into your deck 😄! 
                    (but you need to singin to our platform first!)
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </>
  )
}

