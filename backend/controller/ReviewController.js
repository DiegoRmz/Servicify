module.exports =  class AdController{
    constructor(connectionPool){
        this.connectionPool = connectionPool;
    }

    createReview(request,response){
        const insertSql = "INSERT INTO review SET ?";
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
                    response.status(200).send('Thanks for your review!');
                }
            })
        }); 
    }

    getReviewsForAd(request,response){
        const getUserSql = "SELECT adId,Stars,Review,crDate FROM review WHERE adId=?"
        const params     = [request.params.emailadId];

        
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