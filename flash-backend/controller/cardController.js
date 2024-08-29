import pool from "../model/db.js";
import queryBuilder from "../utils/queryBuilder.js";
import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
            
const cardController = {
    getAllCards : async (req , res) => {
        try{
            
            const user_id  = req.query.user_id;
            let rows = [];

            if(user_id){
                rows = await pool.query(`select * from flashcard WHERE user_id='all' OR user_id='${user_id}'`);
            }else{
                rows = await pool.query("select * from flashcard WHERE user_id='all'");
                // console.log(rows);
            }

            // console.log(rows , "rows");
            res.status(200).json({    
                cards : rows[0]
            });   
            
        }catch(err){
            console.log(err);
            res.status(500).json({
                msg : err
            })
        }     
    },
    getUserCards : async (req , res) => {
        const user_id = req.params.id;
      
        try{

            const [rows]= await pool.query(`select * from flashcard WHERE user_id='${user_id}'`);

            // console.log(rows , "rows");
            res.status(200).json({    
                cards : rows
            });   
            
        }catch(err){
            console.log(err);
            res.status(500).json({
                msg : err
            })
        }     
    },
    createCard : async (req ,res) => {
        try {
            
            const {question , answer , category , user_id} = JSON.parse(req.body.card);
            const [rows] = await pool.query(`INSERT INTO flashcard(question , answer , category , user_id) VALUES("${String(question)}" , "${String(answer)}" , "${String(category)}" , "${String(user_id)}");`)

            console.log(req.body.card.question);
            console.log('got create request');
            res.status(200).json({
                msg : "card created successfully",
                successful : "true"
            });

        }catch(err){
            
            console.log(err);
            res.status(500).json({
                msg : err,
                successful : false
            })
        }
    },
    createCards : async (req , res) => {
        try {

            const arrOfCard = req.body.cards;
            const arrOfCardInfo = JSON.parse(arrOfCard);

            for(let i = 0 ; i < arrOfCardInfo.length ; i++){
    
                const {question , answer , category , user_id} = arrOfCardInfo[i];
                const [rows] = await pool.query(`INSERT INTO flashcard(question , answer , category , user_id) VALUES("${String(question)}" , "${String(answer)}" , "${String(category)}" , "${String(user_id)}");`)
                console.log(rows , "rows data");
            }

            res.status(200).json({
                msg : "successful",
                successful : "true"
            })

        }catch(err){
            console.log(err);
            res.status(500).json({
                msg : err
            })
        }
    },
    updateCard : async (req , res) => {

        try{

            const body = JSON.parse(req.body.card);
            const updateBody = new Object({question : body.question , answer : body.answer , category : body.category});
            console.log(updateBody);
            const user_id = req.params.user_id;
            const card_id = req.params.card_id;
    
            const query = queryBuilder(updateBody , card_id , user_id );
            
    
            const [rows]  = await pool.query(query);
            res.status(200).json({
                msg : "card updated successfully",
                successful : "true",
                newCard : rows

            })
    
        }catch(err){
            console.log(err);
            res.status(500).json({
                msg : `${err}`
            })
        }

    },
    deleteCard : async(req , res) => {
        try {
            const user_id = req.query.user_id;
            const card_id = req.query.id;


            const [rows] = await pool.query(`DELETE FROM flashcard WHERE id= '${card_id}' AND user_id= '${user_id}'`)

            res.status(200).json({
                msg : "successful",
                successful : 'true'
            })
        }catch(err){
            console.log(err);
            res.status(500).json({
                msg : `${err}`,
                successful : false
            })
        }
    },
    aiGeneratedCards : async(req , res) => {
        try{
            const {user_id , paragraph} = req.body;

            console.log(user_id , paragraph , req.body);
            let model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
                // Set the `responseMimeType` to output JSON
                generationConfig: { responseMimeType: "application/json" }
              });
              
              let prompt = `
              form question answers that you feel are important also assign a category to them which is just a measure of how difficult or how complex the question is , the category has 3 values which are beginner , intermediate and advance from the given paragraph   :  ${paragraph} also insert user_id as : ${user_id} and return an array of objects using this JSON schema:
              { "type": "object",
                "properties": {
                  "question": { "type": "string" },
                  "answer": {"type": "string"},
                  "category":{"type":"string"},
                  "user_id" : {"type" : "string"}
                }
              }`;
              
              let result = await model.generateContent(prompt)
              const stringResult = JSON.stringify(result.response.text());
              const jsonData = JSON.parse(stringResult);
              for(let i = 0 ; i < JSON.parse(jsonData).length ; i++){
    
                const {question , answer , category , user_id} = JSON.parse(jsonData)[i];
                const [rows] = await pool.query(`INSERT INTO flashcard(question , answer , category , user_id) VALUES("${String(question)}" , "${String(answer)}" , "${String(category)}" , "${String(user_id)}");`)
                console.log(rows , "rows data");
            }
              
                res.status(200).json({
                    msg : "successful",
                    successful : 'true'
                })
              
        }catch(err){
            console.log(err);
            res.status(500).json({
                msg : `${err}`,
                successful : false
            })
        }
    }
}



export default cardController;
