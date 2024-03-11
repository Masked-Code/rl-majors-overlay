export const resize_to_fit = (textElement, maxWidth) => {
    try{
        if(textElement.getComputedTextLength() > maxWidth){
            var fontsize = window.getComputedStyle(textElement, null).getPropertyValue("font-size");
            textElement.style.fontSize = parseFloat(fontsize) - 1
            fontsize = window.getComputedStyle(textElement, null).getPropertyValue("font-size");

            if(textElement.getComputedTextLength() > maxWidth){
                resize_to_fit(textElement, maxWidth);
            }       
        }
    }
    catch{
        console.log('resizing error')
    }
}