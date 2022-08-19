const express = require('express')
const router = express.Router()
var request = require('superagent');
var http = require('https');
const axios = require('axios')
const  Patient = require('../config/databaseOperation');
router.get('/health-check',(req,res)=>{
   res.send("working Fine")
});

dateConverter= (date)=>{
   return new Date(`${date}`).getFullYear()+"-"+new Date(`${date}`).getMonth()+"-"+new Date(`${date}`).getDate()
}
router.get('/create-patient',async (req,res)=>{
   const data =new Patient();
   var result = await data.dataBaseConnection();
   var body ={};
   result=result.rows[0];
   console.log(result);
   
   body = {
      resourceType : "Patient",
      active : result.Is_Active ? true : false,
      name : [
         {
            "family": result.Last_Name,
            "given": [result.First_Name]
          }
      ], 
      gender : result.Gender.toLowerCase(),
      birthDate : dateConverter(result.Date_Of_Birth),
      address : [{ 
         "country" :result.Country, 
       }], 
      maritalStatus : result.Maritial_Status,
      photo : [{ 
         "url":result.s3_Image_Location
       }],
      managingOrganization: {
            "reference": "Organization/2.16.840.1.113883.19.5",
            "display": "Good Health Clinic"
      },
    }
 
   console.log(JSON.stringify(body));
   if(body){
            const response = axios.post("https://bscvpi70m4.execute-api.us-east-1.amazonaws.com/dev/Patient", body,{
         headers: {
                     'Content-Type': 'application/json',
                     'x-api-key':'xWOp5Z1e1GFtLRwmDX4y3WVfG7q3tBf9qrJoyyQ5',
                     'Authorization':'Bearer eyJraWQiOiI0XC9pTDlSS0xCWHhoSTBJXC9CdWM1MGJLTVFoT2VWUXdyNHVmRzN4K2FRWFE9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjYWU0ODY4ZS0zNDE2LTQ0NTAtOTk1Zi0zMWEwNjgxZWUzMTkiLCJjb2duaXRvOmdyb3VwcyI6WyJwcmFjdGl0aW9uZXIiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX0xoWXlFOFZTdiIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6InJhamt1bWFyIiwib3JpZ2luX2p0aSI6IjY1MmI4OTc2LWY0MjctNGNlZS1hMmE4LTg1MTFiZTBmYjkwMyIsImF1ZCI6IjU4c2ZnN2dpbjYwN2xudWt2dnY4dms5NzAzIiwiZXZlbnRfaWQiOiIzNjUxNjI3Mi03MDdlLTQ2ODEtOTMzYi00NTQ3Njc5YjdmNjYiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY2MDkyMzExMywicGhvbmVfbnVtYmVyIjoiKzk5ODc2NTQzMjEwIiwiZXhwIjoxNjYwOTI2NzEzLCJpYXQiOjE2NjA5MjMxMTMsImp0aSI6ImExOTA2MWVhLWMwNmYtNGFiYS1hMTUwLWIwZDczOTgzOTI3MiIsImVtYWlsIjoiYWJjQGdtYWlsLmNvbSJ9.fMTGTGXjvmQMYbtNpm8x_uaN7mDT0jeCrmMfP41MAD5ZdsNB2Y1TFTAvVsO26Gdt2NCP9--oT_AOk-BSVw9HgpF-3f3b5lNlBFsMWLDUShafo8mKBL35cfNOuotjtL-FTmV1zZ-P7JTmBoP8HJD0kBr-Ly3VAdOCybP1lb-linRLfnQVn0PC4X4k3BfrXxhPUItGsCYXnOkYU5oKs3XiR0VgZ5NvoTLyH3FYwZx5L9VQR8HMTRfPgoaD7GSZaSwlRmq3HJlV8HqjfHekNX_IuvzEWhikoIN960_JpwOn-YHMIAKiQ5rJEy2F_-8yT_0a_wrMbyRaQ-XkXiQtTW3woQ',
                  } 
      } ).then(res=>{
         console.log(res.status);
         return res;
      }).catch(er=>{
         console.log(er);
      })
   return response;

   }
})
module.exports=router