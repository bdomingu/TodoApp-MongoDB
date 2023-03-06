import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();


const secret = process.env.SECRET_KEY;


const app = express();


app.use(cors());
app.use(express.json());

const mongoDB = 'mongodb://betty:betty@localhost:27017/todoApp';
mongoose.connect(mongoDB, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', function() {
    console.log('Connected to MongoDB')
});



/////////////////////////////////////Register Section///////////////////////////////////////////////
const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).send({error:'Email already exists'});
        }
        if (!password) {
            return res.status(400).send({error: 'Please enter a password'})
        }
        if (!email) {
            return res.status(400).send({error: 'Please enter an email'})
        }

        user = new User({
            username,
            email,
            password: hashedPassword
        })

        await user.save();
        res.status(200).send({message:'User registered succesfully'})
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

///////////////////////////////Login Section //////////////////////////////////////////////////////////
passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email, password, done) {
        console.log(email, password)

        User.findOne({email: email}, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, {message:'Incorrect email or password.'}); }
            bcrypt.compare(password, user.password, function(err, res) {
                if (res) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Incorrect email or password'});
                }
            });
        });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized: false,
   
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user){
            return res.status(401).json({
                message: 'Invalid email or password'
        });
    }
    req.login(user, {session: false}, (err) => {
        if (err) {
            res.send(err);
        }
        const token = jwt.sign(user.toJSON(), secret);
        return res.json({user, token});
    });
})(req, res)

});

app.get('/logout', (req, res) => {
    req.logout(() => {
        res.status(200).send({message: 'User logged out succesfully'})
    }) 
  });



//////////////////////////// Authentication /////////////////////////////////////
 
const authenticateToken = (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token === null) return res.sendStatus(401);

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
       
        next();
    });
}   


//////////////////////////////////////// Todo Section ///////////////////////////////////////////////////
const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/tasks', authenticateToken, (req, res) => {
    if (req.user && req.user._id) {
        Todo.find({userId: req.user._id}, (err, data) =>{
            if (err) {
                console.error(err);
                res.status(500).json({error:'Server error'});
            } else {
                res.status(200).send(data);
            }
        });
    }
});

app.post('/tasks/create', authenticateToken, (req, res) => {
    const newTodo = new Todo({
        userId:req.user._id,
        title: req.body.title,
        completed: req.body.completed
    });
    newTodo.save((error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.status(200).send(data);
        }
    });
});

app.delete('/delete/task/:id', (req, res) => {
  const taskId = req.params.id;
  Todo.findByIdAndRemove(taskId, (err, task) => {
    if (err) {
        res.status(500).send({ error: "Error deleting the task"});
        return;
    } 
    if (!task) {
        res.status(404).send({ error: "Task not found"});
        return;
    }
    console.log("Task deleted");
    res.send({message: "Task deleted"});
    });
});

app.patch('/completed/tasks/:ids', async (req, res) => {
    
    try {
    const taskIds = req.params.ids
    const completed = req.body.completed;

    const result = await Todo.updateMany(
        { _id: {$in: taskIds}},
        { $set: {completed: completed}}
    );

    const updatedTasks = await Todo.find({_id: { $in: taskIds }});
    res.json({result, updatedTasks });

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error updating tasks"})
    }
})



app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});

