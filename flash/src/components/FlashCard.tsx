import { useEffect, useState } from "react";
import axios from "axios";
import api from "../utils/api";
import ShimmerLoading from "./ShimmerLoading";
import { motion } from "framer-motion";
import styled, { keyframes } from 'styled-components';
import confetti from "../assets/confetti.gif";
import { useUser } from "@clerk/clerk-react";


export type ICard = {
    id : String;
    question : String;
    answer: String;
    created_at: String;
    user_id : String;
    category : String;
}


const increaseWidth = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

const InnerBar = styled.div<{ width: string , color : string}>`
  height: 100%;
  background-color: ${(props) => props.color};
  
  border-radius: 0.375rem;
  width: ${(props : any) => {
    console.log(props);
    return  props.width
    }} !important;
  animation: ${increaseWidth} 2s ease-in-out forwards;
`;



export const FlashCard = () => {

    const [cards , setCards] = useState<[ICard] | []>([])
    const [currentCardIndex , setCurrCardIndex] = useState(0);
    const [easyCards , setEasyCards] = useState<any>([]);
    const [hardCards , setHardCards] = useState<any>([]);
    const [skippedCards , setSkippedCards] = useState<any>([]);
    const [flip , setFlip] = useState(true);

    const {user} = useUser()
    useEffect(() => {
        if(user){
            const email = user.emailAddresses[0].emailAddress;
            axios.get(`${api}/card/?user_id=${email}`)
            .then((response : any) => {
                setCards(response.data.cards.reverse());
            })
            .catch((err) => {
                console.log(err);
            })
        }else{
            axios.get(`${api}/card/`)
            .then((response : any) => {
                setCards(response.data.cards.reverse());
            })
            .catch((err) => {
                console.log(err);
            })
        }
    } , [user]);

    const totalLength = cards.length + 1;
    const flashCardCompleteCount = currentCardIndex + 1;

    const percentage = flashCardCompleteCount/totalLength * 100

    if(!cards.length){
        return <ShimmerLoading />
    }

    return (
        <section className="card-area ">
                <>
                <section className=" card-head max-[390px]:box-border max-[390px]:ml-[20px] flex gap-3 m-[30px] w-[40%] border border-gray-300 p-[20px] pr-[0] rounded-lg justify-center min-w-[740px] md:max-w-[300px]">
                    <section className="flex flex-col items-center justify-center gap-3 w-[80%] ">
                            <div className="bg-[#E5E7EB] w-[100%] h-[10px] rounded-md m-[5px]">
                                {/* <div className="h-[100%] bg-[#1E293B] rounded-md animate-width " style={{width : `${percentage}% `}}></div> */}
                                <InnerBar width={`${percentage}%`} color={ percentage >= 75 ? `#22C55E` : "#1E293B"}/>
                            </div>
                            <section className=" card-head-section flex items-center justify-between w-[100%] text-[14px]">
                                <div className="flex items-center max-[740px]:my-[10px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-check-big mr-1 h-4"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>
                                    <div>Knew</div>
                                    <div className="ml-2 rounded-md bg-gray-200/80 px-1.5 font-medium text-black">{easyCards.length} Items</div>
                                </div>

                                <div className="flex items-center max-[740px]:my-[10px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sparkles mr-1 h-4"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
                                    <div>Learnt</div>
                                    <div className="ml-2 rounded-md bg-gray-200/80 px-1.5 font-medium text-black">{hardCards.length} Items</div>
                                </div>
                                <div className="flex items-center max-[740px]:my-[10px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-skip-forward mr-1 h-4"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" x2="19" y1="5" y2="19"></line></svg>
                                    <div>Skipped</div>
                                    <div className="ml-2 rounded-md bg-gray-200/80 px-1.5 font-medium text-black">{skippedCards.length} Items</div>
                                </div>
                                <div className="flex  items-center text-red-600 hover:text-red-900 max-[740px]:my-[10px]" 
                                
                                onClick={() => {
                                    setCurrCardIndex(() => 0);
                                    setEasyCards(() => []);
                                    setHardCards(() => []);
                                    setSkippedCards(() => []);
                                }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-rotate-ccw mr-1 h-4"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                                    <span>ResetProgress</span>
                                </div>
                            </section>
                    </section>
                    <section className="w-[20%] flex items-start mr-[20px]">
                        <section className="flex items-center">
                                <button className="text-[#4b5563] hover:text-[#1E293B]" 
                                
                                onClick={() => {
                                    if(currentCardIndex > 0){
                                        setCurrCardIndex((index) => index -1);
                                    }
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-left h-4"><path d="m15 18-6-6 6-6"></path></svg>
                                </button>
                                <span className="text-[#4b5563]">{flashCardCompleteCount}/{totalLength}</span>
                                <button className="text-[#4b5563] hover:text-[#1E293B]"
                                onClick={() => {
                                    if(currentCardIndex < cards.length){
                                        setCurrCardIndex((index) => index+1);
                                    }
                                }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right h-4"><path d="m9 18 6-6-6-6"></path></svg>
                                </button>
                        </section>
                    </section>
                </section>
                {
                    cards[currentCardIndex]?.id ? 

                    <section className="main-card min-w-[740px] min-h-[400px] w-[40%] max-[390px]:box-border ">
                    {/* <section className="relative preserve-3d group-hover:my-rotate-y-180 duration-500 border border-gray-300 rounded-lg w-[100%] m-[30px] h-[100%] flex flex-col justify-around items-center">
                            <div className=" absolute top-0 left-0 right-0 bottom-0 w-[100%] min-h-[400px] backface-hidden flex flex-col items-center justify-around">
                                
                            </div>
                            <div className=" absolute w-full h-full bg-white backface-hidden">
                                <span>{cards[currentCardIndex].answer}</span>
                            </div>
                    </section> */}
                    <motion.div
                        style={{ width: "100%", height: "100%" , minHeight : "400px" , minWidth : "740px" }}
                        transition={{ duration: 0.7 }}
                        animate={{ rotateY: flip ? 0 : 180 }}
                        className="border main-card-div border-gray-300 rounded-lg w-[100%] m-[30px] max-[390px]:ml-[20px] h-[100%] flex flex-col justify-around items-center"
                    >
                        <motion.div
                        style={{minHeight : "400px" , minWidth : "740px" , position : "relative"}}
                        transition={{ duration: 0.7 }}
                        animate={{ rotateY: flip ? 0 : 180 }}
                        className="Card main-card-div min-w-[714px] min-h-[400px]"
                        >
                        <motion.div
                            style={{display : "flex" ,flexDirection : "column" , alignItems : "center" , justifyContent: "space-around" , minHeight : "400px", height : "100%"}}
                            transition={{ duration: 0.7 }}
                            animate={{ rotateY: flip ? 0 : 180 }}
                            className="front"
                        >
                                <span className="text-[21px] text-[#9ca3af] block">{cards[currentCardIndex].category}</span>
                                <p className="text-black font-bold text-[29px] text-center">{cards[currentCardIndex].question}</p>
                                <span className="text-gray-500 underline text-[17px] block hover:text-black" onClick={() => {setFlip((prevState : boolean) =>  !prevState)}}>click to reveal the answer</span>
                        </motion.div>
                        <motion.div
                            style={{backgroundColor : "white" ,position : "absolute", top : 0 , left : 0 , right : 0 , bottom :0, display : "flex" , flexDirection : "column", alignItems : "center" , justifyContent : "space-around" , width: '100%' , height : "100%"}}
                            initial={{ rotateY: 180 }}
                            animate={{ rotateY: flip ? 180 : 0 }}
                            // style={{ display: flip ? "none" : "block" }}
                            transition={{ duration: 0.7 }}
                            className="back main-card-div main-card-div-back rounded-lg border border-gray-300"
                        >
                            <span className="text-[black] block  max-w-[80%] max-h-[300px] overflow-y-scroll overscroll-y-contain text-center">{cards[currentCardIndex].answer}</span>
                            <span className="text-gray-500 underline text-[17px] block hover:text-black" onClick={() => {setFlip((prevState : boolean) =>  !prevState)}}>see the question</span>
                        </motion.div>
                        </motion.div>
                    </motion.div>
                </section>

                : 

                <section className=" max-[740px]:ml-[20px] main-card confetti min-h-[400px]  min-w-[740px] max-w-[740px] max-[740px]:min-w-[300px] max-[740px]:max-w-[90%]   flex items-center justify-center border border-gray-300 rounded-lg m-[30px]">
                    <img src={confetti} alt="you have reached the end" style={{height: "300px"}}/>
                </section>

                }
                <section className=" card-foot max-[390px]:ml-[20px] flex items-center justify-between w-[40%] m-[30px] min-w-[740px]">

                    <div className=" card-foot-div flex items-center max-[740px]:p-[5px] max-[740px]:m-[10px] max-[740px]:w-[100%] justify-center border border-gray-300 p-[15px] rounded-lg hover:text-white hover:bg-[#22C55E] min-w-[192px] w-[30%]"
                    
                    onClick={currentCardIndex <= cards.length - 1 ? () => {
                        setFlip(true);
                        setEasyCards((easycards : any) => [...easycards , cards[currentCardIndex]])
                        setCurrCardIndex((index) => index + 1)
                    } 
                    
                    : 
                    
                    () => { null}}

                    > 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-check-big mr-1 h-4"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>
                        <span>Already know that</span>
                    </div>

                    <div id="carddiv" className="card-foot-div flex items-center justify-center border border-gray-300 p-[15px] max-[740px]:p-[5px] max-[740px]:m-[10px] max-[740px]:w-[100%] rounded-lg hover:text-white hover:bg-black min-w-[192px] w-[30%]"
                    onClick={currentCardIndex <= cards.length -1 && cards[currentCardIndex]?.id !== hardCards[hardCards.length - 1]?.id ? () => {
                        setFlip(true);
                        setHardCards((hardCards : any) => [...hardCards , cards[currentCardIndex]]);
                        setCards((cards : any) => cards.slice(0 , currentCardIndex).concat(cards.slice(currentCardIndex + 1 , currentCardIndex + 3)).concat(cards[currentCardIndex]).concat(cards.slice(currentCardIndex+3 , cards.length)))  
                    }
                    :
                    () => {return null}
                    }
                    > 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sparkles mr-1 h-4"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>            
                        <span>Didn't know that</span>
                    </div>
                    
                    <div className=" card-foot-div flex items-center justify-center border border-red-600 text-red-600 max-[740px]:p-[5px] max-[740px]:m-[10px] max-[740px]:w-[100%] p-[15px] rounded-lg hover:text-white hover:bg-red-600 min-w-[192px] w-[30%]"

                        onClick={currentCardIndex  <= cards.length - 1? () => {
                            setFlip(true);
                            // @ts-ignore 
                            setSkippedCards((skipcards) => [...skipcards , cards[currentCardIndex]])
                            setCurrCardIndex((index) => index + 1)
                        } 
                        :
                        () => {return null}
                    }

                    > 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-skip-forward mr-1 h-4"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" x2="19" y1="5" y2="19"></line></svg>
                        <span>Skip Question</span>
                    </div>

                </section>
                
            </>
        </section>
    )
}




export default FlashCard