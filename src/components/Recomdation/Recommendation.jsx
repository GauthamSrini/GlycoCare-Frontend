import React, { useEffect, useState } from 'react'
import './recommendations.css'
import axios from 'axios';

const Recommendation = () => {
  const [selectedFoodId,setSelectedFoodId] = useState(1);
  const [selectedFoodItem,setSelectedFoodItem] = useState([])
  const [foodItemsData,setFoodItemsData] = useState([])

  useEffect(() => {
    fetchDietaryChoices()
  }, [])
  
  const handleSelectedFood = (food)=> {
    setSelectedFoodItem(food)
    setSelectedFoodId(food.id)
  }

  const fetchDietaryChoices = async () =>{
    try{
    const response = await axios.get('http://localhost:5000/api/eldertech/dietaryChoices')
        setFoodItemsData(response.data)
        setSelectedFoodItem(response.data[0])
        console.log(response.data);
    }
    catch(err){
        console.log("error fetching the diatary choices",err);
    }
  }

  return (
    <div>
      <div className='DietChoiceMainDiv'>
        <div className='DietsTitle'>Dietary Choices</div>
        <div className='dietChoicesDiv'>
            {
                foodItemsData.map((food)=>
                <div key={food.id} className={selectedFoodId===food.id?"dietNameDivActive":"dietNameDiv"} onClick={()=>handleSelectedFood(food)}>
                    <img className='bookMark' src="/images/bookmark.png" alt="" />
                    <div>{food.food_name}</div>
                </div>
                )
            }
        </div>
        <div className='recommendedDiv'>
            <div className='recommendationTit'>RECOMMENDATION:</div>
            <div className='foodRecommendTitle'>{selectedFoodItem.food_name}</div>
            <div className='foodRecommendationDes'>
                <div><img src={selectedFoodItem.image} className='food_img' alt="" height={"250px"} /></div>
                <div className='preparationsDivFood'>
                    <div><span className='subtit'>Preparation </span>- {selectedFoodItem.preparation}</div>
                    <div><span className='subtit'>Nutrition Information </span>- {selectedFoodItem.nutrient}</div>
                    <div><span className='subtit'>Disease Avoided from the food </span>- {selectedFoodItem.disease}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Recommendation
