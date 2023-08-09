import { MealItem } from './MealItem';

function MealsList({ meals = [] }) {
  return (
    <div className='list'>
      {meals.map((meal) => (
        <MealItem key={meal.idMeal} {...meal} />
      ))}
    </div>
  );
}

export { MealsList };
