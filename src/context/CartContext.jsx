import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [count, setCount] = useState(0);
    const [contador, setContador] = useState(1);
    const [compra, setCompra] = useState(false);
    const initial = 1;
    const stock = 10;

    const restar = () => {
        if (count > initial) {
            setCount(count - 1);
        }
    };
    
    const sumar = () => {
        if (count < stock) {
            setCount(count + 1);
        }
    };
    const addItem2 = (item, cantidad) => {
        const purchase = {...item, quantity:cantidad}
        const existsInCart = cart.find((prod)=> prod.id === item.id)
        if(existsInCart){
                    const carritoActualizado = cart.map((prod)=>{
                        if(prod.id === item.id){
                            return {...prod, quantity:prod.quantity + cantidad}
                        }else{
                            return prod
                        }
                    })
                    setCart(carritoActualizado )
                }else{
                    setCart([...cart, purchase])
                }
    }

    const clear = () => {
        setCart([]);
    };
    const removeItem = (id) => {
        setCart(cart.filter((prod) => prod.id !== id));
    };
        const isInCart = (id) => {
        return cart.some((prod) => prod.id === id);
    };
        
    const cartQuantity = () => {
        return cart.reduce((acc, product) => acc += product.quantity,0)
    };
    const cartTotal = () => {
        return cart.reduce((acc, product)=> acc += product.price * product.quantity,0)
    };



return (
        <CartContext.Provider
                value={{
                cart,
                clear,
                removeItem,
                isInCart,
                count,
                setCount,
                setContador,
                setCompra,
                contador,
                compra,
                cartTotal,
                cartQuantity,
                addItem2,
                sumar,
                restar, 
                stock,
                initial,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
