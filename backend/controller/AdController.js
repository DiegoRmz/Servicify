export class AdController{
    constructor(connectionPool){
        this.connectionPool = connectionPool;
    }

    createAd(request,response){
        const insertSql = "INSERT INTO Ad SET ?";
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

    getAds(request,response){
        const getUserSql = "SELECT id,creationDate,header,desc,category,rating,location FROM Ad"
        
        this.connectionPool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
                conn.release();
                response.status(500).send(errn.message);
            }

            conn.query(getUserSql,(errn,rows)=>{
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