export  function getMaxDay(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let new_date = new Date(year,month,0);
    return new_date.getDate();
}

