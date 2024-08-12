import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { ICard } from "./FlashCard"
import { SetStateAction, useState } from "react";
import UpdateCard from "./UpdateCard";
import InputCard from "./InputCard";


  export function TableOfCards({cards  , userEmail , setRefresh } : {cards : [ICard] , userEmail : string , setRefresh : React.Dispatch<SetStateAction<boolean>>}) {

    // const {toast} = useToast();
    const [ showUpdateCard , setShowUpdateCard] = useState<{msg : boolean , ind : any}>({msg : false , ind : null});
    const [createCard , setShowCreateCard] = useState<boolean>(false);
    const [inputVal , setInputVal] = useState<string>("");

    if(showUpdateCard.msg){
        return (
            <section className="h-[100%] w-[100%] absolute top-0 left-0 right-0 bottom-0 bg-[#333333] flex items-center justify-center">
                <UpdateCard card={cards[showUpdateCard.ind]} setShowUpdateCard={setShowUpdateCard} setRefresh={setRefresh}/>
            </section>
        )
    }

    if(createCard){
        return (
            <section className="h-[100%] w-[100%] absolute top-0 left-0 right-0 bottom-0 bg-[#333333] flex items-center justify-center">
                <InputCard setShowCreateCard={setShowCreateCard} user_id={userEmail} setRefresh={setRefresh}/>
            </section>
        )
    }
    return (
    <>

    <section className="flex items-center justify-start max-[740px]:flex-col max-[740px]:gap-2 ">
      <section className="min-w-[150px] flex items-center " onClick={() => {
        setShowCreateCard((state) =>  !state);
      }}>
            <h3 className="font-bold min-w-[150px] bg-[#22C55E] w-[7%] py-[10px] flex items-center justify-center rounded-lg text-white hover:bg-[#03c55a] cursor-pointer m-[20px] ml-0">Create Card</h3>


      </section>
            <form className="flex items-center max-w-sm mx-auto">   
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                            </svg>
                        </div>
                        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for cards ..." required 
                        onChange={(e) => setInputVal(e.target.value)}
                        />
                    </div>
                </form>
      </section>
      
      <Table>
        <TableCaption>your list of created cards. ✨</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Answer</TableHead>
            <TableHead className="text-right">Difficulty</TableHead>
            <TableHead className="text-right"> Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cards && cards?.length && cards.filter((card) => {return (card.question.toLowerCase().includes(inputVal?.toLowerCase()) || card.answer.toLowerCase().includes(inputVal.toLowerCase()) )}).map((cardinfo , index) => (
            <TableRow key={index} 
            onClick={() => {
                setShowUpdateCard(({msg : true , ind : index}))
            }}
            >
              <TableCell className="font-medium">{cardinfo?.id}</TableCell>  
              <TableCell className="font-medium">{cardinfo?.question?.length < 20 ?cardinfo.question : `${cardinfo?.question?.slice(0 , 10)}...`}</TableCell>
              <TableCell>{cardinfo?.answer?.length < 30 ? cardinfo.answer : `${cardinfo?.answer?.slice(0 , 10)}...`}</TableCell>
              <TableCell className="text-right">{cardinfo?.category}</TableCell>
              <TableCell className="text-right">{cardinfo?.created_at}</TableCell>
            </TableRow>
            
          )).reverse()}
        </TableBody>
      </Table>
      </>
    )
  }
  