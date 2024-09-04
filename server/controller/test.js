import express from 'express'


export const test = async(req, res )=> {
    try {
        console.log("inside test api route");
    } catch (error) {
        console.log("error occured: ", error)
    }
}