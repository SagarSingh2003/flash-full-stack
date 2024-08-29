import { useUser } from "@clerk/clerk-react";
import Header from "./Header";
import api from "@/utils/api";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

const Ai = () => {


    const {user} = useUser();
    const [generating , setGenerating]  = useState<boolean>();
    const { toast } = useToast()
    
    if(!user){
        // @ts-ignore 
        window.location  = "/signin";
        return null;
    }


    function  handleSubmit (event : any ) {
        setGenerating(true)
        const formData = new FormData(event.currentTarget);
        event.preventDefault();
        const user_id = formData.get("user_id");
        const paragraph = formData.get("paragraph");
        // @ts-ignore 
        const paraWithoutSpaces = paragraph?.replace(' ' , "")

        if(paraWithoutSpaces.length > 10){
        
            fetch(`${api}/card/generate-card` , {
                method : "post",
                body : JSON.stringify({
                    user_id : user_id,
                    paragraph : paraWithoutSpaces
                }),
                headers : {
                    "Content-Type" : "application/json"
                }
            }).then((res) => {
                setGenerating(false);
                if(res.status === 200){
                    toast({
                        title: "✅ Cards generated Successfully",
                    })
                }else{
                    toast({
                        title: "❌ Some Error Occured Please try again !",
                    })
                }
            })
        } else{
            setGenerating(false);
        }
    }

    return(
        <>
        <section className="w-[100%]">
            <section className="flex items-center justify-center m-[3px]">
                <Header />
            </section>
            <section className="m-[20px] mt-[70px] w-[100%] flex flex-col items-center justify-center">
                <section className="min-w-[150px] flex flex-col items-center justify-center gap-10 w-[100%]" onClick={() => {
                    // setShowCreateCard((state) =>  !state);
                }}>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-20">
                        <textarea name="paragraph" id="ai-textarea"  className="min-w-[500px] w-[800px] min-h-[400px] px-[10px] py-[5px] border border-gray-300 rounded-lg"></textarea>
                        <input type="text" hidden name="user_id" id="user_id" defaultValue={user.emailAddresses[0].emailAddress}/>
                        <Button type="submit" className="min-w-[250px] max-w-[300px] py-[20px] text-white cursor-pointer flex items-center justify-center">
                        {generating ? 
                        
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                        : 
                        
                        <span>Generate Cards with Ai"</span>
                        }
                        </Button>
                    </form>

                </section>
            </section>
        </section>
        </>
    )
}

export default Ai;