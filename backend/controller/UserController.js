export class UserController{
    constructor(connectionPool){
        this.connectionPool = connectionPool;
    }    

    //user should match db schema
    createUser(request,response){
        const insertSql = "INSERT INTO Users SET ?";
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

    //Gets user info
    getUser(request, response){
        const getUserSql = "SELECT email,name,birthday,city,state,country FROM User where email=? and password=?"
        const params     = [request.params.email,request.params.password];

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