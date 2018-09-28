module.exports =  class UserController{
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
                response.status(500).send(err.message);
            }

            conn.query(insertSql,insertable,(errn,res)=>{
                if(errn){
                    console.log(errn);
                    conn.release();
                    response.status(500).send(errn.message);
                }else{
                    conn.release();
                    response.status(200).send('User created successfuly');
                }  
            })
        }); 
    }

    //Gets user info
    getUser(request, response){
        const getUserSql = "SELECT email,userName,birthday,city,estado,country FROM Users where email=? and passwd=?"
        const params     = [request.email,request.password];

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