export default function queryBuilder(body , id , user_id){
    
    const arrOfKeys = Object.keys(body);
    let setStatementPrefix = "";

    for(let i = 0 ; i < arrOfKeys.length ; i++){
        if(i == arrOfKeys.length - 1){

            setStatementPrefix +=  " " +`${arrOfKeys[i]} = '${body[arrOfKeys[i]]}'` + ""
            console.log(setStatementPrefix);
        }else{

            setStatementPrefix +=  " " +`${arrOfKeys[i]} = '${body[arrOfKeys[i]]}'` + ","
            console.log(setStatementPrefix);
        }
    }

    const query = `UPDATE flashcard SET ${setStatementPrefix} WHERE id=${id}  AND user_id='${user_id}';`

    return query;

}
