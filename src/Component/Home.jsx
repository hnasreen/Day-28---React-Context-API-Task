import {useNavigate} from 'react-router-dom'


const Home = () => {

    const navigate = useNavigate();

    const handleClick=()=>{
        navigate("/Cart")
    }

  return (
    <div>

        <button onClick={handleClick}>Go to Cart</button>

    </div>
  )
}

export default Home