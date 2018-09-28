module.exports = class PaymentMethodController{
    constructor(connectionPool){
        this.connectionPool = connectionPool;
    }

    createPaymentMethod(request,response){
        const insertSql = "INSERT INTO PaymentMethod SET ?";
        const insertable = request.body;

        this.connectionPool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                response.status(500).send(err.message);
            }

            conn.query(insertSql,insertable,(errn,res)=>{
                if(errn){
                    console.log(errn);
                    conn.release();
                    response.status(500).send(errn.message);
                }else{
                    conn.release();
                    response.status(200).send('Payment method created correctly');
                }
            })
        }); 
    }

    getPaymentMethodsForUser(request,response){
        const getUserSql = "SELECT creditCardNumber,dateCard,cvc,methodType FROM PaymentMethod where usermail=?"
        const params     = [request.params.usermail];

        this.connectionPool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                conn.release();
                response.status(500).send(errn.message);
            }

            conn.query(getUserSql,params,(errn,rows)=>{
                if(errn){
                    console.log(errn);
                    conn.release();
                    response.status(500).send(errn.message);
                }
                else{
                    conn.release();
                    response.status(200).json(rows);
                }
            })
        })
    }
}