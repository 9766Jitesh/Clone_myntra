import {useState,useEffect} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../App.css"




export const Products = () => {
  const [data, setData] = useState( [] );
  
  useEffect(() => {
    fetch("https://dummyjson.com/products/")
      .then((res) => res.json())
      .then((json) => {
        console.log("Fetched data:", json.products);
        setData(json.products);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
            
  
 

    const handleAddToBag = (id, image, title, price,description) => {
    const payload = {
      product_id: id,
      image: image,
      description:description,
      title: title,
      price: price,
    };
      //json-server db.json --port 3001 --watch
    fetch("http://localhost:3001/bag", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(alert("Added successfully"));
  };


  

  return (
      
    <Div>
      
  
      <Container>
       
           {
              data.map((product)=>(
                   <Box key={product.id}>
                    <div ><Image src={product.thumbnail} alt=""/></div>
                   <div className="dec">
                     
                  <h3>{product.title}</h3>
                  <p> {product.description}</p>
                   <p>{"Rs."+product.price}
                     <Link style={{ textDecoration: "none", marginLeft: "40%" }}
                       to={`/products/${ product.id }`}>More Info</Link>
                   </p>
                   
                   <button onClick={() =>
                     handleAddToBag( product.product_id, product.thumbnail, product.title, product.price )}
                     style={{ marginLeft: "1%" }}>Add to Cart</button>
                   
                   <Button>Buy Now</Button></div>
                   </Box>
               ))
           }
      </Container>
        </Div>
    )
}

const Container = styled.div`
display: grid;
background-color: #ffffff;
grid-template-columns: repeat(5, 18%);
grid-gap: 2%;
width: 100%;
margin-top: 100px;
`
const  Button = styled.button`
margin-left: 20%;
`
const Image = styled.img`
width : 100%;
`
const Box = styled.div`
:hover{
border-radius: 3px;
padding: 3px;
}


p {
  margin-top: -3px;   // change margin here...! 
}

  /* box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 100px 80px rgba(0, 0, 0, 0.12)
; */
   
`
const Div = styled.div`
  display:flex;
  
  background-color: #ffffff;
  
`


const Filter = styled.div`
width: 25%;
margin-top: 5%;
margin-left:1%;
border: 1px solid black;
padding: 20px 0px 15px 25px;

 .dec {
  border: red solid 2px;
 }
`