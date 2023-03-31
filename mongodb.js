
/* 

     - show dbs  // list of available database in systeml. 


    to create new database  // or switch to existing database
    - use <database_name>


    CRUD in database 
        create 
            - db.<collection>.insertOne({ name:"ram" })
        read 
            - db.<collection>.find({})
        update 

        delete 


    to view list of tables/collections in a particular database
    - show collections

*/


/* sql vs nosql 

    sqL  / sequel / realtiosnhip datbase
    - predefined structure  

    no sql // not only sql 
    - not predefined structure 

*/

/*    
    row -> documents
    table -> collection

*/

db.products.insertOne({name:"mouse",prcie:1000})

db.users.insertMany([
    {name:"ram",phone:111},
    {name:"Hari",phone:222},
])

/* embedded documents */

db.provinces.insertOne({
    name:"bagmati",
    distrcicts: [
        {name:"Kahtmandu"},
        {name:"chitwan"},
    ],
    minister:{
        name:"xyz",
        phone:1212
    }
})




