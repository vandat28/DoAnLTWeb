//loading
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    loading.style.display = 'flex';
    document.body.classList.add('loading');
  
    setTimeout(function() {
      loading.style.display = 'none';
      document.body.classList.remove('loading');
    }, 500); // 2000ms = 2 seconds
});


// menu
const items = document.querySelectorAll('.item');
       
        
       for(const item of items){
            item.addEventListener('click',function(){
                const itemsChild = item.children[1];
                const icon0 = item.children[0].children[0];
                const icon1 = item.children[0].children[1];
                
                if(itemsChild.classList.contains('open')){
                    itemsChild.classList.remove('open');
                    icon0.classList.remove('hidden');
                    icon1.classList.add('hidden');
                }else{
                    const itemsChilds = document.querySelectorAll('.items-child');
                    for (const i of itemsChilds){
                        i.classList.remove('open');  
                    }
                    const iconsClose = document.querySelectorAll('.icon-close');
                    const iconsOpen = document.querySelectorAll('.icon-open');
                    for (const iconClose of iconsClose){
                        iconClose.classList.add('hidden');
                    }
                    for (const iconOpen of iconsOpen){
                        iconOpen.classList.remove('hidden');
                    }
                    itemsChild.classList.add('open');
                    icon0.classList.add('hidden');
                    icon1.classList.remove('hidden');
                    
                    
                }
                         
            });
            
        }

//tìm kiếm
function search(){
    var input = document.querySelector('.search-find-input').value.trim().toLowerCase()
    if(input==''){
        alert("Vui lòng nhập thông tin tìm kiếm!!!")
        return false;
    }else{
        window.location.href = "timkiem.html?search=" +  encodeURIComponent(input)
    }
    return false
}
 
//thông báo
var notify = document.querySelectorAll('.Item__notifi-item');
var notify_link = document.querySelectorAll('.Item__notifi-link');

for(const i of notify_link) {
    i.onclick = function() {
        i.parentElement.classList.remove('Item__notifi-item--active')
    }
}





//slide
var slide = '<div class="slideshow l-12 m-12 c-12">'+
'<div class="slide-wrapper">'+
    '<input type="radio" name="slide" class="slide-wrapper1">'+
    '<input type="radio" name="slide" class="slide-wrapper2">'+
    '<input type="radio" name="slide" class="slide-wrapper3">'+
    '<input type="radio" name="slide" class="slide-wrapper4">'+
'</div>'+
'</div>'+
'<nav class="col l-0 m-12 c-12 catelogy">'+
'<ul class="catelogy__list">'+
    '<li class="catelogy__item">'+
        '<a href="" class="catelogy__item-link">'+
            'Thịt, cá, trứng, hải sản'+
        '</a>'+
    '</li>'+
    '<li class="catelogy__item">'+
        '<a href="" class="catelogy__item-link">'+
            'Dầu ăn, nước chấm, gia vị'+
        '</a>'+
    '</li>'+
    '<li class="catelogy__item">'+
        '<a href="" class="catelogy__item-link">'+
            'Rau, củ, nấm, trái cây'+
        '</a>'+
    '</li>'+
    '<li class="catelogy__item">'+
        '<a href="" class="catelogy__item-link">'+
            'Kem, thực phẩm đông mát'+            
           '</a>'+
    '</li>'+
    '<li class="catelogy__item">'+
        '<a href="" class="catelogy__item-link">'+
            'Gạo, bột, đồ khô'+
        '</a>'+
    '</li>'+
    '<li class="catelogy__item">'+
        '<a href="" class="catelogy__item-link">'+
            'Mì, Miến, Cháo, Phở'+
        '</a>'+
    '</li>'+
    '<li class="catelogy__item">'+
        '<a href="" class="catelogy__item-link">'+
            'Bia, nước giải khát'+
        '</a>'+
    '</li>'+
    '<li class="catelogy__item">'+
        '<a href="" class="catelogy__item-link">'+
            'Sữa các loại'+
        '</a>'+
    '</li>'+
    '<li class="catelogy__item">'+
        '<a href="" class="catelogy__item-link">'+
            'Chăm sóc thú cưng'+
        '</a>'+
    '</li>'+
    '<li class="catelogy__item">'+
        '<a href="" class="catelogy__item-link">'+
           ' Dụng cụ cá nhân'+
        '</a>'+
    '</li>'+
    '<li class="catelogy__item">'+
        '<a href="" class="catelogy__item-link">'+
            'Bánh kẹo các loại'+
        '</a>'+
    '</li>'+
    '<li class="catelogy__item">'+
        '<a href="" class="catelogy__item-link">'+
            'Đồ dùng gia đình'+
        '</a>'+
    '</li>'+
'</ul>'+
'</nav>'





//phân trang
var params = new URLSearchParams(window.location.search);
var page = parseInt(params.get('page'))
var Products= JSON.parse(localStorage.getItem("Products"));
var item=''
var row =''
var container=''
var pageNumber = ''

    if(isNaN(page)){
        page=JSON.parse(sessionStorage.getItem("page"))
        if(!page){
            page=1
        }
    }else{
        sessionStorage.setItem("page",JSON.stringify(page));
    }
    
    var tmp1= (page-1)*8
    var tmp2=  tmp1+8 

        for(var j=tmp1;j<tmp2;j++){
            if(j >= Products.length){
                break;
            }   
             item += '<div class="col l-3 product-item m-4 c-6">'+
                                '<a href="sanpham.html?nameP='+Products[j].name+'" class="product-item__link">'+
                                    '<div class="product-item__header" style="background-image: url('+Products[j].img+');">'+
                                    '</div>'+
                                    '<div class="product-item__body">'+
                                        '<p class="product-item__label">'+Products[j].name+'</p>'+
                                        '<div class="product-item__price">'+(Products[j].price*1).toLocaleString('vi')+' <span>đ</span></div>' +
                                    '</div>'+
                                '</a>'+
                                '<button class="product-item__btn" onclick="addToCart(this)">Mua liền</button>'+         
                            '</div>'
                            
        }
         row =   '<div class="row">'+
                 item+
                '</div>' 
      
    if(Products.length % 8 == 0){
        for(var k=0;k<Math.floor(Products.length/8);k++){
            pageNumber += '<a href="Trangchu.html?page='+(k+1)+'" class="page">'+(k+1)+'</a>'
        }
    }else{
        for(var k=0;k<Math.floor(Products.length/8)+1;k++){
            pageNumber += '<a href="Trangchu.html?page='+(k+1)+'" class="page">'+(k+1)+'</a>'
        }
    }
    var pagination = '<div class="pagination">'+pageNumber+'</div>'

    document.querySelector('.l-9').innerHTML='<div class="row">'+slide+'</div>'+row + pagination

    var arrPageNumber = document.querySelectorAll('.page')

    arrPageNumber[page-1].classList.add('active')


    

//Thêm giỏ hàng
var giohang;
const giohangcu= JSON.parse(localStorage.getItem("cart"));

if(!giohangcu){
    giohang = new Array()  
}else{
    giohang = [...giohangcu]
}


function addToCart(x){
    var checkSP = 0;
    const product = x.parentElement.children[0];
    const img = product.children[0];
    style = img.currentStyle || window.getComputedStyle(img, false);
    urlImg = style.backgroundImage.slice(4, -1).replace(/"/g, "");
    const name = product.children[1].children[0].innerText;
    const price0 = product.children[1].children[1].innerText;
    const price1=price0.slice(0, price0.lastIndexOf("đ"));
    const sp = new Object();
    sp.img = urlImg;
    sp.name= name;
    sp.price = price1; 
    sp.quantity = 1;
    for(let i = 0;i<giohang.length;i++){
        if(sp.name == giohang[i].name){
            checkSP = 1;
            giohang[i].quantity=giohang[i].quantity+1;
            console.log(giohang[i].quantity);
            break;
        }
    }
    if(checkSP==0){
        giohang.push(sp);
    }
        
    localStorage.setItem("cart",JSON.stringify(giohang));
    
}

// Đăng ký
var users
const oldUsers= JSON.parse(localStorage.getItem("Users"));

if(!oldUsers){
    users = new Array()  
}else{
    users= [...oldUsers]
}

var sluser = 0;
var hoten = document.querySelector('.name-value');
var addresses = document.querySelector('.addresses-value');
var phone = document.querySelector('.phone-value');
var passwd = document.querySelector('.passwd-value');
var repasswd = document.querySelector('.repasswd-value');
var checking =  new RegExp('^[a-zA-Z]+[^0-9]$');
// (hoten.value != "") && (addresses.value.value != "") && (phone.value != "") && (passwd.value != "") && (repasswd.value != "") && 
function adduser() {
    if(checking.test(hoten.value) == true && (passwd.value == repasswd.value)){
        var user = {
            "id": sluser,
            "name": hoten.value,
            "addresses": addresses.value,
            "phone": phone.value,
            "passwd": passwd.value
        }
        users.push(user);
        sluser++;
        userJSON = JSON.stringify(users);
        window.localStorage.setItem('Users',userJSON);
        return true;
    }else{
        alert('Đăng ký thất bại');
        return false;
    }
}
// // Đăng nhập
console.log(users);
var loginSuccess = document.querySelectorAll('.login-success');
var account = document.querySelector('.header-account');
var accountLink = document.querySelector('.header-account__link');
var modalLogin = document.querySelector('.header-checklog');
var settingName = document.querySelector('.header-account__setting-name');
function check() {
    var loginPhone = document.querySelector('.login-phone');
    var loginPasswd = document.querySelector('.login-passwd');
    var getUser;
    users.forEach(e => {
        if(e.phone == loginPhone.value) {
            console.log(e);
            getUser = e;
        }
    })
    console.log(getUser);
    if(getUser.passwd == loginPasswd.value){
        alert('Đăng nhập thành công');
        loginSuccess.forEach(function(e) {
            e.style.display = 'none';
        })
        account.style.display = 'block';
        accountLink.innerHTML = accountLink.innerHTML + "<p>" + getUser.name + "</p";
        settingName.innerHTML = getUser.name;
        modalLogin.checked = false;
        window.localStorage.setItem('Account',JSON.stringify(getUser));
        return true;
    }else {
        alert('Đăng nhập thất bại');
        return false;
    }
}

var ACCOUNT = JSON.parse(window.localStorage.getItem('Account'));
function keep(loginSuccess, accountLink, settingName, modalLogin) {
        loginSuccess.forEach(function(e) {
            e.style.display = 'none';
        })
        account.style.display = 'block';
        accountLink.innerHTML = accountLink.innerHTML + "<p>"+ ACCOUNT.name +"</p";
        settingName.innerHTML = ACCOUNT.name;
        modalLogin.style.display = 'none';
}

// // Đăng xuất
function startBegin() {
    localStorage.removeItem("Account");
}

if(ACCOUNT){
keep(loginSuccess, accountLink, settingName, modalLogin);
}else {
    loginSuccess.forEach(function(e) {
        e.style.display = 'block';
    })
    account.style.display = 'none';
}