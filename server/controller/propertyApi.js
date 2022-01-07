const express = require('express');
const router = express.Router();
const PropertyModel = require('../models/property_model');

router.get("/all", async (req, res) => {
    try {
        const dbResponse = await PropertyModel.find({});
        res.status(200).json(dbResponse);
    } catch (error) {
        res.status(400).json("Data not found");
    }
});

router.get("/search/:id", async (req, res) => {
    const pid = req.params.id;
    try {
        const dbResponse = await PropertyModel.findById(pid);
        if(dbResponse){
            res.status(200).json(dbResponse);
        }else{
            throw new Error();
        }
    } catch (error) {
        res.status(400).json("Invalid property id.");
    }
});

router.get("/search/name/:name", async (req, res) => {
    const pName = req.params.name;
    try {
        const dbResponse = await PropertyModel.findOne({propertyName: pName});
        if(dbResponse){
            res.status(200).json(dbResponse);
        }else{
            throw new Error();
        }
    } catch (error) {
        res.status(400).json("Name not found.");
    }
});

router.post("/add", async (req, res) => {
    const {propertyName, propertyDescription, propertySize} = req.body;
    try {
        if(! propertyName || !propertyDescription || !propertySize){
            res.status(422).json("Please fill input fields properly.");
        }else {
            const newProperty = new PropertyModel(req.body);
            const dbResponse = await newProperty.save();
            if(dbResponse) {
                res.status(201).json(dbResponse);
            }else{
                throw new Error();
            }
        }
    } catch (error) {
        res.status(400).json("Property not added, Error: "+error.message);
    }
});

router.delete("/remove/:id", async (req, res)=>{
    const pid = req.params.id;
    try {
        const dbResponse = await PropertyModel.findByIdAndDelete(pid);
        if(dbResponse){
            res.status(200).json("Property deleted successfully.");
        }else {
            throw new Error();
        }
    } catch (error) {
        res.status(400).json("Not delete, Error: " + error.message);
    }
});

module.exports = router;