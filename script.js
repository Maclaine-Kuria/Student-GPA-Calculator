/*======Step 1: Define a mapping between letter grades and GPA points=====*/
const gradeToPoint = {
    A: 4,
    B: 3,
    C: 2,
    D: 1,
    F: 0
  };
  
  /*=====Step 2: Select important DOM elements we'll interact with======*/
  const coursesContainer = document.getElementById("courses-container");
  const calculateBtn = document.getElementById("calculate-gpa");
  const addCourseBtn = document.getElementById("add-course");
  const gpaResult = document.getElementById("gpa-result");
  
  /*==== Step 3: Handle the GPA calculation when the button is clicked=====*/
  calculateBtn.addEventListener("click", () => {
    /*=======Get all the grade dropdowns inside the course container=====*/
    const grades = Array.from(coursesContainer.querySelectorAll("select[name='grade']"));
  
    /*==== Initialize variables to track total points and number of valid grades====*/
    let totalPoints = 0;
    let validGrades = 0;
  
    /*======Step 4: Loop through each grade selected by the user=======*/
    grades.forEach((gradeSelect) => {
      const grade = gradeSelect.value;
  
      /*=====Check if the grade is valid (i.e., exists in our gradeToPoint object)=====*/
      if (gradeToPoint.hasOwnProperty(grade)) {
        /*====== Add the corresponding GPA points to the total=====*/
        totalPoints += gradeToPoint[grade];
        /*=====Increase the count of valid grades=====*/
        validGrades++;
      }
    });
  
    /*======= Step 5: Show error message if no valid grades were selected=====*/
    if (validGrades === 0) {
      gpaResult.style.color = "red";
      gpaResult.textContent = "Please select grades before calculating GPA.";
      return;
    }
  
    /*=======Step 6: Calculate average GPA======*/
    const gpa = (totalPoints / validGrades).toFixed(2);
  
    /*======== 7: Display the result dynamically=======*/
    gpaResult.style.color = "green";
    gpaResult.textContent = `Your estimated GPA is: ${gpa}`;
  });
  
  /*======Step 8: Add new course input row when "Add Another Course" button is clicked====*/
  addCourseBtn.addEventListener("click", () => {
    /*======== Create a new div to hold the inputs=====*/
    const newRow = document.createElement("div");
    newRow.classList.add("course-row");
  
    /*====== Get current number of course rows to give unique IDs =======*/
    const index = coursesContainer.querySelectorAll(".course-row").length + 1;
  
    /*======= Add inner HTML with labeled input fields for course name and grade=======*/
    newRow.innerHTML = `
      <label for="course${index}">Course Name:</label>
      <input type="text" id="course${index}" name="course" required>
  
      <label for="grade${index}">Grade:</label>
      <select id="grade${index}" name="grade" required>
        <option value="">Select Grade</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="F">F</option>
      </select>
    `;
  
    /*======Append the new row to the courses container so it appears in the form=======*/
    coursesContainer.appendChild(newRow);
  });
  
