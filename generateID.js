export function generateId(){
    let id = '';
    let characteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*&$%';
    let characteresArray = characteres.split('');

    for(let i=0; i < 32; i++){
        id += characteresArray[Math.floor(Math.random() * characteresArray.length)]
    }

    return id
}