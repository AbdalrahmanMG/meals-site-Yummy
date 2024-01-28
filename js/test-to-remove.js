//   fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=c")
//     .then((response) => response.json())
//     .then((data) => {
//       let meals = data.meals;
//       console.log(meals);
//       meals.forEach((item) => {
//         const itemHTML = `
//               <div class="catg__item">
//                   <img src="${item.strMealThumb}">
//                   <div class="catg__item-layer">
//                       <h3>${item.strMeal}</h3>
//                       <p>${item.strArea}</p>
//                   </div>
//               </div>
//           `;

//         // Step 6: Append to the container
//         $(".main-inner").append(itemHTML);
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching data: ", error);
//     });

$(".categories").on("click", () => {
  $("#main-body").removeClass("hidden");
  let c = "c";
  getItems(c);
});

async function getItems(c, bet) {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${c}${
        bet ? bet : ""
      }`
    );
    const finalRes = await res.json();
    let meals = finalRes.meals;
    console.log(finalRes);
    console.log(meals);
    $("#main-body .row").empty();
    if (meals) {
      displayItems(meals);
    } else {
      $("#main-body .row").html("<p>No meals found.</p>");
    }
  } catch (error) {
    console.log(error);
  }
}

function displayItems(meals) {
  meals.forEach((meal) => {
    let blackbox = `<div class="main-inner g-3">
                              <div class="catg__item">
                                   <img src="${meal.strMealThumb}">
                                 <div class="catg__item-layer">
                                  <h3>${meal.strMeal}</h3>
                                  <p>${meal.strArea}</p>
                                 </div>
                              </div>
                          </div>`;
    $("#main-body .row").append(blackbox);
  });
}

function getDetails(id) {}

{
  /* <div class="main-inner hidden">
<div class="main__item">
    <img
        src="./tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese.jpg">
    <div class="main__item-layer">
        <h3>Lorem, ipsum dolor.</h3>
    </div>
</div>
</div>

<div class="main-inner text">
<div class="catg__item">
    <img
        src="./tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese.jpg">
    <div class="catg__item-layer">
        <h3>Lorem, ipsum dolor.</h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, eius?</p>
    </div>
</div>
</div>

<div class="main-inner hidden">
<div class="solid__item">
    <i class="fa-solid fa-house"></i>
    <h3>Lorem, ipsum dolor.</h3>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
</div>
</div> */
}
