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


Get a POST(GEt)-

http://localhost:3001/api/getPosts

req body-
{
    no body
}