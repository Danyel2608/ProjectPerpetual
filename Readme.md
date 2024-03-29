<h1>Project by Daniel Salcedo Vivancos</h1>
<h2>Description</h2>
<p>First of all, I want to talk my elections to frontend and backend.
After many turns, I finally have chosen React for frontend,and NodeJs and MongoDB for backend.
The reason why I chose react is because of the possibility it gives to give a more ordered structure, the option of being able to structure each element by several components, helped me form a solid structure.
On the other hand, I chose NodeJs and MondoDB, even though they are not as used as symfony and MySql, for the simple reason that it is easier for the programmer to use, it offers a wide flexibility, which contributed a lot to my project.
</p>
<br>
<h2>Start</h2>
<p>In order to run the project we will need install <strong>React and NodeJs</strong>,React in frontend and NodeJs for backend, with the commands npm run dev in the Backend repository and npm start in React with the Frontend repository, we could now see the project.</p>
<br>
<h2>Basic</h2>
<p>I wanted to show how logins, users and dates are structured within my database.</p>
<li style="list-style: decimal"><strong>Logins</strong></li><br>
    <h5>An example of the login model:</h5><br>
{
  "_id": {"$oid": "65eacfba958dfae38ee156f7"},<br>
  "email": "kokeadmin@gmail.com",<br>
  "password": "$2b$10$oyZwKZ50QX/sbdqFXSooSOPiWFW5ybujiUslGaxy.Zcm4TwVFtO5u"<br>
  "name": "Àlvaro",<br>
  "role": "admin",<br>
  "lastName": "Martos",<br>
  "rememberMe": false,<br>
  "__v": 0
}<br>
<br><p>with logins endpoints:</p>
<br>
<table>
    <tr>
        <td><strong>URL</strong></td>
        <td><strong>TYPE</strong></td>
        <td><strong>DESCRIPTION</strong></td>
        <td><strong>ROLE</strong></td>
    <tr>
    <tr>
        <td>http://localhost:8001/auth/allLogins</td>
        <td>GET</td>
        <td>Get all logins</td>
        <td>admin</td>
    <tr>
    <tr>
        <td>http://localhost:8001/auth/loginId</td>
        <td>GET</td>
        <td>Get login by id</td>
        <td>admin</td>
    <tr>
    <tr>
        <td>http://localhost:8001/auth/login</td>
        <td>POST</td>
        <td>post login</td>
        <td>user and admin</td>
    <tr>
    <tr>
        <td>http://localhost:8001/auth/signup</td>
        <td>POST</td>
        <td>sign up</td>
        <td>user and admin</td>
    <tr>
    <tr>
        <td>http://localhost:8001/auth/forget</td>
        <td>PUT</td>
        <td>update forgotten password</td>
        <td>user and admin</td>
    <tr>
    <tr>
        <td>http://localhost:8001/auth/deleteUser</td>
        <td>DELETE</td>
        <td>delete user</td>
        <td>admin</td>
    <tr>
<table>
<br><li style="list-style: decimal"><strong>Dates</strong></li>
<br><h5>An example of the dates model:</h5><br>
{<br>
  "_id": {"$oid": "65fd5a9a507b3ed86d65fc8b"},<br>
  "fecha": "2024-04-01",<br>
  "estado": "reservado"<br>
}
<br>
<br><p>with dates endpoints:</p>
<br>
<table>
    <tr>
        <td><strong>URL</strong></td>
        <td><strong>TYPE</strong></td>
        <td><strong>DESCRIPTION</strong></td>
        <td><strong>ROLE</strong></td>
    <tr>
    <tr>
        <td>http://localhost:8001/dates/availables</td>
        <td>GET</td>
        <td>Get all dates reserved for calendar</td>
        <td>admin</td>
    <tr>
    <tr>
        <td>http://localhost:8001/dates/reservation</td>
        <td>POST</td>
        <td>Post dates reserved for calendar</td>
        <td>admin</td>
    <tr>
    <tr>
        <td>http://localhost:8001/dates/delete</td>
        <td>DELETE</td>
        <td>Delete date</td>
        <td>admin</td>
    <tr>
    <tr>
        <td>http://localhost:8001/dates/update</td>
        <td>PUT</td>
        <td>Put date of database</td>
        <td>admin</td>
    <tr>
</table>

<br><h2>Links</h2>
<i class="fa-brands fa-linkedin"> <a href="https://www.linkedin.com/in/daniel-salcedo-vivancos-87855918b/">LinkedIn Daniel</a> </i>
<i class="fa-brands fa-github"><a href="https://github.com/Danyel2608">GitHub Daniel</a></i>

<h2>License</h2>
<p>This project belongs to Daniel Salcedo Vivancos</p>
