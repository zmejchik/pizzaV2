import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const data = await axios.get(
          "https://66eaf37e55ad32cda47b1447.mockapi.io/items/" + id
        );
        setPizza(data.data);
      } catch (error) {
        alert("Error fetching pizza:");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} $</h4>
    </div>
  );
};

export default FullPizza;
