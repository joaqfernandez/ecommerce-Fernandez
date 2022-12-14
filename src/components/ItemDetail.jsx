import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ItemCount from './ItemCount'

const ItemDetail = ({productDetail}) => {
    const[count, setCount]= useState(1)
    const [compra, setCompra]= useState(false)
    const {name, description, price, stock, img, id}= productDetail
    const navegar = useNavigate()
    const{addItem}=useCart()
    const onAdd = () => {
        let purchase = {
            id,
            name,
            price,
            stock, 
            img,
            quantity:count
        }
        setCompra(true)
        addItem(purchase)
    }
    
    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', padding:'3rem'}}>
            <h2>Detalle de: {name}</h2>
            <img src={img} alt={name} style={{width:'25rem'}}/>
            <p>{description}</p>
            <p>${price}</p>
            { !compra 
            ? <ItemCount stock={stock} initial={1} onAdd={onAdd} count={count} setCount={setCount}/>
            : <div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
            <button className="btn btn-warning" onClick={()=>navegar('/')}>Seguir Comprando</button>
            <button className="btn btn-info" onClick={()=>navegar('/cart')}>Ir al carrito</button>
        </div>}
        </div>
    )
}

export default ItemDetail