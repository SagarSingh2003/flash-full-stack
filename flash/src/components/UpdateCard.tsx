import { SetStateAction, useState } from "react"
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Button } from "./ui/button";
import axios from "axios";
import api from "@/utils/api";
import { useToast } from "./ui/use-toast";

function UpdateCard({card , setShowUpdateCard , setRefresh} : {card : any , setShowUpdateCard : React.Dispatch<SetStateAction<{msg : boolean , ind : number | null}>> , setRefresh : React.Dispatch<SetStateAction<boolean>>}) {
  
    const [mutating , setMutating] = useState(false);
    const [deleting , setDeleting] = useState(false);
    const {toast} = useToast();
  
    return (
    <>  
        <Formik

            initialValues = {{
            
                question: card.question ,
            
                answer : card.answer,
            
                category : card.category,

            }}

            validationSchema = {Yup.object({

            question: Yup.string()

                .min(2, 'Must be atleast 2 characters or more')

                .required('Required'),

            answer: Yup.string()

                .min(5, 'Must be atleast 5 characters or more ')

                .required('Required'),

            category: Yup.string().oneOf(['beginner' , 'intermediate' , 'advanced'] , 'invalid value of category').required('Required'),

            })
            }
            
        onSubmit={(values, { setSubmitting }) => {

        
        updateCard({...values , user_id : card.user_id , id : card.id } , toast , setMutating , setShowUpdateCard , setRefresh);
            

            
        setTimeout(() => {

            setMutating(true);
            setSubmitting(false);

        }, 400);

        }}

        >
        <Form  className="border border-gray-300 , rounded-lg bg-white min-w-[350px] max-w-[500px] max-sm:min-w-[300px] max-sm:max-w-[300px]" >

            <section className="p-[25px]">
                <section className="flex flex-col items-start ">
                    <h3 className="font-bold text-[18px]">Create Card</h3>
                    <p className="text-[#71717a]">improve your learning by tenfolds</p>
                </section>
                <section className="flex flex-col items-start justify-center my-[10px] max-w-[400px]">
                    <label htmlFor="question" className="text-[15px] my-[4px]">Enter Question</label>

                    <Field

                    id="question"

                    name="question"

                    type="text"

                    placeholder="enter the frontside i.e. question"

                    className="border border-gray-300 p-[10px] rounded-lg w-[100%]"
                    />
                    <span className="text-red-600"><ErrorMessage  name="question" /></span>
                </section>


                <section className="flex flex-col items-start justify-center my-[10px] max-w-[400px]"> 
                    <label htmlFor="answer" className="text-[15px] my-[4px]">Enter Answer</label>

                    <Field

                    id="answer"

                    name="answer"

                    type="text"

                    placeholder="enter the backside i.e. answer"

                    className="border border-gray-300 p-[10px] rounded-lg w-[100%]"
                    />
                    <span className="text-red-600"><ErrorMessage  name="answer" /></span>
                </section>



                <section  className="flex flex-col items-start justify-center my-[10px] max-w-[400px]">
                        <label htmlFor="category" className="text-[15px] my-[4px]">Enter Category</label>
                            
                        <Field 
                        
                        name="category" 
                        
                        as="select"

                        id="category"

                        placeholder="select category"

                        className="border border-gray-300 p-[10px] rounded-lg w-[100%]"

                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </Field>
                        <span className="text-red-600"><ErrorMessage name="category" /></span>

                </section>

                <section className="flex items-center justify-around">
                    <span onClick={() => setShowUpdateCard({msg : false , ind : null })} className="w-[30%] bg-white py-[6px] border border-gray-300 flex items-center justify-center rounded-lg hover:bg-[#efefef] text-black">Cancel</span>
                    <Button className="w-[30%] bg-green-600 hover:bg-green-400" type="submit"
                    >{mutating ? 'updating' : "Update"}</Button>
                    <span 
                    onClick={() => {
                        setDeleting(true);
                        deleteCard(card.user_id , card.id , toast , setDeleting , setShowUpdateCard , setRefresh)
                    }}
                    className="w-[30%] bg-red-600 hover:bg-red-500 py-[6px] flex items-center justify-center border border-red-500 rounded-lg text-white">{deleting ? 'deleting...' : "Delete"}</span>
                </section>
            </section>
            </Form>
        </Formik>
    </>
  )
}


function updateCard(cardData : any , toast : any , setMutating : any , setShowUpdateCard : any ,  setRefresh : React.Dispatch<SetStateAction<boolean>>){

    console.log(JSON.stringify(cardData));
    
    axios.put(`${api}/card/updateCard/${cardData.id}/${cardData.user_id}` , {
        card : JSON.stringify(cardData)
    })
    .then((response) => {
        
        setMutating(false)
        if(response.status === 200){
            toast({
                title : "card mutated successfully ✅",
                description : "cards have been updated in your deck "
            })
            setShowUpdateCard(false);
            setRefresh((state) => !state)
        }else{
            toast({
                title : "❌ some error occured",
                description : " please check if the data is valid and try again"
            })
        }
    }).catch(err => { 
        toast({
            title : "❌ some error occured",
            description : " please check if the data is valid and try again"
        })
        setMutating((state : boolean) => !state );
        console.log(err)
    })
}

function deleteCard(user_id : string , id : string , toast : any , setDeleting : any , setShowUpdateCard : any , setRefresh : React.Dispatch<SetStateAction<boolean>>){

    
    axios.delete(`${api}/card/deleteCard/?id=${id}&user_id=${user_id}`)
    .then((response) => {
        
        setDeleting(false)
        if(response.status === 200){

            toast({
                title : "card deleted successfully ✅",
                description : "cards have been updated in your deck "
            })

            setRefresh((state)=> !state)
            setShowUpdateCard(false);
        }else{
            toast({
                title : "❌ some error occured",
                description : " please try again"
            })
        }
    }).catch(err => { 
        console.log(err);
        toast({
            title : "❌ some error occured",
            description : " please check if the data is valid and try again"
        })
        setDeleting((state : boolean) => !state);
    })
}

export default UpdateCard;