pckages- express/mongoose/http/hbs/jsonwebtoken

api routes-
SIGNUP(POST)-
https://sehyogini.onrender.com/api/signup
req body-
{
  "name":"test",
  "profilePic":"test123",
  "email":"aloo123@gmail.com",
  "password":"123456",
  "city":"cityName",
  "state":"stateName",
  "phone":"+919569938684"
}
res {
    mssg,id
}

SIGNIN(POST)-
https://sehyogini.onrender.com/api/signin

req body-
{
    phone,password
}
res{
    mssg,id
}


Create a POST(POST)-
http://localhost:3001/api/createPost

req body-
{
    title,author,content
}


Get all POST(GEt)-

http://localhost:3001/api/getPosts

req body-
{
    no body
}

LIKE/UNLIKE (POST)-
http://localhost:3001/api/do-like
 req body-
 {
  "post":postID,
  "name":user ID
}

Comment (POST)-
http://localhost:3001/api/do-comment

req body-
{
  "post":postID,
  "comment":"jitne likes utne BJ",
  "name":userID
}


Get user by ID(GET)-
http://localhost:3001/api/getUserByID/:id


Crete a job post(POST)-
http://localhost:3001/api/createJob/65e7fa1b0dc978c5ad1c3e79

req body-
{
  "jobtitle":"Jhadu wala",
  "company":"Google",
  "jobcategory":"technology",
  "description":"Jhadu wla",
  "applications":[],
  "details":{
    //ye abhi ke liye dynamic hai
    "stipend":"Rs.20,0000"
    }
}

Get all the jobs(GET)-
http://localhost:3001/api/getJobs/65e7fa1b0dc978c5ad1c3e79

Apply for a job(POST)-
http://localhost:3001/api/applyJob/65e7fa1b0dc978c5ad1c3e79&:jobID

req body-
{
  "id":userID,
  "jobcategory":"craftsmanship"
 
}