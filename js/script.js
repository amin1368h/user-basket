let countCounter=document.getElementById('cart')
let cartDom=document.querySelector('.cart__items')
let addToCartBtn=document.querySelectorAll('.btn_add_to_cart')
let totalCount=document.querySelector('.totla__counter')
let totalCost=document.querySelector('.total__cost')
let check_out_btn=document.querySelector('.check_out_btn')

let cartItem=(JSON.parse(localStorage.getItem("busketuser")) || [])

document.addEventListener("DOMContentLoaded",loadData)

check_out_btn.addEventListener('click',function(){
  if(confirm('ایا از حذف محصولات در سبد خرید مطمئنید')){
       
    clearCartItem();
  }
    
})

countCounter.addEventListener('click',function(){
    
    cartDom.classList.toggle('active')
})

addToCartBtn.forEach(btn=>{
    btn.addEventListener('click',()=>{

        let parentElement=btn.parentElement;
        const product={
         id:parentElement.querySelector('#product_id').value,
         name:parentElement.querySelector('.product__name').innerHTML,
         img:parentElement.querySelector('#image').getAttribute('src'),
         price:parentElement.querySelector('.product_price').innerHTML,
         quantity:1,
        }
        let IsInCart=cartItem.filter(item=> item.id===product.id).length>0
         
         if(!IsInCart){
               
            addItemToDom(product)

         }else{
               alert("این محصول در سبد خرید موجود است")
               return
         }
           
         let cartDomItems=document.querySelectorAll('.cart__item')

         cartDomItems.forEach(inItem=>{
            if(inItem.querySelector('#product__id').value=== product.id){
               increaseItem(inItem,product)
               decreaseItem(inItem,product)
               removeItem(inItem,product)
            }
         })

        cartItem.push(product)
        calculateTotal();
       saveToLocalStorage();
        
    })
  
})

function saveToLocalStorage(){
   
    localStorage.setItem("busketuser",JSON.stringify(cartItem))
}

function  addItemToDom (product) {

    

    cartDom.insertAdjacentHTML('afterbegin',`
     
    <div class="cart__item">
    <input type="hidden" id="product__id" value="${product.id}">
    <img src="${product.img}" id="product__">
    <h4 class="product__name">${product.name}</h4>
    <a  class="btn__small" action="decrease">&minus;</a>
    <h4 class="product__quantity">${product.quantity}</h4>
    <a  class="btn__small" action="increase">&plus;</a>
    <h4 class="product_price">${product.price}</h4>
    <a  class="btn__small btn__remove" action="remove" >&times;</a>
    </div>
    `)
    
}

function calculateTotal(){

    let total=0;
    cartItem.forEach(item=>{
        total+=item.quantity * item.price
    })
    totalCost.innerHTML=total
    totalCount.innerHTML=cartItem.length
}


function increaseItem(inItem,product){
   
    inItem.querySelector("[action='increase']").addEventListener('click',function () {
        cartItem.forEach(cart=> {
           if( cart.id===product.id){
             inItem.querySelector('.product__quantity').innerHTML= ++cart.quantity
             calculateTotal()
             saveToLocalStorage()
           }
        });
    })
}

function decreaseItem(inItem,product){
   
    inItem.querySelector("[action='decrease']").addEventListener('click',function () {
        cartItem.forEach(cart=> {
           if( cart.id===product.id){
             
           if(cart.quantity >1){

              inItem.querySelector('.product__quantity').innerHTML= --cart.quantity
           }else{

               cartItem=cartItem.filter(newElement=> newElement.id !== product.id);
               inItem.remove()
           }
            
              calculateTotal()
              saveToLocalStorage()
           }
           
        });
    })
}

function   removeItem (inItem,product){
   
    inItem.querySelector("[action='remove']").addEventListener('click',function () {
        cartItem.forEach(cart=> {
           if( cart.id===product.id){

                 cartItem=cartItem.filter(newElement=> newElement.id !== product.id);
                 inItem.remove();
               
              calculateTotal()
              saveToLocalStorage()
        }
           
        });
    })
}

function loadData(){

    if(cartItem.length > 0){
        cartItem.forEach(product=>{
            addItemToDom(product)

            let cartDomItems=document.querySelectorAll('.cart__item')

            cartDomItems.forEach(inItem=>{
               if(inItem.querySelector('#product__id').value=== product.id){
                  increaseItem(inItem,product)
                  decreaseItem(inItem,product)
                  removeItem(inItem,product)
               }
            })
        }); 
        calculateTotal();
         saveToLocalStorage()  
    }
}

function clearCartItem(){
    localStorage.clear();
    cartItem=[];
    document.querySelectorAll('.cart__item').forEach(item=>{
        item.remove()
    })
    calculateTotal()
}