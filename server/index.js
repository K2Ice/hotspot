const express = require('express');
const {MongoClient} = require('mongodb');
const {v4 : uuidv4} = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors');
const bcrypt = require('bcrypt')


const port = process.env.PORT || 8000;

const uri = 'mongodb+srv://konrad62640:testpassword@hotspot.vrzxq.mongodb.net/Hotspot?retryWrites=true&w=majority';


const app = express();

app.use(cors())
app.use(express.json())


app.post('/login', async (req, res)=>{

  const {email, password} = req.body;

  const client = new MongoClient(uri);

  try{
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');
    
    const user = await users.findOne({email})
    
    
    const correctPassword = await bcrypt.compare(password, user.hashed_password);
    
    if(user && correctPassword ){
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24
      })
      return res.status(201).json({token, userId: user.user_id})
    }
    res.status(400).send('Invalid Credentials!')
  } catch(error){
    console.log(error)
  }

})

app.post('/signup', async (req, res)=>{

  const {email, password} = req.body

  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10)

  const client = new MongoClient(uri)
  
  try{
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const existingUser = await users.findOne({email})

    if(existingUser){
      return res.status(409).send("User already exists. Please login")
    }

    const sanitizedEmail = email.toLowerCase();

    const data = {
      user_id: generatedUserId,
      hashed_password: hashedPassword,
      email: sanitizedEmail
    }

    const insertedUser = await users.insertOne(data);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    })

    res.status(201).json({token, userId: generatedUserId});
  } catch(err){
    console.log(err)
  } finally{
    await client.close()
  }


})

app.get('/gendered-users', async (req, res)=> {

  const gendered = req.query.gender;

  console.log(gendered)

  const client = new MongoClient(uri)
  try{
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');
    const query = {gender: gender}
    const foundUsers = await users.find(query).toArray();
    res.send(foundUsers);
  } catch(err){
    console.log(err)
  } finally{
    await client.close()
  }
})


app.get('/user', async (req, res)=>{

  const userId = req.query.userId;

  const client = new MongoClient(uri);

  try{
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const query = {user_id: userId}
    
    const user = await users.findOne(query)

    res.send(user)

  } catch(error){
    console.log(error)
  } finally{
    await client.close();
  }
})




app.put('/user', async (req, res) => {

  const client = new MongoClient(uri);

  const formData = req.body.formData;
  try{
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const query = {user_id: formData.user_id}

    const updatedDocument = {

      $set:{
        user_id: formData.user_id,
        user_name: formData.user_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        show_gender: formData.show_gender,
        gender: formData.gender,
        look_for: formData.look_for,
        img: formData.img,
        about: formData.about,
        matches: formData.matches,
      }
    }
    const insertedUser = await users.updateOne(query, updatedDocument)

    res.send(insertedUser)

  } catch(err){
    console.log(err)
  } finally{
    await client.close()
  }

})

app.listen(port, (console.log(`Server is listening at port ${port}`)))