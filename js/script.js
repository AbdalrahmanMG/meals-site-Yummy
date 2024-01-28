$(document).ready(function () {
  $("#main-body").removeClass("hidden");
  $("#main-body .row").empty();
  searchByName("").then(() => {
    $(".loading-screen").fadeOut(300);
    $("body").css("overflow", "visible");
  });
});

$(".navBtn").on("click", () => {
  if ($("#nav").width() === 0) {
    $("#nav")
      .removeClass("hidden")
      .addClass("diplay-flex-col")
      .animate({ width: "200px" }, 500);
    $(".nav__copyrights")
      .addClass("animate__animated animate__backInLeft")
      .removeClass("animate__backOutLeft");
    $("#nav li").each(function (index) {
      $(this)
        .delay(100 * index)
        .queue((next) => {
          $(this)
            .addClass("animate__animated animate__backInUp")
            .removeClass("hidden");
          next();
        });
    });
    $(".open").addClass("hidden");
    $(".close").removeClass("hidden");
  } else {
    closeNav();
  }
});

function closeNav() {
  $("#nav li")
    .removeClass("animate__animated animate__backInUp")
    .addClass("hidden");
  $(".nav__copyrights")
    .removeClass(" animate__backInLeft")
    .addClass("animate__animated animate__backOutLeft");
  $("#nav").animate({ width: "0" }, 300, () => {
    $("#nav").addClass("hidden").removeClass("diplay-flex-col");
    $(".close").addClass("hidden");
    $(".open").removeClass("hidden");
  });
}

function showAndHide() {
  $("#main-body").removeClass("hidden");
  $("#main-body .row").empty();
  $("#search").addClass("hidden");
  $("#contact").addClass("hidden");
  closeNav();
}

function displayMeal(meals) {
  let blackbox = "";
  meals.forEach((meal) => {
    blackbox = `<div class="main-inner g-3">
                                <div class="catg__item" onclick="filterOnemeal('${meal.idMeal}')">
                                     <img src="${meal.strMealThumb}">
                                   <div class="catg__item-layer">
                                    <h3>${meal.strMeal}</h3>
                                   </div>
                                </div>
                            </div>`;
    $("#main-body .row").append(blackbox);
  });
}

// click on area link  /*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/
$(".area").on("click", () => {
  showAndHide();
  getAllItems();
});

async function getAllItems() {
  try {
    $(".second-loading-screen").fadeIn(300);
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let finalRes = await res.json();
    let meals = finalRes.meals;
    displayArea(meals);
  } catch (error) {
    console.error("Fetch error:", error);
    $("#main-body .row").html('<h2 class ="text-center">No meals found.</h2>');
  }
  $(".second-loading-screen").fadeOut(300);
}

function displayArea(meals) {
  let blackbox = "";
  meals.forEach((meal) => {
    blackbox = `
           <div class="main-inner">
               <div class="solid__item" onclick="filterCountryOrCategory('a','${meal.strArea}')">
                  <i class="fa-solid fa-house"></i>
                  <h3>${meal.strArea}</h3>
               </div>
           </div>
           `;
    $("#main-body .row").append(blackbox);
  });
}

// click on categories link  /*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/
$(".categories").on("click", () => {
  showAndHide();
  getAllCategories();
});

async function getAllCategories() {
  try {
    $(".second-loading-screen").fadeIn(300);
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let finalRes = await res.json();
    let categories = finalRes.categories;
    displayCategoryItem(categories);
  } catch (error) {
    console.log(error);
    $("#main-body .row").html(
      '<h2 class="text-center">No categories found.</h2>'
    );
  }
  $(".second-loading-screen").fadeOut(300);
}

function displayCategoryItem(categories) {
  categories.forEach((category) => {
    let blackbox = `<div class="main-inner g-3">
                              <div class="catg__item" onclick="filterCountryOrCategory('c','${
                                category.strCategory
                              }')">
                                   <img src="${category.strCategoryThumb}">
                                 <div class="catg__item-layer align-items-center">
                                  <h3>${category.strCategory}</h3>
                                  <p class="text-center">${category.strCategoryDescription
                                    .split(" ")
                                    .slice(0, 15)
                                    .join(" ")}</p>
                                 </div>
                              </div>
                          </div>`;
    $("#main-body .row").append(blackbox);
  });
}

async function filterCountryOrCategory(c, category) {
  $("#main-body .row").empty();
  try {
    $(".second-loading-screen").fadeIn(300);
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?${c}=${category}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const finalRes = await res.json();
    let meals = finalRes.meals;
    displayMeal(meals);
  } catch (error) {
    console.error("Fetch error:", error);
    $("#main-body .row").html('<h2 class ="text-center">No meals found.</h2>');
  }
  $(".second-loading-screen").fadeOut(300);
}

// click on Ingredients  /*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/
$(".ingredients").on("click", () => {
  showAndHide();
  getAllIngredients();
});

async function getAllIngredients() {
  try {
    $(".second-loading-screen").fadeIn(300);
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const finalRes = await res.json();
    let ingredients = finalRes.meals;
    displayingredientItem(ingredients);
  } catch (error) {
    console.log(error);
    ('<h2 class="text-center">No ingredients found.</h2>');
  }
  $(".second-loading-screen").fadeOut(300);
}

function displayingredientItem(ingredients) {
  let blackbox = 0;
  ingredients.forEach((ingredient) => {
    blackbox = `
           <div class="main-inner">
               <div class="solid__item" onclick="filterCountryOrCategory('i','${
                 ingredient.strIngredient
               }')">
                  <i class="fa-solid fa-house"></i>
                  <h3>${ingredient.strIngredient}</h3>
                  <p>${(ingredient.strDescription ?? "")
                    .split(" ")
                    .slice(0, 15)
                    .join(" ")}</p>
               </div>
           </div>`;
    $("#main-body .row").append(blackbox);
  });
}

// show details  /*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/
async function filterOnemeal(mealId) {
  $("#main-body .row").empty();
  $("#search").addClass("hidden");
  $(".second-loading-screen").fadeIn(300);
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const finalRes = await res.json();

  let oneMeal = finalRes.meals[0];
  $(".second-loading-screen").fadeOut(300);
  displayDetails(oneMeal);
}

function displayDetails(meal) {
  $("#main-body .row").empty();

  let ingredients = "";

  for (let i = 1; i < 21; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info rounded-2">
        ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
      </li>`;
    }
  }

  let tags = meal.strTags ? meal.strTags.split(",") : [];

  let tag = "";
  for (let i = 0; i < tags.length; i++) {
    tag += `<li class="alert alert-info rounded-2">${tags[i]}</li>`;
  }

  let blackbox = `
                <div class="col-md-4">
                    <img class="rounded-3 img-fluid"
                        src="${meal.strMealThumb}"
                        alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                </div>
                <div class="col-md-8">
                    <h3>Instructions</h3>
                    <p>${meal.strInstructions}</p>
                    <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                    <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                    <h3><span>Recipes : </span></h3>
                    <ul class="list-unstyled d-flex flex-wrap g-2 gap-2">
                        ${ingredients}
                    </ul>
                    <h3><span>Tags : </span></h3>
                    <ul class="list-unstyled d-flex flex-wrap g-2 gap-2">
                       ${tag}
                    </ul>
                    <a href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
                    <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                </div>`;
  $("#main-body .row").append(blackbox);
}

// search section  /*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/
$(".search").on("click", () => {
  showAndHide();
  $("#search").removeClass("hidden");
});

$("#nameSearch").on("input", () => searchByName($("#nameSearch").val()));
$("#letterSearch").on("input", () => searchByLetter($("#letterSearch").val()));

async function searchByName(input) {
  $(".second-loading-screen").fadeIn(300);
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
  );
  const finalRes = await res.json();
  let meal = finalRes.meals;
  $(".second-loading-screen").fadeOut(300);

  displayMeal(meal);
}

async function searchByLetter(input) {
  $(".second-loading-screen").fadeIn(300);
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`
  );
  const finalRes = await res.json();
  let meal = finalRes.meals;
  $(".second-loading-screen").fadeOut(300);

  displayMeal(meal);
}

// contact section /*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/
$(".contact").on("click", () => {
  $("#main-body").addClass("hidden");
  $("#search").addClass("hidden");
  $("#contact").removeClass("hidden");
  closeNav();
});

let validName = false;
let validEmail = false;
let validPassword = false;
let validPhone = false;
let validAge = false;
let validRepassword = false;

$("#name").on("input", () => validateName($("#name").val()));
$("#email").on("input", () => validateEmail($("#email").val()));
$("#phone").on("input", () => validatePhone($("#phone").val()));
$("#age").on("input", () => validateAge($("#age").val()));
$("#password").on("input", () => validatePassword($("#password").val()));
$("#repassword").on("input", () => validateRepassword());

function validateName(param) {
  var nameRegex = /^[A-Za-z]+$/gi;
  if (nameRegex.test(param)) {
    $(".errMsg").eq(0).addClass("hidden");
    validName = true;
  } else {
    validName = false;
    $(".errMsg").eq(0).removeClass("hidden");
  }
  return validName;
}

function validateEmail(param) {
  var nameRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/gi;
  if (nameRegex.test(param)) {
    $(".errMsg").eq(1).addClass("hidden");
    validEmail = true;
  } else {
    validEmail = false;
    $(".errMsg").eq(1).removeClass("hidden");
  }
  return validEmail;
}

function validatePhone(param) {
  var nameRegex = /^\+?\(?[0-9]{3}\)?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gi;
  if (nameRegex.test(param)) {
    $(".errMsg").eq(2).addClass("hidden");
    validPhone = true;
  } else {
    validPhone = false;
    $(".errMsg").eq(2).removeClass("hidden");
  }
  return validPhone;
}

function validateAge(param) {
  var nameRegex = /^([1-9]|[1-9][0-9])$$/gi;
  if (nameRegex.test(param)) {
    $(".errMsg").eq(3).addClass("hidden");
    validAge = true;
  } else {
    validAge = false;
    $(".errMsg").eq(3).removeClass("hidden");
  }
  return validAge;
}

function validatePassword(param) {
  var nameRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/gi;
  if (nameRegex.test(param)) {
    $(".errMsg").eq(4).addClass("hidden");
    validPassword = true;
  } else {
    validPassword = false;
    $(".errMsg").eq(4).removeClass("hidden");
  }
  return validPassword;
}

function validateRepassword() {
  var password = $("#password").val();
  var repassword = $("#repassword").val();

  if (password === repassword) {
    $(".errMsg").eq(5).addClass("hidden");
    validRepassword = true;
  } else {
    $(".errMsg").eq(5).removeClass("hidden");
    validRepassword = false;
  }
  return validRepassword;
}

function isValid() {
  return (
    validName &&
    validEmail &&
    validPassword &&
    validAge &&
    validPhone &&
    validRepassword
  );
}

$(".subBtn").on("click", (e) => {
  let validArr = [
    validName,
    validEmail,
    validPhone,
    validAge,
    validPassword,
    validRepassword,
  ];

  if (isValid()) {
    e.preventDefault();
    $("input").val("");
  } else {
    console.log("in else");
    for (let i = 0; i < validArr.length; i++) {
      if (!validArr[i] == true) $(".errMsg").eq(i).removeClass("hidden");
    }
    e.preventDefault();
  }
});
