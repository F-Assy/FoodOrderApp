import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress : '', 
    showCart : () => {},
    hideCart : () => {},
    showCheckout : () => {},
    hideCheckout : () => {}
});

export function UserProgressContextProvider({children}){
   const[userProgress, setUserProgress] = useState('');
   
   function showCart(){
    console.log("seeting to show cart");
    setUserProgress('cart');
   }
   function hideCart(){
    console.log("seeting to hide cart");
    setUserProgress('hideCart');
   }
   function showCheckout(){
    console.log("seeting to checkout");
    setUserProgress('checkout');
   }
   function hideCheckout(){
    setUserProgress('hidecheckout');
   }

   const userProgressCtx={
    progress : userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
   }

   return(
    <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
   )
}

export default UserProgressContext;