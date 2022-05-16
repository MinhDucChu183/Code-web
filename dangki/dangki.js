function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function save(){
    let fullname = document.getElementById('fullname').value;
    let msv = document.getElementById('msv').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let thayco = document.getElementById('thayco').value;
    let gender = '';

    if (document.getElementById('male').checked){
        gender = document.getElementById('male').value;
    } else if (document.getElementById('female').checked){
        gender = document.getElementById('female').value;
    }

    if (_.isEmpty(fullname)) {
        document.getElementById('fullname-error').innerHTML='Vui lòng nhập họ và tên';
    } else if(fullname.trim().length <= 5){
        fullname = '';
        document.getElementById('fullname-error').innerHTML='Không được nhỏ hơn 5 kí tự';
    }
    else {
        document.getElementById('fullname-error').innerHTML='';
    }

    if (_.isEmpty(msv)) {
        msv = '';
        document.getElementById('msv-error').innerHTML=  'Vui lòng nhập mã sinh viên';
    } else {
        document.getElementById('msv-error').innerHTML='';
    }

    if (_.isEmpty(email)) {
        email = '';
        document.getElementById('email-error').innerHTML='Vui lòng nhập địa chỉ email';
    } else if(!emailIsValid(email)){
        email = '';
        document.getElementById('email-error').innerHTML='Email không đúng định dạng';
    } else {
        document.getElementById('email-error').innerHTML='';
    }

    if (_.isEmpty(phone)) {
        phone = '';
        document.getElementById('phone-error').innerHTML='Vui lòng nhập điểm trung bình tích lũy(hệ 4) ';
    } else if(phone.trim().length > 10){
        phone = '';
        document.getElementById('phone-error').innerHTML='Số điện thoại không đúng';
    } else {
        document.getElementById('phone-error').innerHTML='';
    }

    if (_.isEmpty(address)) {
        address = '';
        document.getElementById('address-error').innerHTML='Vui lòng chọn đề tài đăng kí';
    } else {
        document.getElementById('address-error').innerHTML='';
    }

    if (_.isEmpty(thayco)) {
        thayco = '';
        document.getElementById('thayco-error').innerHTML=  'Vui lòng chọn thầy cô phụ trách';
    } else {
        document.getElementById('thayco-error').innerHTML='';
    }

    if (_.isEmpty(gender)) {
        gender = '';
        document.getElementById('gender-error').innerHTML=  'Vui lòng chọn giới tính';
    } else {
        document.getElementById('gender-error').innerHTML='';
    }

    if (fullname && email && phone && address && gender) {

        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

        students.push({
            fullname: fullname,
            msv: msv,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
            thayco: thayco
        });

        localStorage.setItem('students', JSON.stringify(students));

        this.renderListStudent();
    }
}

function renderListStudent(){

    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    
    console.log(students.length);

    if (students.length === 0){
        document.getElementById('lish-students').style.display = 'none';
        return false;
    } 

    let tableContent = `<tr id="first-row">
            <td id="col-header-order">STT</td>
            <td >Họ và tên</td>
            <td >Mã sinh viên</td>
            <td id="col-header-email">Email</td>
            <td >GPA</td>
            <td >Giới tính</td>
            <td id="col-header-hometown">Đề tài đăng kí</td>
            <td id="col-header-action">Thầy(Cô)</td>
            <td id="col-header-action">Thao tác</td>
        </tr>`;

        students.forEach((student, index) => {
            let studentID = index;
            let genderlabel = parseInt(student.gender) === 1? 'Nam' : 'Nữ';
            index++;
            tableContent += `<tr>
                <td>${index}</td>
                <td>${student.fullname}</td>
                <td>${student.msv}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${genderlabel}</td>
                <td>${student.address}</td>
                <td>${student.thayco}</td>
                <td>
                    <a href='#'>Sửa</a> | <a href='#' onclick='deleteStudent(${studentID})'>Xóa</a> | <a href='#'>Copy</a>
                </td>
            </tr>`;
        })       
        
        document.getElementById('grid-students').innerHTML = tableContent;
}

function deleteStudent(id){
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    students.splice(id, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderListStudent();
}