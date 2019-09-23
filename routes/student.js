const fs = require ('fs');


module.exports = {

    addstudentPage: (req,res) => {
        res.render('add-student.ejs', {
            title: "SF State Registration | Add a student"
            , message: ''
        });
    },
    
	searchstudentrenderpage: (req,res) =>{
		res.render('search-player.ejs',{
			title: "Search",
			students: res
		});
	},
	
	searchstudentpage: (req,res) =>{
		res.render('search-player.ejs',{
			title: "Search",
		});
		
		let searchname = req.body.search;
		
		let searchquery = "select * from `students` where first_name = '"+searchname+"'";
		
		db.query(searchquery, (err, result) => {
			if(err){
				res.render('search-player.ejs',{
				title: "Search",
		});
			}
			if(result.length > 0){
				res.render('search-player.ejs',{
				title: "Welcome to SF STATE REGISTRATION | View STUDENTS",
				students: result
				});
			}
		});
		
	},
	
    addstudent: (req,res) =>{

        let message = '';

        let ID=req.body.ID;
        let first_name=req.body.first_name;
        let last_name=req.body.last_name;
        let EmailID=req.body.EmailID;
        let address=req.body.addr;
        let GPA=req.body.GPA;

        let usernameQuery = "Select * from `students` where ID = '" + ID + "'" ;

        db.query(usernameQuery, (err,result) => {
            if(err) {
                return res.status(500).send(err);

            }
            if(result.length > 0) {
                message = 'ID already exists';
                res.render('add-student.ejs', {
                    message,
                    title: "SF State Registration | Add a new student"
                });

            } 
            else{
                let query = "INSERT INTO `students` (first_name, last_name, id, email, Address, GPA) VALUES ('" + first_name + "','" + last_name + "','" + ID + "','" + EmailID + "','" + address + "','" + GPA + "')";

            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });

    }

        });
}, 
         editstudentPage: (req, res) => {
        let ID = req.params.ID;
        let query = "SELECT * FROM `students` WHERE ID = '" + ID + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-student.ejs', {
                title: "Edit  student"
                ,student: result[0]
                ,message: ''
            });
        });
    },
    editstudent: (req, res) => {
        
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let ID = req.body.ID;
        let EmailID = req.body.EmailID;
        let GPA = req.body.GPA;
         let query = "UPDATE `students` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `ID` = '" + ID + "', `EmailID` = '" + EmailID + "' WHERE `students`.`ID` = '" + ID + "'";
        

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });

    },
    deletestudent: (req, res) => {
        let ID = req.params.ID;
    
    let deleteUserQuery = 'DELETE FROM students WHERE ID = "' + ID + '"';

    db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
} 
};