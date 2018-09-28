export class AdController{
    constructor(connectionPool){
        this.connectionPool = connectionPool;
    }

    createReview(request,response){
        const insertSql = "INSERT INTO review SET ?";
        const insertable = request.body;

        this.connectionPool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                connnection.release();
                response.status(500).send(err.message);
            }

            conn.query(insertSql,insertable,(errn,res)=>{
                if(err){
                    console.log(errn);
                    connnection.release();
                    response.status(500).send(errn.message);
                }

                connnection.release();
                response.status(200).send(res.insertId);
            })
        }); 
    }

    getReviewsForAd(request,response){
        const getUserSql = "SELECT adId,Stars,Review,Date FROM review WHERE adId=?"
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

                conn.release();
                response.status(200).json(rows);
            })
        })
    }
}