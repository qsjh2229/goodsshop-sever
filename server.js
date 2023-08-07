const express = require("express");
const cors = require("cors");

const app = express();
const port = "8080";
const models = require("./models");
const multer = require('multer');
app.use('/uploads',express.static("uploads"))
const upload=multer({
  storage:multer.diskStorage({
    destination:function(req, file ,cb){
cb(null,"uploads/")
    },
    filename:function(req, file ,cb){
      cb(null,file.originalname)
    }
  })
 

})




app.use(express.json());
app.use(cors()); // 브라우저의 cors 이슈를 막기 위해 사용하는 코드
app.get("/products", (req, res) => {
 /*  const queryString = req.query;
  console.log("queryString:", queryString);
  res.send({
    products: [
      {
        id: "0",
        name: "네시노 테이블 램프",
        pirce: 135000,
        seller: "유니스",
        imageUrl: "img/light/light-1.jpg",
      },
      {
        id: "1",
        name: "글래스 팟",
        pirce: 95000,
        seller: "더휴면",
        imageUrl: "img/pot/pot2.jpg",
      },
      {
        id: "2",
        name: "인센스",
        pirce: 43000,
        seller: "아르르",
        imageUrl: "img/incens/incens-5.jpg",
      },
      {
        id: "3",
        name: "네시노 테이블 램프",
        pirce: 135000,
        seller: "유니스",
        imageUrl: "img/light/light-2.jpg",
      },
      {
        id: "4",
        name: "글래스 팟",
        pirce: 95000,
        seller: "더휴면",
        imageUrl: "img/pot/pot1.jpg",
      },
      {
        id: "5",
        name: "인센스",
        pirce: 43000,
        seller: "아르르",
        imageUrl: "img/incens/incens-3.jpg",
      },
      {
        id: "6",
        name: "네시노 테이블 램프",
        pirce: 135000,
        seller: "유니스",
        imageUrl: "img/light/light-3.jpg",
      },
      {
        id: "7",
        name: "인센스",
        pirce: 43000,
        seller: "아르르",
        imageUrl: "img/incens/incens-1.jpg",
      },
    ],
  }); */
  models.Product.findAll({
   /*  limit:1 */
   order:[['createdAt','DESC']],
   atrributes:["id","name","price","seller","imageUrl","createdAt","updatedAt",'soldout' ]
  })
  .then((result)=>{
      console.log("PRODUCT:", result);
      res.send({
          product: result, 
      })
  }).catch((error)=>{
      console.error(error);
      res.status(400).send('에러발생')
  })
})

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Product.findOne({
    where:{
      id,
    }
  }).then((result)=>{
console.log("product:",result)
res.send({product:result})
  }).catch((error)=>{
console.error()
res.status(400).send('상품조회 에러')
  })
});
app.post("/purchase/:id", (req, res)=>{
  const { id } = req.params;
  models.Product.update({
    soldout:1
  },{
    where:{
      id,
    }
  })
  .then((result)=>{
    res.send({
      result:true,
    })
  })
  .catch((error)=>{
    console.error(error)
    res.status(500).send('에러발생')
  })
})
app.post("/products", (req, res) => {
  const body = req.body;
  const { name, price, seller, imageUrl, des } = body;
  if( !name ||  !price ||  !seller ||  !imageUrl ||  !des){
    res.send("모든필드를 입력해주세요")
  }
  models.Product.create({
    name,
    price,
    seller,
    imageUrl,
    des,
  })
    .then((result) => {
      console.log("상품생성 결과:", result);
      res.send({ result });
    })
    .catch((error) => {
      console.error(error);
      res.send("문제발생");
    });
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  res.send(`id는 ${id} 입니다`);
});


app.post('/image', upload.single('image'),(req,res) =>{
  const file =req.file;
  res.send({
    imageUrl:file.path
  })
})


app.listen(port, () => {
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB 연결 성공");
    })
    .catch((err) => {
      console.error(err);
      console.error("DB연결 에러");
      process.exit();
    });
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

/* 
{"id":0,
  "name":"네시노 테이블 램프",
  "price":"13,5000",
  "seller":"유니스",
  "imageUrl": "img/light/light-1.jpg",
  "des" :"네시노 지역에서 영감을 따 만든 네시노 테이블 램프"

}
{   "id":"1","name" : "글래스 팟", "pirce" : "95,000" , "seller": "더휴면",
 "imageUrl" : "img/pot/pot2.jpg" ,"des" :"블로잉으로 손수 만든 글래스 팟"}
{   "id":"2","name" : "인센스", "pirce" : "43,000" , "seller": "아르르", 
"imageUrl" : "img/incens/incens-5.jpg", "des" :"물레작업을 이용해 손수 만든 인센스 홀더"}
{   "id":"3", "name" : "네시노 테이블 램프", "pirce" : "135,000" , "seller"
: "유니스", "imageUrl" : "img/light/light-2.jpg","des" :"물레작업을 이용해 손수 만든 인센스 홀더" }
{
  "id": "4",
  "name": "글래스 팟",
  "pirce": "95,000",
  "seller": "더휴면",
  "imageUrl": "img/pot/pot1.jpg",
  "des" :"물레작업을 이용해 손수 만든 인센스 홀더"
} */
/* 
[
  {
    id: "0",
    name: "네시노 테이블 램프",
    price: "135,000",
    seller: "유니스",
    imageUrl: "img/light/light-1.jpg",
  },
  {
    id: "1",
    name: "글래스 팟",
    price: "95,000",
    seller: "더휴면",
    imageUrl: "img/pot/pot2.jpg",
  },
  {
    id: "2",
    name: "인센스",
    price: "43,000",
    seller: "아르르",
    imageUrl: "img/incens/incens-5.jpg",
  },
  {
    id: "3",
    name: "네시노 테이블 램프",
    price: "135,000",
    seller: "유니스",
    imageUrl: "img/light/light-2.jpg",
  },
  {
    id: "4",
    name: "글래스 팟",
    price: "95,000",
    seller: "더휴면",
    imageUrl: "img/pot/pot1.jpg",
  },
  {
    id: "5",
    name: "인센스",
    price: "43,000",
    seller: "아르르",
    imageUrl: "img/incens/incens-3.jpg",
  },
  {
    id: "6",
    name: "네시노 테이블 램프",
    price: "135,000",
    seller: "유니스",
    imageUrl: "img/light/light-3.jpg",
  },

  {
    id: "7",
    name: "인센스",
    price: "43,000",
    seller: "아르르",
    imageUrl: "img/incens/incens-1.jpg",
  },
];
 */