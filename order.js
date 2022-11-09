const express = require('express');
const app = express();
const port = process.env.PORT || 3500;
app.listen(port, () => {
 console.log(`running at port ${port}`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


const new_orders = [] ;

app.post("/new_order", (req, res) => {
    const order = req.body;
    if (order.customer_name || order.book_name || order.book_id || order.email_id) {
    new_orders.push({
    ...order,
    id: new_orders.length + 1,
    date: Date.now().toString()
    });
    console.log();
    
  
    res.status(200).json({
   //  orderId : new_orders.id ,
    message: "order Created successfully"
    });
 } 
    });



    //////////getOrder///////////
    app.get("/order/:id", (req, res) => {
      const order_id = req.params.id;
      for(let od of new_orders){
      if(od.id==order_id){
      return res.status(200).send(od);
      }
      }
      res.status(404).json(
        {message:"wrong id provided"}
      )
      
     } );

     //////// delete order ////////
     app.delete("/order/:id", (req, res) => {
      const order_id = req.params.id;
      for (let od of new_orders) {
      if (od.id == order_id) {
      new_orders.splice(new_orders.indexOf(od), 1);
      return res.status(200).json({
      message: "Deleted Successfully"
      });
      }
      }
      res.status(404).json({ message: "Invalid order Id" });
      });