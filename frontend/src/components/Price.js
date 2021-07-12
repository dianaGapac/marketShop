import React from 'react'

const Price = ({variations,selected}) => {

   {/* var sortedPrice= variations
    sortedPrice.sort((a, b) => a.price - b.price);
    const minPrice = sortedPrice[0].price
   const maxPrice = sortedPrice[2].price  */}


    console.log(selected)

    

    return (
        <div>
            <h4>
                <strong>
                 Price: 
                 {/*
                     selected === null?  (maxPrice === minPrice? {minPrice} : `${minPrice}-${maxPrice}` ):
                     (`$ ${variations[selected].price}`)
            
                 */ }
                        
                </strong>

            </h4>
             
        </div>
        
    )
}

export default Price
