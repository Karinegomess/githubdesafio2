import React, { useState, useEffect } from 'react';

import Cart from '../../assets/cart.png'

import { Container } from './style';

import api from '../../services/api';

interface Iproduct{
    id: number;
    photo: string;
    name: string;
    description: string;
    price: number;
}


const Home: React.FC = () => {
    const [ data, setData ] = useState<Iproduct[]>([]);
    const [ cart, setCart ] = useState<Iproduct[]>([]);
    useEffect (() =>{
        api.get('').then(
            response => {
                setData(response.data)
            }
        )
    }, [])
    
    const handleCart = (index:number) => {
            let push: any = [ ... cart, cart.push(data[index])]
            setCart(push)
            const productStore = JSON.stringify(cart);
            localStorage.setItem('@cart', productStore)

    }

    return(
      <Container>
          <div className="nav">
              <div>
                  <img src="https://scontent.fcgh23-1.fna.fbcdn.net/v/t1.18169-9/12741869_450072291849058_482038605668147902_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFE4hbPzhBoDjpk577klwWjHzvbJZulBwofO9slm6UHClf9SnDfPXGlYpvT-7lrXvc&_nc_ohc=eNwA7q-rTHIAX8Zftez&_nc_ht=scontent.fcgh23-1.fna&oh=d10de3a6cfab166ad692513e7c3ae67d&oe=6124D967" alt="criarerecriar" width="100px" height="auto"/>
              </div>
              <div className="shopcart">
                  <img src={Cart} alt="cart" width="50px" height="auto"/>
                <span>( {cart.length} ) - Itens</span>
              </div>
          </div>
         <section>
             {data.map( (prod, index) =>(
               
                <div className="product-content" key={prod.id}>
                    <img src={prod.photo} alt="cursos" width="200" height="auto"/>
                    <h4>{prod.name}</h4>
                    <span>{prod.description}</span>
                    <h6>{prod.price}</h6>
                    <button onClick= {() => handleCart(index)}>Adicionar ao carrinho</button>
                </div>  
             ))}
          
         </section>
          </Container>
  );
}

export default Home;