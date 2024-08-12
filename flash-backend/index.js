import express from "express";
import cors from "cors";
import cardRouter from "./routes/card.js";
import 'dotenv/config'

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


app.use('/card' , cardRouter);

app.get('/health' , (req , res) => {
    res.json({
        "msg" : "successful"
    })
});

app.listen(PORT , () => {
    console.log(`app listening on port ${3000}`)
})