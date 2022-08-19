const { Client } = require('pg');

class Patient {
    async dataBaseConnection(){

        const client = new Client({
            host:'localhost',
            user: 'clusteradmin',
            port: 5432,
            password: 'password',
            database: 'biolyticDevData'
        });

        client.connect();
        const query= `Select a."City",c."Country", a."Street", a."Country_Id",p."First_Name", p."Last_Name", p."Home_Tel", p."Gender", p."Marital_Status", p."Date_Of_Birth", p."Is_Active", p."s3_Image_Location", con."Name", con."Relation", con."Contact_Number" from pii_protected_schema."PATIENT" p 
        join pii_protected_schema."ADDRESS" a on
        a."Address_Id" = p."Address_Id" 
        join pii_protected_schema."COUNTRY" c on 
        a."Country_Id" = c."Country_Id" 
        join pii_protected_schema."LANGUAGE" l on 
        l."Language_Id" = p."Language_Id" 
        join pii_protected_schema."CONTACT" con on 
        con."Contact_Id" = p."Contact_Id"`
        const res = await client.query(query);
        return res;
    }
}
module.exports = Patient;