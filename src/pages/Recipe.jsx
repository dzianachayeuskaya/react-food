import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getMealById } from '../api';
import { Preloader } from '../components/Preloader';

function Recipe() {
  const [meal, setMeal] = useState({});
  const { id } = useParams();
  const { goBack } = useHistory();

  useEffect(() => {
    getMealById(id).then((data) => setMeal(data.meals[0]));
  }, [id]);

  return !meal.strMeal ? (
    <Preloader />
  ) : (
    <>
      <div className='recipe'>
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <h2 className='title'>{meal.strMeal}</h2>
        <h6>Category: {meal.strCategory}</h6>
        {meal.strArea ? <h6>Area: {meal.strArea}</h6> : null}
        <p className='descr'>{meal.strInstructions}</p>

        <table className='centered'>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Measure</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(meal).map((key) => {
              if (key.includes('Ingredient') && meal[key]) {
                return (
                  <tr key={key}>
                    <td>{meal[key]}</td>
                    <td>{meal[`strMeasure${key.slice(13)}`]}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>

        {meal.strYoutube ? (
          <div className='row'>
            <h5 style={{ margin: '2rem 0 1.5rem' }}>Video Recipe</h5>
            <iframe
              src={`https://www.youtube.com/embed/${meal.strYoutube.slice(
                -11
              )}`}
              title={meal.strMeal}
              allowFullScreen
            />
          </div>
        ) : null}
        <button className='btn' onClick={goBack}>
          Go Back
        </button>
      </div>
    </>
  );
}

export { Recipe };
