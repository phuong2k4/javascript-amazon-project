const xhr = new XMLHttpRequest(); 

xhr.addEventListener('load', ()=>{
    const data = JSON.parse(xhr.response)
    console.log(data)
})

xhr.open('GET', 'https://supersimplebackend.dev/products/first');
xhr.send()
