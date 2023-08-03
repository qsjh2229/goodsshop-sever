const  express = require("express");
const cors =require("cors");

const  app =express() ;
const  port = "8080";

app.use(express.json())
app.use(cors()) // 브라우저의 cors 이슈를 막기 위해 사용하는 코드
app.get('/products',(req,res)=>{
  const queryString=req.query;
  console.log('queryString:',queryString)
  res.send({
   products: [
    {  id:"0", "name" : "네시노 테이블 램프", "pirce" : "135,000" , "seller": "유니스", "imageUrl" : "img/light/light-1.jpg"},
    {   id:"1","name" : "글래스 팟", "pirce" : "95,000" , "seller": "더휴면", "imageUrl" : "img/pot/pot2.jpg"},
    {   id:"2","name" : "인센스", "pirce" : "43,000" , "seller": "아르르", "imageUrl" : "img/incens/incens-5.jpg"},
    {   id:"3", "name" : "네시노 테이블 램프", "pirce" : "135,000" , "seller": "유니스", "imageUrl" : "img/light/light-2.jpg"},
    {   id:"4","name" : "글래스 팟", "pirce" : "95,000" , "seller": "더휴면", "imageUrl" : "img/pot/pot1.jpg"},
    {   id:"5","name" : "인센스", "pirce" : "43,000" , "seller": "아르르", "imageUrl" : "img/incens/incens-3.jpg"},
    {   id:"6", "name" : "네시노 테이블 램프", "pirce" : "135,000" , "seller": "유니스", "imageUrl" : "img/light/light-3.jpg"},
    {   id:"7","name" : "인센스", "pirce" : "43,000" , "seller": "아르르", "imageUrl" : "img/incens/incens-1.jpg"}]
  })
})
app.get('/products/:id',(req,res)=>{
  const params=req.params
  const {id} =params
  res.send(`id는 ${id} 입니다` )
})
app.post('/products',(req,res)=>{
  const body=req.body;
  res.send({
    body,
  })
 
})
app.listen(port, ()=>{
  console.log('server on')
});


/* http://localhost:8080/products */


/* 


const server = http.createServer(function (req, res) {
  const path = req.url;
  const method = req.method;
  if (path === "/products") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      const products = JSON.stringify([
        {
          id: 0,
          name: "네시노 테이블 램프",
          price: "13,5000",
          seller: "유니스",
          imageUrl: "img/light/light-1.jpg",
          des: "네시노 지역에서 영감을 따 만든 네시노 테이블 램프",
        },
      ]);
      res.end(products);
    } else if (method === "POST") {
      res.end("생성링");
    }
  }
  res.end("Good Bye");
}); */