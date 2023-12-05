var giohang = JSON.parse(localStorage.getItem("cart"));
    showCart(giohang);
    function showCart(x){
        var ttgh = "";
        var sum = 0;
        var shipStr = "30.000 đ";
        var ship = 30000;
        if(x){
            x.forEach(e =>{
                const stringNumber = e.price;
                const intNumber = parseInt(stringNumber.replaceAll(".", ""));
                ttgh += '<div class="cart-item">'+
                            '<div class="cart-item-delete" onclick="deleteItem(this)"><i class="fa fa-times" aria-hidden="true"></i></div>'+
                            '<img class="cart-item-img" src="'+e.img+'"></img>'+
                            '<div class="cart-item-name">'+e.name+'</div>'+
                            '<div class="cart-item-quantity">'+
                                '<span onclick="prev(this)">-</span>'+
                                '<input class="quantity" value="'+e.quantity+'" onchange="changeQuantity(this)"/>'+
                                '<span onclick="add(this)">+</span>'+
                            '</div>'+
                            '<div class="cart-item-price">'+(e.quantity*intNumber).toLocaleString('vi')+'<span>đ</span>'+'</div>'+
                        '</div>' 
                  
                sum += e.quantity*intNumber;
                }  
            );
        }
        if(sum>199999){
        shipStr = "Miễn phí"
        ship = 0;
        }
        let number = sum+ship;
        let formattedNumber = number.toLocaleString('vi');
        if(x.length!=0){
            document.querySelector('.cart-items').innerHTML = ttgh;
            document.querySelector('.ship').innerText = shipStr;
            document.querySelector('.sum').innerText = formattedNumber+ "đ";
        }
    }
    

    
    function deleteCart(){
        if (confirm("Bạn có chắc chắn muốn xóa?")) {
            localStorage.removeItem("cart")
            location.reload()
        } else {
            return;
        } 
    }

    function deleteItem(x){
        if (confirm("Bạn có chắc chắn muốn xóa?")) {
            const itemName = x.parentElement.children[2].innerText;
            for(let i = 0;i<giohang.length;i++){
                if(itemName == giohang[i].name){
                    giohang.splice(i,1)
                break;
                }
            }
            localStorage.setItem("cart",JSON.stringify(giohang));
            location.reload()  
        } else {
            return;
        } 
        
    }
    
    
    

    function prev(x){
        const itemName = x.parentElement.parentElement.children[2].innerText;
        for(let i = 0;i<giohang.length;i++){
            if(itemName == giohang[i].name && giohang[i].quantity>1){
                giohang[i].quantity=giohang[i].quantity-1;
                renderQuantity(x,giohang[i].quantity)
                sumItem(x,giohang[i].quantity,giohang[i].price)
                break;
            }
        }
        sumAll()
        localStorage.setItem("cart",JSON.stringify(giohang));
    
    }

    
    function add(x){
        const itemName = x.parentElement.parentElement.children[2].innerText;
        for(let i = 0;i<giohang.length;i++){
            if(itemName == giohang[i].name){
                giohang[i].quantity=giohang[i].quantity+1;
                renderQuantity(x,giohang[i].quantity)
                sumItem(x,giohang[i].quantity,giohang[i].price)
                break;
            }
        }
        sumAll()
        localStorage.setItem("cart",JSON.stringify(giohang));
    
    }

    function renderQuantity(x,quantity){
        x.parentElement.children[1].value=quantity;
    }
    function changeQuantity(x){
        var inputValue = parseInt(x.value);
        if(isNaN(inputValue) || inputValue<1){
            inputValue = 1
            x.value=1
        }else{
            x.value = inputValue
        }
        const itemName = x.parentElement.parentElement.children[2].innerText;
        for(let i = 0;i<giohang.length;i++){
            if(itemName == giohang[i].name){
                giohang[i].quantity=inputValue
                sumItem(x,giohang[i].quantity,giohang[i].price)
            break;
            }   
        }
        sumAll()
        localStorage.setItem("cart",JSON.stringify(giohang));
}

function sumAll(){
    const cartItemPrice = document.querySelectorAll('.cart-item-price')
    var sum = 0;
    var shipStr = "30.000 đ";
    var ship = 30000;
    for(const item of cartItemPrice){
        price = parseInt(item.innerText.replace("đ","").replaceAll(".", ""))
        sum+=price
    }
    if(sum>199999){
        shipStr = "Miễn phí"
        ship = 0;
    }
    
    document.querySelector('.ship').innerText = shipStr;
    document.querySelector('.sum').innerText = (sum+ship).toLocaleString('vi')+ "đ";

}

function sumItem(x,quantity,price){
    var sum = 0 
    sum= quantity*parseInt(price.replaceAll(".", ""));
    x.parentElement.parentElement.children[4].innerText=sum.toLocaleString('vi')+"đ"
}

//thông báo
var notify = document.querySelectorAll('.Item__notifi-item');
var notify_link = document.querySelectorAll('.Item__notifi-link');

for(const i of notify_link) {
    i.onclick = function() {
        i.parentElement.classList.remove('Item__notifi-item--active')
    }
}


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