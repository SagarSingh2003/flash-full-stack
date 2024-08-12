import { SetStateAction, useState } from "react"
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Button } from "./ui/button";
import axios from "axios";
import api from "@/utils/api";
import { useToast } from "./ui/use-toast";


function InputCard({setShowCreateCard , user_id  , setRefresh } : {setShowCreateCard : React.Dispatch<SetStateAction<boolean>> , user_id : string , setRefresh : React.Dispatch<SetStateAction<boolean>>}) {

    

    const [creating , setCreating ] = useState(false);
    const {toast} = useToast();

  return (

    <>  
        <Formik

            initialValues = {{
            
                question: '',
            
                answer : '',
            
                category : 'intermediate',

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

        setTimeout(() => {

            const cardObj = {...values , user_id : user_id};

            createCard( cardObj , toast , setCreating , setShowCreateCard , setRefresh)

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
                        <ErrorMessage name="category" />

                </section>

                <section className="flex items-center justify-around">
                    <span onClick={() => {setShowCreateCard((state) => !state) }} className="w-[45%] bg-white hover:bg-[#efefef] py-[6px] rounded-md flex items-center justify-centerborder border-gray-300 text-black">Cancel</span>
                    <Button className="w-[45%] bg-green-600 hover:bg-green-400" type="submit">{ creating ? 'creating...' : "Create"}</Button>
                </section>
            </section>

        </Form>
        </Formik>
    </>
  )
}


function createCard(cardData : any , toast : any , setCreating : any , setShowCreateCard : any , setRefresh : React.Dispatch<SetStateAction<boolean>>){

    console.log(typeof JSON.stringify(cardData));
    
    axios.post(`${api}/card/createCard` , {
        card : JSON.stringify(cardData)
    })
    .then((response) => {
        
        setCreating(false)
        if(response.status === 200){
            setRefresh((state :boolean) => !state )
            toast({
                title : "card creted successfully ✅",
                description : "cards have been added to your deck "
            })
            setShowCreateCard(false);
            
        }else{
            toast({
                title : "❌ some error occured",
                description : " please check if the data is valid and try again"
            })
        }
    }).catch(err => { 
        console.log(err);
        toast({
            title : "❌ some error occured",
            description : " please check if the data is valid and try again"
        })
    })
}

export default InputCard;