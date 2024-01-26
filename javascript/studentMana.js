// let studentManagement =
//   JSON.parse(localStorage.getItem("studentManagement")) || [];
// let studentManagement = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
let arrCourse = localStorage.getItem("studentManagement")
  ? JSON.parse(localStorage.getItem("studentManagement"))
  : [];
let arrStudent = [];

function updateArrStudent() {
  //Lưu ý chỉ dùng hàm này để render dữ liệu ko sử dụng khi sửa, xóa,...
  arrStudent = [];
  arrClass = [];
  arrCourse.forEach((course) => {
    course.arrClass.forEach((classInfo) => {
      classInfo.arrStudent.forEach((studentItem) => {
        arrStudent = arrStudent.concat({
          classId: classInfo.classId,
          className: classInfo.className,
          ...studentItem,
        });
      });
    });
  });
}
updateArrStudent(arrStudent);
// Cách dùng map
//   arrClass = [];
//   arrCourse.forEach((course) => {
//     let classArrCourse = course.arrClass.map((classItem) => {
//       return {
//         courseName: course.courseName,
//         courseId: course.courseId,
//         ...classItem,
//       };
//     });
//     arrClass = arrClass.concat(classArrCourse);
//   });
//   console.log(arrClass);
//   localStorage.setItem("arrClass", JSON.stringify(arrClass));
// }
document.getElementById("btnLogout").addEventListener("click", function () {
  //Xóa item có tên userLogin trong localStorage
  localStorage.removeItem("userLogin");
  //Điều hướng về Login
  window.location.href = "login.html";
});
// let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];

let action = "Create";
//Phân trang

let currentPage = 1;
let recordsPerPage = 3;

function renderData(page) {
  // Hiển thị số trang
  let totalPage = getTotalPage();
  let listPage = document.getElementById("listPage");
  listPage.innerHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    listPage.innerHTML += `
       <li><a href="javascript:clickPage('${i}')">${i}</a></li>
       `;
  }
  // Nếu ở trang 1 thì ẩn preview còn nếu ở trang cuối thì ẩn next
  if (page == 1) {
    document.getElementById("preview").style.visibility = "hidden";
  } else {
    document.getElementById("preview").style.visibility = "visible";
  }
  if (page == totalPage) {
    document.getElementById("next").style.visibility = "hidden";
  } else {
    document.getElementById("next").style.visibility = "visible";
  }
  //Tính index của dữ liệu hiển thị trên table
  let firstIndex = (page - 1) * recordsPerPage;
  let lastIndex = page * recordsPerPage;
  if (lastIndex > arrStudent.length) {
    lastIndex = arrStudent.length;
  }

  let listStudent = document.getElementById("listStudent");
  listStudent.innerHTML = "";
  for (let index = firstIndex; index < lastIndex; index++) {
    listStudent.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${arrStudent[index].studentId}</td>
                <td>${arrStudent[index].studentName}</td>                
                <td>${arrStudent[index].year}</td>
                <td>${arrStudent[index].address}</td>
                <td>${arrStudent[index].email}</td>
                <td>${arrStudent[index].phone}</td>
                <td>${arrStudent[index].gender?"Nam":"Nữ"}</td>
                <td>${arrStudent[index].status}</td>
                <td>${arrStudent[index].className}</td>
                <td>
                    <button id="btnEditStudent" class="btn btn-success" onclick="displayDataToEdit('${
                      arrStudent[index].studentId
                    }')"> 
                    <i class="fa-solid fa-pen-to-square" ></i></button>
                    <button id="btnDeleteStudent" class="btn btn-danger" onclick="deleteStudent('${
                      arrStudent[index].studentId}')"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
  }
}

function getTotalPage() {
  return Math.ceil(arrStudent.length / recordsPerPage);
}

function clickPage(page) {
  currentPage = page;
  // let arrCourse = JSON.parse(localStorage.getItem("studentManagement")) || [];
  renderData(page, arrStudent);
}
// Hàm previewPage
function previewPage() {
  currentPage--;
  // render lại dữ liệu lên table
  // let arrCourse = localStorage.getItem("studentManagement") ? JSON.parse(localStorage.getItem("studentManagement")) : [];
  renderData(currentPage, arrStudent);
}
// Hàm nextPage
function nextPage() {
  currentPage++;
  renderData(currentPage, arrStudent);
}

var newStudentModal = new bootstrap.Modal(document.getElementById("newStudent"), {
  keyboard: false,
});
// ValidateForm
function validateForm() {
  let studentId = document.getElementById("studentId");
  let studentName = document.getElementById("studentName");
  let year = document.getElementById("year");
  let address = document.getElementById("address");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  let studentIdValue = document.getElementById("studentId").value;
  let studentNameValue = document.getElementById("studentName").value;
  let yearValue = document.getElementById("year").value;
  let addressValue = document.getElementById("address").value;
  let emailValue = document.getElementById("email").value;
  let phoneValue = document.getElementById("phone").value;
  let isCheckLookId = checkIdExist(studentIdValue);
  let validationEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // let validationPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  let validationPhone = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  if (studentIdValue == "") {
    setError(studentId, "*Không được để trống mã sinh viên");
  } else if (isCheckLookId) {
    setError(studentId, "*Mã sinh viên đã bị tồn tại,vui lòng nhập lại");
  } else {
    setSuccess(studentId);
  }

  if (studentNameValue == "") {
    setError(studentName, "*Không được để trống tên sinh viên");
  } else {
    setSuccess(studentName);
  }
  if (yearValue == "") {
    setError(year, "*Không được để trống năm sinh");
  } else if (!Number(yearValue) || Number(yearValue) < 1995) {
    setError(year, "*Vui lòng nhập năm sinh là số và có giá trị lớn hơn 1995");
  } else {
    setSuccess(year);
  }
  if (addressValue == "") {
    setError(address, "*Không được để trống địa chỉ");
  } else {
    setSuccess(address);
  }
  if (emailValue == "") {
    setError(email, "*Không được để trống email");
  } else if (!emailValue.match(validationEmail)) {
    setError(email, "*Vui lòng nhập đúng định dạng email");
  } else {
    setSuccess(email);
  }
  if (phoneValue == "") {
    setError(phone, "*Không được để trống số phone");
  } else if (!phoneValue.match(validationPhone)) {
    setError(phone, "*Vui lòng nhập đúng định dạng số phone");
  } else {
    setSuccess(phone);
  }
}

function setSuccess(input) {
  var parentInput = input.parentElement;
  var error = parentInput.querySelector(".error-message");
  error.innerText = "";
}

function setError(input, message) {
  var parentInput = input.parentElement;
  var error = parentInput.querySelector(".error-message");
  error.innerText = message;
}

//Check ID trung hay ko
function checkIdExist(studentCheckId) {
  let arrCourse = localStorage.getItem("arrCourse")
    ? JSON.parse(localStorage.getItem("arrCourse"))
    : [];
  for (let i = 0; i < arrCourse.length; i++) {
    for (let j = 0; j < arrCourse[i].arrClass.length; j++) {
      for (
        let k = 0;
        k < arrCourse[i].arrClass[j].arrStudent.length;
        k++
      ) {
        if (
          arrCourse[i].arrClass[j].arrStudent[k].studentId ===
          studentCheckId
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

//Thẽm mới sinh vieen
function createStudent() {
  //2. Lấy dữ liệu trên modal
  
  let newStudent = getDataForm();
  // validateForm();

  // if (!validateStudentId(studentId)) {
  //   return;
  // }
  // if(!validateClassName(className)){
  //   return;
  // }
  
  //thêm mới
  // let classIdOfNewStudent = newStudent.classId;
  // let classIndex = getClassById(arrClass, classIdOfNewStudent);
  // if (classIndex == -1) {
  //   return;
  // }
  // arrClass[classIndex].arrStudent.push(newStudent);
  let classIdOfNewStudent = newStudent.classId;
  // let classIndex = getClassById(arrClass,classIdOfNewStudent)
  // let courseIndex = getCourseById(arrCourse,courseIdOfNewStudent);
  for (let i = 0; i < arrCourse.length; i++) {
    for (let j = 0; j < arrCourse[i].arrClass.length; j++) {
      if(arrCourse[i].arrClass[j].classId==classIdOfNewStudent){
        arrCourse[i].arrClass[j].arrStudent.unshift(newStudent);
      }      
    }       
  } 

  localStorage.setItem("studentManagement", JSON.stringify(arrCourse));
  updateArrStudent(arrCourse);
  window.location.reload();

  //5. Đóng modal
  document.getElementById("classId").value = "";
  document.getElementById("studentId").value = "";
  document.getElementById("studentName").value = "";
  document.getElementById("year").value = "";
  document.getElementById("address").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("gender").value = "";

  document.getElementById("status").value = "";
  // document.getElementById("inActive").selected = true;
  // let optionFirst = document.getElementById("courseName");
  // if (optionFirst.length != 0) {
  //   optionFirst[0].selected = true;
  // }
  newStudentModal.hide();
  //render lại dữ liệu
  renderData(currentPage);
  window.location.reload();
}

function getClassById(arrCourse, classId) {
  for (let i = 0; i < arrCourse.length; i++) {
    for (let j = 0; j < arrCourse[i].arrClass.length; j++) {
      if (arrCourse[i].arrClass[j].classId === classId) {
        return j;
      }      
    }   
  }
  return -1;
}

function getCourseById(arrCourse, courseId) {
  for (let index = 0; index < arrCourse.length; index++) {
    if (arrCourse[index].courseId == courseId) {
      return index
    }
  }
  return -1;
}
function getStudentById(arrCourse,studentId) {
  for (let i = 0; i < arrCourse.length; i++) {
    for (let j = 0; j < arrCourse[i].arrClass.length; j++) {
      for (let l = 0; l < arrCourse[i].arrClass[j].arrStudent.length; l++) {
        if (arrCourse[i].arrClass[j].arrStudent[l].studentId==studentId) {
          return l;
        }        
      }      
    }      
  }
  return -1;
}

function getClassIdOfStudent(arrCourse,studentId) {
  for (let i = 0; i < arrCourse.length; i++) {
    for (let j = 0; j < arrCourse[i].arrClass.length; j++) {
      for (let l = 0; l < arrCourse[i].arrClass[j].arrStudent.length; l++) {
        if (arrCourse[i].arrClass[j].arrStudent[l].studentId == studentId) {
          return j;
        }        
      }      
    }       
  }
  return -1;
}

function getCourseIdOfClass(arrCourse, classId) {
  for (let i = 0; i < arrCourse.length; i++) {
    for (let j = 0; j < arrCourse[i].arrClass.length; j++) {
      if (arrCourse[i].arrClass[j].classId == classId) {
        return i;
      }
    }
  }
  return -1;
}

// // function validate StudentId
// function validateStudentId(studentId) {
//   let indexToFind = arrClass.findIndex(
//     (element) => element.studentId === studentId
//   );
//   if (indexToFind >= 0) {
//     //Đã tồn tại mã danh mục trong arrCourse
//     // document.getElementById("courseId").style.backgroundColor=="yellow";
//     alert("Mã sinh viên đã tồn tại");
//     return false;
//   }
//   // document.getElementById("courseId").style.backgroundColor =="";
//   return true;
// }
//Không cần validate trùng với tên sinh viên
// function validateStudentName(studentName) {
//   let indexToFind = arrStudent.findIndex(
//     (element) => element.studentName === studentName
//   );
//   //Nếu indexToFind>=0 tức là index đã tồn tại trong mảng
//   if (indexToFind >= 0) {
//     document.getElementById("studentName").style.backgroundColor == "yellow";
//     alert("Tên sinh viên đã tồn tại");
//     return false;
//   }
//   document.getElementById("studentName").style.backgroundColor == "";
//   return true;
// }

// Hàm lấy dữ liệu trên inputForm
function getDataForm() {
  let classId = document.getElementById("classId").value;
  let studentId = document.getElementById("studentId").value;
  let studentName = document.getElementById("studentName").value;
  let year = document.getElementById("year").value;
  let address = document.getElementById("address").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let gender = document.getElementsByClassName("gender");
  let genderValue;
  for (let i = 0; i < gender.length; i++) {
    if (gender.item(i).checked) {
        genderValue=gender.item(i).value;      
    }        
  }
  let status = document.getElementById("status").value;
  let classStudent = {
    classId,
    studentId,
    studentName,
    year,
    address,
    email,
    phone,
    gender:genderValue,
    status
  };
  return classStudent;
}
document
  .getElementById("btnCreateStudent")
  .addEventListener("click", function (event) {
    event.preventDefault();

    if (action == "Create") {
      createStudent();
      newStudentModal.hide();
    } else {
      editStudent();
    }
  });

//Function clearForm
function clearForm() {
  document.getElementById("studentId").value = "";
  document.getElementById("studentName").value = "";
  document.getElementById("year").value = "";
  document.getElementById("address").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("status").value = "";
}

function  getCourseIdByStudentId(arrCourse,studentId) {
  for (let i = 0; i < arrCourse.length; i++) {
    for (let j = 0; j < arrCourse[i].arrClass.length; j++) {
      for (let k = 0; k < arrCourse[i].arrClass[j].arrStudent.length; k++) {
        if (arrCourse[i].arrClass[j].arrStudent[k].studentId==studentId) {
            return i;
        }        
      }   
      
    }
    
  }
  return -1;
}

// Xử lý EditClass
let myModalEditStudent= new bootstrap.Modal(document.getElementById("editStudent"), {
  keyboard: false,
});
let idEdit;
function displayDataToEdit(studentId) {
  myModalEditStudent.show();
  idEdit = studentId;
  let arrCourse = localStorage.getItem("studentManagement")
  ? JSON.parse(localStorage.getItem("studentManagement"))
  : [];
  let courseIndex = getCourseIdByStudentId(arrCourse,studentId);
  let classIndex = getClassIdOfStudent(arrCourse,studentId);
  let studentIndexUpdate = getStudentById(arrCourse,studentId);

    console.log(studentIndexUpdate);
  if (studentIndexUpdate>=0&&courseIndex>=0&&classIndex>=0) {
    console.log(arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate]);   
    document.getElementById("studentIdEdit").value = arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].studentId;
    document.getElementById("studentNameEdit").value =arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].studentName;

    document.getElementById("yearEdit").value =arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].year;
     
      document.getElementById("addressEdit").value =arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].address;  
      document.getElementById("emailEdit").value =arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].email;
      
      document.getElementById("phoneEdit").value =arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].phone;
   
    if (arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].gender == "true") {
      document.getElementById("activeEdit").value = "Nam";
    } else {
      document.getElementById("inActiveEdit").value = "Nữ";
    }

    if (arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].status  == "active") {
      document.getElementById("activeEdit").value = "Hoạt động";
    } else if (arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].status  == "inActive") {
      document.getElementById("inActiveEdit").value = "Đình chỉ";
    }else if (arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].status  == "waitingEdit") {
      document.getElementById("waitingEdit").value = "Chờ lớp";
    }else if (arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].status  == "pendingEdit") {
      document.getElementById("pendingEdit").value = "Bảo lưu";
    }
    else {
      document.getElementById("endEdit").value = "Tốt nghiệp";
    }
    
  action = "Edit";
  }}

let modalCloseUpdateData = document.getElementById("editStudent");
modalCloseUpdateData.addEventListener("hide.bs.modal", function () {
  clearForm();
document.getElementById("studentId").readOnly = false;
});

function getDataFormEdit() {

  let arrCourse = localStorage.getItem("studentManagement")
    ? JSON.parse(localStorage.getItem("studentManagement"))
    : [];
  let courseIndex = getCourseIdByStudentId(arrCourse, idEdit);
  let classIndex = getClassIdOfStudent(arrCourse,idEdit);
  let studentIndexUpdate = getStudentById(arrCourse,idEdit);

  let studentName = document.getElementById("studentNameEdit").value;
  let year = document.getElementById("yearEdit").value;
  let address = document.getElementById("addressEdit").value;
  let phone = document.getElementById("phoneEdit").value;
  let email = document.getElementById("emailEdit").value;
  let gender = document.getElementById("genderEdit").value;
  let status = document.getElementById("statusEdit").value;


  arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].studentName = studentName;
  arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].year = year;
  arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].address = address;
  arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].phone = phone;
  arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].email = email;
  arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].gender = gender;
  arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate].status = status;

  return arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndexUpdate];
}


function editStudentInfo() {
  let arrCourse = localStorage.getItem("studentManagement")
  ? JSON.parse(localStorage.getItem("studentManagement"))
  : [];

  let courseIndex = getCourseIdByStudentId (arrCourse,idEdit)
  let classIndex = getClassIdOfStudent(arrCourse,idEdit);
  let editStudentInfo = getDataFormEdit();
  let studentIndex = getStudentById(arrCourse, idEdit);
  console.log(studentIndex);
  if (studentIndex > -1) {
    arrCourse[courseIndex].arrClass[classIndex].arrStudent[studentIndex] = editStudentInfo;
  }

  localStorage.setItem("studentManagement", JSON.stringify(arrCourse));

  action = "Create";
  clearForm();
  myModalEditStudent.hide();
  renderData(currentPage);
  window.location.reload();
}
document.getElementById("btnEditSave").addEventListener("click", function(event){
    event.preventDefault();
    editStudentInfo();
})

// Hàm xóa class
let myModalDeleteStudent = new bootstrap.Modal(
  document.getElementById("deleteStudent"),
  {
    keyboard: false,
  }
);

function deleteStudent(studentId) {
  let arrCourse = localStorage.getItem("studentManagement")
  ? JSON.parse(localStorage.getItem("studentManagement"))
  : [];
  myModalDeleteStudent.show();

  let yesToDeleteStudent = document.getElementById("yesToDeleteStudent");
  let noToDeleteStudent = document.getElementById("noToDeleteStudent");
  yesToDeleteStudent.onclick = function () {
   
    let courseIndex =getCourseIdByStudentId(arrCourse,studentId);
    let classIndex = getClassIdOfStudent(arrCourse, studentId);
    let studentIndex = getStudentById(arrCourse,studentId);
    
    if(studentIndex>-1){
      arrCourse[courseIndex].arrClass[classIndex].arrStudent.splice(studentIndex, 1);
      window.location.reload();
    }

    localStorage.setItem("studentManagement", JSON.stringify(arrCourse));
    updateArrStudent(arrCourse);
    renderData(currentPage);

    myModalDeleteStudent.hide();
    window.location.reload();
    
  };
  noToDeleteStudent.onclick = function () {
    myModalDeleteStudent.hide();
  };
}


//Lấy thông tin class của student
function checkId(listClass, classId) {
  for (let i = 0; i < listClass.length; i++) {
    if (listClass[i].classId === classId) {
      return i;
    }
  }
  return -1;
}

//Thực hiện search sinh vien
document
  .getElementById("btnSearchStudentName")
  .addEventListener("click", function () {
    let searchStudentName = document.getElementById("searchStudentName").value;
    let arrCourse = localStorage.getItem("studentManagement")
    ? JSON.parse(localStorage.getItem("studentManagement"))
    : [];
    let btnSearchStudentName = document.getElementById("btnSearchStudentName").value;
    let searchArrStudent = getListStudent(arrCourse);
    
    // let searchArrCourse = JSON.parse(localStorage.getItem("arrCourse"));
    let filterData = searchArrStudent.filter((item) =>
      item.studentName.toLowerCase().includes(searchStudentName.toLowerCase())
    );

    if (filterData.length < 1) {
      alert("Không tìm thấy kết quả");
    } else if (filterData.length > 0) {
      arrStudent = filterData;
      renderData(1);      
    }
    
  });

  function getListStudent(listCourseOfClass) {
    let listStudentLoad = [];
    listCourseOfClass.forEach((courseItem) => {
      courseItem.arrClass.forEach((classItem) => {
        classItem.arrStudent.forEach((studentItem) => {
          listStudentLoad.unshift(studentItem);
        });
      });
    });
    return listStudentLoad;
  }
  

//Thực hiện sort dữ liệu

function orderStudentName() {
  let arrCourseSort = localStorage.getItem("studentManagement")
    ? JSON.parse(localStorage.getItem("studentManagement"))
    : [];
  let sortStudentNameVal = document.getElementById("orderStudentName").value;
  let arrStudentSort = getListStudent(arrCourseSort);
  switch (sortStudentNameVal) {
    case "nameASC":
      arrStudentSort.sort((a, b) =>
        a.studentName > b.studentName ? 1 : a.studentName < b.studentName ? -1 : 0
      );
      break;
    case "nameDESC":
      arrStudentSort.sort((a, b) =>
        a.studentName < b.studentName ? 1 : a.studentName > b.studentName ? -1 : 0
      );
      break;
  }
  arrStudent = arrStudentSort;
  renderData(1);
}

document
  .getElementById("orderStudentName")
  .addEventListener("change", function () {
    orderStudentName();
  });

function redirectDashboard() {
  window.location.href = "dashboard.html";
}
function redirectCourseManagement() {
  window.location.href = "courseMana.html";
}
function redirectClassManagement() {
  window.location.href = "classMana.html";
}
function redirectStudentManagement() {
  window.location.href = "studentMana.html";
}
function redirectAccountManagement() {
  window.location.href = "accountMana.html";
}

window.onload = renderData(currentPage);
