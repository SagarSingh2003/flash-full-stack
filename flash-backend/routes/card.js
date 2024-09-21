import {Router} from "express";
import cardController from "../controller/cardController.js";

const router = Router();

router.get("/" , cardController.getAllCards);

router.get('/getUserCards/:id' , cardController.getUserCards);

router.post("/createCard" , cardController.createCard);

router.post("/generate-card" , cardController.aiGeneratedCards);

router.get("/getAllDecks/:user_id"  ,cardController.getAllDecks );

router.post("/createCards" , cardController.createCards);

router.post("/createDeck" , cardController.createDeck);

router.put("/updateCard/:card_id/:user_id" , cardController.updateCard);

router.delete('/deleteCard' , cardController.deleteCard);

router.delete('/deleteAllCards' , cardController.deleteAllCards);

export default router;