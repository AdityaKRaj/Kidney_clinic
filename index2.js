const express = require("express");
const app = express();
const users = [{
    name: "john",
    kidneys: [{
        healthy: false
    }]
}]; 
// app.use(cors);
app.use(express.json()); 

app.get('/', (req, res) => {
    const johnkidney = users[0].kidneys;
    const numofkidneys = johnkidney.length;
    let healthykidney = 0;

    for (let i = 0; i < numofkidneys; i++) {
        if (johnkidney[i].healthy) {
            healthykidney++;
        }
    }

    const numofunhealthy = numofkidneys - healthykidney;

    res.json({
        numofkidneys,
        healthykidney,
        numofunhealthy
    });
});

app.post('/', (req, res) => {
    const ishealthy = req.body.ishealthy;
    console.log("hi");
    // Log the request body for debugging
    console.log('Request body:', req.body);

    // Validate the input to ensure it's a boolean
    if (typeof ishealthy !== 'boolean') {
        return res.status(400).json({ msg: "Invalid data. 'ishealthy' should be a boolean." });
    }

    users[0].kidneys.push({
        healthy: ishealthy
    });

    res.json({
        msg: "Kidney added successfully"
    });
});
app.put('/',(req,res)=>{
    console.log(" req here ");
    for(let i=0;i<users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy=true;
    }
    res.json({
        kidney_status:"all kidneys are healthy now"
    });
}) 
app.delete('/',(req,res)=>{
    if(is_unhealthy_kidney()){
        console.log(is_unhealthy_kidney());
        const new_kidney=[];
        for(let i=0;i<users[0].kidneys.length; i++){
            if(users[0].kidneys[i].healthy){
                new_kidney.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys=new_kidney;
        res.json({
            
            kidney_status:"surgery successful unhealthy kidneys are replaced"
        });
       
    }
    else{
        res.status(411).json({
            msg: "your kidney is already fit"
        })
        

    }
})
function is_unhealthy_kidney(){
    let kidney_unhealthy=false;
    for(let i=0;i<users[0].kidneys.length; i++){
        if(!users[0].kidneys.ishealthy){
            kidney_unhealthy=true;

        }

    }
    return kidney_unhealthy;
}
app.listen(3000, () => console.log('Server activated on port 3000'));
