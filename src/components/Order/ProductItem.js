import React from 'react'

const ProductItem = ({ product }) => {
    return (
        <>
            <div className='flex justify-between'>
            <div className='flex'>
                <img src={product.images[0].url} className='h-[100px]' />
                <p>{product.name}</p>
            </div>
            <div>
                <p>{product.quantity} X {product.price} = {product.quantity*product.price}</p>
            </div>
            </div>

        </>
    )
}

export default ProductItem