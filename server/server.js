import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import MongoStore from 'connect-mongo';




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

        user = new User({
            username,
            email,
            password: hashedPassword
        })

        await user.save();

        res.json({msg: 'User registered succesfully'});
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

app.post('/login',
passport.authenticate('local'), (req, res) => {
   res.json(req.user);
});

app.get('/logout', (req, res) => {
    req.logout(() => {
        res.status(200).send({message: 'User logged out succesfully'})
    }) 
  });


 


//////////////////////////////////////// Todo Section ///////////////////////////////////////////////////
const todoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/tasks', (req, res) => {
    Todo.find({}).then(todos => res.json(todos))
        .catch(err => res.status(400).json('Error:' +err));
});

app.post('/task/create', (req, res) => {
    const newTodo = new Todo({

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

app.patch('/completed/tasks', async (req, res) => {
    try {
    const taskIds = req.body.taskIds
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
// app.patch('/completed/tasks/:id', (req, res) => {
//     const taskId = req.params.id
//     const updatedTask = {completed: req.body.completed};

//     Todo.findByIdAndUpdate(taskId, updatedTask, {new: true})
//         .then((task) => {
//             if (!task) {
//                 return res.status(404).json({success: false, message: "Task not found"});
//             }
//             return res.status(200).json({success: true, task});
//         })
//         .catch((err) => {
//             return res.status(500).json({success: false, message: err.message});
//         });
// });

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});


/* Need to figure out how to logout a user 
    Need to figure out how to redirect users to the correct pages once a user is logged in/out
    Might need to look at doing that from the client side instead of the server side. */