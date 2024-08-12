import FlashCard from "./FlashCard"
import Header from './Header'
import Intro from "./Intro";

function AllCards() {

  return (
    <section className='flex  flex-col items-center justify-center max-w-[100%]'>
        <Header />
      <section className="mt-[0px] flex items-center justify-center max-w-[100%]">
        <FlashCard />
      </section>
      <section className="my-[50px] mb-[50px]">
        <Intro />
      </section>
    </section>
    
  )
}

export default AllCards;