const addBtn = document.querySelector(".form-add");
const container = document.querySelector(".container");
const formCourse = document.querySelector(".form-course");
const formChapter = document.querySelector(".form-chapter");
const formName = document.querySelector(".form-name");


addBtn.addEventListener("submit",(e)=>{
    e.preventDefault();
    const newFormCourse = formCourse.value;
    console.log(newFormCourse)
    const newFormChapter = formChapter.value;
    console.log(newFormChapter);
    const newFormName = formName.value;
    console.log(newFormName);
 
    const newDiv = document.createElement("div");
    const newDivInnerHtml = `
    <div class="preview">
          <h6>Course</h6>
          <h2>${newFormCourse}</h2>
        </div>
        <div class="info">
          <h6>${newFormChapter}</h6>
          <h2>${newFormName}</h2>
          <a href="teacherquiz/teacherquiz.html">
            <button class="btn">Open</button>
          </a>
        </div>`;

    newDiv.innerHTML = newDivInnerHtml;
    container.append(newDiv);
    formCourse.value = "";
    formChapter.value = "";
    formName.value = "";


})