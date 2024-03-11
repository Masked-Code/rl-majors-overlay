export const minimum_size = (list) => {
    try{
        let sizes = [];
        for(let x in list){
            if(list[x]){
                sizes.push(window.getComputedStyle(list[x], null).getPropertyValue("font-size"));
            }
        }
        let minimum_size;
        for(let y in sizes){
            if(!minimum_size){
                minimum_size = sizes[y];
            }
            if(sizes[y] < minimum_size){
                minimum_size = sizes[y];
            }
        }
        for(let x in list){
            if(list[x]){
                list[x].style.fontSize = minimum_size;
            }
        }
    }
    catch (error){
        console.error(error)
    }
}