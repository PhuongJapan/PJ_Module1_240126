let userList = JSON.parse(localStorage.getItem("userList")) || [];
document.getElementById("btnLogout").addEventListener("click", function () {
  //Xóa item có tên userLogin trong localStorage
  localStorage.removeItem("userLogin");
  //Điều hướng về Login
  window.location.href = "login.html";
});
let arrUser = JSON.parse(localStorage.getItem("userList")) || [];

//Phân trang

let currentPage = 1;
let recordsPerPage = 3;

function renderData(page) {
  // let arrCourse = JSON.parse(localStorage.getItem("userList")) || [];
  //Hiển thị số trang
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
  if (lastIndex > arrUser.length) {
    lastIndex = arrUser.length;
  }
  let listUser = document.getElementById("listUser");
  listUser.innerHTML = "";
  //forEach(functionCallback,thisValue)
  //functionCallback(element,index,arr)
  // arrCourse.forEach((course, index) => {
  for (let index = firstIndex; index < lastIndex; index++) {
    listUser.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${arrUser[index].email}</td>
                <td>${arrUser[index].password}</td>
                <td>${arrUser[index].fullName}</td>
                <td>${arrUser[index].status ? "Hoạt động" : "Không hoạt động"}
                </td>
               
                <td class="text-center">
                <button class="btn btn-danger" onclick="userSystemLock('${
                  arrUser[index].email
                }')"><i class="fa-solid fa-lock"></i></button>
                <button class="btn btn-warning"onclick="userSystemUnlock('${
                  arrUser[index].email
                }')"><i class="fa-solid fa-unlock"></i></button>            
                </td>
            </tr>
        `;
  }
}

function getTotalPage() {
  return Math.ceil(arrUser.length / recordsPerPage);
}

function clickPage(page) {
  currentPage = page;
  // let arrCourse = JSON.parse(localStorage.getItem("userList")) || [];
  let arrUser = localStorage.getItem("userList")
    ? JSON.parse(localStorage.getItem("userList"))
    : [];
  renderData(page, arrUser);
}
// Hàm previewPage
function previewPage() {
  currentPage--;
  renderData(currentPage, arrUser);
}
// Hàm nextPage
function nextPage() {
  currentPage++;
  renderData(currentPage, arrUser);
}
var myModalUserSystemLock = new bootstrap.Modal(
  document.getElementById("myModalUserSystemLock"),
  {
    keyboard: false,
  }
);

var myModalUserSystemUnlock = new bootstrap.Modal(
  document.getElementById("myModalUserSystemUnlock"),
  {
    keyboard: false,
  }
);

 //UserSystemLock
 function userSystemLock(email) {
  let arrUser = localStorage.getItem("userList")
  ? JSON.parse(localStorage.getItem("userList"))
  : [];
  myModalUserSystemLock.show();
  let buttonYes = document.getElementById("buttonYes");
  let id=checkId(arrUser,email);
  buttonYes.onclick = function () {
    let arrUser = localStorage.getItem("userList")
      ? JSON.parse(localStorage.getItem("userList"))
      : [];

    arrUser[id].status = false;
    localStorage.setItem("userList", JSON.stringify(arrUser));
    myModalUserSystemLock.hide();
    renderData(1, arrUser);
    window.location.reload();
  };
}
function userSystemUnlock(email) {
  let arrUser = localStorage.getItem("userList")
  ? JSON.parse(localStorage.getItem("userList"))
  : [];
  myModalUserSystemUnlock.show();
  let btnYesToUnlock = document.getElementById("btnYesToUnlock");
  let id=checkId(arrUser,email);
  btnYesToUnlock.onclick = function () {
    let arrUser = localStorage.getItem("userList")
      ? JSON.parse(localStorage.getItem("userList"))
      : [];
    arrUser[id].status = true;
    localStorage.setItem("userList", JSON.stringify(arrUser));
    myModalUserSystemUnlock.hide();
    renderData(1, arrUser);
    window.location.reload();
    
  };
}
function checkId(array,email) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].email == email) {
      return i;
    }
  }
  return -1;
}


//Thực hiện search tài khoản
document
  .getElementById("btnSearchAccName")
  .addEventListener("click", function () {
    let searchUserName = document.getElementById("searchAccName").value;
    let searchArrUser = localStorage.getItem("userList")
      ? JSON.parse(localStorage.getItem("userList"))
      : [];
    // let searchArrCourse = JSON.parse(localStorage.getItem("arrCourse"));
    let filterData = searchArrUser.filter((user) =>
      user.fullName.toLowerCase().includes(searchUserName.toLowerCase())
    );

    if (filterData.length < 1) {
      alert("Không tìm thấy kết quả");
    } else if (filterData.length > 0) {
      arrUser = filterData;
      renderData(1);
    }
  });

//Thực hiện sort dữ liệu
function orderAccName() {
  let arrAccSort = localStorage.getItem("userList")
    ? JSON.parse(localStorage.getItem("userList"))
    : [];
  console.log(arrAccSort);
  let sortAccNameVal = document.getElementById("orderAccName").value;
  console.log(sortAccNameVal);
  switch (sortAccNameVal) {
    case "nameASC":
      arrAccSort.sort((a, b) =>
        a.fullName > b.fullName ? 1 : a.fullName < b.fullName ? -1 : 0
      );
      break;
    case "nameDESC":
      arrAccSort.sort((a, b) =>
        a.fullName < b.fullName ? 1 : a.fullName > b.fullName ? -1 : 0
      );
      break;
  }
  arrUser= arrAccSort;
  renderData(1);
  
}

document
  .getElementById("orderAccName")
  .addEventListener("change", function () {
    orderAccName();
  });

// let arrUserLoad = localStorage.getItem("userList")
//     ? JSON.parse(localStorage.getItem("userList"))
//     : [];
//   document.onload = renderData(1, arrUserLoad);

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
