const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password:"Mnbvcdfghj01" ,
    database: "shoutout",
    host: "localhost",
    port: 5432
});




const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({data:'Admin'})
})
//wes
//route to get all staff messages
router.get('/messages/:role', async (req, res) => {
    try {
        const role = req.query.role;
        const getMessages = await pool.query("SELECT * FROM messages")
        res.json(getMessages.rows)
    } catch (err) {
        console.error(err.message)
    }
})
//route to post staff messages
router.post('/messages', async (req, res) => {
    try {
        const {message,role,username,pictureUrl} = req.body;
        const newMessage = await pool.query("INSERT INTO messages(message,role,status,likes,username,picture_url) VALUES ($1,$2,$3,$4,$5,$6)"  ,[message,role,true,0,username,pictureUrl]);
        res.json(newMessage)
    } catch (err) {
        console.error(err.message)
    }
})

//route to update message status (pending/accepted)
router.put('/messages', async (req, res) => {
    try {
        const { status, msg_id } = req.body
        const changeStatus = ("UPDATE messages SET (status = ($1) WHERE msg_id = ($2)", [status, msg_id])
    } catch (err) {
        console.error(err.message)
        
    }
})

//route to delete staff messages
router.delete('/messages/:id' , async(req, res) => {
    try {
        const { msg_id } = req.params;
        const deleteMessage = await pool.query("DELETE FROM messages WHERE msg_id = ($1)", [msg_id])
        res.json('message deleted')
    } catch (err) {
        console.error(err.message)
    }
})

//adding the user data to the users table
router.get('/users/:gmail/:role' , async(req, res) =>{
    try {
        const {gmail,role} = req.params;
        await pool.query("INSERT INTO users(gmail,role) VALUES ($1,$2)",[gmail,role])
        let data = await pool.query("SELECT * FROM users")
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//cohort routes
router.post('cohort', async(req, res) => {
    try {
        const {start_date, cohort_name, end_date} = req.body
        const newCohort = await pool.query("INSERT INTO cohort(start_date, cohort_name, end_date) VALUES ($1, $2, $3)", [start_date, cohort_name, end_date])
    } catch (err) {
        console.error(err.message)
    }
})

router.get('cohort', async(req, res) => {
    try {
        const newCohort = await pool.query("SELECT * FROM cohort")
    } catch (err) {
        console.error(err.message)
    }
})

router.delete('cohort', async(req, res) => {
    try {
        const { cohort_name } = req.body
        const deleteCohort = await pool.query('DELETE FROM cohort WHERE cohort_name = ($1)", [cohort_name]')
        res.json('Cohort deleted')
    } catch (err) {
        console.error(err.message)
    }
})




  

module.exports = router;