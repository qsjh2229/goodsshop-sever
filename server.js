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

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  models.Product.destroy({
    where: {
      id,
    },
  })
    .then((result) => {
      if (result === 0) {
        res.status(404).send("해당 상품을 찾을 수 없습니다");
      } else {
        res.send({ result: true });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("상품 삭제 중 에러 발생");
    });
});
