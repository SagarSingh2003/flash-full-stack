import {Router} from "express";
import cardController from "../controller/cardController.js";

const router = Router();

router.get("/" , cardController.getAllCards);

router.get('/getUserCards/:id' , cardController.getUserCards);

router.post("/createCard" , cardController.createCard);

router.post("/generate-card" , cardController.aiGeneratedCards);

router.post("/createCards" , cardController.createCards);

router.put("/updateCard/:card_id/:user_id" , cardController.updateCard);

router.delete('/deleteCard' , cardController.deleteCard);

export default router;